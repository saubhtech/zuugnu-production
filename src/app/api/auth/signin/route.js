import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Yk123@yk',
  database: 'zuugnu',
  port: 5432,
})

export async function POST(req) {
  try {
    const { whatsapp, password } = await req.json()

    const res = await pool.query(
      `SELECT u.id, u.name
       FROM users u
       JOIN user_whatsapp w ON u.id = w.user_id
       WHERE w.whatsapp = $1 AND w.password = $2`,
      [whatsapp, password]
    )

    if (res.rowCount === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: res.rows[0],
    })
  } catch (err) {
    console.error('SIGNIN ERROR:', err)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
