"use client";

import { useRef, useState } from "react";

type ProblemVideoProps = {
  src: string;
};

export function ProblemVideo({ src }: ProblemVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = false;
    setSoundEnabled(true);
    void video.play();
  };

  return (
    <div className="relative overflow-hidden bg-black">
      <video
        autoPlay
        className="block h-auto w-full"
        controls
        muted
        ref={videoRef}
        onEnded={(event) => {
          event.currentTarget.pause();
        }}
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>
      {!soundEnabled && (
        <button
          className="absolute right-4 top-4 rounded-lg border border-white/30 bg-black/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur"
          onClick={enableSound}
          type="button"
        >
          Enable sound
        </button>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-1/4 overflow-hidden bg-black/65 py-2">
        <p className="why-now-caption w-max whitespace-nowrap px-4 text-xl font-bold uppercase tracking-[0.14em] text-white sm:text-2xl">
          CAUTION actual event! Be cafeful of your surroundings but listen intently
        </p>
      </div>
    </div>
  );
}
