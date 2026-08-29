import Link from "next/link";
import { NavShell } from "@/components/nav-shell";
import { faqItems, riskFactors } from "@/lib/investor-content";

export default function FaqPage() {
  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Investor FAQ and Risks</h1>
      <p className="mt-3 max-w-3xl text-obsidian/75">
        This page answers common questions in plain language while keeping risk reminders visible and balanced.
      </p>

      <section className="mt-6 grid gap-4">
        {faqItems.map((item) => (
          <article key={item.question} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{item.question}</h2>
            <p className="mt-2 text-sm text-obsidian/80">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Key risk reminders</h2>
        <ul className="mt-4 space-y-3 text-sm text-obsidian/80">
          {riskFactors.map((risk) => (
            <li key={risk} className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sun" />
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Reminder</h2>
        <p className="mt-3 text-sm text-obsidian/75">
          This website is part of the education and brand layer. Live offering terms and commitments belong on the
          regulated intermediary platform.
        </p>
        <div className="mt-5">
          <Link href="/offering" className="rounded-lg bg-obsidian px-4 py-2 text-sm font-semibold text-white">
            Continue to Offering
          </Link>
        </div>
      </section>
    </NavShell>
  );
}
