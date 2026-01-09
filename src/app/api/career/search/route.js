import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export async function POST(req) {
  try {
    const { filters } = await req.json();

    // Return empty if no filters (matches senior)
    if (!filters || Object.keys(filters).length === 0) {
      return NextResponse.json({
        success: true,
        careers: [],
        count: 0,
      });
    }

    const selectedMastIds = Object.values(filters)
      .flat()
      .map((v) => Number(v));
    const filterCount = selectedMastIds.length;

    // Phase 1: filter attributes (OR logic)
    const raw = await pool.query(
      `
      WITH filtered AS (
        SELECT cd.careercode,
               cm.choice_id,
               cd.importance
        FROM public.career_data cd
        JOIN public.career_mast cm ON cd.mast_id = cm.mast_id
        WHERE cd.mast_id = ANY($1)
      ),
      validated AS (
        SELECT careercode,
               SUM(importance) AS score,
               COUNT(DISTINCT choice_id) AS categories,
               COUNT(*) FILTER (WHERE importance > 30) AS density
        FROM filtered
        GROUP BY careercode
        HAVING COUNT(DISTINCT choice_id) = $2
      )
      SELECT c.career_id,
             c.careercode,
             c.career,
             c.details,
             v.score,
             v.categories,
             v.density
      FROM validated v
      JOIN public.career c ON c.careercode = v.careercode
      ORDER BY v.score ASC,
         v.categories DESC,
         v.density DESC,
         c.career ASC

      LIMIT 100;
    `,
      [selectedMastIds, filterCount]
    );

    const careers = raw.rows;
    if (careers.length === 0) {
      return NextResponse.json({
        success: true,
        careers: [],
        count: 0,
      });
    }

    // Phase 2: expand attributes
    const careerCodes = careers.map((c) => c.careercode);

    const attrs = await pool.query(
      `
      SELECT cd.careercode,
             cc.career_choice,
             cm.option,
             cd.importance
      FROM public.career_data cd
      JOIN public.career_mast cm ON cd.mast_id = cm.mast_id
      JOIN public.career_choice cc ON cm.choice_id = cc.choice_id
      WHERE cd.careercode = ANY($1)
      ORDER BY cd.careercode, cc.choice_id, cd.importance DESC;
    `,
      [careerCodes]
    );

    // Phase 3: structure results
    const grouped = {};
    attrs.rows.forEach((row) => {
      if (!grouped[row.careercode]) grouped[row.careercode] = {};
      if (!grouped[row.careercode][row.career_choice]) {
        grouped[row.careercode][row.career_choice] = [];
      }
      grouped[row.careercode][row.career_choice].push({
        option: row.option,
        importance: row.importance,
      });
    });

    const final = careers.map((c) => ({
      id: c.career_id,
      careercode: c.careercode,
      name: c.career,
      details: c.details,
      score: c.score,
      ability: grouped[c.careercode]?.["Career Ability"] || [],
      activity: grouped[c.careercode]?.["Career Activity"] || [],
      industry: grouped[c.careercode]?.["Career Industry"] || [],
      interest: grouped[c.careercode]?.["Career Interest"] || [],
      knowledge: grouped[c.careercode]?.["Career Knowledge"] || [],
      outlook: grouped[c.careercode]?.["Career Outlook"] || [],
      pathway: grouped[c.careercode]?.["Career Pathway"] || [],
      preference: grouped[c.careercode]?.["Career Preference"] || [],
      sector: grouped[c.careercode]?.["Career Sector"] || [],
      skills: grouped[c.careercode]?.["Career Skills"] || [],
      stem: grouped[c.careercode]?.["Career STEM"] || [],
      technology: grouped[c.careercode]?.["Career Technology"] || [],
      traits: grouped[c.careercode]?.["Career Traits"] || [],
      zone: grouped[c.careercode]?.["Career Zone"] || [],
    }));

    return NextResponse.json({
      success: true,
      careers: final,
      count: final.length,
    });
  } catch (err) {
    console.error("Search Error:", err);
    return NextResponse.json(
      { error: "Search failed: " + err.message },
      { status: 500 }
    );
  }
}
