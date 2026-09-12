import Image from "next/image";
import Link from "next/link";
import { NavShell } from "@/components/nav-shell";
import { teamMembers } from "@/lib/investor-content";

export default function TeamPage() {
  return (
    <NavShell>
      <div className="mb-6">
        <h1 className="text-4xl font-semibold tracking-tight text-[#d77bff] sm:text-5xl">TEAM</h1>
      </div>

      {/* Full-width hero image at top */}
      <div className="w-full overflow-hidden rounded-none -mx-4 -mt-4">
        <Image
          alt="Virtue Reality and CYHOP leadership artwork"
          className="w-full h-auto object-cover object-center"
          height={800}
          src="/images/leadership.jpg"
          width={1600}
        />
      </div>

      {/* Leadership section */}
      <section className="mt-12 rounded-[28px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),transparent_32%),rgba(9,14,22,0.85)] p-6 shadow-[0_30px_80px_rgba(3,7,18,0.55)] lg:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Leadership</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">The people behind the mission.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            CYHOP and Virtue Reality are rooted in the idea that trust, culture, and digital safety can be built as a
            shared advantage—not treated as afterthoughts.
          </p>
        </div>
      </section>

      {/* Team member cards */}
      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {teamMembers.map((member) => (
          <article key={member.name} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">{member.role}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {member.name === "Josh" ? "Joshua Owens" : member.name}
            </h2>
            {member.background && (
              <div className="mt-4 rounded-xl border border-[#d77bff]/25 bg-[#120d24]/70 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d77bff]">Background</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{member.background}</p>
              </div>
            )}
            <p className="mt-3 text-sm leading-7 text-slate-300">{member.bio}</p>
          </article>
        ))}
      </section>
    </NavShell>
  );
}
