import { NextResponse } from "next/server";
import { getPredictiveMarketReport } from "@/server/market-predictor";

export async function GET() {
  try {
    const data = await getPredictiveMarketReport();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to compute predictive market report.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
