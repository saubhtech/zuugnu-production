import { NextResponse } from "next/server";

const WHATSAPP_SERVER = "http://localhost:3001";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    
    const response = await fetch(`${WHATSAPP_SERVER}/api/status?sessionId=${sessionId}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}