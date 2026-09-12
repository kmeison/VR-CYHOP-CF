import Link from "next/link";
import { InvestorInterestForm } from "@/components/investor-interest-form";
import { NavShell } from "@/components/nav-shell";

export default function OfferingPage() {
  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Offering Readiness</h1>
      <p className="mt-3 max-w-3xl text-obsidian/75">
        This is the pre-offering handoff page for non-binding interest capture and intermediary routing once the live
        Reg CF page is ready.
      </p>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-obsidian/60">Non-binding only</p>
          <h2 className="mt-2 text-2xl font-semibold">Stay close to the launch</h2>
          <p className="mt-4 text-sm leading-7 text-obsidian/80">
            Use this form to receive updates about launch timing, community events, and the future intermediary-hosted
            offering page. No money is being solicited and no investment commitment is accepted here.
          </p>
          <div className="mt-5">
            <InvestorInterestForm page="/offering" source="offering-page" />
          </div>
        </article>

        <article className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Live offering handoff</h2>
          <ul className="mt-4 space-y-3 text-sm text-obsidian/80">
            <li>Publish the intermediary link only after counsel and platform approval.</li>
            <li>Keep any external notice language within the approved compliance boundary.</li>
            <li>Direct investors to the intermediary for official disclosures, education, and commitments.</li>
          </ul>
          <div className="mt-5 rounded-xl border border-dashed border-black/20 bg-cloud/60 p-4">
            <p className="text-sm font-medium text-obsidian">Intermediary CTA placeholder</p>
            <p className="mt-2 text-sm text-obsidian/70">
              Replace this block with the approved broker-dealer or funding-portal offering URL when live.
            </p>
          </div>
          <div className="mt-5">
            <Link href="/compliance" className="text-sm font-semibold text-ivy">
              Review compliance before enabling the live CTA
            </Link>
          </div>
        </article>
      </section>
    </NavShell>
  );
}
