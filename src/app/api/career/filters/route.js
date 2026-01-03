import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

export async function GET() {
  try {
    // Get all career choices (14 filter categories)
    const choicesResult = await pool.query(
      `SELECT choice_id, career_choice 
       FROM public.career_choice 
       ORDER BY choice_id`
    );

    // Get all options for each choice
    const mastsResult = await pool.query(
      `SELECT mast_id, choice_id, option 
       FROM public.career_mast 
       ORDER BY choice_id, mast_id`
    );

    // Group options by choice_id
    const filterOptions = {};
    choicesResult.rows.forEach(choice => {
      filterOptions[choice.choice_id] = {
        name: choice.career_choice,
        options: mastsResult.rows
          .filter(mast => mast.choice_id === choice.choice_id)
          .map(mast => ({ id: mast.mast_id, label: mast.option }))
      };
    });

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