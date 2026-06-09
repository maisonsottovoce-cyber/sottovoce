/* ──────────────────────────────────────────────
   Mock product catalogue for Maison SOTTOVOCE.
   Replace with a Shopify/commerce source later — keep the
   `Product` shape and the helper selectors below stable so
   components don't need to change.
   ────────────────────────────────────────────── */

import { lb } from "@/lib/asset";

export type PlaceholderTone =
  | "ink"
  | "charcoal"
  | "espresso"
  | "twilight"
  | "sand"
  | "cream"
  | "purple";

export type ProductImage = {
  /** Editorial label shown on the placeholder; also used as alt text. */
  label: string;
  tone: PlaceholderTone;
  /** When real photography exists, set this to a /public path. */
  src?: string;
};

export type ColorOption = { name: string; hex: string };

export type CategorySlug =
  | "dresses"
  | "jumpsuits"
  | "tops"
  | "bottoms"
  | "sets";

export type Occasion =
  | "Cocktail"
  | "Evening"
  | "Dinner"
  | "Vacation"
  | "Day to Night"
  | "Event";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  color: string;
  availableColors: ColorOption[];
  sizes: string[];
  occasion: Occasion[];
  description: string;
  fit: string;
  fabricCare: string;
  stylistNote: string;
  images: ProductImage[];
  isNew?: boolean;
  isBestSeller?: boolean;
};

const SIZES_APPAREL = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    id: "p1",
    slug: "the-alessia-corset",
    name: "The Alessia Corset",
    category: "tops",
    price: 290,
    color: "Espresso",
    availableColors: [
      { name: "Espresso", hex: "#241B18" },
      { name: "Ivory", hex: "#FBF8F2" },
      { name: "Noir", hex: "#0E0D0B" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Cocktail", "Evening", "Event"],
    description:
      "A sculpted evening piece designed to hold shape without losing softness.",
    fit: "Fitted through the bodice with boned structure. Take your usual size; size up for a relaxed bust.",
    fabricCare: "72% recycled polyamide, 28% elastane. Dry clean only. Store flat.",
    stylistNote:
      "Wear it with tailored trousers for dinner, or with the matching skirt for an after-dark entrance.",
    images: [
      { label: "Evening Corset", tone: "espresso", src: lb(10) },
      { label: "Cocktail Evening", tone: "ink", src: lb(5) },
      { label: "Fabric Detail", tone: "sand" },
      { label: "Back View", tone: "charcoal" },
      { label: "Movement", tone: "twilight" },
    ],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "p2",
    slug: "the-roma-evening-dress",
    name: "The Roma Evening Dress",
    category: "dresses",
    price: 480,
    color: "Noir",
    availableColors: [
      { name: "Noir", hex: "#0E0D0B" },
      { name: "Deep Plum", hex: "#4B245C" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Evening", "Event"],
    description:
      "A floor-skimming column cut on the bias to trace the body and release at the walk.",
    fit: "True to size, lengthened for heels. The bias drape skims rather than clings.",
    fabricCare: "100% silk satin. Dry clean only.",
    stylistNote:
      "Let the silhouette speak — a single earring and a bare shoulder are enough.",
    images: [
      { label: "Evening Dress", tone: "ink", src: lb(4) },
      { label: "Boutique Hotel Editorial", tone: "charcoal", src: lb(41) },
      { label: "Silk Detail", tone: "espresso" },
      { label: "Back View", tone: "twilight" },
    ],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "p3",
    slug: "the-verona-tailored-jumpsuit",
    name: "The Verona Tailored Jumpsuit",
    category: "jumpsuits",
    price: 395,
    color: "Ink Black",
    availableColors: [
      { name: "Ink Black", hex: "#0E0D0B" },
      { name: "Sand", hex: "#C9B89F" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Cocktail", "Dinner", "Day to Night"],
    description:
      "A clean, wide-leg jumpsuit with an architectural shoulder and a deep, quiet neckline.",
    fit: "Relaxed through the leg, defined at the waist. Belted; take your usual size.",
    fabricCare: "94% wool, 6% elastane. Dry clean only.",
    stylistNote:
      "Day to night in one piece — flats and a blazer by day, heels and gold after dark.",
    images: [
      { label: "Tailored Jumpsuit", tone: "charcoal", src: lb(3) },
      { label: "European Balcony", tone: "espresso", src: lb(31) },
      { label: "Tailoring Detail", tone: "sand" },
      { label: "Back View", tone: "ink" },
    ],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "p4",
    slug: "the-lucia-denim-dress",
    name: "The Lucia Denim Dress",
    category: "dresses",
    price: 265,
    color: "Washed Indigo",
    availableColors: [
      { name: "Washed Indigo", hex: "#3a3f4b" },
      { name: "Ecru", hex: "#e7ddca" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Day to Night", "Vacation"],
    description:
      "Denim, reconsidered — a sculpted midi with a corseted seam and a soft, fluid hem.",
    fit: "Fitted bodice, A-line skirt. True to size.",
    fabricCare: "98% organic cotton, 2% elastane. Machine wash cold, hang dry.",
    stylistNote:
      "The case for elevated denim: wear it to lunch, keep it on through the evening.",
    images: [
      { label: "Denim Dress", tone: "sand", src: lb(12) },
      { label: "Terrace Afternoon", tone: "cream", src: lb(26) },
      { label: "Seam Detail", tone: "espresso" },
      { label: "Back View", tone: "charcoal" },
    ],
    isNew: true,
  },
  {
    id: "p5",
    slug: "the-bianca-satin-top",
    name: "The Bianca Satin Top",
    category: "tops",
    price: 175,
    color: "Champagne",
    availableColors: [
      { name: "Champagne", hex: "#e4d4ad" },
      { name: "Noir", hex: "#0E0D0B" },
      { name: "Ivory", hex: "#FBF8F2" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Cocktail", "Dinner", "Day to Night"],
    description:
      "A liquid bias camisole with a cowl that catches the light at the table.",
    fit: "Loose and fluid. Size down for a closer line.",
    fabricCare: "100% sandwashed silk. Hand wash cold or dry clean.",
    stylistNote: "Tuck into wide trousers, or layer beneath the Verona jumpsuit.",
    images: [
      { label: "Satin Top", tone: "sand", src: lb(9) },
      { label: "Cocktail Evening", tone: "twilight", src: lb(21) },
      { label: "Cowl Detail", tone: "espresso" },
      { label: "Back View", tone: "charcoal" },
    ],
    isNew: true,
  },
  {
    id: "p6",
    slug: "the-milano-wide-leg-trouser",
    name: "The Milano Wide-Leg Trouser",
    category: "bottoms",
    price: 245,
    color: "Ink Black",
    availableColors: [
      { name: "Ink Black", hex: "#0E0D0B" },
      { name: "Sand", hex: "#C9B89F" },
      { name: "Espresso", hex: "#241B18" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Dinner", "Day to Night", "Event"],
    description:
      "A high-waisted, column-clean trouser with a pressed crease and a fluid fall.",
    fit: "High rise, wide leg, full length for heels. Take your usual size.",
    fabricCare: "70% wool, 28% viscose, 2% elastane. Dry clean only.",
    stylistNote:
      "The foundation piece — pair with the Alessia corset for an effortless evening two-piece.",
    images: [
      { label: "Wide-Leg Trouser", tone: "charcoal", src: lb(26) },
      { label: "Restaurant Evening", tone: "ink", src: lb(12) },
      { label: "Fabric Detail", tone: "sand" },
      { label: "Back View", tone: "espresso" },
    ],
    isBestSeller: true,
  },
  {
    id: "p7",
    slug: "the-celeste-two-piece-set",
    name: "The Celeste Two-Piece Set",
    category: "sets",
    price: 420,
    color: "Ivory",
    availableColors: [
      { name: "Ivory", hex: "#FBF8F2" },
      { name: "Espresso", hex: "#241B18" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Cocktail", "Vacation", "Day to Night"],
    description:
      "A matched knit set — a cropped shell and a softly draped skirt that move as one.",
    fit: "Shell is fitted; skirt sits at the natural waist. True to size.",
    fabricCare: "Viscose-silk blend. Hand wash cold, dry flat.",
    stylistNote:
      "Wear together for coordinated ease, or break it apart across your wardrobe.",
    images: [
      { label: "Two-Piece Set", tone: "cream", src: lb(34) },
      { label: "European Balcony", tone: "sand", src: lb(30) },
      { label: "Knit Detail", tone: "espresso" },
      { label: "Back View", tone: "charcoal" },
    ],
    isNew: true,
  },
  {
    id: "p8",
    slug: "the-amara-cocktail-dress",
    name: "The Amara Cocktail Dress",
    category: "dresses",
    price: 360,
    color: "Deep Plum",
    availableColors: [
      { name: "Deep Plum", hex: "#4B245C" },
      { name: "Noir", hex: "#0E0D0B" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Cocktail", "Evening", "Event"],
    description:
      "A above-the-knee silhouette with a gathered waist and a softly structured shoulder.",
    fit: "Fitted waist, gentle flare. True to size.",
    fabricCare: "Triacetate-polyester crepe. Dry clean only.",
    stylistNote:
      "The cocktail-hour answer — sheer tights and a heel, nothing more.",
    images: [
      { label: "Cocktail Dress", tone: "purple", src: lb(17) },
      { label: "Cocktail Evening", tone: "ink", src: lb(14) },
      { label: "Crepe Detail", tone: "espresso" },
      { label: "Back View", tone: "twilight" },
    ],
    isBestSeller: true,
  },
  {
    id: "p9",
    slug: "the-sofia-sculpted-midi",
    name: "The Sofia Sculpted Midi",
    category: "dresses",
    price: 340,
    color: "Charcoal",
    availableColors: [
      { name: "Charcoal", hex: "#1A1715" },
      { name: "Sand", hex: "#C9B89F" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Dinner", "Day to Night", "Evening"],
    description:
      "A second-skin midi in compact jersey, ruched to sculpt and quietly hold.",
    fit: "Body-conscious and lined. Size up for a softer skim.",
    fabricCare: "Compact jersey. Hand wash cold, dry flat.",
    stylistNote: "A long coat over the shoulders turns it into an entrance.",
    images: [
      { label: "Sculpted Midi", tone: "charcoal", src: lb(22) },
      { label: "Boutique Hotel Editorial", tone: "ink", src: lb(2) },
      { label: "Jersey Detail", tone: "espresso" },
      { label: "Back View", tone: "twilight" },
    ],
    isNew: true,
  },
  {
    id: "p10",
    slug: "the-noa-evening-skirt",
    name: "The Noa Evening Skirt",
    category: "bottoms",
    price: 230,
    color: "Noir",
    availableColors: [
      { name: "Noir", hex: "#0E0D0B" },
      { name: "Champagne", hex: "#e4d4ad" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Evening", "Cocktail", "Event"],
    description:
      "A bias-cut maxi skirt that pools softly and moves with a liquid line.",
    fit: "Sits at the natural waist, floor length for heels. True to size.",
    fabricCare: "100% silk satin. Dry clean only.",
    stylistNote:
      "The Alessia corset and the Noa skirt — the Maison's quiet two-piece for evening.",
    images: [
      { label: "Evening Skirt", tone: "ink", src: lb(36) },
      { label: "Restaurant Evening", tone: "charcoal", src: lb(16) },
      { label: "Bias Detail", tone: "espresso" },
      { label: "Movement", tone: "twilight" },
    ],
  },
  {
    id: "p11",
    slug: "the-valentina-draped-top",
    name: "The Valentina Draped Top",
    category: "tops",
    price: 195,
    color: "Sand",
    availableColors: [
      { name: "Sand", hex: "#C9B89F" },
      { name: "Noir", hex: "#0E0D0B" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Dinner", "Day to Night", "Cocktail"],
    description:
      "An asymmetric draped shoulder in fluid crepe, sculptural yet barely there.",
    fit: "Relaxed with a single defined shoulder. True to size.",
    fabricCare: "Recycled crepe. Hand wash cold, dry flat.",
    stylistNote: "Pair with the Milano trouser for a sculptural evening line.",
    images: [
      { label: "Draped Top", tone: "sand", src: lb(23) },
      { label: "European Balcony", tone: "cream", src: lb(19) },
      { label: "Drape Detail", tone: "espresso" },
      { label: "Back View", tone: "charcoal" },
    ],
  },
  {
    id: "p12",
    slug: "the-capri-linen-set",
    name: "The Capri Linen Set",
    category: "sets",
    price: 310,
    color: "Ecru",
    availableColors: [
      { name: "Ecru", hex: "#e7ddca" },
      { name: "Sand", hex: "#C9B89F" },
    ],
    sizes: SIZES_APPAREL,
    occasion: ["Vacation", "Day to Night"],
    description:
      "A breathable linen shirt and trouser set for slow mornings and warm evenings.",
    fit: "Easy and relaxed throughout. Take your usual size.",
    fabricCare: "100% European linen. Machine wash cold, line dry.",
    stylistNote:
      "The travel uniform — open the shirt over a swimsuit by day, button it for dinner.",
    images: [
      { label: "Linen Set", tone: "cream", src: lb(7) },
      { label: "Terrace Afternoon", tone: "sand", src: lb(24) },
      { label: "Linen Detail", tone: "espresso" },
      { label: "Back View", tone: "charcoal" },
    ],
    isNew: true,
  },
];

/* ── Selectors (keep stable across data sources) ── */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getNewArrivals(limit?: number): Product[] {
  const list = products.filter((p) => p.isNew);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getBestSellers(limit?: number): Product[] {
  const list = products.filter((p) => p.isBestSeller);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aShared = a.occasion.filter((o) => product.occasion.includes(o)).length;
      const bShared = b.occasion.filter((o) => product.occasion.includes(o)).length;
      return bShared - aShared;
    })
    .slice(0, limit);
}

export function getCompleteTheLook(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .filter((p) => p.occasion.some((o) => product.occasion.includes(o)))
    .slice(0, limit);
}
