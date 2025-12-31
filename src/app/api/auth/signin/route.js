
import { NextResponse } from "next/server";
import pool from "@/lib/db";

// 🔐 Hardcoded users (TEMP)
const USERS = [
  {
    whatsapp: "+919770370187",
    password: "user123",
    role: "user",
    name: "Yash Singh",
  },
  {
    whatsapp: "+918800607598",
    password: "admin123",
    role: "admin",
    name: "Admin",
  },
];

export async function POST(req) {
  try {
    const { whatsapp, password } = await req.json();

    const user = USERS.find(
      (u) => u.whatsapp === whatsapp && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        whatsapp: user.whatsapp,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("SIGNIN ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}




// import { NextResponse } from 'next/server';
// import { Pool } from 'pg';

// // Production Database Connection
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL || "postgres://saubhtech:Mala%40Ki%40Mani%401954@88.222.241.228:5432/saubh",
//   ssl: false // Set to true if your database requires SSL
// });

// export async function POST(req) {
//   try {
//     const { whatsapp, password } = await req.json();

//     const res = await pool.query(
//       `SELECT u.id, u.name
//        FROM users u
//        JOIN user_whatsapp w ON u.id = w.user_id
//        WHERE w.whatsapp = $1 AND w.password = $2`,
//       [whatsapp, password]
//     );

//     if (res.rowCount === 0) {
//       return NextResponse.json(
//         { error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       user: res.rows[0],
//     });
//   } catch (err) {
//     console.error('SIGNIN ERROR:', err);
//     return NextResponse.json(
//       { error: 'Server error' },
//       { status: 500 }
//     );
//   }
// }