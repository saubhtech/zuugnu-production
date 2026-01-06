import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

export async function GET() {
  try {
    // Get all career choices
    const choicesResult = await pool.query(
      `SELECT choice_id, career_choice 
       FROM public.career_choice 
       ORDER BY choice_id`
    );

    // Get options that have at least 1 career linked
    const mastsResult = await pool.query(
      `SELECT DISTINCT 
         cm.mast_id, 
         cm.choice_id, 
         cm.option,
         COUNT(DISTINCT cd.careercode) as career_count
       FROM public.career_mast cm
       LEFT JOIN public.career_data cd ON cm.mast_id = cd.mast_id
       GROUP BY cm.mast_id, cm.choice_id, cm.option
       HAVING COUNT(DISTINCT cd.careercode) > 0
       ORDER BY cm.choice_id, cm.option`
    );

    // Group options by choice_id
    const filterOptions = {};
    
    choicesResult.rows.forEach(choice => {
      const options = mastsResult.rows
        .filter(mast => mast.choice_id === choice.choice_id)
        .map(mast => ({ 
          id: mast.mast_id, 
          label: mast.option,
          careerCount: parseInt(mast.career_count)
        }));
      
      // ✅ ONLY add filters that have options with careers
      if (options.length > 0) {
        filterOptions[choice.choice_id] = {
          name: choice.career_choice,
          options: options
        };
      }
    });

    console.log("✅ Returning filters:", Object.keys(filterOptions).length);

    return NextResponse.json({
      success: true,
      filters: filterOptions
    });

  } catch (err) {
    console.error("❌ FILTERS ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch filters: " + err.message },
      { status: 500 }
    );
  }
}