export type NavItem = { label: string; href: string };

/** Primary navigation — collection routes + About */
export const mainNav: NavItem[] = [
  { label: "New In", href: "/collections/new-in" },
  { label: "Dresses", href: "/collections/dresses" },
  { label: "Jumpsuits", href: "/collections/jumpsuits" },
  { label: "Tops", href: "/collections/tops" },
  { label: "Bottoms", href: "/collections/bottoms" },
  { label: "Sets", href: "/collections/sets" },
  { label: "Cocktail", href: "/collections/cocktail" },
  { label: "Evening", href: "/collections/evening" },
  { label: "About", href: "/about" },
];

export const footerShop: NavItem[] = [
  { label: "New In", href: "/collections/new-in" },
  { label: "Dresses", href: "/collections/dresses" },
  { label: "Jumpsuits", href: "/collections/jumpsuits" },
  { label: "Tops", href: "/collections/tops" },
  { label: "Bottoms", href: "/collections/bottoms" },
  { label: "Sets", href: "/collections/sets" },
  { label: "Cocktail", href: "/collections/cocktail" },
  { label: "Evening", href: "/collections/evening" },
];

export const footerMaison: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Brand Film", href: "/brand-film" },
  { label: "Journal", href: "/journal" },
  { label: "Personal Stylist", href: "/contact" },
];

export const footerCare: NavItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "FAQ", href: "/faq" },
  { label: "Track Order", href: "/account" },
];

export const footerSocial: NavItem[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "YouTube", href: "https://youtube.com" },
];
