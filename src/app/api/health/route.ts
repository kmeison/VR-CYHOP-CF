import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "black-harmony-ai-cmo",
    timestamp: new Date().toISOString(),
  });
}
