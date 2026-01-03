import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://saubhtech:Mala%40Ki%40Mani%401954@88.222.241.228:5432/saubh",
  ssl: false,
});

export async function GET() {
  try {
    // Sample from each table
    const career = await pool.query(`SELECT * FROM public.career LIMIT 5`);
    const careerData = await pool.query(
      `SELECT * FROM public.career_data LIMIT 10`
    );
    const careerChoice = await pool.query(
      `SELECT * FROM public.career_choice ORDER BY choice_id`
    );
    const careerMast = await pool.query(`
      SELECT choice_id, COUNT(*) as count 
      FROM public.career_mast 
      GROUP BY choice_id
    `);

    return NextResponse.json({
      career: career.rows,
      careerData: careerData.rows,
      careerChoice: careerChoice.rows,
      careerMastCounts: careerMast.rows,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
