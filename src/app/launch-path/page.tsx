import Link from "next/link";
import { NavShell } from "@/components/nav-shell";

const milestones = [
  {
    title: "1. Compliance prep",
    detail:
      "Consolidate the deck, manifesto, and white paper into a claim-checked messaging matrix before any public announcement.",
  },
  {
    title: "2. Intermediary selection",
    detail:
      "Choose the broker-dealer or funding portal that will host the official Reg CF flow, education, and commitments.",
  },
  {
    title: "3. Site launch",
    detail:
      "Publish the branded website with mission, product, team, and non-binding lead capture plus a clear handoff CTA.",
  },
  {
    title: "4. Offering launch",
    detail:
      "Route investors to the intermediary page for Form C, investor acknowledgements, and the official transaction path.",
  },
];

export default function LaunchPathPage() {
  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Launch Path</h1>
      <p className="mt-3 max-w-3xl text-obsidian/75">
        A practical rollout path for getting the investor website live without crossing into regulated portal behavior.
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {milestones.map((milestone) => (
          <article key={milestone.title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{milestone.title}</h2>
            <p className="mt-2 text-sm text-obsidian/75">{milestone.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Suggested launch checklist</h2>
        <ul className="mt-4 space-y-3 text-sm text-obsidian/80">
          <li>Freeze the approved copy set and metadata for every page.</li>
          <li>Prepare the non-binding signup form and route responses into CRM.</li>
          <li>Mark the intermediary CTA as the only place where investment happens.</li>
          <li>Verify every public number against the source-of-truth documents.</li>
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Primary actions after launch</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/compliance" className="rounded-lg border border-black/15 px-4 py-2 text-sm font-semibold">
            Review Compliance
          </Link>
          <Link href="/architecture" className="rounded-lg border border-black/15 px-4 py-2 text-sm font-semibold">
            Review Architecture
          </Link>
          <Link href="/" className="rounded-lg bg-obsidian px-4 py-2 text-sm font-semibold text-white">
            Back to Home
          </Link>
        </div>
      </section>
    </NavShell>
  );
}
