import Image from "next/image";
import Link from "next/link";
import { NavShell } from "@/components/nav-shell";
import { faqItems } from "@/lib/investor-content";

const howItWorks = [
  {
    step: "01",
    title: "The Mission",
    detail: "Understand the CYHOP story: why safer digital experiences matter, how Virtue Reality builds the technology, and why the movement matters now.",
  },
  {
    step: "02",
    title: "The Movement",
    detail: "Follow the community, team, and story layer as the brand builds narrative momentum and keeps investors aligned with the mission.",
  },
  {
    step: "03",
    title: "The Disclosure",
    detail: "Review the formal offering materials, legal disclosures, and regulated intermediary information before making any decision.",
  },
  {
    step: "04",
    title: "The Commitment",
    detail: "If the offering is live, complete the investment through the regulated broker-dealer or funding portal—not on this issuer-owned site.",
  },
];

export default function HomePage() {
  return (
    <NavShell>
      <section
        className="overflow-hidden rounded-[32px] border border-cyan-400/15 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,rgba(7,14,27,0.98),rgba(3,6,12,0.98))] p-8 text-white shadow-[0_32px_90px_rgba(0,0,0,0.4)] lg:p-12"
        id="overview"
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              CYHOP / Virtue Reality
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight lg:text-6xl">
              Building a safer digital future for players, families, and the communities around them.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Virtue Reality is the company. CYHOP is the movement. This site tells the story, frames the opportunity, and
              routes any live investment action to the regulated intermediary.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/offering" className="rounded-lg bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950">
                View Offering Path
              </Link>
              <Link href="#how-it-works" className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                Learn more
              </Link>
              <Link href="/team" className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                Meet the team
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Focus</p>
                <p className="mt-2 text-sm text-slate-200">Safer online experiences</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Model</p>
                <p className="mt-2 text-sm text-slate-200">Brand-led, compliant handoff</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Stage</p>
                <p className="mt-2 text-sm text-slate-200">Launch preparation</p>
              </div>
            </div>
          </div>

          <article className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.45)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">At a glance</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">A premium investor overview.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              The page is structured to feel like a concise Republic-style introduction: one strong narrative, a clean
              handoff, and a clear path to the official offering materials.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-white/50">Mission</p>
                <p className="mt-1 font-medium text-white">Safer digital spaces</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-white/50">Structure</p>
                <p className="mt-1 font-medium text-white">Story first, offering second</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-white/50">Products</p>
                <p className="mt-1 font-semibold text-white">Sentinel, Guardian</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-white/50">Status</p>
                <p className="mt-1 font-semibold text-white">Pre-launch</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-12" id="about">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">About Virtue Reality &amp; CYHOP</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white lg:text-4xl">
          Own the mission: trusted digital experiences for players and families.
        </h2>
        <div className="mt-7 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/40">
            <Image
              alt="Virtue Reality and CYHOP scroll artwork"
              className="h-full w-full object-cover"
              height={1024}
              src="/images/virtue-reality-cyhop-scroll.jpg"
              width={768}
            />
          </div>
          <article className="rounded-[26px] border border-white/10 bg-slate-950/60 p-6 text-white shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
            <p className="text-sm leading-7 text-slate-300">
              Virtue Reality builds the technology. CYHOP gives the work a culture and a public identity. Together they
              align product execution and community momentum around one clear demand: safer online spaces.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>• The Sentinel — AI protection for gamers.</li>
              <li>• The Guardian — tools for parents and families.</li>
              <li>• Tha Hall — community engagement and momentum layer.</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs/virtue-reality-cyhop-investor-manifesto.pdf"
                target="_blank"
                className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Open manifesto
              </Link>
              <Link href="/story" className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white">
                Go to story page
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-12 rounded-[30px] border border-white/10 bg-slate-950/70 p-8 text-white shadow-[0_20px_60px_rgba(2,6,23,0.35)]" id="how-it-works">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">CYHOP path</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">From story to regulated investment.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {howItWorks.map((item) => (
            <article key={item.step} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
              <p className="text-lg font-semibold tracking-[0.2em] text-cyan-200">{item.step}</p>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12" id="faq">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">FAQ</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">The most common questions, answered plainly.</h2>
        <div className="mt-6 grid gap-4">
          {faqItems.slice(0, 4).map((item) => (
            <article key={item.question} className="rounded-[22px] border border-white/10 bg-slate-950/60 p-5 text-white shadow-[0_12px_36px_rgba(2,6,23,0.22)]">
              <h3 className="text-lg font-semibold tracking-tight">{item.question}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{item.answer}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Link href="/faq" className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
            Full FAQ
          </Link>
          <Link href="/offering" className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white">
            Continue to offering
          </Link>
        </div>
      </section>
    </NavShell>
  );
}
