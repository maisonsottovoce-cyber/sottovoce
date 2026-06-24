"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

/**
 * Renders the storefront chrome (announcement bar, header, footer, cart drawer)
 * around all pages except the admin dashboard, which has its own layout.
 * Storefront pages are passed in as server-rendered `children`.
 */
export function ChromeGate({
  children,
  announcement,
}: {
  children: ReactNode;
  announcement?: { text: string; enabled: boolean };
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <SmoothScroll />
      <AnnouncementBar text={announcement?.text} enabled={announcement?.enabled} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
