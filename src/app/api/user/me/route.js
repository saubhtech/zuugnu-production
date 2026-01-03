import { NextResponse } from "next/server";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://saubhtech:Mala%40Ki%40Mani%401954@88.222.241.228:5432/saubh",
  ssl: false,
});

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT name
      FROM public.whatsapp_users
      WHERE is_active = true
      ORDER BY id DESC
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return NextResponse.json({ name: "User" });
    }

    return NextResponse.json({
      name: result.rows[0].name,
    });
  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json({ name: "User" }, { status: 500 });
  }
}
