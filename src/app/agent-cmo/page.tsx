import { NavShell } from "@/components/nav-shell";
import { getPredictiveScoutSnapshot } from "@/server/predictive-scout";

export default async function AgentCmoPage() {
  const snapshot = await getPredictiveScoutSnapshot();

  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Agent CMO</h1>
      <p className="mt-3 text-obsidian/75">Autonomy controls for planning, approvals, execution modes, and transparent decision tracking.</p>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Strategy Controls</h2>
          <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
            <li>Primary goal selection (leads, listings, awareness, nurture).</li>
            <li>Budget envelope and channel allocation constraints.</li>
            <li>Risk profile and planning horizon controls.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Run Controls</h2>
          <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
            <li>Run now, pause, resume, and stop agent cycles.</li>
            <li>Modes: plan-only, execute-approved, and auto cadence.</li>
            <li>Daily/weekly autonomous execution cadence.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Approval and Guardrails</h2>
          <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
            <li>Require approvals before send, publish, or budget spend.</li>
            <li>Caps by campaign and by day with channel restrictions.</li>
            <li>Confidence thresholds and excluded audience sets.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Task Board + Feedback</h2>
          <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
            <li>Review recommendations and expected impact.</li>
            <li>Accept, edit, reject, and prioritize each action.</li>
            <li>Track outcomes and tune memory retention behavior.</li>
          </ul>
        </article>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Transparency Panel</h2>
        <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
          <li>Decision rationale and source signals used.</li>
          <li>Confidence score and estimated impact per recommendation.</li>
          <li>Full change log of autonomous actions.</li>
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Live Predictive Snapshot</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <p className="rounded-lg border border-black/10 p-3 text-sm">Leads: {snapshot.totalLeads}</p>
          <p className="rounded-lg border border-black/10 p-3 text-sm">Campaigns: {snapshot.totalCampaigns}</p>
          <p className="rounded-lg border border-black/10 p-3 text-sm">Active Campaigns: {snapshot.activeCampaigns}</p>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-obsidian/80">
          {snapshot.guidance.map((item) => (
            <li key={item.title}>
              <span className="font-semibold">{item.title}:</span> {item.rationale} ({item.confidence})
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">CMO Market Playbook</h2>
        <p className="mt-2 text-sm text-obsidian/75">Recommendations are shaped by the current Bay Area opportunity signals and campaign readiness.</p>
        <div className="mt-4 space-y-3">
          {snapshot.marketIntelligence.opportunities.map((opportunity) => (
            <article key={opportunity.market} className="rounded-lg border border-black/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{opportunity.market}</p>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase text-emerald-700">
                  {opportunity.signal.replace("-", " ")}
                </span>
              </div>
              <p className="mt-2 text-sm text-obsidian/80">{opportunity.rationale}</p>
              <p className="mt-2 text-sm text-obsidian/70">
                Score: {opportunity.score} • Price: {opportunity.price != null ? `$${opportunity.price.toLocaleString()}` : "n/a"} • Inventory: {opportunity.inventory ?? "n/a"}
              </p>
            </article>
          ))}
        </div>
      </section>
    </NavShell>
  );
}