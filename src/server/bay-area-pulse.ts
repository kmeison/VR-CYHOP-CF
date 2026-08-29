import { prisma } from "@/server/db";
import type { Prisma } from "@prisma/client";

type SourceStatus = "connected" | "unconfigured" | "error";

type SourceHealth = {
  name: string;
  status: SourceStatus;
  detail: string;
};

type BayAreaSignalRecord = {
  asOf: string;
  stale: boolean;
  hiringScore: number;
  ipoScore: number;
  techMarketScore: number;
  moneyInflowIndex: number;
  sourceStatus: SourceHealth[];
};

const DEFAULT_SCORES = {
  hiringScore: 72,
  ipoScore: 64,
  techMarketScore: 69,
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function startOfUtcDay(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

async function fetchJsonWithTimeout(url: string, headers?: Record<string, string>) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(url, { headers, signal: controller.signal, cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeToScore(value: number, fallback: number) {
  if (!Number.isFinite(value)) return fallback;
  if (value >= -1 && value <= 1) return clamp((value + 1) * 50, 0, 100);
  if (value >= 0 && value <= 1) return clamp(value * 100, 0, 100);
  if (value >= 0 && value <= 100) return value;
  return clamp(value, 0, 100);
}

function extractNumericSignal(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null;

  const candidates = [
    (payload as { score?: unknown }).score,
    (payload as { value?: unknown }).value,
    (payload as { marketMomentum?: unknown }).marketMomentum,
    (payload as { sentiment?: unknown }).sentiment,
    (payload as { index?: unknown }).index,
    (payload as { data?: { score?: unknown } }).data?.score,
    (payload as { data?: { value?: unknown } }).data?.value,
  ];

  for (const item of candidates) {
    const parsed = Number(item);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

async function fetchScoreFromSource(
  name: string,
  urlEnv: string,
  keyEnv: string,
  fallbackScore: number,
): Promise<{ score: number; health: SourceHealth; raw: Prisma.InputJsonValue }> {
  const endpoint = process.env[urlEnv];
  if (!endpoint) {
    return {
      score: fallbackScore,
      health: {
        name,
        status: "unconfigured",
        detail: `${urlEnv} not set.`,
      },
      raw: { fallback: true },
    };
  }

  const key = process.env[keyEnv];

  try {
    const payload = await fetchJsonWithTimeout(endpoint, key ? { Authorization: `Bearer ${key}` } : undefined);
    const rawValue = extractNumericSignal(payload);
    const score = normalizeToScore(rawValue ?? fallbackScore, fallbackScore);
    return {
      score: Number(score.toFixed(1)),
      health: {
        name,
        status: "connected",
        detail: "Signal fetched from configured source.",
      },
      raw: payload,
    };
  } catch (error) {
    return {
      score: fallbackScore,
      health: {
        name,
        status: "error",
        detail: error instanceof Error ? error.message : "Unknown fetch error",
      },
      raw: { fallback: true },
    };
  }
}

export async function refreshBayAreaDailySignal() {
  const [hiring, ipo, tech] = await Promise.all([
    fetchScoreFromSource("Bay Area Hiring", "BAY_AREA_HIRING_DATA_URL", "BAY_AREA_HIRING_DATA_KEY", DEFAULT_SCORES.hiringScore),
    fetchScoreFromSource("Bay Area IPO", "BAY_AREA_IPO_DATA_URL", "BAY_AREA_IPO_DATA_KEY", DEFAULT_SCORES.ipoScore),
    fetchScoreFromSource(
      "Bay Area Tech Market",
      "BAY_AREA_TECH_MARKET_DATA_URL",
      "BAY_AREA_TECH_MARKET_DATA_KEY",
      DEFAULT_SCORES.techMarketScore,
    ),
  ]);

  const moneyInflowIndex = Number((0.45 * hiring.score + 0.35 * ipo.score + 0.2 * tech.score).toFixed(1));
  const signalDate = startOfUtcDay(new Date());

  const row = await prisma.bayAreaDailySignal.upsert({
    where: { signalDate },
    create: {
      signalDate,
      hiringScore: hiring.score,
      ipoScore: ipo.score,
      techMarketScore: tech.score,
      moneyInflowIndex,
      hiringRaw: hiring.raw,
      ipoRaw: ipo.raw,
      techRaw: tech.raw,
      sourceStatus: [hiring.health, ipo.health, tech.health],
    },
    update: {
      hiringScore: hiring.score,
      ipoScore: ipo.score,
      techMarketScore: tech.score,
      moneyInflowIndex,
      hiringRaw: hiring.raw,
      ipoRaw: ipo.raw,
      techRaw: tech.raw,
      sourceStatus: [hiring.health, ipo.health, tech.health],
    },
  });

  return {
    asOf: row.signalDate.toISOString(),
    hiringScore: row.hiringScore,
    ipoScore: row.ipoScore,
    techMarketScore: row.techMarketScore,
    moneyInflowIndex: row.moneyInflowIndex,
  };
}

export async function getLatestBayAreaDailySignal(): Promise<BayAreaSignalRecord | null> {
  const row = await prisma.bayAreaDailySignal.findFirst({
    orderBy: { signalDate: "desc" },
  });

  if (!row) {
    return null;
  }

  const stale = Date.now() - row.signalDate.getTime() > 2 * ONE_DAY_MS;
  const sourceStatus = Array.isArray(row.sourceStatus) ? (row.sourceStatus as SourceHealth[]) : [];

  return {
    asOf: row.signalDate.toISOString(),
    stale,
    hiringScore: row.hiringScore,
    ipoScore: row.ipoScore,
    techMarketScore: row.techMarketScore,
    moneyInflowIndex: row.moneyInflowIndex,
    sourceStatus,
  };
}

export function getDefaultBayAreaDailySignal(): BayAreaSignalRecord {
  const moneyInflowIndex = Number(
    (0.45 * DEFAULT_SCORES.hiringScore + 0.35 * DEFAULT_SCORES.ipoScore + 0.2 * DEFAULT_SCORES.techMarketScore).toFixed(1),
  );

  return {
    asOf: new Date().toISOString(),
    stale: true,
    hiringScore: DEFAULT_SCORES.hiringScore,
    ipoScore: DEFAULT_SCORES.ipoScore,
    techMarketScore: DEFAULT_SCORES.techMarketScore,
    moneyInflowIndex,
    sourceStatus: [
      { name: "Bay Area Hiring", status: "unconfigured", detail: "BAY_AREA_HIRING_DATA_URL not set." },
      { name: "Bay Area IPO", status: "unconfigured", detail: "BAY_AREA_IPO_DATA_URL not set." },
      { name: "Bay Area Tech Market", status: "unconfigured", detail: "BAY_AREA_TECH_MARKET_DATA_URL not set." },
    ],
  };
}
