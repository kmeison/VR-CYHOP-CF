import { NavShell } from "@/components/nav-shell";

export default function PropertiesPage() {
  return (
    <NavShell>
      <h1 className="text-3xl font-bold">Properties</h1>
      <p className="mt-3 text-obsidian/75">
        Listings inventory and promotion status. Connect this view to the Property Prisma model.
      </p>
    </NavShell>
  );
}
