"use client";

import { useRef, useState } from "react";

type ProblemVideoProps = {
  src: string;
};

const WARNING_TEXT = "GRAPHIC LANGUAGE WARNING  - BE IN A SAFE PLACE TO LISTEN INTENTLY";

export function ProblemVideo({ src }: ProblemVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopBackgroundMusicAndOtherMedia = (currentVideo?: HTMLVideoElement | null) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cyhop:pause-bg-audio"));
    }
    const bgAudio = document.getElementById("cyhop-background-audio");
    if (bgAudio instanceof HTMLMediaElement && !bgAudio.paused) {
      bgAudio.pause();
    }
    document.querySelectorAll<HTMLMediaElement>("audio, video").forEach((media) => {
      if (media !== currentVideo && !media.paused) {
        media.pause();
      }
    });
  };

  const handlePlayWithSound = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    stopBackgroundMusicAndOtherMedia(video);
    video.muted = false;
    void video
      .play()
      .then(() => {
        setIsPlaying(true);
        stopBackgroundMusicAndOtherMedia(video);
      })
      .catch((err) => {
        console.warn("Playback error:", err);
      });
  };

  return (
    <div className="relative overflow-hidden bg-black">
      <video
        className="block h-auto w-full"
        controls
        onEnded={() => {
          setIsPlaying(false);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onPlay={(event) => {
          stopBackgroundMusicAndOtherMedia(event.currentTarget);
          event.currentTarget.muted = false;
          setIsPlaying(true);
        }}
        onPlaying={(event) => {
          stopBackgroundMusicAndOtherMedia(event.currentTarget);
        }}
        onTimeUpdate={(event) => {
          if (!event.currentTarget.paused && !event.currentTarget.ended) {
            const bgAudio = document.getElementById("cyhop-background-audio");
            if (bgAudio instanceof HTMLMediaElement && !bgAudio.paused) {
              bgAudio.pause();
            }
          }
        }}
        playsInline
        preload="metadata"
        ref={videoRef}
      >
        <source src={src} type="video/mp4" />
      </video>

      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <button
            aria-label="Play video with sound"
            className="group flex flex-col items-center gap-3 rounded-2xl border border-white/30 bg-black/80 px-7 py-5 shadow-[0_0_40px_rgba(215,123,255,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#d77bff] hover:bg-black/95"
            onClick={handlePlayWithSound}
            type="button"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d77bff] text-slate-950 shadow-lg transition-transform group-hover:scale-110">
              <svg className="ml-1 h-8 w-8 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">Play Video</p>
              <p className="text-xs font-medium text-slate-300">Click to listen with audio</p>
            </div>
          </button>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-14 z-10 overflow-hidden border-y border-amber-400/30 bg-black/85 py-2.5 backdrop-blur-sm sm:bottom-20">
        <div className="problem-warning-marquee flex items-center text-amber-300">
          <span className="px-6 text-sm font-bold uppercase tracking-[0.14em] sm:text-base md:text-lg">
            ⚠️ {WARNING_TEXT} &nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
          <span className="px-6 text-sm font-bold uppercase tracking-[0.14em] sm:text-base md:text-lg">
            ⚠️ {WARNING_TEXT} &nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
          <span className="px-6 text-sm font-bold uppercase tracking-[0.14em] sm:text-base md:text-lg">
            ⚠️ {WARNING_TEXT} &nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
          <span className="px-6 text-sm font-bold uppercase tracking-[0.14em] sm:text-base md:text-lg">
            ⚠️ {WARNING_TEXT} &nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </div>
  );
}
