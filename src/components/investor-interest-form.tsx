"use client";

import { FormEvent, useState } from "react";

interface InvestorInterestFormProps {
  source?: string;
  page?: string;
}

export function InvestorInterestForm({
  source = "investor-microsite",
  page = "/offering",
}: InvestorInterestFormProps) {
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
      phone: String(form.get("phone") || "").trim(),
      notes: String(form.get("notes") || "").trim(),
      focus,
      source: `${source}:${focus}`,
      page,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        // Fallback if response is non-JSON
      }

      if (!response.ok) {
        setError(
          result?.error?.formErrors?.join(", ") ||
          result?.error ||
          "Unable to save your interest right now. Please try again."
        );
        setIsSubmitting(false);
        return;
      }

      event.currentTarget.reset();
      setMessage("Thank you. We will be in touch!");
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Network error. Please try again or reach out directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
      {message ? (
        <div className="rounded-xl border border-emerald-600/30 bg-emerald-500/10 p-4 text-center md:col-span-2">
          <p className="text-base font-semibold text-emerald-800">
            Thank you. We will be in touch!
          </p>
          <p className="mt-1 text-xs text-emerald-700">
            Your interest has been received by the team.
          </p>
        </div>
      ) : null}
      <input
        className="rounded-lg border border-black/15 bg-white px-3 py-2 text-obsidian placeholder:text-obsidian/40 focus:border-obsidian focus:outline-none"
        name="fullName"
        placeholder="Full name *"
        required
      />
      <input
        className="rounded-lg border border-black/15 bg-white px-3 py-2 text-obsidian placeholder:text-obsidian/40 focus:border-obsidian focus:outline-none"
        name="email"
        placeholder="Email address *"
        required
        type="email"
      />
      <input
        className="rounded-lg border border-black/15 bg-white px-3 py-2 text-obsidian placeholder:text-obsidian/40 focus:border-obsidian focus:outline-none"
        name="phone"
        placeholder="Phone number (optional)"
        type="tel"
      />
      <select
        className="rounded-lg border border-black/15 bg-white px-3 py-2 text-obsidian focus:border-obsidian focus:outline-none"
        defaultValue="investor-updates"
        name="focus"
      >
        <option value="investor-updates">Investor updates</option>
        <option value="launch-announcement">Launch announcement</option>
        <option value="community-events">Community events</option>
        <option value="accredited-inquiry">Accredited investor inquiry</option>
        <option value="partnership">Strategic partnership</option>
      </select>
      <textarea
        className="rounded-lg border border-black/15 bg-white px-3 py-2 text-obsidian placeholder:text-obsidian/40 focus:border-obsidian focus:outline-none md:col-span-2"
        name="notes"
        placeholder="Any specific questions or interest notes (optional)"
        rows={2}
      />
      <button
        className="rounded-lg bg-obsidian px-4 py-2.5 font-semibold text-white transition hover:bg-obsidian/90 disabled:opacity-50 md:col-span-2"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Submitting..." : "Get notified"}
      </button>
      <p className="text-xs text-obsidian/65 md:col-span-2">
        This is a non-binding interest form. No investment commitment is accepted on this site.
      </p>
      {error ? (
        <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700 md:col-span-2">
          {error}
        </div>
      ) : null}
    </form>
  );
}
