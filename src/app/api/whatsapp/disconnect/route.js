import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch("http://localhost:3001/api/disconnect", {
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