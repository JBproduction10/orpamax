import { NextResponse, NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  return NextResponse.json({ time: new Date().toLocaleString() });
}
