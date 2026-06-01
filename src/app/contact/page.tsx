import type { Metadata } from "next";
import { footerSocial } from "@/data/navigation";
import { PageHero } from "@/components/content/PageHero";
import { ContactForm } from "@/components/content/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the Maison SOTTOVOCE client care team and personal styling service.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Client Care"
        title="Contact"
        description="However we can help — an order, a fitting, or a styling question."
        label="Boutique Hotel Editorial"
        tone="charcoal"
        height="sm"
      />
      <section className="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:grid-cols-2 lg:gap-20">
        <div>
          <span className="brand-kicker text-purple">We&apos;re here</span>
          <h2 className="editorial-heading mt-3 text-3xl">Client Care</h2>
          <p className="body-copy mt-5">
            Our team is available Monday to Friday, 9am–6pm EST. We respond to all enquiries
            within two business days.
          </p>
          <dl className="mt-8 flex flex-col gap-5">
            <div>
              <dt className="small-caps text-muted">Email</dt>
              <dd className="mt-1">
                <a href="mailto:care@maisonsottovoce.com" className="link-underline text-ink hover:text-purple">
                  care@maisonsottovoce.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="small-caps text-muted">Personal Styling</dt>
              <dd className="mt-1">
                <a href="mailto:stylist@maisonsottovoce.com" className="link-underline text-ink hover:text-purple">
                  stylist@maisonsottovoce.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="small-caps text-muted">Follow</dt>
              <dd className="mt-2 flex gap-5">
                {footerSocial.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="small-caps text-ink hover:text-purple"
                  >
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
