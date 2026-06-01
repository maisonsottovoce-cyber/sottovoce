"use client";

import { useEffect } from "react";
import Link from "next/link";
import { mainNav, footerMaison, footerCare } from "@/data/navigation";
import { cx } from "@/lib/format";
import { CloseIcon } from "@/components/ui/icons";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <div className={cx("lg:hidden", open ? "" : "pointer-events-none")} aria-hidden={!open}>
      {/* overlay */}
      <div
        onClick={onClose}
        className={cx(
          "fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      {/* panel */}
      <div
        className={cx(
          "fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-ivory transition-transform duration-500 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="brand-logo text-lg text-purple">SOTTOVOCE</span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="text-ink">
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-line/60">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="editorial-heading block py-3.5 text-2xl text-ink hover:text-purple"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <span className="brand-kicker mb-3 block text-muted">Maison</span>
              <ul className="flex flex-col gap-2.5">
                {footerMaison.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={onClose} className="small-caps text-ink hover:text-purple">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="brand-kicker mb-3 block text-muted">Care</span>
              <ul className="flex flex-col gap-2.5">
                {footerCare.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={onClose} className="small-caps text-ink hover:text-purple">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
