"use client";

import Image from "next/image";
import { NavShell } from "@/components/nav-shell";

const cultureTracks = [
  { title: "CYHOP", src: "/media/cyhop.mp3" },
  { title: "Face the Future", src: "/media/face-the-future.mp3" },
  { title: "Math Don’t Lie", src: "/media/math-dont-lie.mp3" },
  { title: "Ride With Me", src: "/media/ride-with-me.wav" },
];

export default function WhyNowPage() {
  return (
    <NavShell>
      <section>
        <h1 className="mb-5 text-4xl font-semibold tracking-tight text-[#df48ff] sm:text-5xl">WHY NOW?</h1>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          The AI Generation needs a Culture Shift
        </h2>

        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/40">
          <video autoPlay className="h-auto w-full object-cover" loop muted playsInline>
            <source src="/images/Verse 1 b (1).mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-x-0 bottom-1/3 overflow-hidden px-6 sm:px-10">
            <p className="why-now-caption w-max whitespace-nowrap text-3xl font-semibold leading-relaxed text-white/65 sm:text-4xl">
              Math Don&apos;t Lie... Truth Just Needs Sight... Hard getting funded when your skin walks in first...
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-[26px] border border-[#d77bff]/40 bg-[#0a1020] p-5 md:p-6">
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d77bff]">CYHOP culture</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              We build with the rhythm of culture, not just the paperwork.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
              CYHOP is centered on hip-hop culture: creative energy, accountability, expression, and community flow.
              We have plenty of meetings and a lot of documentation, but the real connection happens when the work moves
              with the same pulse as the people in it. These songs are part of that signal—turning strategy into feeling,
              momentum into belonging, and a mission into community rhythm.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cultureTracks.map((track) => (
              <div
                key={track.title}
                className="flex h-full flex-col justify-between rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f5d3ff]">{track.title}</p>
                  <span className="rounded-full border border-[#d77bff]/50 bg-[#120f24] px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-cyan-200">
                    audio
                  </span>
                </div>
                <audio
                  className="mt-2 w-full"
                  controls
                  onPlay={(e) => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("cyhop:pause-bg-audio"));
                    }
                    const bgAudio = document.getElementById("cyhop-background-audio");
                    if (bgAudio instanceof HTMLMediaElement && !bgAudio.paused) {
                      bgAudio.pause();
                    }
                    document.querySelectorAll<HTMLMediaElement>("audio").forEach((other) => {
                      if (other !== e.currentTarget && !other.paused) {
                        other.pause();
                      }
                    });
                  }}
                  preload="none"
                  src={track.src}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 max-w-4xl px-1">
          <p className="text-2xl font-semibold leading-snug tracking-tight text-white md:text-3xl">
            We help families, creators, gamers, workers, and communities survive the AI wave without losing themselves.
          </p>
          <p className="mt-3 text-lg leading-7 text-slate-300 md:text-xl">
            We are not here to fear AI. We are here to put a soul inside the machine.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-[#d7b06a]/40 bg-[#20170f] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          <Image
            alt="Virtue Reality and CYHOP scroll"
            className="h-auto w-full object-cover"
            height={1200}
            priority
            src="/images/virtue-reality-cyhop-scroll.jpg"
            width={1600}
          />
        </div>
      </section>
    </NavShell>
  );
}