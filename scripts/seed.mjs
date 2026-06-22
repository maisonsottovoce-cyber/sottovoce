/**
 * Seed Supabase with the original 12 dresses + their lookbook photos.
 * Run once after creating the Supabase project and applying schema.sql:
 *
 *   node --env-file=.env.local scripts/seed.mjs
 *
 * Idempotent: upserts by slug and replaces each product's images.
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "product-images";
const LOOKBOOK = path.resolve("public/images/lookbook");

if (!URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  console.error("Run with: node --env-file=.env.local scripts/seed.mjs");
  process.exit(1);
}

const db = createClient(URL, SERVICE_KEY, { auth: { persistSession: false } });

const SIZES = ["XS", "S", "M", "L", "XL"];
const C = {
  espresso: { name: "Espresso", hex: "#241B18" },
  ivory: { name: "Ivory", hex: "#FBF8F2" },
  noir: { name: "Noir", hex: "#0E0D0B" },
  plum: { name: "Deep Plum", hex: "#4B245C" },
  ink: { name: "Ink Black", hex: "#0E0D0B" },
  sand: { name: "Sand", hex: "#C9B89F" },
  champagne: { name: "Champagne", hex: "#e4d4ad" },
  indigo: { name: "Washed Indigo", hex: "#3a3f4b" },
  ecru: { name: "Ecru", hex: "#e7ddca" },
  charcoal: { name: "Charcoal", hex: "#1A1715" },
};

const products = [
  { slug: "the-alessia-corset", name: "The Alessia Corset", category: "tops", price: 290, color: "Espresso", availableColors: [C.espresso, C.ivory, C.noir], occasion: ["Cocktail", "Evening", "Event"], description: "A sculpted evening piece designed to hold shape without losing softness.", fit: "Fitted through the bodice with boned structure. Take your usual size; size up for a relaxed bust.", fabricCare: "72% recycled polyamide, 28% elastane. Dry clean only. Store flat.", stylistNote: "Wear it with tailored trousers for dinner, or with the matching skirt for an after-dark entrance.", isNew: true, isBestSeller: true, files: ["img_10.jpg", "img_05.jpg"] },
  { slug: "the-roma-evening-dress", name: "The Roma Evening Dress", category: "dresses", price: 480, color: "Noir", availableColors: [C.noir, C.plum], occasion: ["Evening", "Event"], description: "A floor-skimming column cut on the bias to trace the body and release at the walk.", fit: "True to size, lengthened for heels. The bias drape skims rather than clings.", fabricCare: "100% silk satin. Dry clean only.", stylistNote: "Let the silhouette speak — a single earring and a bare shoulder are enough.", isNew: true, isBestSeller: true, files: ["img_04.jpg", "img_41.jpg"] },
  { slug: "the-verona-tailored-jumpsuit", name: "The Verona Tailored Jumpsuit", category: "jumpsuits", price: 395, color: "Ink Black", availableColors: [C.ink, C.sand], occasion: ["Cocktail", "Dinner", "Day to Night"], description: "A clean, wide-leg jumpsuit with an architectural shoulder and a deep, quiet neckline.", fit: "Relaxed through the leg, defined at the waist. Belted; take your usual size.", fabricCare: "94% wool, 6% elastane. Dry clean only.", stylistNote: "Day to night in one piece — flats and a blazer by day, heels and gold after dark.", isNew: true, isBestSeller: true, files: ["img_03.jpg", "img_31.jpg"] },
  { slug: "the-lucia-denim-dress", name: "The Lucia Denim Dress", category: "dresses", price: 265, color: "Washed Indigo", availableColors: [C.indigo, C.ecru], occasion: ["Day to Night", "Vacation"], description: "Denim, reconsidered — a sculpted midi with a corseted seam and a soft, fluid hem.", fit: "Fitted bodice, A-line skirt. True to size.", fabricCare: "98% organic cotton, 2% elastane. Machine wash cold, hang dry.", stylistNote: "The case for elevated denim: wear it to lunch, keep it on through the evening.", isNew: true, isBestSeller: false, files: ["img_12.jpg", "img_26.jpg"] },
  { slug: "the-bianca-satin-top", name: "The Bianca Satin Top", category: "tops", price: 175, color: "Champagne", availableColors: [C.champagne, C.noir, C.ivory], occasion: ["Cocktail", "Dinner", "Day to Night"], description: "A liquid bias camisole with a cowl that catches the light at the table.", fit: "Loose and fluid. Size down for a closer line.", fabricCare: "100% sandwashed silk. Hand wash cold or dry clean.", stylistNote: "Tuck into wide trousers, or layer beneath the Verona jumpsuit.", isNew: true, isBestSeller: false, files: ["img_09.jpg", "img_21.jpg"] },
  { slug: "the-milano-wide-leg-trouser", name: "The Milano Wide-Leg Trouser", category: "bottoms", price: 245, color: "Ink Black", availableColors: [C.ink, C.sand, C.espresso], occasion: ["Dinner", "Day to Night", "Event"], description: "A high-waisted, column-clean trouser with a pressed crease and a fluid fall.", fit: "High rise, wide leg, full length for heels. Take your usual size.", fabricCare: "70% wool, 28% viscose, 2% elastane. Dry clean only.", stylistNote: "The foundation piece — pair with the Alessia corset for an effortless evening two-piece.", isNew: false, isBestSeller: true, files: ["img_26.jpg", "img_12.jpg"] },
  { slug: "the-celeste-two-piece-set", name: "The Celeste Two-Piece Set", category: "sets", price: 420, color: "Ivory", availableColors: [C.ivory, C.espresso], occasion: ["Cocktail", "Vacation", "Day to Night"], description: "A matched knit set — a cropped shell and a softly draped skirt that move as one.", fit: "Shell is fitted; skirt sits at the natural waist. True to size.", fabricCare: "Viscose-silk blend. Hand wash cold, dry flat.", stylistNote: "Wear together for coordinated ease, or break it apart across your wardrobe.", isNew: true, isBestSeller: false, files: ["img_34.jpg", "img_30.jpg"] },
  { slug: "the-amara-cocktail-dress", name: "The Amara Cocktail Dress", category: "dresses", price: 360, color: "Deep Plum", availableColors: [C.plum, C.noir], occasion: ["Cocktail", "Evening", "Event"], description: "An above-the-knee silhouette with a gathered waist and a softly structured shoulder.", fit: "Fitted waist, gentle flare. True to size.", fabricCare: "Triacetate-polyester crepe. Dry clean only.", stylistNote: "The cocktail-hour answer — sheer tights and a heel, nothing more.", isNew: false, isBestSeller: true, files: ["img_17.jpg", "img_14.jpg"] },
  { slug: "the-sofia-sculpted-midi", name: "The Sofia Sculpted Midi", category: "dresses", price: 340, color: "Charcoal", availableColors: [C.charcoal, C.sand], occasion: ["Dinner", "Day to Night", "Evening"], description: "A second-skin midi in compact jersey, ruched to sculpt and quietly hold.", fit: "Body-conscious and lined. Size up for a softer skim.", fabricCare: "Compact jersey. Hand wash cold, dry flat.", stylistNote: "A long coat over the shoulders turns it into an entrance.", isNew: true, isBestSeller: false, files: ["img_22.jpg", "img_02.jpg"] },
  { slug: "the-noa-evening-skirt", name: "The Noa Evening Skirt", category: "bottoms", price: 230, color: "Noir", availableColors: [C.noir, C.champagne], occasion: ["Evening", "Cocktail", "Event"], description: "A bias-cut maxi skirt that pools softly and moves with a liquid line.", fit: "Sits at the natural waist, floor length for heels. True to size.", fabricCare: "100% silk satin. Dry clean only.", stylistNote: "The Alessia corset and the Noa skirt — the Maison's quiet two-piece for evening.", isNew: false, isBestSeller: false, files: ["img_36.jpg", "img_16.jpg"] },
  { slug: "the-valentina-draped-top", name: "The Valentina Draped Top", category: "tops", price: 195, color: "Sand", availableColors: [C.sand, C.noir], occasion: ["Dinner", "Day to Night", "Cocktail"], description: "An asymmetric draped shoulder in fluid crepe, sculptural yet barely there.", fit: "Relaxed with a single defined shoulder. True to size.", fabricCare: "Recycled crepe. Hand wash cold, dry flat.", stylistNote: "Pair with the Milano trouser for a sculptural evening line.", isNew: false, isBestSeller: false, files: ["img_23.jpg", "img_19.jpg"] },
  { slug: "the-capri-linen-set", name: "The Capri Linen Set", category: "sets", price: 310, color: "Ecru", availableColors: [C.ecru, C.sand], occasion: ["Vacation", "Day to Night"], description: "A breathable linen shirt and trouser set for slow mornings and warm evenings.", fit: "Easy and relaxed throughout. Take your usual size.", fabricCare: "100% European linen. Machine wash cold, line dry.", stylistNote: "The travel uniform — open the shirt over a swimsuit by day, button it for dinner.", isNew: true, isBestSeller: false, files: ["img_07.jpg", "img_24.jpg"] },
];

// Local /public path for a lookbook image — used as the hero/cover URL for
// seeded collections, occasion tiles and journal covers (the files already
// ship in /public; the admin replaces them with Storage uploads when editing).
const lb = (n) => `/images/lookbook/img_${String(n).padStart(2, "0")}.jpg`;

const collections = [
  { slug: "new-in", title: "New In", kicker: "The latest silhouettes", description: "Silhouettes made for the next invitation — the newest arrivals to the Maison.", heroLabel: "New In Editorial", heroTone: "charcoal", heroImageUrl: lb(27) },
  { slug: "dresses", title: "Dresses", kicker: "For entrances and evenings", description: "Silhouettes for the entrance, the dinner, the evening after.", heroLabel: "Evening Dress Editorial", heroTone: "ink", heroImageUrl: lb(8) },
  { slug: "jumpsuits", title: "Jumpsuits", kicker: "Tailored ease", description: "One considered piece, from the reservation to the rooftop.", heroLabel: "Tailored Jumpsuit", heroTone: "espresso", heroImageUrl: lb(31) },
  { slug: "tops", title: "Tops", kicker: "Sculpted statements", description: "Corsets, camisoles and draped shoulders — the quiet centre of an evening look.", heroLabel: "Sculpted Top", heroTone: "sand", heroImageUrl: lb(9) },
  { slug: "bottoms", title: "Bottoms", kicker: "Refined foundations", description: "Column trousers and bias skirts to build the rest of the wardrobe around.", heroLabel: "Refined Tailoring", heroTone: "charcoal", heroImageUrl: lb(26) },
  { slug: "sets", title: "Sets", kicker: "Effortless coordination", description: "Matched pieces designed to move as one — or to live apart.", heroLabel: "Coordinated Set", heroTone: "cream", heroImageUrl: lb(34) },
  { slug: "cocktail", title: "Cocktail", kicker: "After dark, softly", description: "The cocktail-hour edit — for the room, the reservation, the first drink.", heroLabel: "Cocktail Evening", heroTone: "twilight", heroImageUrl: lb(17) },
  { slug: "evening", title: "Evening", kicker: "After-dark silhouettes", description: "Full-length silhouettes for the evenings worth remembering.", heroLabel: "Evening Editorial", heroTone: "ink", heroImageUrl: lb(4) },
];

const occasionEdits = [
  { title: "The Cocktail Edit", caption: "After dark, softly", href: "/collections/cocktail", tone: "twilight", label: "Cocktail Evening", imageUrl: lb(17) },
  { title: "The Dinner Reservation", caption: "For the table", href: "/collections/dresses", tone: "espresso", label: "Restaurant Evening", imageUrl: lb(41) },
  { title: "The Evening Edit", caption: "Full-length silhouettes", href: "/collections/evening", tone: "ink", label: "Evening Editorial", imageUrl: lb(4) },
  { title: "The Hotel Edit", caption: "A quiet arrival", href: "/collections/sets", tone: "charcoal", label: "Boutique Hotel Editorial", imageUrl: lb(33) },
  { title: "The Terrace Edit", caption: "Warm-weather ease", href: "/collections/jumpsuits", tone: "sand", label: "European Balcony", imageUrl: lb(16) },
  { title: "The Entrance Edit", caption: "Never forgotten", href: "/collections/new-in", tone: "purple", label: "The Entrance", imageUrl: lb(29) },
];

const journal = [
  { slug: "the-cocktail-edit", title: "The Cocktail Edit", category: "Styling", dateLabel: "May 2026", excerpt: "How to dress for the hour between arrival and the first drink — softly, and with intent.", tone: "twilight", coverUrl: lb(27), productSlugs: ["the-amara-cocktail-dress", "the-alessia-corset", "the-bianca-satin-top"], body: ["There is a particular hour — after the day has closed and before the evening fully begins — when a room is at its most attentive. The cocktail hour rewards restraint. It is not the place for the loudest dress, but for the most considered one.", "Begin with a single sculpted piece: a corset, a draped shoulder, a gathered waist. Let the silhouette do the work, and keep everything else quiet. A heel, sheer tights, one earring left at home.", "The Maison's cocktail edit is built around pieces that hold their shape through a long evening — fabrics that move when you move, and settle when you stand still."] },
  { slug: "dressing-for-a-dinner-reservation", title: "How to Dress for a Dinner Reservation", category: "Styling", dateLabel: "April 2026", excerpt: "The reservation is a stage. Here is how to arrive at the table already at ease.", tone: "espresso", coverUrl: lb(41), productSlugs: ["the-milano-wide-leg-trouser", "the-bianca-satin-top", "the-sofia-sculpted-midi"], body: ["A dinner reservation asks for something between day and evening — polished enough for the room, easy enough to sit, linger, and stay past dessert.", "We favour a column trouser and a liquid top: the Milano with the Bianca, a line that reads elegant from across the room and feels effortless up close.", "Choose pieces you can wear from the aperitivo to the last espresso without a second thought. The best evening clothes are the ones you forget you're wearing."] },
  { slug: "the-hotel-edit", title: "The Hotel Edit", category: "Travel", dateLabel: "March 2026", excerpt: "A weekend wardrobe for boutique hotels, slow mornings, and balconies above the city.", tone: "charcoal", coverUrl: lb(7), productSlugs: ["the-capri-linen-set", "the-celeste-two-piece-set", "the-verona-tailored-jumpsuit"], body: ["Packing for a boutique hotel is an exercise in editing. The aim is a small wardrobe that moves through every hour: breakfast on the terrace, an afternoon in the city, dinner downstairs.", "Sets earn their place — matched pieces that travel as one outfit and live as several. Linen by day, knit by evening, tailoring for the night you decide to stay out.", "Pack less. Choose pieces that work together. Leave room in the case for the things you'll find."] },
  { slug: "day-to-night-silhouettes", title: "Day to Night Silhouettes", category: "Styling", dateLabel: "February 2026", excerpt: "The pieces that carry you from a working afternoon to an unplanned evening.", tone: "ink", coverUrl: lb(3), productSlugs: ["the-verona-tailored-jumpsuit", "the-lucia-denim-dress", "the-sofia-sculpted-midi"], body: ["The most useful pieces in a wardrobe are the ones that don't ask to be changed. A jumpsuit that reads sharp by day and soft by night. A midi that moves from desk to dinner with a change of shoe.", "Build day-to-night around one strong silhouette and let accessories do the shifting — flats and a blazer become heels and gold without a stop at home.", "Quiet confidence is knowing you're dressed for whatever the evening becomes."] },
];

const contentType = (f) => (f.endsWith(".png") ? "image/png" : "image/jpeg");

async function uploadImage(slug, file) {
  const buffer = fs.readFileSync(path.join(LOOKBOOK, file));
  const key = `${slug}/${file}`;
  const { error } = await db.storage
    .from(BUCKET)
    .upload(key, buffer, { contentType: contentType(file), upsert: true });
  if (error) throw new Error(`upload ${key}: ${error.message}`);
  return db.storage.from(BUCKET).getPublicUrl(key).data.publicUrl;
}

async function seedProducts() {
  for (let idx = 0; idx < products.length; idx++) {
    const p = products[idx];
    const { data: up, error: upErr } = await db
      .from("products")
      .upsert(
        {
          slug: p.slug,
          name: p.name,
          category: p.category,
          price: p.price,
          color: p.color,
          available_colors: p.availableColors,
          sizes: SIZES,
          occasion: p.occasion,
          description: p.description,
          fit: p.fit,
          fabric_care: p.fabricCare,
          stylist_note: p.stylistNote,
          sort_order: idx,
          is_new: p.isNew,
          is_best_seller: p.isBestSeller,
          published: true,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();
    if (upErr) throw new Error(`product ${p.slug}: ${upErr.message}`);

    await db.from("product_images").delete().eq("product_id", up.id);
    const rows = [];
    for (let i = 0; i < p.files.length; i++) {
      const url = await uploadImage(p.slug, p.files[i]);
      rows.push({ product_id: up.id, url, label: p.name, position: i });
    }
    await db.from("product_images").insert(rows);

    await db.from("product_sizes").delete().eq("product_id", up.id);
    await db.from("product_sizes").insert(
      SIZES.map((size, i) => ({ product_id: up.id, size, available: true, position: i })),
    );
    console.log(`✓ ${p.name} (${p.files.length} photos)`);
  }
  console.log(`Seeded ${products.length} products.`);
}

async function seedCollections() {
  for (let i = 0; i < collections.length; i++) {
    const c = collections[i];
    const { error } = await db.from("collections").upsert(
      {
        slug: c.slug,
        title: c.title,
        kicker: c.kicker,
        description: c.description,
        hero_label: c.heroLabel,
        hero_tone: c.heroTone,
        hero_image_url: c.heroImageUrl,
        sort_order: i,
        published: true,
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`collection ${c.slug}: ${error.message}`);
  }
  console.log(`Seeded ${collections.length} collections.`);
}

async function seedOccasionEdits() {
  await db.from("occasion_edits").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await db.from("occasion_edits").insert(
    occasionEdits.map((o, i) => ({
      title: o.title,
      caption: o.caption,
      href: o.href,
      tone: o.tone,
      label: o.label,
      image_url: o.imageUrl,
      sort_order: i,
    })),
  );
  if (error) throw new Error(`occasion edits: ${error.message}`);
  console.log(`Seeded ${occasionEdits.length} occasion tiles.`);
}

async function seedJournal() {
  for (let i = 0; i < journal.length; i++) {
    const a = journal[i];
    const { error } = await db.from("journal_articles").upsert(
      {
        slug: a.slug,
        title: a.title,
        category: a.category,
        date_label: a.dateLabel,
        excerpt: a.excerpt,
        tone: a.tone,
        cover_url: a.coverUrl,
        product_slugs: a.productSlugs,
        body: a.body,
        sort_order: i,
        published: true,
      },
      { onConflict: "slug" },
    );
    if (error) throw new Error(`article ${a.slug}: ${error.message}`);
  }
  console.log(`Seeded ${journal.length} journal articles.`);
}

async function seedSettings() {
  const { error } = await db.from("site_settings").upsert({
    id: true,
    announcement_text: "Complimentary Shipping on All U.S. Orders",
    announcement_enabled: true,
    free_shipping_threshold: null,
    shipping_returns_copy: "",
  });
  if (error) throw new Error(`site settings: ${error.message}`);
  console.log("Seeded site settings.");
}

async function seed() {
  await seedProducts();
  await seedCollections();
  await seedOccasionEdits();
  await seedJournal();
  await seedSettings();
  console.log("\nDone.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
