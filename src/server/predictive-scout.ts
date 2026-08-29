import { prisma } from "@/server/db";
import { getOrCreateDefaultOrganizationId } from "@/server/organization";
import { getMarketingCalendarEvents } from "@/lib/marketing-calendar";
import { getDefaultBayAreaDailySignal, getLatestBayAreaDailySignal } from "@/server/bay-area-pulse";
import { getRealEstateMarketIntelligence } from "@/server/real-estate-api";

type PredictiveGuidance = {
  title: string;
  rationale: string;
  confidence: "low" | "medium" | "high";
};

type TrendDirection = "up" | "flat" | "down";

type BayAreaTrendSignal = {
  score: number;
  direction: TrendDirection;
  summary: string;
};

type BayAreaSourceStatus = {
  name: string;
  status: "connected" | "unconfigured" | "error";
  detail: string;
};

type TargetCapitalFit = "high" | "medium" | "watch";

type BayAreaTargetProperty = {
  title: string;
  address: string;
  price: number;
  capitalFit: TargetCapitalFit;
  score: number;
  rationale: string;
};

type MarketOpportunity = {
  market: string;
  score: number;
  signal: "high-buy" | "hold" | "watch";
  rationale: string;
  price: number | null;
  priceChangePct: number | null;
  inventory: number | null;
  daysOnMarket: number | null;
};

type BayAreaScoutSection = {
  asOf: string;
  stale: boolean;
  moneyInflowIndex: number;
  hiringTrend: BayAreaTrendSignal;
  ipoTrend: BayAreaTrendSignal;
  techMarketTrend: BayAreaTrendSignal;
  sourceStatus: BayAreaSourceStatus[];
  targetProperties: BayAreaTargetProperty[];
};

export type PredictiveScoutSnapshot = {
  totalLeads: number;
  totalCampaigns: number;
  activeCampaigns: number;
  totalProperties: number;
  leadToCampaignRatio: number;
  upcomingEventsCount: number;
  guidance: PredictiveGuidance[];
  bayArea: BayAreaScoutSection;
  marketIntelligence: {
    asOf: string;
    summary: string;
    sourceStatus: Array<{ name: string; status: "connected" | "unconfigured" | "error"; detail: string }>;
    opportunities: MarketOpportunity[];
  };
};

function directionFromScore(score: number): TrendDirection {
  if (score >= 67) return "up";
  if (score >= 45) return "flat";
  return "down";
}

function capitalFitFromScore(score: number): TargetCapitalFit {
  if (score >= 74) return "high";
  if (score >= 56) return "medium";
  return "watch";
}

function isBayAreaAddress(address: string) {
  const haystack = address.toLowerCase();
  const bayAreaKeys = [
    "san francisco",
    "oakland",
    "berkeley",
    "san jose",
    "palo alto",
    "mountain view",
    "menlo park",
    "redwood city",
    "fremont",
    "walnut creek",
    "cupertino",
    "sunnyvale",
    "mill valley",
  ];

  return bayAreaKeys.some((key) => haystack.includes(key));
}

export async function getPredictiveScoutSnapshot(): Promise<PredictiveScoutSnapshot> {
  let totalLeads = 0;
  let totalCampaigns = 0;
  let activeCampaigns = 0;
  let totalProperties = 0;
  let properties: Array<{ title: string; address: string; price: number }> = [];

  try {
    const organizationId = await getOrCreateDefaultOrganizationId();

    const counts = await Promise.all([
      prisma.lead.count({ where: { organizationId } }),
      prisma.campaign.count({ where: { organizationId } }),
      prisma.campaign.count({ where: { organizationId, status: "active" } }),
      prisma.property.count({ where: { organizationId } }),
    ]);

    const propertyRows = await prisma.property.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
      take: 30,
      select: {
        title: true,
        address: true,
        price: true,
      },
    });

    totalLeads = counts[0];
    totalCampaigns = counts[1];
    activeCampaigns = counts[2];
    totalProperties = counts[3];
    properties = propertyRows.map((row) => ({
      title: row.title,
      address: row.address,
      price: Number(row.price),
    }));
  } catch {
    // Keep zero fallback when database is not configured.
  }

  const upcomingEventsCount = getMarketingCalendarEvents(30).length;
  const leadToCampaignRatio = totalCampaigns === 0 ? totalLeads : Number((totalLeads / totalCampaigns).toFixed(2));

  const guidance: PredictiveGuidance[] = [];

  if (totalCampaigns === 0) {
    guidance.push({
      title: "Launch your first campaign cycle",
      rationale: "No campaigns are active in the data set. Start with one demand and one nurture campaign this week.",
      confidence: "high",
    });
  }

  if (totalLeads > 0 && activeCampaigns === 0) {
    guidance.push({
      title: "Activate follow-up campaigns for captured demand",
      rationale: "Leads exist without active campaigns. Prioritize re-engagement and appointment booking funnels.",
      confidence: "high",
    });
  }

  if (totalProperties > 0 && activeCampaigns < totalProperties) {
    guidance.push({
      title: "Expand listing-specific promotion",
      rationale:
        "Property inventory outpaces active campaigns. Create listing-differentiation events and channel-specific content.",
      confidence: "medium",
    });
  }

  if (upcomingEventsCount >= 4) {
    guidance.push({
      title: "Coordinate calendar-driven distribution",
      rationale:
        "Multiple events are scheduled in the next 30 days. Use segmented reminder flows to maximize attendance and referrals.",
      confidence: "medium",
    });
  }

  if (guidance.length === 0) {
    guidance.push({
      title: "System balanced",
      rationale: "Current pipeline, campaigns, and calendar cadence are aligned. Continue weekly optimization reviews.",
      confidence: "medium",
    });
  }

  let bayAreaSignal = getDefaultBayAreaDailySignal();
  try {
    const storedSignal = await getLatestBayAreaDailySignal();
    if (storedSignal) {
      bayAreaSignal = storedSignal;
    }
  } catch {
    // Keep default fallback when daily signal storage is unavailable.
  }

  const hiringScore = bayAreaSignal.hiringScore;
  const ipoScore = bayAreaSignal.ipoScore;
  const techMarketScore = bayAreaSignal.techMarketScore;
  const moneyInflowIndex = bayAreaSignal.moneyInflowIndex;

  const bayAreaProperties = properties.filter((property) => isBayAreaAddress(property.address));
  const priceBench = bayAreaProperties.length > 0 ? bayAreaProperties.reduce((sum, row) => sum + row.price, 0) / bayAreaProperties.length : 1950000;

  const realEstateIntelligence = await getRealEstateMarketIntelligence();

  const scoredTargets = bayAreaProperties.map((property) => {
    const pricePosition = priceBench === 0 ? 0 : (priceBench - property.price) / priceBench;
    const score = Math.max(5, Math.min(95, 62 + moneyInflowIndex * 0.25 + pricePosition * 22));
    const roundedScore = Number(score.toFixed(1));
    const capitalFit = capitalFitFromScore(roundedScore);
    const rationale =
      capitalFit === "high"
        ? "Strong fit for current Bay Area capital rotation, with pricing and demand profile aligned to growth inflows."
        : capitalFit === "medium"
          ? "Viable target if deal terms remain disciplined as hiring and IPO momentum continue stabilizing demand."
          : "Needs tighter underwriting until local momentum improves or pricing resets further.";

    return {
      title: property.title,
      address: property.address,
      price: property.price,
      capitalFit,
      score: roundedScore,
      rationale,
    };
  });

  const fallbackTargets: BayAreaTargetProperty[] = [
    {
      title: "SoMa Flex Office Conversion",
      address: "SOMA, San Francisco, CA",
      price: 4200000,
      capitalFit: "high",
      score: 78.2,
      rationale: "Close to AI hiring clusters and recent venture deployment; conversion angle aligns with capital preference for adaptive assets.",
    },
    {
      title: "Mountain View Townhome Portfolio",
      address: "Mountain View, CA",
      price: 3650000,
      capitalFit: "medium",
      score: 66.4,
      rationale: "Steady demand from engineering payroll growth with moderate valuation support from recent market repricing.",
    },
    {
      title: "Downtown Oakland Mixed-Use Block",
      address: "Oakland, CA",
      price: 2950000,
      capitalFit: "watch",
      score: 54.3,
      rationale: "Attractive basis, but requires tighter risk controls until tenant demand and financing spreads improve.",
    },
  ];

  const targetProperties = (scoredTargets.length > 0 ? scoredTargets : fallbackTargets)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    totalLeads,
    totalCampaigns,
    activeCampaigns,
    totalProperties,
    leadToCampaignRatio,
    upcomingEventsCount,
    guidance,
    bayArea: {
      asOf: bayAreaSignal.asOf,
      stale: bayAreaSignal.stale,
      moneyInflowIndex,
      hiringTrend: {
        score: hiringScore,
        direction: directionFromScore(hiringScore),
        summary: "Large-cap tech and AI employers continue selective hiring in core Bay Area hubs.",
      },
      ipoTrend: {
        score: ipoScore,
        direction: directionFromScore(ipoScore),
        summary: "IPO pipeline quality is improving, with stronger candidate activity than earlier quarters.",
      },
      techMarketTrend: {
        score: techMarketScore,
        direction: directionFromScore(techMarketScore),
        summary: "Public tech multiples and private funding velocity indicate a constructive risk appetite.",
      },
      sourceStatus: bayAreaSignal.sourceStatus,
      targetProperties,
    },
    marketIntelligence: {
      asOf: realEstateIntelligence.asOf,
      summary: realEstateIntelligence.summary,
      sourceStatus: realEstateIntelligence.sourceStatus,
      opportunities: realEstateIntelligence.opportunities,
    },
  };
}
