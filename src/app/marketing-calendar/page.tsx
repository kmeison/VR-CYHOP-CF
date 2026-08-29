import { NavShell } from "@/components/nav-shell";
import { getMarketingCalendarEvents } from "@/lib/marketing-calendar";

export default function MarketingCalendarPage() {
  const events = getMarketingCalendarEvents(120);
  const grouped = new Map<number, typeof events>();

  for (const event of events) {
    const current = grouped.get(event.cycleNumber) || [];
    current.push(event);
    grouped.set(event.cycleNumber, current);
  }

  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Marketing Calendar</h1>
      <p className="mt-3 text-obsidian/75">Scheduling timeline for the next 120 days using a four-week operating cadence.</p>
      <p className="mt-2 text-sm text-obsidian/70">Cycle 1 anchor: Week 1 starts in the second week of September (Sep 8).</p>

      <section className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Calendar Controls</h2>
        <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
          <li>Week/month timeline views for planned activity.</li>
          <li>Status states: draft, approved, scheduled, and live.</li>
          <li>Drag-and-drop scheduling with manual date/time override.</li>
          <li>Conflict notices for overlapping launches and channel collisions.</li>
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Agent CMO Collaboration</h2>
        <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
          <li>Agent-proposed publishing windows enter approval queue.</li>
          <li>Manual accept, edit, and reject controls for schedule changes.</li>
          <li>Guardrail checks for spend and audience overlap before publish.</li>
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">120-Day Event Plan</h2>
        <div className="mt-4 space-y-4">
          {Array.from(grouped.entries()).map(([cycleNumber, cycleEvents]) => (
            <article className="rounded-lg border border-black/10 p-4" key={cycleNumber}>
              <h3 className="font-semibold">Cycle {cycleNumber} (4 weeks)</h3>
              <div className="mt-3 space-y-3">
                {cycleEvents
                  .sort((a, b) => a.startsOn.localeCompare(b.startsOn))
                  .map((event) => (
                  <div className="rounded-lg border border-black/10 p-3" key={`${event.slug}-${event.startsOn}`}>
                    <p className="text-xs uppercase tracking-wide text-obsidian/60">{event.startsOn}</p>
                    <p className="mt-1 font-semibold">{event.title}</p>
                    <p className="mt-1 text-sm text-obsidian/80">{event.positioning}</p>
                    <p className="mt-1 text-sm text-obsidian/70">Target outcome: {event.targetOutcome}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </NavShell>
  );
}