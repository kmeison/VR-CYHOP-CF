import { NavShell } from "@/components/nav-shell";

export default function CyhopConceptPage() {
  return (
    <NavShell>
      <div className="mb-6">
        <h1 className="text-4xl font-semibold tracking-tight text-[#d77bff] sm:text-5xl">CYHOP CONCEPT</h1>
      </div>

      <section className="overflow-hidden rounded-[30px] border border-[#d77bff]/40 bg-[#090d1d] shadow-[0_28px_80px_rgba(2,6,23,0.45)]">
        <h2 className="px-6 pt-6 text-2xl font-semibold tracking-tight text-white md:px-8 md:pt-8 md:text-3xl">
          CYHOP Culture drives the New World Order
        </h2>
        <iframe
          className="mt-6 h-[2600px] w-full border-0 md:h-[3200px]"
          src="/media/cyhop-retail-page.html"
          title="CYHOP Culture and Retail Concept"
        />
      </section>
    </NavShell>
  );
}
