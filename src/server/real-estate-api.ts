import { prisma } from "@/server/db";
import type { Prisma } from "@prisma/client";

type SourceStatus = "connected" | "unconfigured" | "error";

type SourceHealth = {
  name: string;
  status: SourceStatus;
  detail: string;
};

export type MarketSignal = "high-buy" | "hold" | "watch";

export type RealEstateOpportunity = {
  market: string;
  score: number;
  signal: MarketSignal;
  rationale: string;
  price: number | null;
  priceChangePct: number | null;
  inventory: number | null;
  daysOnMarket: number | null;
};

export type RealEstateMarketIntelligence = {
  asOf: string;
  summary: string;
  sourceStatus: SourceHealth[];
  opportunities: RealEstateOpportunity[];
};

const DEFAULT_SNAPSHOT_STALE_MINUTES = 5;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function signalFromScore(score: number): MarketSignal {
  if (score >= 72) return "high-buy";
  if (score >= 56) return "hold";
  return "watch";
}

function firstStringValue(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (Array.isArray(value) && value.length > 0) {
    const first = firstStringValue(value[0]);
    return first;
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    for (const key of ["name", "market", "city", "neighborhood", "region", "submarket", "marketName", "label", "title", "displayName"]) {
      const candidate = firstStringValue(record[key]);
      if (candidate) return candidate;
    }
  }
  return null;
}

function readNestedNumber(payload: unknown, keys: string[]): number | null {
  if (payload == null) return null;
  if (Array.isArray(payload)) {
    for (const item of payload) {
      const parsed = readNestedNumber(item, keys);
      if (parsed != null) return parsed;
    }
    return null;
  }
  if (typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key];
    const parsed = toNumber(value);
    if (parsed != null) return parsed;
  }
  for (const key of ["data", "attributes", "details", "meta", "metrics", "stats"]) {
    const nested = record[key];
    if (nested && typeof nested === "object") {
      const parsed = readNestedNumber(nested, keys);
      if (parsed != null) return parsed;
    }
  }
  return null;
}

function extractItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  const record = payload as Record<string, unknown>;
  const candidates = ["results", "data", "properties", "listings", "markets", "neighborhoods", "items", "response", "records"] as const;
  for (const key of candidates) {
    const value = record[key];
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") {
      const nested = extractItems(value);
      if (nested.length > 0) return nested;
    }
  }
  return [];
}

function buildRationale(entry: RealEstateOpportunity) {
  if (entry.signal === "high-buy") {
    return `${entry.market} looks attractive because price momentum is positive and inventory pressure is manageable, making it a strong zone for targeted campaigns.`;
  }
  if (entry.signal === "hold") {
    return `${entry.market} is moderately favorable. Use a measured cadence and focus on segments that can still convert while market conditions stabilize.`;
  }

  return `${entry.market} is currently a watch market. Prioritize lower-risk messaging and wait for clearer demand or pricing confirmation before scaling spend.`;
}

function buildSearchPayload() {
  const override = process.env.REAL_ESTATE_API_SEARCH_PAYLOAD;
  if (override) {
    try {
      const parsed = JSON.parse(override);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    } catch {
      // Fall through to the default payload when the override is invalid.
    }
  }

  return {
    location: "San Francisco Bay Area",
    query: "San Francisco Bay Area",
    city: "San Francisco",
    state: "CA",
    page: 1,
    per_page: 10,
    sort: "newest",
    property_type: "residential",
    status: "for_sale",
  };
}

async function fetchJsonWithTimeout(url: string, options?: { headers?: Record<string, string>; body?: unknown }) {
  const controller = new AbortController();
  const timeoutMs = Number(process.env.REAL_ESTATE_API_TIMEOUT_MS || 1500);
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function fallbackOpportunities() {
  return [
    {
      market: "South San Francisco",
      score: 78,
      signal: "high-buy" as const,
      rationale: "Strong demand and healthy pricing make this a good target for an accelerated outreach push.",
      price: 1320000,
      priceChangePct: 4.3,
      inventory: 18,
      daysOnMarket: 14,
    },
    {
      market: "Mountain View",
      score: 66,
      signal: "hold" as const,
      rationale: "Momentum is positive but pricing remains sensitive, so this is best suited for controlled campaigns.",
      price: 1680000,
      priceChangePct: 2.1,
      inventory: 24,
      daysOnMarket: 21,
    },
    {
      market: "Oakland Uptown",
      score: 54,
      signal: "watch" as const,
      rationale: "Watch this pocket for better clarity on inventory and conversion demand before expanding scale.",
      price: 945000,
      priceChangePct: -0.8,
      inventory: 31,
      daysOnMarket: 29,
    },
  ];
}

function sourceStatusFromUnknown(value: unknown): SourceHealth[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const name = typeof record.name === "string" ? record.name : null;
      const status =
        record.status === "connected" || record.status === "unconfigured" || record.status === "error" ? record.status : null;
      const detail = typeof record.detail === "string" ? record.detail : null;

      if (!name || !status || !detail) return null;
      return { name, status, detail } satisfies SourceHealth;
    })
    .filter((item): item is SourceHealth => Boolean(item));
}

function opportunitiesFromUnknown(value: unknown): RealEstateOpportunity[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;

      const market = typeof record.market === "string" ? record.market : null;
      const score = toNumber(record.score);
      const signal = record.signal === "high-buy" || record.signal === "hold" || record.signal === "watch" ? record.signal : null;
      const rationale = typeof record.rationale === "string" ? record.rationale : null;

      if (!market || score == null || !signal || !rationale) return null;

      return {
        market,
        score,
        signal,
        rationale,
        price: toNumber(record.price),
        priceChangePct: toNumber(record.priceChangePct),
        inventory: toNumber(record.inventory),
        daysOnMarket: toNumber(record.daysOnMarket),
      } satisfies RealEstateOpportunity;
    })
    .filter((item): item is RealEstateOpportunity => Boolean(item));
}

function getSnapshotStaleMs() {
  const configuredMinutes = Number(process.env.REAL_ESTATE_SNAPSHOT_STALE_MINUTES ?? DEFAULT_SNAPSHOT_STALE_MINUTES);
  const safeMinutes = Number.isFinite(configuredMinutes) && configuredMinutes > 0 ? configuredMinutes : DEFAULT_SNAPSHOT_STALE_MINUTES;
  return safeMinutes * 60 * 1000;
}

async function computeRealEstateMarketIntelligence(): Promise<{ data: RealEstateMarketIntelligence; rawPayload: Prisma.InputJsonValue }> {
  const endpoint = process.env.REAL_ESTATE_API_URL;
  const apiKey = process.env.REAL_ESTATE_API_KEY;
  const headers = apiKey ? { "x-api-key": apiKey } : undefined;

  if (!endpoint || !apiKey) {
    return {
      data: {
        asOf: new Date().toISOString(),
        summary: "Real Estate API not configured yet. Scout is using fallback market heuristics until an endpoint is connected.",
        sourceStatus: [
          {
            name: "RealEstateAPI",
            status: "unconfigured" as const,
            detail: "Set REAL_ESTATE_API_URL to enable live market scoring.",
          },
        ],
        opportunities: fallbackOpportunities(),
      },
      rawPayload: { fallback: true, reason: "unconfigured" },
    };
  }

  try {
    const requestPayload = buildSearchPayload();

    const payload = await fetchJsonWithTimeout(endpoint, {
      headers,
      body: requestPayload,
    });
    const items = extractItems(payload);

    const opportunities = items
      .map((item, index) => {
        const entry = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
        const market =
          firstStringValue(entry.market ?? entry.name ?? entry.city ?? entry.neighborhood ?? entry.region ?? entry.marketName ?? entry.displayName) ??
          `Opportunity ${index + 1}`;
        const price = readNestedNumber(entry, [
          "price",
          "medianPrice",
          "median_price",
          "averagePrice",
          "average_price",
          "listPrice",
          "list_price",
          "marketValue",
          "market_value",
        ]);
        const priceChangePct = readNestedNumber(entry, [
          "priceChangePct",
          "price_change_pct",
          "priceChange",
          "price_change",
          "monthlyChange",
          "monthly_change",
          "priceChangePercent",
          "price_change_percent",
        ]);
        const inventory = readNestedNumber(entry, [
          "inventory",
          "activeInventory",
          "active_inventory",
          "listings",
          "listingsCount",
          "listings_count",
          "inventoryCount",
          "inventory_count",
        ]);
        const daysOnMarket = readNestedNumber(entry, ["daysOnMarket", "days_on_market", "dom", "daysOnMarketAvg"]);

        const explicitScore = readNestedNumber(entry, ["score", "opportunityScore", "marketScore", "signalScore"]);
        const priceScore = priceChangePct != null ? clamp(50 + priceChangePct * 8, 0, 100) : 50;
        const inventoryScore = inventory != null ? clamp(100 - inventory * 2, 0, 100) : 50;
        const domScore = daysOnMarket != null ? clamp(100 - daysOnMarket * 2, 0, 100) : 50;
        const demandScore = readNestedNumber(entry, ["demand", "demandScore", "demand_score", "interest", "interestScore", "interest_score"]);
        const demandAdjusted = demandScore != null ? clamp(demandScore, 0, 100) : 50;

        const score =
          explicitScore != null ? clamp(explicitScore, 0, 100) : Number(((priceScore + inventoryScore + domScore + demandAdjusted) / 4).toFixed(1));
        const signal = signalFromScore(score);
        const opportunity: RealEstateOpportunity = {
          market,
          score,
          signal,
          rationale: buildRationale({ market, score, signal, rationale: "", price, priceChangePct, inventory, daysOnMarket }),
          price,
          priceChangePct,
          inventory,
          daysOnMarket,
        };

        return opportunity;
      })
      .filter((entry) => Boolean(entry.market))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return {
      data: {
        asOf: new Date().toISOString(),
        summary:
          opportunities.length > 0
            ? `${opportunities.length} live market pockets were ranked using the configured Real Estate API feed.`
            : "The configured endpoint returned no market records.",
        sourceStatus: [
          {
            name: "RealEstateAPI",
            status: "connected" as const,
            detail: "Live market intelligence from the configured endpoint is being used.",
          },
        ],
        opportunities,
      },
      rawPayload: (payload ?? { empty: true }) as Prisma.InputJsonValue,
    };
  } catch (error) {
    return {
      data: {
        asOf: new Date().toISOString(),
        summary: "Real Estate API request failed. Scout is falling back to local heuristics for now.",
        sourceStatus: [
          {
            name: "RealEstateAPI",
            status: "error" as const,
            detail: error instanceof Error ? error.message : "Unknown error",
          },
        ],
        opportunities: fallbackOpportunities(),
      },
      rawPayload: { fallback: true, reason: error instanceof Error ? error.message : "unknown" },
    };
  }
}

export async function refreshRealEstateMarketIntelligence(): Promise<RealEstateMarketIntelligence> {
  const computed = await computeRealEstateMarketIntelligence();

  try {
    await prisma.realEstateSnapshot.create({
      data: {
        summary: computed.data.summary,
        sourceStatus: computed.data.sourceStatus as unknown as Prisma.InputJsonValue,
        opportunities: computed.data.opportunities as unknown as Prisma.InputJsonValue,
        rawPayload: computed.rawPayload,
      },
    });
  } catch {
    // Keep serving live/fallback intelligence when persistence is unavailable.
  }

  return computed.data;
}

export async function getLatestRealEstateMarketIntelligence(): Promise<RealEstateMarketIntelligence | null> {
  try {
    const row = await prisma.realEstateSnapshot.findFirst({
      orderBy: { snapshotAt: "desc" },
    });

    if (!row) {
      return null;
    }

    return {
      asOf: row.snapshotAt.toISOString(),
      summary: row.summary,
      sourceStatus: sourceStatusFromUnknown(row.sourceStatus),
      opportunities: opportunitiesFromUnknown(row.opportunities),
    };
  } catch {
    return null;
  }
}

export async function getRealEstateMarketIntelligence(): Promise<RealEstateMarketIntelligence> {
  const staleMs = getSnapshotStaleMs();
  const latest = await getLatestRealEstateMarketIntelligence();

  if (latest) {
    const isStale = Date.now() - new Date(latest.asOf).getTime() > staleMs;
    if (!isStale) {
      return latest;
    }

    const refreshed = await refreshRealEstateMarketIntelligence();
    const refreshError = refreshed.sourceStatus.some((status) => status.status === "error");
    if (!refreshError) {
      return refreshed;
    }

    return {
      ...latest,
      summary: `${latest.summary} (using last persisted snapshot while live refresh recovers)`,
    };
  }

  return refreshRealEstateMarketIntelligence();
}
