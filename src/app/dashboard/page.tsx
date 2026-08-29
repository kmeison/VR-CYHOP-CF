import Link from "next/link";
import { NavShell } from "@/components/nav-shell";
import { StatCard } from "@/components/stat-card";
import { prisma } from "@/server/db";
import { getOrCreateDefaultOrganizationId } from "@/server/organization";
import { getMarketingCalendarEvents } from "@/lib/marketing-calendar";

export default async function DashboardPage() {
  let activeCampaigns = 0;
  let newLeads7d = 0;
  let listedProperties = 0;

  try {
    const organizationId = await getOrCreateDefaultOrganizationId();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [activeCampaignCount, newLeadsCount, propertyCount] = await Promise.all([
      prisma.campaign.count({ where: { organizationId, status: "active" } }),
      prisma.lead.count({ where: { organizationId, createdAt: { gte: sevenDaysAgo } } }),
      prisma.property.count({ where: { organizationId } }),
    ]);

    activeCampaigns = activeCampaignCount;
    newLeads7d = newLeadsCount;
    listedProperties = propertyCount;
  } catch {
    // Keep zero fallback if database is unavailable.
  }

  const upcomingEvents = getMarketingCalendarEvents(30).slice(0, 4);

  return (
    <NavShell>
      <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
      <p className="mb-6 text-sm text-obsidian/70">
        Command center for manual execution and Agent CMO orchestration.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active Campaigns" value={`${activeCampaigns}`} hint="Live count from campaign pipeline" />
        <StatCard label="New Leads (7d)" value={`${newLeads7d}`} hint="Rolling seven-day intake" />
        <StatCard label="Listings Marketed" value={`${listedProperties}`} hint="Current properties in organization" />
      </div>

      <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Upcoming Marketing Calendar Items (30 Days)</h2>
        <div className="mt-4 space-y-3">
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-obsidian/70">No upcoming items yet.</p>
          ) : (
            upcomingEvents.map((event) => (
              <article key={`${event.slug}-${event.startsOn}`} className="rounded-lg border border-black/10 p-4">
                <p className="text-xs uppercase tracking-wide text-obsidian/60">
                  {event.startsOn} • {event.weekLabel}
                </p>
                <h3 className="mt-1 font-semibold">{event.title}</h3>
                <p className="mt-1 text-sm text-obsidian/75">{event.targetOutcome}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Manual Work Controls</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-black/10 p-4">
            <h3 className="font-semibold">Dashboard Filters</h3>
            <p className="mt-1 text-sm text-obsidian/70">Date range, market, channel, and team filters.</p>
          </div>
          <div className="rounded-lg border border-black/10 p-4">
            <h3 className="font-semibold">Leads Workspace</h3>
            <p className="mt-1 text-sm text-obsidian/70">Manual intake, stage updates, follow-up tasks, and bulk actions.</p>
          </div>
          <div className="rounded-lg border border-black/10 p-4">
            <h3 className="font-semibold">Campaign Builder</h3>
            <p className="mt-1 text-sm text-obsidian/70">Create, budget, schedule, pause, and launch by channel.</p>
          </div>
          <div className="rounded-lg border border-black/10 p-4">
            <h3 className="font-semibold">Content Studio</h3>
            <p className="mt-1 text-sm text-obsidian/70">Manual prompts, tone controls, regenerate, and publish queue.</p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Agent CMO Controls</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-black/10 p-4">
            <h3 className="font-semibold">Strategy</h3>
            <p className="mt-1 text-sm text-obsidian/70">Goal, budget envelope, risk profile, and planning horizon.</p>
          </div>
          <div className="rounded-lg border border-black/10 p-4">
            <h3 className="font-semibold">Run + Guardrails</h3>
            <p className="mt-1 text-sm text-obsidian/70">Plan-only, execute-approved, spending caps, and approval gates.</p>
          </div>
          <div className="rounded-lg border border-black/10 p-4">
            <h3 className="font-semibold">Task Board</h3>
            <p className="mt-1 text-sm text-obsidian/70">Review recommendations, accept/edit/reject, and set priority.</p>
          </div>
          <div className="rounded-lg border border-black/10 p-4">
            <h3 className="font-semibold">Feedback + Transparency</h3>
            <p className="mt-1 text-sm text-obsidian/70">Outcome tracking, confidence, data sources, and action logs.</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/marketing-calendar" className="rounded-lg border border-black/15 px-4 py-2 text-sm font-semibold">
            Open Marketing Calendar
          </Link>
          <Link href="/agent-cmo" className="rounded-lg bg-obsidian px-4 py-2 text-sm font-semibold text-white">
            Open Agent CMO
          </Link>
          <Link href="/predictive-scout" className="rounded-lg border border-black/15 px-4 py-2 text-sm font-semibold">
            Open Predictive Scout
          </Link>
          <Link href="/predictive-scout" className="rounded-lg border border-amber-400 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">
            Quick Scout: Bay Area
          </Link>
        </div>
      </section>
    </NavShell>
  );
}
