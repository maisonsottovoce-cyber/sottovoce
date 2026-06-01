import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { Divider } from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Complimentary U.S. shipping, delivery timing, returns and exchanges at Maison SOTTOVOCE.",
};

const blocks = [
  {
    title: "Complimentary Shipping",
    body: "All U.S. orders ship complimentary, beautifully packaged in Maison SOTTOVOCE wrapping. International shipping is calculated at checkout based on destination.",
  },
  {
    title: "Delivery Timing",
    body: "Orders are dispatched within 1–2 business days. U.S. delivery takes 3–5 business days; express options will be offered at checkout. You'll receive tracking as soon as your order ships.",
  },
  {
    title: "Returns",
    body: "We accept returns of unworn pieces within 30 days of delivery, with original tags attached. Refunds are issued to the original payment method within 5–7 business days of receipt.",
  },
  {
    title: "Exchanges",
    body: "Complimentary exchanges for a different size or colour are available within the U.S. Simply request an exchange through client care and we'll arrange the rest.",
  },
];

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHero
        kicker="Client Care"
        title="Shipping & Returns"
        label="European Balcony"
        tone="charcoal"
        height="sm"
      />
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="flex flex-col">
          {blocks.map((b, i) => (
            <div key={b.title}>
              {i > 0 ? <Divider className="my-10" /> : null}
              <h2 className="editorial-heading text-2xl sm:text-3xl">{b.title}</h2>
              <p className="body-copy mt-4">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
