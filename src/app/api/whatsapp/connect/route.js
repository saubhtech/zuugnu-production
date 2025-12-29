import { NextResponse } from "next/server";

// This is just a proxy to the WhatsApp server
// Note: Most communication should happen via WebSocket directly
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Forward to WhatsApp server
    const response = await fetch("http://localhost:3001/api/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Connect API error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        note: "Make sure WhatsApp server is running on port 3001"
      },
      { status: 500 }
    );
  }
}

// Also handle GET for session status
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    
    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "sessionId parameter required" },
        { status: 400 }
      );
    }
    
    // Get session status from WhatsApp server
    const response = await fetch(`http://localhost:3001/api/session/${sessionId}/status`);
    const data = await response.json();
    
    return NextResponse.json(data);
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}