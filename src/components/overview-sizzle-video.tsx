"use client";

import { useEffect, useRef, useState } from "react";

type OverviewSizzleVideoProps = {
  src: string;
};

export function OverviewSizzleVideo({ src }: OverviewSizzleVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autostart video playback immediately
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may need muted attribute guarantee
        video.muted = true;
        void video.play();
      });
    }

    const handleFullscreenChange = () => {
      const isFull = !!(
        document.fullscreenElement ||
        (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement
      );
      setIsFullscreen(isFull);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const pauseBackgroundAudio = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cyhop:pause-bg-audio"));
    }
    const bgAudio = document.getElementById("cyhop-background-audio");
    if (bgAudio instanceof HTMLMediaElement && !bgAudio.paused) {
      bgAudio.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      pauseBackgroundAudio();
      void video.play();
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current || videoRef.current;
    if (!container) return;

    try {
      if (
        !document.fullscreenElement &&
        !(document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement
      ) {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if ((container as unknown as { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen) {
          await (container as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
        }
        // Unmute and pause background audio when entering fullscreen
        const video = videoRef.current;
        if (video) {
          video.muted = false;
          setIsMuted(false);
          pauseBackgroundAudio();
          void video.play();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as unknown as { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen) {
          await (document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen request error:", err);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-black ${
        isFullscreen ? "flex h-screen w-screen items-center justify-center bg-black" : ""
      }`}
      ref={containerRef}
    >
      <video
        autoPlay
        className={`block w-full ${isFullscreen ? "h-full object-contain" : "h-auto"}`}
        controls
        loop
        muted={isMuted}
        onPlay={() => {
          if (!isMuted) {
            pauseBackgroundAudio();
          }
        }}
        onVolumeChange={(event) => {
          const video = event.currentTarget;
          setIsMuted(video.muted || video.volume === 0);
          if (!video.muted && video.volume > 0) {
            pauseBackgroundAudio();
          }
        }}
        playsInline
        preload="auto"
        ref={videoRef}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Floating Action Controls */}
      <div className="absolute right-3 top-3 z-20 flex flex-wrap items-center gap-2 sm:right-4 sm:top-4">
        {/* Unmute / Sound Toggle */}
        <button
          aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
          className="flex items-center gap-1.5 rounded-lg border border-white/30 bg-black/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md backdrop-blur-md transition hover:border-[#d77bff] hover:bg-black/90 active:scale-95 sm:text-xs"
          onClick={toggleSound}
          type="button"
        >
          {isMuted ? (
            <>
              <svg className="h-4 w-4 fill-current text-amber-300" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
              <span>Unmute Sound</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4 fill-current text-emerald-400" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
              <span>Sound On</span>
            </>
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button
          aria-label={isFullscreen ? "Exit Fullscreen" : "Play Full Screen"}
          className="flex items-center gap-1.5 rounded-lg border border-white/30 bg-black/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md backdrop-blur-md transition hover:border-[#d77bff] hover:bg-black/90 active:scale-95 sm:text-xs"
          onClick={toggleFullscreen}
          type="button"
        >
          {isFullscreen ? (
            <>
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-14v3h3v2h-5V5h2z" />
              </svg>
              <span>Exit Fullscreen</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4 fill-current text-cyan-300" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
              <span>Full Screen</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
