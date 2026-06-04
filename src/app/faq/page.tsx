import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { lb } from "@/lib/asset";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers on orders, shipping, returns, sizing, and styling at Maison SOTTOVOCE.",
};

const groups: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "Orders",
    items: [
      { q: "How do I place an order?", a: "Add your pieces to the bag and proceed to checkout. Full checkout is arriving soon; for now your bag is saved on this device." },
      { q: "Can I amend or cancel my order?", a: "Contact client care within 24 hours of ordering and we'll do our best to amend before dispatch." },
    ],
  },
  {
    heading: "Shipping",
    items: [
      { q: "Is shipping really complimentary?", a: "Yes — all U.S. orders ship complimentary. International rates are calculated at checkout." },
      { q: "How long will delivery take?", a: "U.S. orders arrive within 3–5 business days. Express options will be available at checkout." },
    ],
  },
  {
    heading: "Returns",
    items: [
      { q: "What is your returns policy?", a: "Unworn pieces may be returned within 30 days of delivery, with tags attached, for a full refund." },
      { q: "Do you offer exchanges?", a: "Yes — exchanges for a different size or colour are complimentary within the U.S." },
    ],
  },
  {
    heading: "Sizing",
    items: [
      { q: "How do your pieces fit?", a: "Most pieces are true to size; each product page includes a specific fit note. See our Size Guide for measurements." },
      { q: "What if I'm between sizes?", a: "For structured pieces we suggest sizing up; for fluid silhouettes, take your usual size. Our stylists are happy to advise." },
    ],
  },
  {
    heading: "Styling",
    items: [
      { q: "Can I speak with a stylist?", a: "Of course. Email stylist@maisonsottovoce.com for a complimentary personal styling appointment." },
      { q: "How should I care for my pieces?", a: "Care instructions are listed on each product page under Fabric & Care. When in doubt, dry clean." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        kicker="Client Care"
        title="Frequently Asked"
        label="Boutique Hotel Editorial"
        tone="espresso"
        src={lb(40)}
        height="sm"
      />
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="flex flex-col gap-14">
          {groups.map((group) => (
            <div key={group.heading}>
              <h2 className="brand-kicker mb-2 text-purple">{group.heading}</h2>
              <Accordion>
                {group.items.map((item) => (
                  <AccordionItem key={item.q} title={item.q}>
                    {item.a}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
