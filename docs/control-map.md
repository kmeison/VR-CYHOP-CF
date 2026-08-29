# Control Map

## Purpose

Map all manual-work controls and Agent CMO controls to concrete app surfaces.

## Investor Site Controls

1. Home
   - Mission, product story, and non-binding signup CTA.
   - Surface: `/`

2. Team
   - Leadership framing and transition into the deeper narrative.
   - Surface: `/team`

3. Story
   - Manifesto image/PDF, soundtrack, and brand narrative layer.
   - Surface: `/story`

4. FAQ and risks
   - Plain-language questions plus balanced risk reminders.
   - Surface: `/faq`

5. Offering
   - Non-binding interest capture and intermediary CTA placeholder.
   - Surface: `/offering`

6. Architecture
   - Three-layer funnel and compliance boundary map.
   - Surface: `/architecture`

7. Launch Path
   - Release milestones, checklist, and intermediary handoff.
   - Surface: `/launch-path`

8. Compliance
   - Allowed vs restricted content and release gate.
   - Surface: `/compliance`

## Manual Work Controls

1. Dashboard filters
   - Date range, market, channel, and team filters.
   - Surface: `/dashboard`

2. Leads workspace
   - Manual lead creation, stage and owner updates, follow-up queue, bulk actions.
   - Surface: `/leads`
   - API: `GET /api/leads`, `POST /api/leads`

3. Campaign builder
   - Create campaign, budget, status, launch and pause controls.
   - Surface: `/campaigns`
   - API: `GET /api/campaigns`, `POST /api/campaigns`

4. Content studio
   - Manual prompt, tone controls, regenerate, versioning, approve to queue.
   - Surface: `/content-studio`
   - API: `POST /api/content/generate`

5. Marketing calendar
   - Week/month timeline, statuses, drag-drop scheduling, conflict checks.
   - Surface: `/marketing-calendar`

6. Settings and integrations
   - Brand profile, channel defaults, roles, API credentials.
   - Surface: `/settings`

## Agent CMO Controls

1. Strategy controls
   - Goals, budget envelope, risk profile, planning horizon.
   - Surface: `/agent-cmo`

2. Run controls
   - Run now, plan-only, execute-approved, pause, resume, stop.
   - Surface: `/agent-cmo`

3. Approval and guardrails
   - Approval gates, caps, confidence thresholds, exclusions.
   - Surface: `/agent-cmo`, `/settings`

4. Agent task board
   - Recommendations, accept/edit/reject, prioritization.
   - Surface: `/agent-cmo`

5. Feedback loop controls
   - Outcome tracking, memory toggles, prompt policy controls.
   - Surface: `/agent-cmo`

6. Transparency controls
   - Rationale, confidence, source signals, action log.
   - Surface: `/agent-cmo`

7. Predictive Scout dashboard
   - Pipeline ratios, event pressure, inventory pressure, and guidance feed.
   - Surface: `/predictive-scout`
   - API: `GET /api/scout`

8. Predictive Market Scout
   - Sources: optional Zillow feed, optional county feed, national sales and mortgage trends.
   - Daily probability engine and closeness record (absolute error and Brier score).
   - Surface: `/predictive-scout`
   - API: `GET /api/scout/market-predictor`

## Current Buildout Status

1. IA and control surfaces are mapped in navigation and pages.
2. Leads and campaigns API endpoints are available as persistence-ready stubs.
3. Leads and campaigns pages are wired to live APIs and Prisma persistence.
4. Marketing calendar has dated 120-day 4-week event schedule.
5. Predictive Scout dashboard is connected to available data signals.