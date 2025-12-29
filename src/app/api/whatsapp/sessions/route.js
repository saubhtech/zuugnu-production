import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Proxy to WhatsApp server
    const response = await fetch("http://localhost:3001/api/sessions");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Sessions API error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        sessions: [] 
      },
      { status: 500 }
    );
  }
}