import Image from "next/image";
import Link from "next/link";
import { NavShell } from "@/components/nav-shell";
import { OverviewSizzleVideo } from "@/components/overview-sizzle-video";
import { faqItems } from "@/lib/investor-content";

const howItWorks = [
  {
    step: "01",
    title: "The Mission",
    detail:
      "CYHOP begins with a simple but urgent idea: digital experiences should be safer, healthier, and more intentional. Virtue Reality is building the infrastructure and culture to make online participation more trustworthy, transparent, and community-centered. This mission reaches beyond gaming into social platforms, creator economies, education, and digital commerce.",
  },
  {
    step: "02",
    title: "The Movement",
    detail:
      "The movement is built by people who believe the next generation of digital culture should be designed with values, not just engagement metrics. CYHOP is not just a product; it is a community-driven effort to create a better digital environment where participation is more meaningful and accountability is built in. This social momentum matters across gaming and adjacent digital ecosystems.",
  },
  {
    step: "03",
    title: "The Disclosure",
    detail:
      "To turn story into trust, CYHOP must be transparent about what it is, what it is not, and how the offering works. The disclosure phase is where mission becomes integrity: clear information, investor education, legal compliance, and a disciplined path to capital. Credibility is a competitive advantage in gaming and beyond.",
  },
  {
    step: "04",
    title: "The Commitment",
    detail:
      "The final step is action. If the offering is live, participation happens through the regulated intermediary—not on this issuer-owned site. This is where the mission becomes a disciplined investment path: informed participation, compliance-first execution, and a clear handoff to the proper financial channel. It connects the story to responsible capital formation and broad digital trust.",
  },
];

export default function HomePage() {
  return (
    <NavShell>
      <div className="mb-6">
        <h1 className="text-4xl font-semibold tracking-tight text-[#d77bff] sm:text-5xl">OVERVIEW</h1>
      </div>

      <div className="mb-8 overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/60 shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
        <OverviewSizzleVideo src="/media/VR SIZZLE-2025.mp4" />
      </div>

      <section
        className="overflow-hidden rounded-[32px] border border-cyan-400/15 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,rgba(7,14,27,0.98),rgba(3,6,12,0.98))] p-8 text-white shadow-[0_32px_90px_rgba(0,0,0,0.4)] lg:p-12"
        id="overview"
      >
        <div className="-mx-4 -mt-4 grid gap-8 bg-[#10051f] px-4 py-10 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10 lg:px-10">
          <div className="max-w-xl">
            <p className="text-lg font-bold uppercase tracking-[0.08em] text-[#d946ef] sm:text-xl">Virtue Reality</p>
            <h2 className="mt-6 max-w-[12ch] text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl">
              The Game Changed. We Are Changing It Back.
            </h2>
            <p className="mt-8 max-w-md text-2xl leading-tight text-purple-100 sm:text-3xl">
              We&apos;re building the first platform agnostic AI safety layer for gaming.
            </p>
            <p className="mt-12 max-w-lg text-xl font-bold leading-tight text-white sm:text-2xl">
              Protecting children, families, gamers, creators, and businesses with governed AI.
            </p>
          </div>

          <div className="relative aspect-[1068/1023] overflow-hidden rounded-[26px] border border-fuchsia-500/70">
            <Image
              alt="Virtue Reality governed AI gaming safety visual"
              className="object-cover"
              fill
              priority
              src="/images/VR Overview visual.jpg"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>

        <div className="mt-6 mb-8 grid w-full gap-3 sm:grid-cols-3" aria-label="Virtue Reality focus areas">
          <div className="flex min-h-12 items-center justify-center rounded-2xl bg-[#7025b6] px-4 py-3 text-center text-sm font-bold uppercase text-white shadow-[0_8px_20px_rgba(112,37,182,0.25)]">
            TrustTech
          </div>
          <div className="flex min-h-12 items-center justify-center rounded-2xl bg-[#c43bd1] px-4 py-3 text-center text-sm font-bold uppercase text-white shadow-[0_8px_20px_rgba(196,59,209,0.25)]">
            Safe Gaming
          </div>
          <div className="flex min-h-12 items-center justify-center rounded-2xl bg-[#2ba8df] px-4 py-3 text-center text-sm font-bold uppercase text-white shadow-[0_8px_20px_rgba(43,168,223,0.25)]">
            Private AI
          </div>
        </div>

        <div className="max-w-5xl px-1 text-white" aria-labelledby="personal-urgent-heading">
          <h2 id="personal-urgent-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            This Is Personal. This Is Urgent.
          </h2>
          <div className="mt-3 space-y-2 text-xl leading-relaxed sm:text-2xl">
            <p>
              Every day we wait, millions of children are subjected to experiences no parent would knowingly allow. Every
              hour without intervention, someone&apos;s child is being targeted, harassed, or traumatized in ways that will
              echo for years.
            </p>
            <p>
              Virtue Reality isn&apos;t just a product. It&apos;s a movement to reclaim cyberspace as a place of joy, creativity,
              and genuine connection.
            </p>
            <p>We&apos;re currently in beta testing. Our AI is learning. Our community is growing. Our mission is clear.</p>
          </div>
        </div>
      </section>

      <section className="mt-12" id="overview-2"></section>

      <section className="mt-12" id="about-2"></section>

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
          <Link href="/investor-next-steps" className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white">
            Continue to offering
          </Link>
        </div>
      </section>
    </NavShell>
  );
}
