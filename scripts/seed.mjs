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

async function seed() {
  for (const p of products) {
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
    console.log(`✓ ${p.name} (${p.files.length} photos)`);
  }
  console.log(`\nSeeded ${products.length} products.`);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
