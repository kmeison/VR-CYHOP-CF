"use client";

import { useState } from "react";

type SolutionDemoVideoProps = {
  src: string;
};

export function SolutionDemoVideo({ src }: SolutionDemoVideoProps) {
  const [showDemoLabel, setShowDemoLabel] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const playDemoWithSound = (video: HTMLVideoElement) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cyhop:pause-bg-audio"));
    }
    const bgAudio = document.getElementById("cyhop-background-audio");
    if (bgAudio instanceof HTMLMediaElement && !bgAudio.paused) {
      bgAudio.pause();
    }
    document.querySelectorAll<HTMLMediaElement>("audio, video").forEach((media) => {
      if (media !== video && !media.paused) {
        media.pause();
      }
    });

    video.muted = false;
    setSoundEnabled(true);
    void video.play();
  };

  return (
    <div className="relative overflow-hidden bg-black">
      <video
        className="block h-auto w-full"
        controls
        onPlay={(event) => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("cyhop:pause-bg-audio"));
          }
          const bgAudio = document.getElementById("cyhop-background-audio");
          if (bgAudio instanceof HTMLMediaElement && !bgAudio.paused) {
            bgAudio.pause();
          }
          document.querySelectorAll<HTMLMediaElement>("audio, video").forEach((media) => {
            if (media !== event.currentTarget && !media.paused) {
              media.pause();
            }
          });
        }}
        onLoadedMetadata={(event) => {
          setShowDemoLabel(event.currentTarget.currentTime < 20);
        }}
        onTimeUpdate={(event) => {
          setShowDemoLabel(event.currentTarget.currentTime < 20);
        }}
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
      {!soundEnabled && (
        <button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/50 bg-black/75 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_28px_rgba(217,70,239,0.45)] backdrop-blur transition hover:bg-black/90"
          onClick={(event) => {
            const video = event.currentTarget.parentElement?.querySelector("video");
            if (video instanceof HTMLVideoElement) {
              playDemoWithSound(video);
            }
          }}
          type="button"
        >
          Play demo with sound
        </button>
      )}
      {showDemoLabel && (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center sm:bottom-10">
          <span className="animate-pulse rounded-md border border-white/60 bg-black/65 px-5 py-2 text-2xl font-black uppercase tracking-[0.3em] text-white shadow-[0_0_24px_rgba(255,255,255,0.45)] sm:text-3xl">
            DEMO
          </span>
        </div>
      )}
    </div>
  );
}
