import { NextResponse } from "next/server";
import { getMarketingCalendarEvents } from "@/lib/marketing-calendar";

export async function GET() {
  const data = getMarketingCalendarEvents(120);
  return NextResponse.json({ data });
}
