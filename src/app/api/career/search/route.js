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

    // If no filters, return all careers
    if (!filters || Object.keys(filters).length === 0) {
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
      // Get all mast_ids from filters
      const mastIds = Object.values(filters).flat();
      console.log("📊 Searching for mast_ids:", mastIds);

      // Sort by MAX importance (highest first)
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

      // ✅ DEBUG LOG
      console.log(
        "📊 First 5 with importance:",
        careersResult.rows
          .slice(0, 5)
          .map((c) => `${c.career} (${c.max_importance})`)
      );
    }

    const careers = careersResult.rows;

    if (careers.length === 0) {
      return NextResponse.json({ success: true, careers: [], count: 0 });
    }

    // Get attributes for all careers in ONE query
    const careerCodes = careers.map((c) => c.careercode);

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

    // Group attributes by career
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

    // Build final career objects
    const finalCareers = careers.map((c) => ({
      id: c.career_id,
      careercode: c.careercode,
      name: c.career,
      details: c.details,
      ability: attrByCareer[c.careercode]?.["Career Ability"] || [],
      activity: attrByCareer[c.careercode]?.["Career Activity"] || [],
      knowledge: attrByCareer[c.careercode]?.["Career Knowledge"] || [],
      preference: attrByCareer[c.careercode]?.["Career Preference"] || [],
      skills: attrByCareer[c.careercode]?.["Career Skills"] || [],
      technology: attrByCareer[c.careercode]?.["Career Technology"] || [],
      traits: attrByCareer[c.careercode]?.["Career Traits"] || [],
    }));

    console.log("✅ Returning", finalCareers.length, "careers");

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
