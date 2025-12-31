export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

const WHATSAPP_SERVER = process.env.WHATSAPP_SERVER_URL || "http://localhost:3001";

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await fetch(`${WHATSAPP_SERVER}/api/pairing-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}