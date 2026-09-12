import { NavShell } from "@/components/nav-shell";
import { SolutionDemoVideo } from "@/components/solution-demo-video";

const solutionSteps = [
  {
    title: "Sentinel detects",
    copy: "Risk signals across communication and behavior layers.",
  },
  {
    title: "Guardian alerts",
    copy: "Parents and caregivers get visibility and actionable alerts.",
  },
  {
    title: "Human review resolves",
    copy: "Context, fairness, accountability, and escalation stay human-centered.",
  },
];

const legacySolutionBody = (
  <div className="rounded-[30px] border border-[#c87dfd]/40 bg-[#090d1d] p-6 shadow-[0_20px_60px_rgba(2,6,23,0.45)] md:p-8">
    <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
      <div className="space-y-4">
        <h2 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white md:text-5xl">
          Sentinel + Guardian + Human Judgment
        </h2>

        {solutionSteps.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-white">{step.title}</h2>
            <p className="mt-3 text-base leading-7 text-slate-200">{step.copy}</p>
          </div>
        ))}

        <p className="mt-6 text-2xl font-semibold leading-snug tracking-tight text-white md:text-3xl">
          No black box. No “trust us.” The system is designed to transparently show what happened and why.
        </p>
      </div>

      <div className="rounded-[26px] border border-[#d77bff]/60 bg-[#090d1d] p-4 shadow-[0_0_0_1px_rgba(214,123,255,0.3)] md:p-5">
        <div className="rounded-[22px] border border-[#d77bff]/50 bg-[radial-gradient(circle_at_top,_rgba(191,98,255,0.28),transparent_30%),linear-gradient(180deg,_rgba(8,12,20,0.98),_rgba(4,6,14,1))] p-4">
          <div className="mb-4 text-center">
            <div className="inline-block rounded-full border border-[#d77bff]/70 bg-[#120f24] px-4 py-2 text-lg font-bold uppercase tracking-[0.18em] text-[#f4d5ff]">
              Our TrustTech Workflow
            </div>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.28em] text-cyan-300">
              AI detection. Parent visibility. Human judgment. Safer communities.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr]">
            <div className="rounded-2xl border border-[#d77bff]/60 bg-[#120d1d]/80 p-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#d77bff] bg-[#1b1028] text-xl font-bold text-[#f5d3ff]">
                1
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f0c8ff]">Sentinel</h3>
              <p className="mt-3 text-xs leading-5 text-slate-200">AI detection & monitoring</p>
              <ul className="mt-4 space-y-2 text-left text-[11px] leading-5 text-slate-200">
                <li>• Real-time chat & voice analysis</li>
                <li>• Toxicity, hate, bullying</li>
                <li>• Risk scoring & prioritization</li>
                <li>• Automated incident reporting</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-cyan-400/60 bg-[#0d1325]/80 p-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400 bg-[#12263a] text-xl font-bold text-cyan-200">
                2
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Guardian</h3>
              <p className="mt-3 text-xs leading-5 text-slate-200">Parent visibility & alerts</p>
              <ul className="mt-4 space-y-2 text-left text-[11px] leading-5 text-slate-200">
                <li>• Dashboard overview</li>
                <li>• Risk review queue</li>
                <li>• Activity snapshots</li>
                <li>• Escalation controls</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#7ed8ff]/60 bg-[#0d1520]/80 p-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#7ed8ff] bg-[#102a36] text-xl font-bold text-[#ccecff]">
                3
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#cdefff]">Human Review</h3>
              <p className="mt-3 text-xs leading-5 text-slate-200">Context, judgment & action</p>
              <ul className="mt-4 space-y-2 text-left text-[11px] leading-5 text-slate-200">
                <li>• Fairness checks</li>
                <li>• Context review</li>
                <li>• Policy response</li>
                <li>• Community protection</li>
              </ul>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-cyan-400/40 bg-[#0f1f2c]/80 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Auditability & learning loop</div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-left">
                <p className="text-[11px] font-medium text-slate-100">Comprehensive audit logs</p>
                <p className="mt-1 text-[10px] leading-4 text-slate-300">Every event, decision, and action is logged.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-left">
                <p className="text-[11px] font-medium text-slate-100">Model improvement</p>
                <p className="mt-1 text-[10px] leading-4 text-slate-300">Human feedback refines policies and detection.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-left">
                <p className="text-[11px] font-medium text-slate-100">Stronger communities</p>
                <p className="mt-1 text-[10px] leading-4 text-slate-300">Trust grows as safety systems get smarter.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default function SolutionPage() {
  return (
    <NavShell>
      <div className="mb-6">
        <h1 className="text-4xl font-semibold tracking-tight text-[#d77bff] sm:text-5xl">THE SOLUTION</h1>
      </div>

      <div className="mb-8 overflow-hidden rounded-[26px] border border-white/10 bg-black shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
        <SolutionDemoVideo src="/media/VR_DEMO_SHORT (1).mp4" />
      </div>

      <div className="rounded-[30px] border border-[#c87dfd]/40 bg-[#090d1d] p-6 shadow-[0_20px_60px_rgba(2,6,23,0.45)] md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <h2 className="text-4xl font-semibold leading-[0.95] tracking-tight text-white md:text-5xl">
              Sentinel + Guardian + Human Judgment
            </h2>

            {solutionSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                <h2 className="text-2xl font-semibold tracking-tight text-white">{step.title}</h2>
                <p className="mt-3 text-base leading-7 text-slate-200">{step.copy}</p>
              </div>
            ))}

            <p className="mt-6 text-2xl font-semibold leading-snug tracking-tight text-white md:text-3xl">
              No black box. No “trust us.” The system is designed to transparently show what happened and why.
            </p>
          </div>

          <div className="rounded-[26px] border border-[#d77bff]/60 bg-[#090d1d] p-4 shadow-[0_0_0_1px_rgba(214,123,255,0.3)] md:p-5">
            <div className="rounded-[22px] border border-[#d77bff]/50 bg-[radial-gradient(circle_at_top,_rgba(191,98,255,0.28),transparent_30%),linear-gradient(180deg,_rgba(8,12,20,0.98),_rgba(4,6,14,1))] p-4">
              <div className="mb-4 text-center">
                <div className="inline-block rounded-full border border-[#d77bff]/70 bg-[#120f24] px-4 py-2 text-lg font-bold uppercase tracking-[0.18em] text-[#f4d5ff]">
                  Our TrustTech Workflow
                </div>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.28em] text-cyan-300">
                  AI detection. Parent visibility. Human judgment. Safer communities.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr]">
                <div className="rounded-2xl border border-[#d77bff]/60 bg-[#120d1d]/80 p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#d77bff] bg-[#1b1028] text-xl font-bold text-[#f5d3ff]">
                    1
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f0c8ff]">Sentinel</h3>
                  <p className="mt-3 text-xs leading-5 text-slate-200">AI detection & monitoring</p>
                  <ul className="mt-4 space-y-2 text-left text-[11px] leading-5 text-slate-200">
                    <li>• Real-time chat & voice analysis</li>
                    <li>• Toxicity, hate, bullying</li>
                    <li>• Risk scoring & prioritization</li>
                    <li>• Automated incident reporting</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-cyan-400/60 bg-[#0d1325]/80 p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400 bg-[#12263a] text-xl font-bold text-cyan-200">
                    2
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Guardian</h3>
                  <p className="mt-3 text-xs leading-5 text-slate-200">Parent visibility & alerts</p>
                  <ul className="mt-4 space-y-2 text-left text-[11px] leading-5 text-slate-200">
                    <li>• Dashboard overview</li>
                    <li>• Risk review queue</li>
                    <li>• Activity snapshots</li>
                    <li>• Escalation controls</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#7ed8ff]/60 bg-[#0d1520]/80 p-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#7ed8ff] bg-[#102a36] text-xl font-bold text-[#ccecff]">
                    3
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#cdefff]">Human Review</h3>
                  <p className="mt-3 text-xs leading-5 text-slate-200">Context, judgment & action</p>
                  <ul className="mt-4 space-y-2 text-left text-[11px] leading-5 text-slate-200">
                    <li>• Fairness checks</li>
                    <li>• Context review</li>
                    <li>• Policy response</li>
                    <li>• Community protection</li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-400/40 bg-[#0f1f2c]/80 p-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Auditability & learning loop</div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-left">
                    <p className="text-[11px] font-medium text-slate-100">Comprehensive audit logs</p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-300">Every event, decision, and action is logged.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-left">
                    <p className="text-[11px] font-medium text-slate-100">Model improvement</p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-300">Human feedback refines policies and detection.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-left">
                    <p className="text-[11px] font-medium text-slate-100">Stronger communities</p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-300">Trust grows as safety systems get smarter.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </NavShell>
  );
}