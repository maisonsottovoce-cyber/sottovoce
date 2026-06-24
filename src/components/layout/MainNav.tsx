"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { cx } from "@/lib/format";

export function MainNav({ onHero = false }: { onHero?: boolean }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary">
      <ul className="flex items-center justify-center gap-7">
        {mainNav.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cx(
                  "nav-link link-underline py-1 transition-colors",
                  onHero
                    ? active
                      ? "text-gold"
                      : "text-ivory/85 hover:text-gold"
                    : active
                      ? "text-purple"
                      : "text-ink hover:text-purple",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
