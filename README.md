# CYHOP / Virtue Reality Investor Site

Full-stack TypeScript starter for a Reg CF-ready investor microsite with a compliant handoff to a regulated intermediary.

## Cloud-First Workflow (Recommended)

Use this when local disk space is limited.

1. Initialize and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial scaffold"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. In GitHub, open the repo in Codespaces.
3. The dev container runs `npm install` and `npm run prisma:generate` automatically.
4. Start app in Codespaces terminal:
   ```bash
   npm run dev
   ```

The included CI workflow runs install, Prisma generate, typecheck, lint, and build on every push/PR.

## Stack

- Next.js (App Router) + Tailwind CSS
- Prisma ORM + PostgreSQL
- NextAuth (dependency included for upcoming auth wiring)
- OpenAI SDK (stub endpoint ready)

## Quick Start

1. Ensure Node.js is available in your shell.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment template:
   ```bash
   cp .env.example .env
   ```
4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
5. Create/migrate database schema:
   ```bash
   npm run prisma:migrate -- --name init
   ```
6. Start development server:
   ```bash
   npm run dev
   ```

## Routes

- UI:
  - `/`
  - `/team`
  - `/story`
  - `/faq`
  - `/offering`
  - `/architecture`
  - `/launch-path`
  - `/compliance`
  - `/dashboard`
  - `/campaigns`
  - `/leads`
  - `/content-studio`
  - `/marketing-calendar`
  - `/agent-cmo`
  - `/predictive-scout`
  - `/properties`
  - `/settings`
- API:
  - `GET /api/health`
  - `GET|POST /api/leads`
  - `GET|POST /api/campaigns`
  - `POST /api/content/generate`
  - `GET /api/scout`
  - `POST /api/scout/refresh` (requires `x-scout-refresh-secret`, refreshes Bay Area + Real Estate snapshots)

## Internal Intelligence and Operator Tools

The internal routes remain available for launch coordination, CRM-style workflows, and future intelligence integrations.

- `/dashboard`
- `/campaigns`
- `/leads`
- `/content-studio`
- `/marketing-calendar`
- `/agent-cmo`
- `/predictive-scout`
- `/properties`
- `/settings`

These routes are intentionally separate from the public investor site and can evolve independently.

## Notes

- The investor-facing pages are static and should be kept counsel-approved before launch.
- Background audio defaults to `Math Don't Lie` and pauses when another page audio/video element plays.
- The operator tools remain available as internal surfaces while the investor microsite matures.
- The project is designed to be Azure-ready but currently uses local defaults.
