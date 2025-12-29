import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    
    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: "conversationId parameter required" },
        { status: 400 }
      );
    }
    
    const response = await fetch(`http://localhost:3001/api/messages?conversationId=${conversationId}`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Messages API error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        messages: [] 
      },
      { status: 500 }
    );
  }
}