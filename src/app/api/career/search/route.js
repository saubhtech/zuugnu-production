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

    // 1️⃣ Fetch careers
    if (!filters || Object.keys(filters).length === 0) {
      careersResult = await pool.query(`
        SELECT 
          career_id,
          careercode,
          career,
          details
        FROM public.career
        ORDER BY career
        LIMIT 1000
      `);
    } else {
      const mastIds = Object.values(filters).flat();

      careersResult = await pool.query(
        `
        SELECT 
          c.career_id,
          c.careercode,
          c.career,
          c.details
        FROM public.career c
        JOIN public.career_data cd ON c.careercode = cd.careercode
        WHERE cd.mast_id = ANY($1)
        GROUP BY c.career_id, c.careercode, c.career, c.details
        ORDER BY MAX(cd.importance) DESC, c.career
        LIMIT 1000
        `,
        [mastIds]
      );
    }

    const careers = careersResult.rows;
    if (careers.length === 0) {
      return NextResponse.json({ success: true, careers: [], count: 0 });
    }

    // 2️⃣ Fetch ALL attributes in ONE query
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
      ORDER BY cd.importance DESC, cc.choice_id
      `,
      [careerCodes]
    );

    // 3️⃣ Build attribute map (same structure as before)
    const attrByCareer = {};

    for (const row of attrsResult.rows) {
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
    }

    // 4️⃣ Attach attributes (NO functionality loss)
    const finalCareers = careers.map((c) => {
      const attrs = attrByCareer[c.careercode] || {};

      return {
        id: c.career_id,
        careercode: c.careercode,
        name: c.career,
        details: c.details,
        ability: attrs["Career Ability"] || [],
        activity: attrs["Career Activity"] || [],
        knowledge: attrs["Career Knowledge"] || [],
        preference: attrs["Career Preference"] || [],
        skills: attrs["Career Skills"] || [],
        technology: attrs["Career Technology"] || [],
        traits: attrs["Career Traits"] || [],
      };
    });

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
