import { NavShell } from "@/components/nav-shell";
import { ProblemVideo } from "@/components/problem-video";

const problemStats = [
  { value: "3.32B", copy: "website-cited global gamer scale / trajectory", tone: "border-[#d77bff] text-[#d77bff]" },
  { value: "236M", copy: "website-cited U.S. gamers", tone: "border-[#7c4dff] text-[#7c4dff]" },
  { value: "75%", copy: "website-cited U.S. households with a gamer", tone: "border-[#38bdf8] text-[#38bdf8]" },
];

export default function ProblemPage() {
  return (
    <NavShell>
      <div className="mb-6">
        <h1 className="text-4xl font-semibold tracking-tight text-[#d77bff] sm:text-5xl">THE PROBLEM</h1>
      </div>

      <section className="mb-8 overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/60 shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
        <ProblemVideo src="/media/What women gammers go through_v2_DRAFT.mp4" />
      </section>

      <section className="mb-8 max-w-6xl text-white" aria-labelledby="problem-impact-heading">
        <h2 className="mb-6 text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl">
          Parents and Players Are Flying Blind
        </h2>
        <h2 id="problem-impact-heading" className="text-3xl font-bold tracking-tight text-[#d77bff] sm:text-4xl">
          81% of gamers report experiencing toxicity. Nearly a quarter are minors.
        </h2>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-200 sm:text-xl">
          <li className="flex gap-3">
            <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d77bff]" />
            <span>While parents believe their children are safely playing in virtual worlds, the reality is far darker.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d77bff]" />
            <span>
              Without age filters or real-time protection, games have become breeding grounds for trauma, spaces where
              predatory behavior, hate speech, and psychological abuse happen continuously, invisibly, and without
              consequence.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d77bff]" />
            <span>
              We&apos;re not just talking about hurt feelings. We&apos;re talking about lasting psychological harm to a generation
              of 236 million U.S. gamers who deserve better.
            </span>
          </li>
        </ul>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {problemStats.map((stat) => (
            <article key={stat.value} className={`rounded-2xl border-2 bg-[#15102b] p-5 ${stat.tone}`}>
              <p className="text-4xl font-bold tracking-tight sm:text-5xl">{stat.value}</p>
              <p className="mt-2 text-lg leading-7 text-slate-100">{stat.copy}</p>
            </article>
          ))}
        </div>

        <ul className="mt-7 space-y-4 text-lg leading-8 text-slate-200 sm:text-xl">
          <li className="flex gap-3">
            <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d77bff]" />
            <span>Gaming has become one of the world&apos;s largest social environments.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d77bff]" />
            <span>Children and families need visibility across voice, chat, and community spaces.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d77bff]" />
            <span>Most safety tools still react after harm occurs.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d77bff]" />
            <span>Virtue Reality&apos;s wedge: safety by design, not safety as an afterthought.</span>
          </li>
        </ul>
      </section>
    </NavShell>
  );
}