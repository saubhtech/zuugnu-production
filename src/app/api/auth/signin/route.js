import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://saubhtech:Mala%40Ki%40Mani%401954@88.222.241.228:5432/saubh",
  ssl: false
});

export async function POST(req) {
  try {
    const { whatsapp, password } = await req.json();

    console.log("🔐 Login attempt:", { whatsapp, password });

    if (!whatsapp || !password) {
      return NextResponse.json(
        { error: "WhatsApp number and password are required" },
        { status: 400 }
      );
    }

    // FIX: Clean the phone number - remove +, spaces, and hyphens
    let cleanPhone = whatsapp.replace(/[\s\-+]/g, '');
    
    console.log("📞 Cleaned phone:", cleanPhone);
    console.log("🔍 Searching in database...");

    // Query with the cleaned phone format
    const result = await pool.query(
      `SELECT id, phone, name, password, is_active, is_admin, created_at, last_login
       FROM public.whatsapp_users
       WHERE phone = $1 AND password = $2 AND is_active = true`,
      [cleanPhone, password]
    );

    console.log("📊 Query result:", result.rowCount, "users found");

    if (result.rowCount === 0) {
      // Debugging: Check what's actually in the database
      const allUsers = await pool.query(
        `SELECT phone, name FROM public.whatsapp_users LIMIT 5`
      );
      console.log("📋 Sample users in DB:", allUsers.rows);
      
      // Check if phone exists
      const phoneCheck = await pool.query(
        `SELECT phone, password FROM public.whatsapp_users WHERE phone = $1`,
        [cleanPhone]
      );
      
      if (phoneCheck.rowCount === 0) {
        console.log("❌ Phone number not found in database");
      } else {
        console.log("❌ Phone found but password mismatch");
        console.log("   DB password:", phoneCheck.rows[0].password);
        console.log("   Input password:", password);
      }
      
      return NextResponse.json(
        { error: "Invalid WhatsApp number or password" },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    console.log("✅ User found:", user.name);

    // Update last_login
    await pool.query(
      `UPDATE public.whatsapp_users 
       SET last_login = NOW() 
       WHERE id = $1`,
      [user.id]
    );

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        whatsapp: user.phone,
        role: user.is_admin ? "admin" : "user",
        isActive: user.is_active,
        isAdmin: user.is_admin,
      },
    });

  } catch (err) {
    console.error("❌ SIGNIN ERROR:", err);
    return NextResponse.json(
      { error: "Server error: " + err.message },
      { status: 500 }
    );
  }
}