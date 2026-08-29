type StatCardProps = {
  label: string;
  value: string;
  hint: string;
};

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <article className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-obsidian/60">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-obsidian/70">{hint}</p>
    </article>
  );
}
