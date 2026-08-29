import { NavShell } from "@/components/nav-shell";

export default function SettingsPage() {
  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-3 text-obsidian/75">Brand, integrations, and safety controls for manual and autonomous operations.</p>

      <section className="mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Manual Configuration Controls</h2>
        <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
          <li>Organization profile, channel defaults, and tone preferences.</li>
          <li>API keys and integration settings for CRM and ad channels.</li>
          <li>Role-based permissions and team access controls.</li>
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Agent Guardrails</h2>
        <ul className="mt-3 space-y-2 text-sm text-obsidian/80">
          <li>Approval requirements before send, publish, or spend.</li>
          <li>Daily and campaign-level budget caps.</li>
          <li>Confidence threshold and excluded channels or audiences.</li>
        </ul>
      </section>
    </NavShell>
  );
}
