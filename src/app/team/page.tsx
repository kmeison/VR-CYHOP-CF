import Link from "next/link";
import { NavShell } from "@/components/nav-shell";
import { teamMembers } from "@/lib/investor-content";

export default function TeamPage() {
  return (
    <NavShell>
      <section className="rounded-[28px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),transparent_32%),rgba(9,14,22,0.85)] p-6 shadow-[0_30px_80px_rgba(3,7,18,0.55)] lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Leadership</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">The people behind the mission.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              CYHOP and Virtue Reality are rooted in the idea that trust, culture, and digital safety can be built as a
              shared advantage—not treated as afterthoughts.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Investor note</p>
            <p className="mt-3 text-lg leading-8 text-white">
              “The story is not just a product pitch. It is a movement to create a safer digital environment where people,
              communities, and technology work in alignment.”
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {teamMembers.map((member) => (
          <article key={member.name} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">{member.role}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{member.name}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{member.bio}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white p-6 text-slate-900 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Presentation note</p>
        <h2 className="mt-2 text-2xl font-semibold">The story continues with the mission layer.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
          Founder, team, and operating roles should remain aligned with final counsel review, Form C language, and the
          final offering materials before publication.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/story" className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm">
            Continue to Story
          </Link>
          <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900">
            Back to overview
          </Link>
        </div>
      </section>
    </NavShell>
  );
}
