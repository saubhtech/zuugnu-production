import { NextResponse } from "next/server";

const WHATSAPP_SERVER = "http://localhost:3001";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    
    // Changed from /api/chats to /api/conversations
    const response = await fetch(`${WHATSAPP_SERVER}/api/conversations?sessionId=${sessionId}`);
    const data = await response.json();
    
    // Map the response to match expected format
    return NextResponse.json({
      success: data.success,
      chats: data.conversations || []
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}