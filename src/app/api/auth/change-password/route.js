import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://saubhtech:Mala%40Ki%40Mani%401954@88.222.241.228:5432/saubh",
  ssl: false
});

export async function POST(req) {
  try {
    const { whatsapp, oldPassword, newPassword } = await req.json();

    console.log("🔐 Password change attempt for:", whatsapp);

    // Validation
    if (!whatsapp || !oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Clean phone number
    const cleanPhone = whatsapp.replace(/[\s\-+]/g, '');

    // Verify old password
    const userCheck = await pool.query(
      `SELECT id, name, password FROM public.whatsapp_users 
       WHERE phone = $1 AND is_active = true`,
      [cleanPhone]
    );

    if (userCheck.rowCount === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = userCheck.rows[0];

    // Check if old password matches
    if (user.password !== oldPassword) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Update password
    await pool.query(
      `UPDATE public.whatsapp_users 
       SET password = $1 
       WHERE id = $2`,
      [newPassword, user.id]
    );

    console.log("✅ Password updated for user:", user.name);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (err) {
    console.error("❌ PASSWORD CHANGE ERROR:", err);
    return NextResponse.json(
      { error: "Server error: " + err.message },
      { status: 500 }
    );
  }
}