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
        const backgroundAudio = document.getElementById("cyhop-background-audio");
        if (backgroundAudio instanceof HTMLAudioElement) {
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
