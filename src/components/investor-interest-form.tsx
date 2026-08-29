"use client";

import { FormEvent, useState } from "react";

export function InvestorInterestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    const form = new FormData(event.currentTarget);
    const focus = String(form.get("focus") || "investor-updates").trim();
    const payload = {
      fullName: String(form.get("fullName") || "").trim(),
      email: String(form.get("email") || "").trim(),
      source: `investor-microsite:${focus}`,
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      setError(result.error?.formErrors?.join(", ") || result.error || "Unable to save your interest right now.");
      setIsSubmitting(false);
      return;
    }

    event.currentTarget.reset();
    setMessage("Thanks — your non-binding interest has been captured for follow-up.");
    setIsSubmitting(false);
  }

  return (
    <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
      <input
        className="rounded-lg border border-black/15 px-3 py-2"
        name="fullName"
        placeholder="Full name"
        required
      />
      <input
        className="rounded-lg border border-black/15 px-3 py-2"
        name="email"
        placeholder="Email address"
        required
        type="email"
      />
      <select className="rounded-lg border border-black/15 px-3 py-2 md:col-span-2" defaultValue="investor-updates" name="focus">
        <option value="investor-updates">Investor updates</option>
        <option value="launch-announcement">Launch announcement</option>
        <option value="community-events">Community events</option>
      </select>
      <button
        className="rounded-lg bg-obsidian px-4 py-2 font-semibold text-white md:col-span-2"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Saving..." : "Get notified"}
      </button>
      <p className="text-xs text-obsidian/65 md:col-span-2">
        This is a non-binding interest form. No investment commitment is accepted on this site.
      </p>
      {message ? <p className="text-sm text-ivy md:col-span-2">{message}</p> : null}
      {error ? <p className="text-sm text-red-700 md:col-span-2">{error}</p> : null}
    </form>
  );
}
