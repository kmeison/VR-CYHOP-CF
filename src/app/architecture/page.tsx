import { NavShell } from "@/components/nav-shell";

const architecture = [
  {
    title: "Layer 1 — CYHOP / Virtue Reality brand site",
    items: [
      "Mission, product story, founder narrative, and proof points.",
      "Non-binding interest capture and newsletter signup.",
      "Investor education content that is clearly not the transaction system.",
    ],
  },
  {
    title: "Layer 2 — Compliance boundary",
    items: [
      "Counsel-approved claims and legends.",
      "Rule 204-safe external notices and campaign language.",
      "All investment CTAs routed away from issuer checkout.",
    ],
  },
  {
    title: "Layer 3 — Regulated intermediary",
    items: [
      "Form C hosting and official disclosures.",
      "Investor acknowledgements, education, and eligibility checks.",
      "Commitments, funds flow, confirmations, and public Q&A.",
    ],
  },
];

export default function ArchitecturePage() {
  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Reference Architecture</h1>
      <p className="mt-3 max-w-3xl text-obsidian/75">
        This site is designed as an owned brand experience in front of a regulated Reg CF handoff, not as a self-hosted
        securities portal.
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {architecture.map((layer) => (
          <article key={layer.title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{layer.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
              {layer.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ivy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Content boundary rules</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-cloud/60 p-4">
            <h3 className="font-semibold">Allowed on the issuer site</h3>
            <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
              <li>Mission, product, team, and risk context.</li>
              <li>Non-binding signup and event registration.</li>
              <li>Education that points to the intermediary for the official offering.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 bg-cloud/60 p-4">
            <h3 className="font-semibold">Keep on the intermediary platform</h3>
            <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
              <li>Official terms, commitments, and confirmations.</li>
              <li>Investor questionnaires and education acknowledgements.</li>
              <li>Funds handling and official public offering Q&A.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Implementation surfaces</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-black/10 p-4">
            <h3 className="font-semibold">Home</h3>
            <p className="mt-1 text-sm text-obsidian/75">The investor-facing front door and narrative hub.</p>
          </article>
          <article className="rounded-xl border border-black/10 p-4">
            <h3 className="font-semibold">Launch Path</h3>
            <p className="mt-1 text-sm text-obsidian/75">Milestones for selecting the intermediary and publishing the campaign.</p>
          </article>
          <article className="rounded-xl border border-black/10 p-4">
            <h3 className="font-semibold">Compliance</h3>
            <p className="mt-1 text-sm text-obsidian/75">The guardrails, do/don't rules, and approval gate for public content.</p>
          </article>
          <article className="rounded-xl border border-black/10 p-4">
            <h3 className="font-semibold">Operator Tools</h3>
            <p className="mt-1 text-sm text-obsidian/75">Back-office surfaces that can remain for the internal team while the investor site goes live.</p>
          </article>
        </div>
      </section>
    </NavShell>
  );
}
