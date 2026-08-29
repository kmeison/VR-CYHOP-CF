import { NavShell } from "@/components/nav-shell";
import { getPredictiveScoutSnapshot } from "@/server/predictive-scout";

export default async function PredictiveScoutPage() {
  const snapshot = await getPredictiveScoutSnapshot();
  const bayAreaUpdatedAt = new Date().toLocaleString();

  const signalStyles: Record<string, string> = {
    "high-buy": "bg-emerald-100 text-emerald-800 border-emerald-200",
    hold: "bg-amber-100 text-amber-800 border-amber-200",
    watch: "bg-rose-100 text-rose-800 border-rose-200",
  };

  const trendTone: Record<string, string> = {
    up: "bg-emerald-100 text-emerald-800 border-emerald-200",
    flat: "bg-amber-100 text-amber-800 border-amber-200",
    down: "bg-rose-100 text-rose-800 border-rose-200",
  };

  const capitalFitStyles: Record<string, string> = {
    high: "bg-emerald-100 text-emerald-800 border-emerald-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    watch: "bg-rose-100 text-rose-800 border-rose-200",
  };

  const sourceStatusStyles: Record<string, string> = {
    connected: "bg-emerald-100 text-emerald-800 border-emerald-200",
    unconfigured: "bg-amber-100 text-amber-800 border-amber-200",
    error: "bg-rose-100 text-rose-800 border-rose-200",
  };

  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Predictive Scout</h1>
      <p className="mt-3 text-obsidian/75">
        Live scout guidance combining your pipeline, campaign cadence, and Bay Area market signals.
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-obsidian/60">Lead-to-Campaign Ratio</p>
          <p className="mt-2 text-2xl font-semibold">{snapshot.leadToCampaignRatio}</p>
        </article>
        <article className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-obsidian/60">Upcoming Events (30d)</p>
          <p className="mt-2 text-2xl font-semibold">{snapshot.upcomingEventsCount}</p>
        </article>
        <article className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-obsidian/60">Properties in Scope</p>
          <p className="mt-2 text-2xl font-semibold">{snapshot.totalProperties}</p>
        </article>
      </section>

      <section className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Bay Area Capital Pulse</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-obsidian/70">
            <span>Last Updated: {bayAreaUpdatedAt}</span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${snapshot.bayArea.stale ? sourceStatusStyles.error : sourceStatusStyles.connected}`}
            >
              {snapshot.bayArea.stale ? "stale" : "live"}
            </span>
            <span>Money Inflow Index: {snapshot.bayArea.moneyInflowIndex}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {snapshot.bayArea.sourceStatus.map((source) => (
            <div className="rounded-lg border border-black/10 px-3 py-2" key={source.name}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold">{source.name}</p>
                <span className={`rounded-full border px-2 py-1 text-xs font-semibold uppercase ${sourceStatusStyles[source.status]}`}>
                  {source.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-obsidian/70">{source.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <article className="rounded-lg border border-black/10 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">Hiring Trend</p>
              <span className={`rounded-full border px-2 py-1 text-xs font-semibold uppercase ${trendTone[snapshot.bayArea.hiringTrend.direction]}`}>
                {snapshot.bayArea.hiringTrend.direction}
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold">{snapshot.bayArea.hiringTrend.score}</p>
            <p className="mt-2 text-sm text-obsidian/75">{snapshot.bayArea.hiringTrend.summary}</p>
          </article>

          <article className="rounded-lg border border-black/10 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">IPO Trend</p>
              <span className={`rounded-full border px-2 py-1 text-xs font-semibold uppercase ${trendTone[snapshot.bayArea.ipoTrend.direction]}`}>
                {snapshot.bayArea.ipoTrend.direction}
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold">{snapshot.bayArea.ipoTrend.score}</p>
            <p className="mt-2 text-sm text-obsidian/75">{snapshot.bayArea.ipoTrend.summary}</p>
          </article>

          <article className="rounded-lg border border-black/10 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">Tech Market Trend</p>
              <span className={`rounded-full border px-2 py-1 text-xs font-semibold uppercase ${trendTone[snapshot.bayArea.techMarketTrend.direction]}`}>
                {snapshot.bayArea.techMarketTrend.direction}
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold">{snapshot.bayArea.techMarketTrend.score}</p>
            <p className="mt-2 text-sm text-obsidian/75">{snapshot.bayArea.techMarketTrend.summary}</p>
          </article>
        </div>

        <div className="mt-5">
          <h3 className="text-base font-semibold">Potential Target Properties (Capital-Weighted)</h3>
          <div className="mt-3 space-y-3">
            {snapshot.bayArea.targetProperties.map((property, index) => (
              <article className="rounded-lg border border-black/10 p-4" key={`${property.title}-${property.address}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">
                    #{index + 1} {property.title}
                  </p>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${capitalFitStyles[property.capitalFit]}`}>
                    {property.capitalFit} fit
                  </span>
                </div>
                <div className="mt-2 grid gap-2 text-sm md:grid-cols-3">
                  <p>{property.address}</p>
                  <p>Target Score: {property.score}</p>
                  <p>Price: ${property.price.toLocaleString()}</p>
                </div>
                <p className="mt-2 text-sm text-obsidian/80">{property.rationale}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Real Estate Opportunity Radar</h2>
          <p className="text-sm text-obsidian/70">{snapshot.marketIntelligence.summary}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {snapshot.marketIntelligence.sourceStatus.map((source) => (
            <div className="rounded-lg border border-black/10 px-3 py-2" key={source.name}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold">{source.name}</p>
                <span className={`rounded-full border px-2 py-1 text-xs font-semibold uppercase ${sourceStatusStyles[source.status]}`}>
                  {source.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-obsidian/70">{source.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {snapshot.marketIntelligence.opportunities.map((opportunity) => (
            <article key={opportunity.market} className="rounded-lg border border-black/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{opportunity.market}</p>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${signalStyles[opportunity.signal]}`}>
                  {opportunity.signal.replace("-", " ")}
                </span>
              </div>
              <div className="mt-2 grid gap-2 text-sm md:grid-cols-4">
                <p>Score: {opportunity.score}</p>
                <p>Price: {opportunity.price != null ? `$${opportunity.price.toLocaleString()}` : "n/a"}</p>
                <p>Price Change: {opportunity.priceChangePct != null ? `${opportunity.priceChangePct}%` : "n/a"}</p>
                <p>Inventory: {opportunity.inventory != null ? opportunity.inventory : "n/a"}</p>
              </div>
              <p className="mt-2 text-sm text-obsidian/80">{opportunity.rationale}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Guidance Feed</h2>
        <div className="mt-3 space-y-3">
          {snapshot.guidance.map((item) => (
            <article key={item.title} className="rounded-lg border border-black/10 p-4">
              <p className="text-xs uppercase tracking-wide text-obsidian/60">Confidence: {item.confidence}</p>
              <h3 className="mt-1 font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-obsidian/80">{item.rationale}</p>
            </article>
          ))}
        </div>
      </section>
    </NavShell>
  );
}
