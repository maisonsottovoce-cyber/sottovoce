"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { CartDrawer } from "@/components/commerce/CartDrawer";

/**
 * Renders the storefront chrome (announcement bar, header, footer, cart drawer)
 * around all pages except the admin dashboard, which has its own layout.
 * Storefront pages are passed in as server-rendered `children`.
 */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
