import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

export async function POST(req) {
  try {
    const { filters } = await req.json();
    console.log("Filters:", filters);

    // 🔹 Return EMPTY if no filters
    if (!filters || Object.keys(filters).length === 0) {
      return NextResponse.json({
        success: true,
        careers: [],
        count: 0
      });
    }

    // 🔹 Convert selected filters → mast_id array
    const selectedMastIds = Object.values(filters).flat().map(v => Number(v));
    const filterCount = selectedMastIds.length;

    console.log("Selected Mast Ids:", selectedMastIds, "Count:", filterCount);

    // 🔹 Phase 1: Raw filtering (OR logic)
    const rawResult = await pool.query(
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
               COUNT(DISTINCT choice_id) AS matched_categories,
               SUM(importance) AS score
        FROM filtered
        GROUP BY careercode
        HAVING COUNT(DISTINCT choice_id) = $2
      )
      SELECT c.career_id,
             c.careercode,
             c.career,
             c.details,
             v.score
      FROM validated v
      JOIN public.career c ON c.careercode = v.careercode
      ORDER BY v.score DESC
      LIMIT 100;
      `,
      [selectedMastIds, filterCount]
    );

    const careers = rawResult.rows;
    console.log("Matched Careers:", careers.length);

    if (careers.length === 0) {
      return NextResponse.json({
        success: true,
        careers: [],
        count: 0
      });
    }

    // 🔹 Phase 2: Fetch attributes for top N careers
    const careerCodes = careers.map(c => c.careercode);

    const attrsResult = await pool.query(
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

    // 🔹 Group attributes by category
    const attrs = {};
    attrsResult.rows.forEach(row => {
      if (!attrs[row.careercode]) attrs[row.careercode] = {};
      if (!attrs[row.careercode][row.career_choice]) {
        attrs[row.careercode][row.career_choice] = [];
      }
      attrs[row.careercode][row.career_choice].push({
        option: row.option,
        importance: row.importance
      });
    });

    // 🔹 Final formatted careers
    const finalCareers = careers.map(c => ({
      id: c.career_id,
      careercode: c.careercode,
      name: c.career,
      details: c.details,
      score: c.score,
      ability: attrs[c.careercode]?.["Career Ability"] || [],
      activity: attrs[c.careercode]?.["Career Activity"] || [],
      industry: attrs[c.careercode]?.["Career Industry"] || [],
      interest: attrs[c.careercode]?.["Career Interest"] || [],
      knowledge: attrs[c.careercode]?.["Career Knowledge"] || [],
      outlook: attrs[c.careercode]?.["Career Outlook"] || [],
      pathway: attrs[c.careercode]?.["Career Pathway"] || [],
      preference: attrs[c.careercode]?.["Career Preference"] || [],
      sector: attrs[c.careercode]?.["Career Sector"] || [],
      skills: attrs[c.careercode]?.["Career Skills"] || [],
      stem: attrs[c.careercode]?.["Career STEM"] || [],
      technology: attrs[c.careercode]?.["Career Technology"] || [],
      traits: attrs[c.careercode]?.["Career Traits"] || [],
      zone: attrs[c.careercode]?.["Career Zone"] || [],
    }));

    return NextResponse.json({
      success: true,
      careers: finalCareers,
      count: finalCareers.length
    });

  } catch (err) {
    console.error("Search Error:", err);
    return NextResponse.json(
      { error: "Search failed: " + err.message },
      { status: 500 }
    );
  }
}
