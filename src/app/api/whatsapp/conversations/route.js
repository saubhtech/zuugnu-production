export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

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
    
    const response = await fetch(`http://localhost:3001/api/conversations?sessionId=${sessionId}`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Conversations API error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        conversations: [] 
      },
      { status: 500 }
    );
  }
}