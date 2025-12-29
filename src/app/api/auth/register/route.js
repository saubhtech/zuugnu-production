import { NextResponse } from "next/server";
import { Pool } from "pg";
import crypto from "crypto";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Yk123@yk",
  database: "zuugnu",
  port: 5432,
});

function generatePassword() {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

export async function POST(req) {
  try {
    const { fullName, whatsapp } = await req.json();

    if (!fullName || !whatsapp) {
      return NextResponse.json(
        { error: "fullName or whatsapp missing" },
        { status: 400 }
      );
    }

    // Check if user already exists with this WhatsApp number
    const existingUser = await pool.query(
      `SELECT u.id, u.name, w.whatsapp 
       FROM users u
       JOIN user_whatsapp w ON u.id = w.user_id
       WHERE w.whatsapp = $1`,
      [whatsapp]
    );

    if (existingUser.rowCount > 0) {
      // User already exists
      return NextResponse.json({
        success: false,
        exists: true,
        message: "User already exists with this WhatsApp number",
        userName: existingUser.rows[0].name
      }, { status: 409 });
    }

    // Check if name already exists (optional - if you want to prevent duplicate names)
    const existingName = await pool.query(
      `SELECT id, name FROM users WHERE LOWER(name) = LOWER($1)`,
      [fullName]
    );

    if (existingName.rowCount > 0) {
      // Name exists but different WhatsApp number
      return NextResponse.json({
        success: false,
        exists: true,
        message: "User with this name already exists",
        userName: existingName.rows[0].name
      }, { status: 409 });
    }

    // Generate password
    const password = generatePassword();

    // Create new user
    const userRes = await pool.query(
      `INSERT INTO users (name)
       VALUES ($1)
       RETURNING id`,
      [fullName]
    );

    const userId = userRes.rows[0].id;

    // Save whatsapp + password
    await pool.query(
      `INSERT INTO user_whatsapp (user_id, whatsapp, password)
       VALUES ($1, $2, $3)`,
      [userId, whatsapp, password]
    );

    // Return success with password
    return NextResponse.json({
      success: true,
      exists: false,
      password: password,
      whatsapp: whatsapp,
      message: `Hello! Your login credentials:\nWhatsApp: ${whatsapp}\nPassword: ${password}\n\nThank you for registering with Zuugnu!`
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json({ 
      success: false,
      error: "Server error occurred" 
    }, { status: 500 });
  }
}