import { NavShell } from "@/components/nav-shell";

const allowed = [
  "Mission and product storytelling.",
  "Non-binding interest capture and event registration.",
  "Counsel-approved investor education that points to the intermediary.",
  "Post-close updates that align with filed disclosures.",
];

const restricted = [
  "Accepting investment commitments on the issuer site.",
  "Hosting official Form C transaction flow or investor questionnaires.",
  "Collecting funds or managing investment-limit checks.",
  "Publishing unverified claims or uncounseled offering language.",
];

export default function CompliancePage() {
  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Compliance Boundaries</h1>
      <p className="mt-3 max-w-3xl text-obsidian/75">
        The issuer site can educate and warm up investors, but the regulated transaction must live on the intermediary
        platform.
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Allowed here</h2>
          <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
            {allowed.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ivy" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Keep off the issuer site</h2>
          <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
            {restricted.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sun" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Release gate</h2>
        <p className="mt-3 text-sm text-obsidian/75">
          No public launch until counsel approves the copy, the intermediary flow is confirmed, and the claims matrix is
          frozen.
        </p>
      </section>
    </NavShell>
  );
}
