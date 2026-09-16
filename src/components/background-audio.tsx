"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const BACKGROUND_AUDIO_ID = "cyhop-background-audio";
const BACKGROUND_TRACK = "/media/math-dont-lie.mp3";

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const userPausedRef = useRef(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const pauseBackgroundAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
    }
    setIsPlaying(false);
  }, []);

  const syncBackgroundAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const mediaElements = Array.from(document.querySelectorAll<HTMLMediaElement>("audio, video"));
    const otherMediaPlaying = mediaElements.some(
      (element) =>
        element !== audio &&
        !element.paused &&
        !element.ended &&
        !element.muted &&
        element.volume > 0,
    );

    if (!enabled || otherMediaPlaying) {
      if (!audio.paused) {
        audio.pause();
      }
      setIsPlaying(false);
      return;
    }

    if (audio.paused) {
      const playRequest = audio.play();
      if (playRequest) {
        void playRequest
          .then(() => {
            const currentMedia = Array.from(document.querySelectorAll<HTMLMediaElement>("audio, video"));
            const anotherIsPlaying = currentMedia.some(
              (element) =>
                element !== audio &&
                !element.paused &&
                !element.ended &&
                !element.muted &&
                element.volume > 0,
            );
            if (anotherIsPlaying || !enabled) {
              audio.pause();
              setIsPlaying(false);
              return;
            }
            setAutoplayBlocked(false);
            setIsPlaying(true);
          })
          .catch(() => {
            setAutoplayBlocked(true);
            setIsPlaying(false);
          });
      }
      return;
    }

    setAutoplayBlocked(false);
    setIsPlaying(true);
  }, [enabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handleAudioState = () => {
      setIsPlaying(!audio.paused && !audio.ended);
    };

    const handleMediaLifecycle = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLMediaElement)) {
        return;
      }

      if (target === audio) {
        return;
      }

      // Ignore muted background loop videos (like the one on /why-now)
      if (target.muted || target.volume === 0) {
        return;
      }

      if (!target.paused && !target.ended) {
        if (!audio.paused) {
          audio.pause();
        }
        setIsPlaying(false);
        return;
      }

      syncBackgroundAudio();
    };

    const handleCustomPause = () => {
      pauseBackgroundAudio();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        syncBackgroundAudio();
      }
    };

    audio.volume = 0.35;
    audio.addEventListener("play", handleAudioState);
    audio.addEventListener("pause", handleAudioState);
    audio.addEventListener("ended", handleAudioState);
    window.addEventListener("cyhop:pause-bg-audio", handleCustomPause);
    document.addEventListener("play", handleMediaLifecycle, true);
    document.addEventListener("playing", handleMediaLifecycle, true);
    document.addEventListener("pause", handleMediaLifecycle, true);
    document.addEventListener("ended", handleMediaLifecycle, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    syncBackgroundAudio();

    return () => {
      audio.removeEventListener("play", handleAudioState);
      audio.removeEventListener("pause", handleAudioState);
      audio.removeEventListener("ended", handleAudioState);
      window.removeEventListener("cyhop:pause-bg-audio", handleCustomPause);
      document.removeEventListener("play", handleMediaLifecycle, true);
      document.removeEventListener("playing", handleMediaLifecycle, true);
      document.removeEventListener("pause", handleMediaLifecycle, true);
      document.removeEventListener("ended", handleMediaLifecycle, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pauseBackgroundAudio, syncBackgroundAudio]);

  useEffect(() => {
    userPausedRef.current = false;
    if (pathname === "/why-now") {
      const frame = window.requestAnimationFrame(() => {
        setEnabled(true);
      });

      // Browser autoplay unlocker on first user interaction on the page if not user-paused
      const unlockAudio = () => {
        if (userPausedRef.current) return;
        const audio = audioRef.current;
        if (audio && audio.paused) {
          audio.play().then(() => {
            setAutoplayBlocked(false);
            setIsPlaying(true);
          }).catch(() => {});
        }
      };

      window.addEventListener("pointerdown", unlockAudio, { once: true });
      window.addEventListener("touchstart", unlockAudio, { once: true });
      window.addEventListener("keydown", unlockAudio, { once: true });
      window.addEventListener("click", unlockAudio, { once: true });

      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("pointerdown", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
        window.removeEventListener("click", unlockAudio);
      };
    } else {
      const frame = window.requestAnimationFrame(() => {
        setEnabled(false);
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, [pathname]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!enabled) {
      if (!audio.paused) {
        audio.pause();
      }
      return;
    }

    syncBackgroundAudio();
  }, [enabled, syncBackgroundAudio]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      syncBackgroundAudio();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, syncBackgroundAudio]);

  return (
    <>
      <audio id={BACKGROUND_AUDIO_ID} loop preload="auto" ref={audioRef} src={BACKGROUND_TRACK} />
      <div className="fixed bottom-3 right-3 z-50 w-[180px] rounded-lg border border-black/10 bg-white/95 p-2 shadow-md backdrop-blur sm:bottom-4 sm:right-4 sm:w-[210px] sm:rounded-xl sm:p-2.5">
        <div className="flex items-center justify-between gap-1">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-obsidian/60 sm:text-[10px]">
            Background audio
          </p>
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full transition-colors ${
              isPlaying ? "animate-pulse bg-emerald-500" : "bg-slate-400"
            }`}
            title={isPlaying ? "Playing" : "Paused"}
          />
        </div>
        <p className="mt-0.5 text-xs font-semibold leading-tight text-obsidian sm:text-sm">
          Math Don&apos;t Lie
        </p>
        <p className="mt-0.5 text-[9px] leading-tight text-obsidian/65 sm:text-[10px]">
          {enabled
            ? isPlaying
              ? "Playing until another audio/video takes over."
              : autoplayBlocked
                ? "Press play if blocked by browser."
                : "Waiting for playback."
            : "Click play to listen."}
        </p>
        <button
          className="mt-2 w-full rounded-md bg-obsidian px-2 py-1 text-[10px] font-medium text-white transition hover:bg-obsidian/90 active:scale-95 sm:text-xs"
          onClick={() => {
            setEnabled((current) => {
              const next = !current;
              if (!next) {
                userPausedRef.current = true;
              } else {
                userPausedRef.current = false;
              }
              return next;
            });
            setAutoplayBlocked(false);
          }}
          type="button"
        >
          {enabled ? "Pause music" : "Play music"}
        </button>
      </div>
    </>
  );
}
