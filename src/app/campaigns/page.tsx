"use client";

import { FormEvent, useEffect, useState } from "react";
import { NavShell } from "@/components/nav-shell";

type CampaignItem = {
  id: string;
  name: string;
  channel: string;
  status: string;
  budget?: string | null;
  createdAt: string;
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadCampaigns() {
    setError(null);
    const response = await fetch("/api/campaigns");
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Failed to load campaigns");
      return;
    }
    setCampaigns(payload.data || []);
  }

  useEffect(() => {
    void loadCampaigns();
  }, []);

  async function handleCreateCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const budgetRaw = String(form.get("budget") || "").trim();
    const payload = {
      name: String(form.get("name") || ""),
      channel: String(form.get("channel") || "meta"),
      status: String(form.get("status") || "draft"),
      budget: budgetRaw ? Number(budgetRaw) : undefined,
    };

    const response = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error?.formErrors?.join(", ") || result.error || "Failed to create campaign");
      setIsSubmitting(false);
      return;
    }

    event.currentTarget.reset();
    await loadCampaigns();
    setIsSubmitting(false);
  }

  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Campaigns</h1>
      <p className="mt-3 text-obsidian/75">Campaign builder controls for manual execution and approval-driven operations.</p>

      <section className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Create Campaign</h2>
        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={handleCreateCampaign}>
          <input className="rounded-lg border border-black/15 px-3 py-2" name="name" placeholder="Campaign name" required />
          <select className="rounded-lg border border-black/15 px-3 py-2" name="channel" defaultValue="meta">
            <option value="meta">Meta</option>
            <option value="google">Google</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="organic">Organic</option>
          </select>
          <select className="rounded-lg border border-black/15 px-3 py-2" name="status" defaultValue="draft">
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
          <input
            className="rounded-lg border border-black/15 px-3 py-2"
            name="budget"
            placeholder="Budget (optional)"
            step="0.01"
            type="number"
          />
          <button className="rounded-lg bg-obsidian px-4 py-2 font-semibold text-white md:col-span-2" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating..." : "Create Campaign"}
          </button>
        </form>
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      </section>

      <section className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Manual Builder Controls</h2>
        <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
          <li>Choose channel, objective, audience, and campaign dates.</li>
          <li>Set budget, launch state, and status transitions (draft, active, paused).</li>
          <li>Draft or edit copy and associate content assets before launch.</li>
          <li>Pause/resume controls for in-flight campaigns.</li>
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Current Campaigns</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-obsidian/70">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Channel</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Budget</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-black/5">
                  <td className="py-2 pr-3 font-medium">{campaign.name}</td>
                  <td className="py-2 pr-3 uppercase">{campaign.channel}</td>
                  <td className="py-2 pr-3 capitalize">{campaign.status}</td>
                  <td className="py-2 pr-3">{campaign.budget ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Agent Collaboration Controls</h2>
        <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
          <li>Allow agent recommendations to enter review queue.</li>
          <li>Accept, edit, or reject proposed campaign actions.</li>
          <li>Require approval before publish or spend activation.</li>
        </ul>
      </section>
    </NavShell>
  );
}
