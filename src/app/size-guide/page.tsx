import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { Button } from "@/components/ui/Button";
import { lb } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Size chart, measurement guide, and fit notes for Maison SOTTOVOCE.",
};

const sizeChart = [
  { size: "XS", uk: "6", eu: "34", bust: "32", waist: "24", hip: "34" },
  { size: "S", uk: "8", eu: "36", bust: "34", waist: "26", hip: "36" },
  { size: "M", uk: "10", eu: "38", bust: "36", waist: "28", hip: "38" },
  { size: "L", uk: "12", eu: "40", bust: "38", waist: "30", hip: "40" },
  { size: "XL", uk: "14", eu: "42", bust: "40", waist: "32", hip: "42" },
];

const measurements = [
  { label: "Bust", note: "Measure around the fullest part of the bust, keeping the tape level." },
  { label: "Waist", note: "Measure around the narrowest part of the natural waist." },
  { label: "Hip", note: "Measure around the fullest part of the hips, about 20cm below the waist." },
];

export default function SizeGuidePage() {
  return (
    <>
      <PageHero
        kicker="The Fit"
        title="Size Guide"
        label="Sculpted Top"
        tone="sand"
        src={lb(22)}
        height="sm"
      />
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        {/* Chart */}
        <h2 className="editorial-heading text-2xl sm:text-3xl">Size Chart</h2>
        <p className="body-copy mt-3 text-sm">All measurements in inches.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/30">
                {["Size", "UK", "EU", "Bust", "Waist", "Hip"].map((h) => (
                  <th key={h} className="small-caps py-3 pr-4 text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row.size} className="border-b border-line">
                  <td className="product-title py-3 pr-4">{row.size}</td>
                  <td className="py-3 pr-4 text-sm text-muted">{row.uk}</td>
                  <td className="py-3 pr-4 text-sm text-muted">{row.eu}</td>
                  <td className="py-3 pr-4 text-sm text-muted">{row.bust}</td>
                  <td className="py-3 pr-4 text-sm text-muted">{row.waist}</td>
                  <td className="py-3 pr-4 text-sm text-muted">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement guide */}
        <h2 className="editorial-heading mt-16 text-2xl sm:text-3xl">How to Measure</h2>
        <dl className="mt-6 flex flex-col gap-5">
          {measurements.map((m) => (
            <div key={m.label} className="grid grid-cols-[6rem_1fr] gap-4">
              <dt className="small-caps text-ink">{m.label}</dt>
              <dd className="body-copy text-sm">{m.note}</dd>
            </div>
          ))}
        </dl>

        {/* Fit notes */}
        <h2 className="editorial-heading mt-16 text-2xl sm:text-3xl">Fit Notes</h2>
        <p className="body-copy mt-4">
          Most pieces are designed true to size. Structured styles — corsets and tailoring —
          hold their shape; size up for a softer fit. Bias-cut and jersey silhouettes skim the
          body and may be sized down for a closer line. Each product page includes its own fit
          note.
        </p>

        {/* CTA */}
        <div className="mt-12 border-t border-line pt-10 text-center">
          <p className="body-copy">Still unsure of your size?</p>
          <div className="mt-5">
            <Button href="/contact" variant="outline">
              Contact a Stylist
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
