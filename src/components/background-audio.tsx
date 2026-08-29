"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BACKGROUND_AUDIO_ID = "cyhop-background-audio";
const BACKGROUND_TRACK = "/media/math-dont-lie.mp3";

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const syncBackgroundAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const mediaElements = Array.from(document.querySelectorAll<HTMLMediaElement>("audio, video"));
    const otherMediaPlaying = mediaElements.some(
      (element) => element !== audio && !element.paused && !element.ended,
    );

    if (!enabled || otherMediaPlaying) {
      if (!audio.paused) {
        audio.pause();
      }
      setIsPlaying(false);
      setAutoplayBlocked(false);
      return;
    }

    if (audio.paused) {
      const playRequest = audio.play();
      if (playRequest) {
        void playRequest
          .then(() => {
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

      if (!target.paused && !target.ended) {
        if (!audio.paused) {
          audio.pause();
        }
        setIsPlaying(false);
        return;
      }

      syncBackgroundAudio();
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
    document.addEventListener("play", handleMediaLifecycle, true);
    document.addEventListener("pause", handleMediaLifecycle, true);
    document.addEventListener("ended", handleMediaLifecycle, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    syncBackgroundAudio();

    return () => {
      audio.removeEventListener("play", handleAudioState);
      audio.removeEventListener("pause", handleAudioState);
      audio.removeEventListener("ended", handleAudioState);
      document.removeEventListener("play", handleMediaLifecycle, true);
      document.removeEventListener("pause", handleMediaLifecycle, true);
      document.removeEventListener("ended", handleMediaLifecycle, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [syncBackgroundAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!enabled) {
      if (!audio.paused) {
        audio.pause();
      }
      setIsPlaying(false);
      return;
    }

    syncBackgroundAudio();
  }, [enabled, syncBackgroundAudio]);

  return (
    <>
      <audio id={BACKGROUND_AUDIO_ID} loop preload="auto" ref={audioRef} src={BACKGROUND_TRACK} />
      <div className="fixed bottom-4 right-4 z-50 rounded-xl border border-black/10 bg-white/95 p-3 shadow-lg backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-wide text-obsidian/60">Background audio</p>
        <p className="mt-1 text-sm font-medium text-obsidian">Math Don&apos;t Lie</p>
        <p className="mt-1 text-xs text-obsidian/65">
          {enabled
            ? isPlaying
              ? "Playing until another song or video takes over."
              : autoplayBlocked
                ? "Press play if your browser blocked autoplay."
                : "Waiting for the page to allow playback."
            : "Paused by viewer choice."}
        </p>
        <button
          className="mt-3 rounded-lg bg-obsidian px-3 py-2 text-xs font-semibold text-white"
          onClick={() => {
            setEnabled((current) => !current);
            setAutoplayBlocked(false);
          }}
          type="button"
        >
          {enabled ? "Pause background music" : "Play background music"}
        </button>
      </div>
    </>
  );
}
