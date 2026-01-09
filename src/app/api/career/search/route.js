import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export async function POST(req) {
  try {
    const { filters } = await req.json();
    console.log("🔍 Search filters:", filters);

    let careersResult;

    if (!filters || Object.keys(filters).length === 0) {
      // No filters - return top 100 careers by importance
      careersResult = await pool.query(`
        SELECT 
          c.career_id, 
          c.careercode, 
          c.career, 
          c.details,
          MAX(cd.importance) AS max_importance
        FROM public.career c
        LEFT JOIN public.career_data cd 
          ON c.careercode = cd.careercode
        GROUP BY 
          c.career_id, 
          c.careercode, 
          c.career, 
          c.details
        ORDER BY 
          max_importance DESC NULLS LAST
        LIMIT 100
      `);
    } else {
      const mastIds = Object.values(filters).flat();
      console.log("📊 Searching for mast_ids:", mastIds);

      careersResult = await pool.query(
        `
        SELECT 
          c.career_id, 
          c.careercode, 
          c.career, 
          c.details,
          MAX(cd.importance) as max_importance
        FROM public.career c
        JOIN public.career_data cd ON c.careercode = cd.careercode
        WHERE cd.mast_id = ANY($1)
        GROUP BY c.career_id, c.careercode, c.career, c.details
        ORDER BY max_importance DESC
        LIMIT 100
      `,
        [mastIds]
      );
    }

    const careers = careersResult.rows;
    console.log(`📋 Found ${careers.length} careers`);

    if (careers.length === 0) {
      return NextResponse.json({ success: true, careers: [], count: 0 });
    }

    const careerCodes = careers.map((c) => c.careercode);

    // ✅ Fetch ALL attributes for these careers (not just filtered ones)
    const attrsResult = await pool.query(
      `
      SELECT
        cd.careercode,
        cc.career_choice,
        cm.option,
        cd.importance
      FROM public.career_data cd
      JOIN public.career_mast cm ON cd.mast_id = cm.mast_id
      JOIN public.career_choice cc ON cm.choice_id = cc.choice_id
      WHERE cd.careercode = ANY($1)
      ORDER BY cd.careercode, cc.choice_id, cd.importance DESC
    `,
      [careerCodes]
    );

    console.log(`📊 Found ${attrsResult.rows.length} total attribute records`);

    const attrByCareer = {};

    attrsResult.rows.forEach((row) => {
      if (!attrByCareer[row.careercode]) {
        attrByCareer[row.careercode] = {};
      }

      if (!attrByCareer[row.careercode][row.career_choice]) {
        attrByCareer[row.careercode][row.career_choice] = [];
      }

      attrByCareer[row.careercode][row.career_choice].push({
        option: row.option,
        importance: row.importance,
      });
    });

    const finalCareers = careers.map((c) => {
      const careerData = {
        id: c.career_id,
        careercode: c.careercode,
        name: c.career,
        details: c.details,
        ability: attrByCareer[c.careercode]?.["Career Ability"] || [],
        activity: attrByCareer[c.careercode]?.["Career Activity"] || [],
        industry: attrByCareer[c.careercode]?.["Career Industry"] || [],
        interest: attrByCareer[c.careercode]?.["Career Interest"] || [],
        knowledge: attrByCareer[c.careercode]?.["Career Knowledge"] || [],
        outlook: attrByCareer[c.careercode]?.["Career Outlook"] || [],
        pathway: attrByCareer[c.careercode]?.["Career Pathway"] || [],
        preference: attrByCareer[c.careercode]?.["Career Preference"] || [],
        sector: attrByCareer[c.careercode]?.["Career Sector"] || [],
        skills: attrByCareer[c.careercode]?.["Career Skills"] || [],
        stem: attrByCareer[c.careercode]?.["Career STEM"] || [],
        technology: attrByCareer[c.careercode]?.["Career Technology"] || [],
        traits: attrByCareer[c.careercode]?.["Career Traits"] || [],
        zone: attrByCareer[c.careercode]?.["Career Zone"] || [],
      };

      // Log careers with missing data
      const dataCounts = {
        ability: careerData.ability.length,
        activity: careerData.activity.length,
        knowledge: careerData.knowledge.length,
        preference: careerData.preference.length,
        skills: careerData.skills.length,
        technology: careerData.technology.length,
        traits: careerData.traits.length,
      };

      const missingCategories = Object.entries(dataCounts)
        .filter(([_, count]) => count === 0)
        .map(([cat, _]) => cat);

      if (missingCategories.length > 0) {
        console.log(`⚠️ ${c.career} missing: ${missingCategories.join(", ")}`);
      }

      return careerData;
    });

    console.log("✅ Returning", finalCareers.length, "careers with full data");

    return NextResponse.json({
      success: true,
      careers: finalCareers,
      count: finalCareers.length,
    });
  } catch (err) {
    console.error("❌ SEARCH ERROR:", err);
    return NextResponse.json(
      { error: "Search failed: " + err.message },
      { status: 500 }
    );
  }
}
