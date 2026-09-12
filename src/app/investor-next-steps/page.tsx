import Link from "next/link";
import { InvestorInterestForm } from "@/components/investor-interest-form";
import { NavShell } from "@/components/nav-shell";

const reasonsToInvest = [
  "A live product, not a concept. The core MVP is roughly 85% complete, beta launched December 2025, and early subscribers are onboard.",
  "Real-time prevention, not after-the-fact flagging. AI Sentinel is designed to address toxicity, grooming, and predatory contact across chat, voice, and gameplay, backed by human review.",
  "A category incumbents are structurally unsuited to enter. Virtue Reality is built for players and families, not only publishers.",
  "100% organic referral in beta. 58 of 58 beta families referred a friend.",
  "Distribution is already warm through gaming creators and school-district conversations.",
  "Culture as a moat. CYHOP fuses hip-hop culture and advanced technology as operational DNA for authentic community trust.",
];

const useOfFunds = [
  ["Engineering & product", "50%", "$617,500"],
  ["Marketing & growth", "30%", "$370,500"],
  ["Legal & compliance", "12%", "$148,200"],
  ["Operations", "8%", "$98,800"],
];

const roadmap = [
  ["October 2026 · Month 1", "CYHOP public release", "Guardian dashboard general availability and real-time AI moderation."],
  ["November 2026 · Month 2", "Creator activation & referral engine", "Activate committed gaming creators and instrument parent referrals."],
  ["December 2026 · Month 3", "Guild tournaments & broadcast", "Community events and in-guild streaming move out of beta."],
  ["Q1 2027 · Months 4–6", "Scale, security and the first public safety report", "Load testing, COPPA/GDPR audits, mobile parity, and validated safety metrics."],
  ["Q2 2027 · Months 7–9", "Schools and districts", "Convert district conversations into paid pilots and ship the enterprise tier."],
  ["Q3 2027 · Months 10–12", "Publisher API and the path to Series A", "Open the publisher API and package traction, safety metrics, and unit economics."],
];

const risks = [
  "Total loss of investment. Early-stage companies fail and investors could lose the entire amount invested.",
  "Illiquidity. Reg CF securities generally cannot be resold for one year and may never have a market afterward.",
  "Undercapitalisation. A partial raise may not fund the full roadmap.",
  "Competition. Well-funded incumbents hold distribution advantages today.",
  "Regulatory change may impose parental-verification requirements or restrict the addressable user base.",
  "Execution and platform risk. Adoption, scale, moderation quality, and creator-channel performance remain unproven at production volume.",
  "Dilution. A SAFE converts only upon certain future events and later rounds may dilute the resulting position.",
];

export default function InvestorNextStepsPage() {
  return (
    <NavShell>
      <div className="mb-6">
        <h1 className="text-4xl font-semibold tracking-tight text-[#d77bff] sm:text-5xl">THE OFFERING</h1>
      </div>

      <div className="space-y-10">
        <section className="rounded-[30px] border border-[#d77bff]/40 bg-[radial-gradient(circle_at_top,_rgba(217,70,239,0.28),transparent_45%),linear-gradient(180deg,#070816,#121229)] p-6 text-white shadow-[0_28px_80px_rgba(2,6,23,0.45)] md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Regulation Crowdfunding · Virtue Reality Media</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            <div>
              <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">Every kid deserves to play without fear.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-purple-100">
                Virtue Reality builds the first AI safety layer made for live gameplay. CYHOP is the culture it lives through.
              </p>
            </div>
            <aside className="rounded-2xl border border-purple-200/20 bg-white p-5 text-slate-900 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-700">The offering</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <dt className="text-slate-500">Security type</dt><dd className="text-right font-bold">SAFE</dd>
                <dt className="text-slate-500">Valuation cap</dt><dd className="text-right font-bold">$9,000,000</dd>
                <dt className="text-slate-500">Minimum investment</dt><dd className="text-right font-bold">$100</dd>
                <dt className="text-slate-500">Target raise</dt><dd className="text-right font-bold">$150,000</dd>
                <dt className="text-slate-500">Maximum raise</dt><dd className="text-right font-bold">$1,235,000</dd>
                <dt className="text-slate-500">Platform</dt><dd className="text-right font-bold">Wefunder</dd>
              </dl>
            </aside>
          </div>
        </section>

        <div className="rounded-xl border border-amber-300/50 bg-amber-100/10 p-4 text-sm leading-6 text-amber-100">
          <strong>PRE-FILING / TESTING-THE-WATERS DRAFT — NOT AN OFFER.</strong> No money or other consideration is being solicited. No offer to buy securities can be accepted until a Form C is filed with the SEC and then only through an SEC-registered intermediary platform. A prospective purchaser&apos;s indication of interest creates no obligation or commitment.
        </div>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Reasons to invest</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">What&apos;s available</h2>
          <ul className="mt-5 space-y-4 text-base leading-7 text-slate-200">
            {reasonsToInvest.map((reason) => <li key={reason} className="flex gap-3"><span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-fuchsia-400" /><span>{reason}</span></li>)}
          </ul>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">01 · The problem</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Roughly 95% of the gaming world lacks real-time protection.</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">Children play in unmoderated worlds where toxicity, predation, and harassment unfold in real time. Where protections exist, they are often partial, reactive, or inconsistently enforced.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><strong className="text-3xl text-fuchsia-400">81%</strong><p className="mt-2 text-sm text-slate-300">of minors experience toxicity, harassment, or abuse while gaming.</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><strong className="text-3xl text-violet-400">4×</strong><p className="mt-2 text-sm text-slate-300">higher rate of suicidal ideation and attempts among cyberbullied youth.</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><strong className="text-3xl text-cyan-300">+158%</strong><p className="mt-2 text-sm text-slate-300">one-year rise in online-enticement reports against children.</p></div>
          </div>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">02 · The solution</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Two always-on layers, plus a human at the edge.</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-white/10 text-cyan-200"><tr><th className="p-4">Layer</th><th className="p-4">What it does</th><th className="p-4">Status</th></tr></thead><tbody className="text-slate-300"><tr className="border-t border-white/10"><td className="p-4 font-semibold text-white">AI Sentinel</td><td className="p-4">Real-time detection and mitigation across chat, voice, and gameplay.</td><td className="p-4 text-green-300">Live</td></tr><tr className="border-t border-white/10"><td className="p-4 font-semibold text-white">The Guardian</td><td className="p-4">Parent oversight, alerts, escalation, and reporting dashboard.</td><td className="p-4 text-amber-300">In build</td></tr><tr className="border-t border-white/10"><td className="p-4 font-semibold text-white">Human-in-the-loop</td><td className="p-4">Compassionate review of edge cases and moderator workflows.</td><td className="p-4 text-green-300">Live</td></tr></tbody></table>
          </div>
          <p className="mt-4 text-base leading-7 text-slate-300">Virtue Reality is the foundation; CYHOP is the culture it lives through. The product principle is <strong className="text-white">radical transparency</strong>: parents see what the system sees.</p>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">03 · Market &amp; business model</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">A moral crisis attached to a trillion-dollar industry.</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {["$28.3B|TAM — U.S. gamers × $120/yr protection subscription", "$6.0B|SAM — ~50M U.S. minors exposed to toxicity", "$780M|SOM — modeled 3-year obtainable market"].map((stat) => { const [value, label] = stat.split("|"); return <div key={value} className="rounded-2xl border border-white/10 bg-white/5 p-5"><strong className="text-3xl text-fuchsia-400">{value}</strong><p className="mt-2 text-sm text-slate-300">{label}</p></div>; })}
          </div>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">05 · The raise</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">What we&apos;re raising, and why the number is what it is.</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">The full round is <strong className="text-white">$1,600,000</strong> at a <strong className="text-white">$9,000,000</strong> valuation cap. The Reg CF portion runs on Wefunder, with a minimum of <strong className="text-white">$150,000</strong>, a maximum of <strong className="text-white">$1,235,000</strong>, and a deadline of February 28, 2027.</p>
          <div className="mt-5 rounded-2xl border border-amber-300/40 bg-amber-100/10 p-5 text-sm leading-7 text-amber-100"><strong>Why $1,235,000.</strong> The Reg CF ceiling reflects the first-time-issuer financial-statement exception described in the supplied draft. Confirm current thresholds with securities counsel and the platform before filing.</div>
          <h3 className="mt-8 text-xl font-bold text-white">Use of funds</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{useOfFunds.map(([name, share, amount]) => <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-4"><strong className="text-xl text-fuchsia-400">{share}</strong><p className="mt-2 font-semibold text-white">{name}</p><p className="text-sm text-slate-400">{amount}</p></div>)}</div>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">06 · Product roadmap</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Twelve months, starting October 2026.</h2>
          <div className="mt-5 space-y-4">{roadmap.map(([when, title, copy]) => <article key={when} className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">{when}</p><h3 className="mt-2 text-xl font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-300">{copy}</p></article>)}</div>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">08 · The team</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">By gamers, for gamers.</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-white/10 bg-white/5 p-5"><h3 className="text-xl font-semibold text-white">Valen Devon Valdorian</h3><p className="mt-2 text-sm text-slate-300">Founder &amp; CEO. The public voice of CYHOP and a culture carrier across gaming.</p></article><article className="rounded-2xl border border-white/10 bg-white/5 p-5"><h3 className="text-xl font-semibold text-white">Joshua Owens</h3><p className="mt-2 text-sm text-slate-300">President &amp; CTO. Built the CYHOP platform end to end across real-time moderation, chat, voice, and gameplay.</p></article></div>
        </section>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">09 · Risks</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">What could go wrong.</h2>
          <ul className="mt-5 space-y-3 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/5 p-5 text-sm leading-7 text-slate-300">{risks.map((risk) => <li key={risk} className="flex gap-3"><span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-fuchsia-400" /><span>{risk}</span></li>)}</ul>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-white/10 bg-white p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-obsidian/60">Non-binding only</p><h2 className="mt-2 text-2xl font-semibold text-obsidian">Stay close to the launch</h2><p className="mt-4 text-sm leading-7 text-obsidian/80">Receive updates about launch timing, community events, and the future intermediary-hosted offering page. No money is being solicited and no investment commitment is accepted here.</p><div className="mt-5"><InvestorInterestForm page="/investor-next-steps" source="investor-next-steps" /></div></article>
          <article className="rounded-2xl border border-white/10 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold text-obsidian">Live offering handoff</h2><ul className="mt-4 space-y-3 text-sm text-obsidian/80"><li>Publish the intermediary link only after counsel and platform approval.</li><li>Keep notice language within the approved compliance boundary.</li><li>Direct investors to the intermediary for official disclosures and commitments.</li></ul><div className="mt-5"><Link href="/compliance" className="text-sm font-semibold text-ivy">Review compliance before enabling the live CTA</Link></div></article>
        </section>
      </div>
    </NavShell>
  );
}