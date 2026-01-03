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
    // Check career_mast structure
    const allData = await pool.query(`
      SELECT * FROM public.career_mast 
      ORDER BY choice_id, mast_id
      LIMIT 100
    `);

    // Count by choice_id
    const countByChoice = await pool.query(`
      SELECT choice_id, COUNT(*) as count
      FROM public.career_mast
      GROUP BY choice_id
      ORDER BY choice_id
    `);

    return NextResponse.json({
      success: true,
      totalRows: allData.rowCount,
      sampleData: allData.rows.slice(0, 20),
      countByChoice: countByChoice.rows,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
