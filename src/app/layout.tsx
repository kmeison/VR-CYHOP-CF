import type { Metadata } from "next";
import { BackgroundAudio } from "@/components/background-audio";
import "./globals.css";

export const metadata: Metadata = {
  title: "CYHOP / Virtue Reality Investor Site",
  description: "Brand-owned investor experience with a compliant handoff to a regulated Reg CF intermediary.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BackgroundAudio />
      </body>
    </html>
  );
}
