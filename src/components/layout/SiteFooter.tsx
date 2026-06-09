"use client";

import Link from "next/link";
import {
  footerShop,
  footerMaison,
  footerCare,
  footerSocial,
  type NavItem,
} from "@/data/navigation";
import { NewsletterSection } from "@/components/home/NewsletterSection";

function FooterColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <h3 className="brand-kicker mb-4 text-ivory/60">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <li key={item.href}>
              {external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-cream/75 transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm text-cream/75 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <NewsletterSection />

      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <span className="brand-kicker block text-ivory/60">Maison</span>
            <span className="brand-logo mt-1 block text-3xl text-purple">SOTTOVOCE</span>
            <p className="body-copy mt-3 max-w-xs text-sm text-cream/70">
              For every entrance worth remembering.
            </p>
          </div>
          <FooterColumn title="Shop" items={footerShop} />
          <FooterColumn title="Maison" items={footerMaison} />
          <FooterColumn title="Customer Care" items={footerCare} />
          <FooterColumn title="Social" items={footerSocial} />
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line-dark pt-6 sm:flex-row">
          <p className="small-caps text-cream/50">
            © {new Date().getFullYear()} Maison SOTTOVOCE
          </p>
          <div className="flex gap-6">
            <Link href="/faq" className="small-caps text-cream/50 hover:text-gold">
              FAQ
            </Link>
            <Link href="/shipping-returns" className="small-caps text-cream/50 hover:text-gold">
              Shipping &amp; Returns
            </Link>
            <Link href="/size-guide" className="small-caps text-cream/50 hover:text-gold">
              Size Guide
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
