import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Production Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://saubhtech:Mala%40Ki%40Mani%401954@88.222.241.228:5432/saubh",
  ssl: false // Set to true if your database requires SSL
});

export async function POST(req) {
  try {
    const { whatsapp, password } = await req.json();

    const res = await pool.query(
      `SELECT u.id, u.name
       FROM users u
       JOIN user_whatsapp w ON u.id = w.user_id
       WHERE w.whatsapp = $1 AND w.password = $2`,
      [whatsapp, password]
    );

    if (res.rowCount === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: res.rows[0],
    });
  } catch (err) {
    console.error('SIGNIN ERROR:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}