import Link from "next/link";
import { ReactNode } from "react";

const investorLinks = [
  { href: "/#overview", label: "Overview" },
  { href: "/team", label: "Team" },
  { href: "/problem", label: "The Problem" },
  { href: "/solution", label: "The Solution" },
  { href: "/why-now", label: "Why Now?" },
  { href: "/cyhop-concept", label: "CYHOP Concept" },
  { href: "/investor-next-steps", label: "The Offering" },
];

type NavShellProps = {
  children: ReactNode;
};

export function NavShell({ children }: NavShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#03060c] via-[#070e1b] to-[#0b1426] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070e1b]/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link href="/" className="text-lg font-semibold tracking-tight text-white">
                CYHOP / Virtue Reality
              </Link>
            </div>
            <div className="text-lg">
              <nav className="flex flex-wrap gap-4 font-medium">
                {investorLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-white/80 hover:text-cyan">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
