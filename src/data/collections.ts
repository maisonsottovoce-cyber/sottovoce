import {
  products,
  type Product,
  type PlaceholderTone,
} from "./products";

export type Collection = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  heroLabel: string;
  heroTone: PlaceholderTone;
};

export const collections: Collection[] = [
  {
    slug: "new-in",
    title: "New In",
    kicker: "The latest silhouettes",
    description: "Silhouettes made for the next invitation — the newest arrivals to the Maison.",
    heroLabel: "New In Editorial",
    heroTone: "charcoal",
  },
  {
    slug: "dresses",
    title: "Dresses",
    kicker: "For entrances and evenings",
    description: "Silhouettes for the entrance, the dinner, the evening after.",
    heroLabel: "Evening Dress Editorial",
    heroTone: "ink",
  },
  {
    slug: "jumpsuits",
    title: "Jumpsuits",
    kicker: "Tailored ease",
    description: "One considered piece, from the reservation to the rooftop.",
    heroLabel: "Tailored Jumpsuit",
    heroTone: "espresso",
  },
  {
    slug: "tops",
    title: "Tops",
    kicker: "Sculpted statements",
    description: "Corsets, camisoles and draped shoulders — the quiet centre of an evening look.",
    heroLabel: "Sculpted Top",
    heroTone: "sand",
  },
  {
    slug: "bottoms",
    title: "Bottoms",
    kicker: "Refined foundations",
    description: "Column trousers and bias skirts to build the rest of the wardrobe around.",
    heroLabel: "Refined Tailoring",
    heroTone: "charcoal",
  },
  {
    slug: "sets",
    title: "Sets",
    kicker: "Effortless coordination",
    description: "Matched pieces designed to move as one — or to live apart.",
    heroLabel: "Coordinated Set",
    heroTone: "cream",
  },
  {
    slug: "cocktail",
    title: "Cocktail",
    kicker: "After dark, softly",
    description: "The cocktail-hour edit — for the room, the reservation, the first drink.",
    heroLabel: "Cocktail Evening",
    heroTone: "twilight",
  },
  {
    slug: "evening",
    title: "Evening",
    kicker: "After-dark silhouettes",
    description: "Full-length silhouettes for the evenings worth remembering.",
    heroLabel: "Evening Editorial",
    heroTone: "ink",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProducts(slug: string): Product[] {
  switch (slug) {
    case "new-in":
      return products.filter((p) => p.isNew);
    case "cocktail":
      return products.filter((p) => p.occasion.includes("Cocktail"));
    case "evening":
      return products.filter((p) => p.occasion.includes("Evening"));
    case "dresses":
    case "jumpsuits":
    case "tops":
    case "bottoms":
    case "sets":
      return products.filter((p) => p.category === slug);
    default:
      return [];
  }
}

/** Occasion edits used by the "Shop by Occasion" section. */
export type OccasionEdit = {
  title: string;
  caption: string;
  href: string;
  tone: PlaceholderTone;
  label: string;
};

export const occasionEdits: OccasionEdit[] = [
  { title: "The Cocktail Edit", caption: "After dark, softly", href: "/collections/cocktail", tone: "twilight", label: "Cocktail Evening" },
  { title: "The Dinner Reservation", caption: "For the table", href: "/collections/dresses", tone: "espresso", label: "Restaurant Evening" },
  { title: "The Evening Edit", caption: "Full-length silhouettes", href: "/collections/evening", tone: "ink", label: "Evening Editorial" },
  { title: "The Hotel Edit", caption: "A quiet arrival", href: "/collections/sets", tone: "charcoal", label: "Boutique Hotel Editorial" },
  { title: "The Terrace Edit", caption: "Warm-weather ease", href: "/collections/jumpsuits", tone: "sand", label: "European Balcony" },
  { title: "The Entrance Edit", caption: "Never forgotten", href: "/collections/new-in", tone: "purple", label: "The Entrance" },
];
