"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cx } from "@/lib/format";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { SearchOverlay } from "./SearchOverlay";
import {
  SearchIcon,
  AccountIcon,
  HeartIcon,
  BagIcon,
  MenuIcon,
} from "@/components/ui/icons";

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-purple px-1 text-[0.55rem] font-medium text-ivory">
      {count}
    </span>
  );
}

export function SiteHeader() {
  const { count: bagCount, hydrated: cartHydrated, openCart } = useCart();
  const { count: wishCount, hydrated: wishHydrated } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = usePathname();
  // Transparent, ivory-on-hero chrome only over the home page's dark hero.
  const onHero = !scrolled && pathname === "/";
  const utility = (
    <div className={cx("flex items-center gap-4 sm:gap-5", onHero ? "text-ivory" : "text-ink")}>
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        aria-label="Search"
        className="hover:text-purple"
      >
        <SearchIcon />
      </button>
      <Link href="/account" aria-label="Account" className="hidden hover:text-purple sm:block">
        <AccountIcon />
      </Link>
      <Link href="/wishlist" aria-label="Wishlist" className="relative hidden hover:text-purple sm:block">
        <HeartIcon />
        {wishHydrated ? <CountBadge count={wishCount} /> : null}
      </Link>
      <button
        type="button"
        onClick={openCart}
        aria-label="Shopping bag"
        className="relative hover:text-purple"
      >
        <BagIcon />
        {cartHydrated ? <CountBadge count={bagCount} /> : null}
      </button>
    </div>
  );

  return (
    <>
      <header
        className={cx(
          "sticky top-0 z-40 border-b transition-colors duration-500",
          onHero
            ? "border-transparent bg-transparent"
            : "border-line bg-ivory/95 backdrop-blur-md",
        )}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          {/* Desktop */}
          <div className="hidden lg:block">
            <div
              className={cx(
                "flex items-center justify-between transition-all duration-300",
                scrolled ? "py-3" : "py-6",
              )}
            >
              <div className="flex-1">{/* spacer */}</div>
              <Link href="/" className="flex flex-1 flex-col items-center" aria-label="Maison Sottovoce home">
                <span className={cx("brand-kicker text-cream/70 transition-all", scrolled && "hidden")}>
                  Maison
                </span>
                <span
                  className={cx(
                    "brand-logo transition-all duration-300",
                    onHero ? "text-ivory" : "text-purple",
                    scrolled ? "text-2xl" : "text-4xl xl:text-5xl",
                  )}
                >
                  SOTTOVOCE
                </span>
                <span
                  className={cx(
                    "mt-1.5 text-[0.6rem] uppercase tracking-[0.26em] text-cream/60 transition-all",
                    scrolled && "hidden",
                  )}
                >
                  For every entrance worth remembering.
                </span>
              </Link>
              <div className="flex flex-1 justify-end">{utility}</div>
            </div>
            <div className={cx("transition-all", scrolled ? "pb-2.5" : "pb-4")}>
              <MainNav onHero={onHero} />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center justify-between py-3.5 lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={cx("transition-colors", onHero ? "text-ivory" : "text-ink hover:text-purple")}
            >
              <MenuIcon />
            </button>
            <Link href="/" className="flex flex-col items-center" aria-label="Maison Sottovoce home">
              <span className={cx("brand-logo text-xl transition-colors", onHero ? "text-ivory" : "text-purple")}>
                SOTTOVOCE
              </span>
            </Link>
            {utility}
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
