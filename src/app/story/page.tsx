import Image from "next/image";
import Link from "next/link";
import { NavShell } from "@/components/nav-shell";
import { soundtrack, storyAssets, storyDeckSlides } from "@/lib/investor-content";

export default function StoryPage() {
  return (
    <NavShell>
      <section className="rounded-[28px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),transparent_32%),rgba(8,13,20,0.9)] p-6 shadow-[0_30px_80px_rgba(3,7,18,0.55)] lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Mission layer</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">From team to story. From story to opportunity.</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
          This is the transition point where the company moves from leadership credibility into the deeper narrative: why the
          brand exists, why the market matters now, and why this mission can attract aligned community and capital.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900 shadow-[0_25px_60px_rgba(15,23,42,0.5)]">
          <Image
            alt="Virtue Reality and CYHOP scroll artwork"
            className="h-full w-full object-cover"
            height={1024}
            priority
            src="/images/virtue-reality-cyhop-scroll.jpg"
            width={768}
          />
        </div>

        <article className="rounded-[24px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.5)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Why this matters</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">More than a corporation. A shared mission.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The artwork positions Virtue Reality as the technology company and CYHOP as the movement that gives the work a
            culture, community, and human purpose. Together they frame the story around trust, safety, and opportunity in a
            rapidly changing digital world.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            In this section, the project shifts from operational credibility into the emotional and strategic case for the
            brand: the problem it is addressing, the timing of the moment, and the mission-driven energy behind the work.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Purpose</p>
              <p className="mt-2 text-sm font-medium text-white">Safer digital trust</p>
            </div>
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Identity</p>
              <p className="mt-2 text-sm font-medium text-white">Brand + movement</p>
            </div>
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Timing</p>
              <p className="mt-2 text-sm font-medium text-white">A critical market moment</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm"
              href="/docs/virtue-reality-cyhop-investor-manifesto.pdf"
              target="_blank"
            >
              Open presentation
            </Link>
            <Link
              className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white"
              href="/docs/virtue-reality-cyhop-investor-manifesto.pdf"
              target="_blank"
            >
              Open manifesto PDF
            </Link>
            <Link href="/faq" className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white">
              Continue to FAQ
            </Link>
          </div>
        </article>
      </section>

      <section className="mt-8 overflow-hidden rounded-[28px] border border-cyan-400/20 bg-slate-950/70 shadow-[0_25px_60px_rgba(15,23,42,0.45)]">
        <div className="flex flex-col gap-3 border-b border-white/10 bg-slate-900/80 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-300">Investor deck</p>
            <h2 className="mt-1 text-2xl font-semibold text-white md:text-3xl">Story presentation</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Deck</span>
            <span className="text-cyan-300">01</span>
            <span className="text-slate-500">/</span>
            <span>{storyDeckSlides.length}</span>
          </div>
        </div>

        <div className="grid gap-4 p-4 lg:grid-cols-2 lg:p-5">
          {storyDeckSlides.map((slide) => (
            <article
              key={slide.number}
              className="min-h-[280px] rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(8,13,20,0.94))] p-5 shadow-inner shadow-cyan-500/5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-sm font-bold text-cyan-200">
                    {slide.number}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Slide</span>
                </div>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-500/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  Story
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-white md:text-[2rem]">{slide.title}</h3>
                <p className="mt-2 text-sm font-medium text-cyan-200">{slide.subtitle}</p>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">{slide.description}</p>

              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                {slide.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[24px] border border-white/10 bg-white p-6 text-slate-900 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Story assets</p>
        <h2 className="mt-2 text-2xl font-semibold">The narrative toolkit.</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {storyAssets.map((asset) => (
            <article key={`${asset.title}-${asset.type}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{asset.type}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{asset.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{asset.description}</p>
              <Link className="mt-4 inline-block text-sm font-semibold text-cyan-700" href={asset.href} target="_blank">
                Open asset
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[24px] border border-white/10 bg-slate-900/80 p-6 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Soundtrack</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Math Don&apos;t Lie is the default ambient track.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          It remains the default background audio unless another song or video on the page is actively playing, in which case
          the ambient track pauses automatically and resumes when the user stops interacting with that media.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {soundtrack.map((track) => (
            <article key={track.file} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
              <h3 className="text-lg font-semibold text-white">{track.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{track.description}</p>
              <audio className="mt-4 w-full" controls preload="metadata" src={track.file} />
            </article>
          ))}
        </div>
      </section>
    </NavShell>
  );
}
