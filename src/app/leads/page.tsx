"use client";

import { FormEvent, useEffect, useState } from "react";
import { NavShell } from "@/components/nav-shell";

type LeadItem = {
  id: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  source?: string | null;
  stage: string;
  createdAt: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadLeads() {
    setError(null);
    const response = await fetch("/api/leads");
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Failed to load leads");
      return;
    }
    setLeads(payload.data || []);
  }

  useEffect(() => {
    void loadLeads();
  }, []);

  async function handleCreateLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") || ""),
      email: String(form.get("email") || "") || undefined,
      phone: String(form.get("phone") || "") || undefined,
      source: String(form.get("source") || "") || undefined,
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error?.formErrors?.join(", ") || result.error || "Failed to create lead");
      setIsSubmitting(false);
      return;
    }

    event.currentTarget.reset();
    await loadLeads();
    setIsSubmitting(false);
  }

  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Leads</h1>
      <p className="mt-3 text-obsidian/75">Lead workspace controls for intake, follow-up, and assignment.</p>

      <section className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Add Lead</h2>
        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={handleCreateLead}>
          <input
            className="rounded-lg border border-black/15 px-3 py-2"
            name="fullName"
            placeholder="Full name"
            required
          />
          <input className="rounded-lg border border-black/15 px-3 py-2" name="email" placeholder="Email" type="email" />
          <input className="rounded-lg border border-black/15 px-3 py-2" name="phone" placeholder="Phone" />
          <input className="rounded-lg border border-black/15 px-3 py-2" name="source" placeholder="Source (website, referral, etc.)" />
          <button className="rounded-lg bg-obsidian px-4 py-2 font-semibold text-white md:col-span-2" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating..." : "Create Lead"}
          </button>
        </form>
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      </section>

      <section className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Manual Lead Controls</h2>
        <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
          <li>Manual lead creation with name, contact, source, and notes.</li>
          <li>Stage updates, owner assignment, and next-action due dates.</li>
          <li>Bulk lead actions for stage and owner changes.</li>
          <li>Follow-up queue for call, text, and email tasks.</li>
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Current Leads</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-obsidian/70">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Source</th>
                <th className="py-2 pr-3">Stage</th>
                <th className="py-2 pr-3">Contact</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-black/5">
                  <td className="py-2 pr-3 font-medium">{lead.fullName}</td>
                  <td className="py-2 pr-3">{lead.source || "-"}</td>
                  <td className="py-2 pr-3 capitalize">{lead.stage}</td>
                  <td className="py-2 pr-3">{lead.email || lead.phone || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Agent CMO Lead Controls</h2>
        <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
          <li>Agent-suggested nurture sequence recommendations.</li>
          <li>Approval-required auto-prioritization of follow-ups.</li>
          <li>Outcome feedback loop for accepted recommendations.</li>
        </ul>
      </section>
    </NavShell>
  );
}
