import { NextResponse } from "next/server";
import { getPredictiveScoutSnapshot } from "@/server/predictive-scout";
import { getPredictiveMarketReport } from "@/server/market-predictor";

export async function GET() {
  try {
    const [data, market] = await Promise.all([getPredictiveScoutSnapshot(), getPredictiveMarketReport()]);
    return NextResponse.json({ data, market });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to compute predictive scout snapshot.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
