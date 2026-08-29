import { NavShell } from "@/components/nav-shell";

const prompts = [
  "Write a mission-first homepage hero for CYHOP / Virtue Reality.",
  "Summarize the launch path in plain English for first-time investors.",
  "Draft a compliance-safe CTA that sends investors to the regulated intermediary.",
  "Turn the product story into a concise FAQ entry with balanced risk language.",
];

export default function ContentStudioPage() {
  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Content Studio</h1>
      <p className="mt-3 text-obsidian/75">
        Draft investor-site copy, launch announcements, and compliance-safe follow-up content with a review-first workflow.
      </p>

      <section className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Manual Content Controls</h2>
        <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
          <li>Mission, product, team, and FAQ page drafting.</li>
          <li>Non-binding interest capture copy and event invites.</li>
          <li>Launch announcements with intermediary handoff language.</li>
          <li>Revision history, approval, and publish queue controls.</li>
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Connected API Surface</h2>
        <p className="mt-3 text-sm text-obsidian/80">
          Use POST /api/content/generate to produce structured draft content for the site and launch workflow.
        </p>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Suggested prompt starters</h2>
        <div className="mt-4 space-y-3">
          {prompts.map((prompt) => (
            <article key={prompt} className="rounded-lg border border-black/10 p-4">
              <p className="text-sm text-obsidian/80">{prompt}</p>
            </article>
          ))}
        </div>
      </section>
    </NavShell>
  );
}