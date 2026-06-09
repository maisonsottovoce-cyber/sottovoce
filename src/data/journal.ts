import { lb } from "@/lib/asset";
import type { PlaceholderTone } from "./products";

export type JournalArticle = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  tone: PlaceholderTone;
  cover: string;
  /** Linked product slugs for in-article callouts. */
  productSlugs: string[];
  /** Paragraphs of body copy. */
  body: string[];
};

export const journal: JournalArticle[] = [
  {
    slug: "the-cocktail-edit",
    title: "The Cocktail Edit",
    category: "Styling",
    date: "May 2026",
    excerpt:
      "How to dress for the hour between arrival and the first drink — softly, and with intent.",
    tone: "twilight",
    cover: lb(27),
    productSlugs: ["the-amara-cocktail-dress", "the-alessia-corset", "the-bianca-satin-top"],
    body: [
      "There is a particular hour — after the day has closed and before the evening fully begins — when a room is at its most attentive. The cocktail hour rewards restraint. It is not the place for the loudest dress, but for the most considered one.",
      "Begin with a single sculpted piece: a corset, a draped shoulder, a gathered waist. Let the silhouette do the work, and keep everything else quiet. A heel, sheer tights, one earring left at home.",
      "The Maison's cocktail edit is built around pieces that hold their shape through a long evening — fabrics that move when you move, and settle when you stand still.",
    ],
  },
  {
    slug: "dressing-for-a-dinner-reservation",
    title: "How to Dress for a Dinner Reservation",
    category: "Styling",
    date: "April 2026",
    excerpt:
      "The reservation is a stage. Here is how to arrive at the table already at ease.",
    tone: "espresso",
    cover: lb(41),
    productSlugs: ["the-milano-wide-leg-trouser", "the-bianca-satin-top", "the-sofia-sculpted-midi"],
    body: [
      "A dinner reservation asks for something between day and evening — polished enough for the room, easy enough to sit, linger, and stay past dessert.",
      "We favour a column trouser and a liquid top: the Milano with the Bianca, a line that reads elegant from across the room and feels effortless up close.",
      "Choose pieces you can wear from the aperitivo to the last espresso without a second thought. The best evening clothes are the ones you forget you're wearing.",
    ],
  },
  {
    slug: "the-hotel-edit",
    title: "The Hotel Edit",
    category: "Travel",
    date: "March 2026",
    excerpt:
      "A weekend wardrobe for boutique hotels, slow mornings, and balconies above the city.",
    tone: "charcoal",
    cover: lb(7),
    productSlugs: ["the-capri-linen-set", "the-celeste-two-piece-set", "the-verona-tailored-jumpsuit"],
    body: [
      "Packing for a boutique hotel is an exercise in editing. The aim is a small wardrobe that moves through every hour: breakfast on the terrace, an afternoon in the city, dinner downstairs.",
      "Sets earn their place — matched pieces that travel as one outfit and live as several. Linen by day, knit by evening, tailoring for the night you decide to stay out.",
      "Pack less. Choose pieces that work together. Leave room in the case for the things you'll find.",
    ],
  },
  {
    slug: "day-to-night-silhouettes",
    title: "Day to Night Silhouettes",
    category: "Styling",
    date: "February 2026",
    excerpt:
      "The pieces that carry you from a working afternoon to an unplanned evening.",
    tone: "ink",
    cover: lb(3),
    productSlugs: ["the-verona-tailored-jumpsuit", "the-lucia-denim-dress", "the-sofia-sculpted-midi"],
    body: [
      "The most useful pieces in a wardrobe are the ones that don't ask to be changed. A jumpsuit that reads sharp by day and soft by night. A midi that moves from desk to dinner with a change of shoe.",
      "Build day-to-night around one strong silhouette and let accessories do the shifting — flats and a blazer become heels and gold without a stop at home.",
      "Quiet confidence is knowing you're dressed for whatever the evening becomes.",
    ],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journal.find((a) => a.slug === slug);
}
