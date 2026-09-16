"use client";

type OverviewSizzleVideoProps = {
  src: string;
};

export function OverviewSizzleVideo({ src }: OverviewSizzleVideoProps) {
  return (
    <video
      className="h-auto w-full"
      controls
      onPlay={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cyhop:pause-bg-audio"));
        }
        const backgroundAudio = document.getElementById("cyhop-background-audio");
        if (backgroundAudio instanceof HTMLMediaElement && !backgroundAudio.paused) {
          backgroundAudio.pause();
        }
      }}
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
