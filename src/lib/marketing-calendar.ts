export type CalendarEventTemplate = {
  slug: string;
  title: string;
  positioning: string;
  targetOutcome: string;
  dayOffsetInCycle: number;
};

export type CalendarEventOccurrence = CalendarEventTemplate & {
  startsOn: string;
  weekLabel: string;
  cycleNumber: number;
};

const FOUR_WEEK_DAYS = 28;

export const calendarEventTemplates: CalendarEventTemplate[] = [
  {
    slug: "messaging-matrix-review",
    title: "Messaging Matrix Review",
    positioning: "Lock the approved claims source-of-truth before any public launch material ships.",
    targetOutcome: "Counsel-ready copy",
    dayOffsetInCycle: 2,
  },
  {
    slug: "founder-story-release",
    title: "Founder Story Release",
    positioning: "Publish the mission-first narrative and brand story on the investor microsite.",
    targetOutcome: "Top-of-funnel trust",
    dayOffsetInCycle: 6,
  },
  {
    slug: "product-proof-page",
    title: "Product Proof Page",
    positioning: "Launch the product and trust section with approved proof points and risk framing.",
    targetOutcome: "Product credibility",
    dayOffsetInCycle: 10,
  },
  {
    slug: "intermediary-shortlist",
    title: "Intermediary Shortlist",
    positioning: "Compare white-label and marketplace options for the regulated transaction layer.",
    targetOutcome: "Platform decision",
    dayOffsetInCycle: 14,
  },
  {
    slug: "non-binding-interest-capture",
    title: "Non-Binding Interest Capture",
    positioning: "Open the email signup and update list while keeping investment flow off-site.",
    targetOutcome: "Lead capture",
    dayOffsetInCycle: 18,
  },
  {
    slug: "investor-q-and-a",
    title: "Investor Q&A",
    positioning: "Prepare the intermediary-hosted public Q&A and founder response guidelines.",
    targetOutcome: "Question readiness",
    dayOffsetInCycle: 22,
  },
  {
    slug: "launch-day-checklist",
    title: "Launch Day Checklist",
    positioning: "Confirm the handoff, CTAs, and approved copy before the public announcement goes live.",
    targetOutcome: "Launch readiness",
    dayOffsetInCycle: 26,
  },
];

function toISODate(input: Date) {
  return input.toISOString().slice(0, 10);
}

function addDays(base: Date, days: number) {
  const copy = new Date(base);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function getCycleAnchorDate(reference: Date) {
  // Week 1 anchor: second week of September.
  const currentYearAnchor = new Date(reference.getFullYear(), 8, 8);
  currentYearAnchor.setHours(12, 0, 0, 0);

  if (reference >= currentYearAnchor) {
    return currentYearAnchor;
  }

  const previousYearAnchor = new Date(reference.getFullYear() - 1, 8, 8);
  previousYearAnchor.setHours(12, 0, 0, 0);
  return previousYearAnchor;
}

export function getMarketingCalendarEvents(rangeDays = 120): CalendarEventOccurrence[] {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const end = addDays(today, rangeDays);

  const occurrences: CalendarEventOccurrence[] = [];
  const anchor = getCycleAnchorDate(today);
  let cycleStart = new Date(anchor);
  let cycleNumber = 1;

  while (cycleStart < today) {
    cycleStart = addDays(cycleStart, FOUR_WEEK_DAYS);
    cycleNumber += 1;
  }

  while (cycleStart <= end) {
    for (const template of calendarEventTemplates) {
      const starts = addDays(cycleStart, template.dayOffsetInCycle);
      if (starts > end || starts < today) {
        continue;
      }
      const week = Math.floor(template.dayOffsetInCycle / 7) + 1;
      occurrences.push({
        ...template,
        startsOn: toISODate(starts),
        weekLabel: `Week ${week}`,
        cycleNumber,
      });
    }

    cycleStart = addDays(cycleStart, FOUR_WEEK_DAYS);
    cycleNumber += 1;
  }

  return occurrences.sort((a, b) => a.startsOn.localeCompare(b.startsOn));
}
