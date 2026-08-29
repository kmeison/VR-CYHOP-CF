import { NextRequest, NextResponse } from "next/server";
import { refreshBayAreaDailySignal } from "@/server/bay-area-pulse";
import { refreshRealEstateMarketIntelligence } from "@/server/real-estate-api";

function isAuthorized(request: NextRequest) {
  const expectedSecret = process.env.SCOUT_REFRESH_SECRET;
  if (!expectedSecret) {
    return false;
  }

  const providedSecret = request.headers.get("x-scout-refresh-secret");
  return providedSecret === expectedSecret;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [bayArea, realEstate] = await Promise.all([refreshBayAreaDailySignal(), refreshRealEstateMarketIntelligence()]);
    return NextResponse.json({
      data: {
        bayArea,
        realEstate,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to refresh Scout signals.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
