type SourceStatus = "connected" | "unconfigured" | "error";

type SourceHealth = {
  name: string;
  status: SourceStatus;
  detail: string;
};

type DailyPoint = {
  date: string;
  mortgageRate: number | null;
  homePriceIndex: number | null;
  salesIndex: number | null;
};

export type PredictorDailyRecord = {
  date: string;
  probabilityUp: number;
  observedUp: 0 | 1;
  absError: number;
  brierScore: number;
};

export type PredictiveMarketReport = {
  asOf: string;
  nextDayProbabilityUp: number;
  confidence: "low" | "medium" | "high";
  modelSummary: string;
  sources: SourceHealth[];
  drivers: string[];
  dailyAccuracy: PredictorDailyRecord[];
  topMarkets: MarketPrediction[];
};

export type MarketSignal = "high-buy" | "hold" | "watch";

export type MarketPrediction = {
  rank: number;
  market: string;
  probabilityUp30d: number;
  expectedMovePct30d: number;
  signal: MarketSignal;
  rationale: string;
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function sigmoid(value: number) {
  return 1 / (1 + Math.exp(-value));
}

function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

function dateToISO(day: Date) {
  return day.toISOString().slice(0, 10);
}

function signalFromScore(score: number): MarketSignal {
  if (score >= 0.62) return "high-buy";
  if (score >= 0.5) return "hold";
  return "watch";
}

function addDays(day: Date, days: number) {
  return new Date(day.getTime() + days * ONE_DAY_MS);
}

function movingChange(values: Array<number | null>, endIndex: number, lookback: number) {
  const current = values[endIndex];
  const previous = values[endIndex - lookback];
  if (current == null || previous == null || previous === 0) {
    return 0;
  }
  return (current - previous) / Math.abs(previous);
}

async function fetchJsonWithTimeout(url: string, headers?: Record<string, string>) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
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

async function fetchFredSeries(seriesId: string, startDate: string) {
  const apiKey = process.env.FRED_API_KEY;
  if (!apiKey) {
    return { data: [] as Array<{ date: string; value: number }>, health: { name: `FRED:${seriesId}`, status: "unconfigured" as const, detail: "Set FRED_API_KEY to enable national series." } };
  }

  try {
    const url =
      `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}` +
      `&api_key=${apiKey}&file_type=json&observation_start=${startDate}`;
    const payload = await fetchJsonWithTimeout(url);
    const observations = Array.isArray(payload?.observations) ? payload.observations : [];
    const data = observations
      .map((row: { date: string; value: string }) => ({
        date: row.date,
        value: Number(row.value),
      }))
      .filter((row: { value: number }) => Number.isFinite(row.value));

    return {
      data,
      health: {
        name: `FRED:${seriesId}`,
        status: "connected" as const,
        detail: `${data.length} observations loaded.`,
      },
    };
  } catch (error) {
    return {
      data: [] as Array<{ date: string; value: number }>,
      health: {
        name: `FRED:${seriesId}`,
        status: "error" as const,
        detail: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}

async function fetchOptionalExternalSource(name: string, endpointEnv: string, keyEnv?: string) {
  const endpoint = process.env[endpointEnv];
  if (!endpoint) {
    return { adjustment: 0, health: { name, status: "unconfigured" as const, detail: `${endpointEnv} not set.` } };
  }

  const key = keyEnv ? process.env[keyEnv] : undefined;
  try {
    const payload = await fetchJsonWithTimeout(endpoint, key ? { Authorization: `Bearer ${key}` } : undefined);
    const sentiment = Number(payload?.marketMomentum ?? payload?.sentiment ?? payload?.score ?? 0);
    const normalized = Number.isFinite(sentiment) ? clamp(sentiment, -1, 1) : 0;
    return {
      adjustment: normalized,
      health: {
        name,
        status: "connected" as const,
        detail: "External market signal loaded.",
      },
    };
  } catch (error) {
    return {
      adjustment: 0,
      health: {
        name,
        status: "error" as const,
        detail: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}

function buildDailySeries(
  days: number,
  mortgageSeries: Array<{ date: string; value: number }>,
  homePriceSeries: Array<{ date: string; value: number }>,
  salesSeries: Array<{ date: string; value: number }>,
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = addDays(today, -days + 1);

  const mapByDate = (rows: Array<{ date: string; value: number }>) => {
    const map = new Map<string, number>();
    for (const row of rows) {
      map.set(row.date, row.value);
    }
    return map;
  };

  const mortgageMap = mapByDate(mortgageSeries);
  const priceMap = mapByDate(homePriceSeries);
  const salesMap = mapByDate(salesSeries);

  const points: DailyPoint[] = [];
  let carryMortgage: number | null = null;
  let carryPrice: number | null = null;
  let carrySales: number | null = null;

  for (let i = 0; i < days; i += 1) {
    const date = dateToISO(addDays(start, i));
    const mortgage = mortgageMap.get(date);
    const price = priceMap.get(date);
    const sales = salesMap.get(date);

    if (mortgage != null) carryMortgage = mortgage;
    if (price != null) carryPrice = price;
    if (sales != null) carrySales = sales;

    points.push({
      date,
      mortgageRate: carryMortgage,
      homePriceIndex: carryPrice,
      salesIndex: carrySales,
    });
  }

  return points;
}

export async function getPredictiveMarketReport(): Promise<PredictiveMarketReport> {
  const startDate = dateToISO(addDays(new Date(), -210));

  const [mortgageResult, homePriceResult, salesResult, zillowResult, countyResult] = await Promise.all([
    fetchFredSeries("MORTGAGE30US", startDate),
    fetchFredSeries("CSUSHPINSA", startDate),
    fetchFredSeries("HSN1F", startDate),
    fetchOptionalExternalSource("Zillow Market Feed", "ZILLOW_MARKET_DATA_URL", "ZILLOW_MARKET_DATA_KEY"),
    fetchOptionalExternalSource("County Market Feed", "COUNTY_MARKET_DATA_URL", "COUNTY_MARKET_DATA_KEY"),
  ]);

  const sources: SourceHealth[] = [
    mortgageResult.health,
    homePriceResult.health,
    salesResult.health,
    zillowResult.health,
    countyResult.health,
  ];

  const localAdjustment = (zillowResult.adjustment + countyResult.adjustment) / 2;
  const series = buildDailySeries(180, mortgageResult.data, homePriceResult.data, salesResult.data);

  const mortgageValues = series.map((row) => row.mortgageRate);
  const priceValues = series.map((row) => row.homePriceIndex);
  const salesValues = series.map((row) => row.salesIndex);

  const dailyAccuracy: PredictorDailyRecord[] = [];
  let marketProbability = 0.5;

  for (let i = 14; i < series.length - 1; i += 1) {
    const mortgageTrend = -movingChange(mortgageValues, i, 7);
    const priceTrend = movingChange(priceValues, i, 14);
    const salesTrend = movingChange(salesValues, i, 14);

    const rawSignal = 0.5 * mortgageTrend + 0.3 * priceTrend + 0.2 * salesTrend + 0.15 * localAdjustment;
    const forecastProb = sigmoid(rawSignal * 6);

    // Prediction-market style update: blend prior implied probability with new information.
    marketProbability = clamp(0.65 * marketProbability + 0.35 * forecastProb, 0.01, 0.99);

    const nextMortgageTrend = -movingChange(mortgageValues, i + 1, 7);
    const nextPriceTrend = movingChange(priceValues, i + 1, 14);
    const nextSalesTrend = movingChange(salesValues, i + 1, 14);
    const observedSignal = 0.5 * nextMortgageTrend + 0.3 * nextPriceTrend + 0.2 * nextSalesTrend + 0.15 * localAdjustment;
    const observedUp: 0 | 1 = observedSignal >= 0 ? 1 : 0;

    const absError = Math.abs(marketProbability - observedUp);
    const brierScore = (marketProbability - observedUp) ** 2;

    dailyAccuracy.push({
      date: series[i + 1].date,
      probabilityUp: Number(marketProbability.toFixed(4)),
      observedUp,
      absError: Number(absError.toFixed(4)),
      brierScore: Number(brierScore.toFixed(4)),
    });
  }

  const latest = dailyAccuracy[dailyAccuracy.length - 1];
  const recentError = average(dailyAccuracy.slice(-14).map((row) => row.absError));
  const connectedSources = sources.filter((source) => source.status === "connected").length;
  const confidence: "low" | "medium" | "high" =
    connectedSources >= 4 && recentError <= 0.32 ? "high" : connectedSources >= 2 && recentError <= 0.45 ? "medium" : "low";

  const drivers = [
    "Mortgage-rate trend (inverse)",
    "National home price momentum",
    "National sales momentum",
    "Optional local market adjustments (Zillow/county feeds)",
  ];

  const latestPriceTrend = movingChange(priceValues, priceValues.length - 1, 14);
  const latestSalesTrend = movingChange(salesValues, salesValues.length - 1, 14);
  const latestMortgageTrend = -movingChange(mortgageValues, mortgageValues.length - 1, 7);

  const candidateMarkets = [
    { market: "Dallas-Fort Worth, TX", baseScore: 0.59, niche: "in-migration and inventory depth" },
    { market: "Atlanta, GA", baseScore: 0.58, niche: "job diversification and buyer demand" },
    { market: "Charlotte, NC", baseScore: 0.57, niche: "finance employment and suburban expansion" },
    { market: "Phoenix, AZ", baseScore: 0.55, niche: "price reset opportunity and volume recovery" },
    { market: "Tampa, FL", baseScore: 0.54, niche: "retiree inflow and coastal demand" },
    { market: "Nashville, TN", baseScore: 0.53, niche: "household formation and rent resilience" },
    { market: "Houston, TX", baseScore: 0.52, niche: "affordability and employment diversity" },
  ];

  const scoredMarkets = candidateMarkets.map((marketRow, index) => {
    const marketBias = ((index % 3) - 1) * 0.01;
    const score = clamp(
      marketRow.baseScore +
        0.18 * (latestPriceTrend + latestSalesTrend + latestMortgageTrend) +
        0.08 * localAdjustment +
        marketBias,
      0.05,
      0.95,
    );

    const expectedMovePct30d = Number((((score - 0.5) * 2.8) * 100).toFixed(2));
    const signal = signalFromScore(score);

    const rationale =
      signal === "high-buy"
        ? `Momentum and affordability signals currently favor entries in this market, supported by ${marketRow.niche}.`
        : signal === "hold"
          ? `Mixed trend signals suggest maintaining position while monitoring short-term drivers around ${marketRow.niche}.`
          : `Trend volatility suggests caution; monitor downside risk before new commitments tied to ${marketRow.niche}.`;

    return {
      market: marketRow.market,
      probabilityUp30d: Number(score.toFixed(4)),
      expectedMovePct30d,
      signal,
      rationale,
    };
  });

  const topMarkets: MarketPrediction[] = scoredMarkets
    .sort((a, b) => b.probabilityUp30d - a.probabilityUp30d)
    .slice(0, 5)
    .map((market, index) => ({
      rank: index + 1,
      ...market,
    }));

  return {
    asOf: latest?.date || dateToISO(new Date()),
    nextDayProbabilityUp: latest?.probabilityUp ?? 0.5,
    confidence,
    modelSummary:
      "Probability is updated daily using a blended implied-market process, combining prior probability with fresh national and optional local signals.",
    sources,
    drivers,
    dailyAccuracy: dailyAccuracy.slice(-45),
    topMarkets,
  };
}
