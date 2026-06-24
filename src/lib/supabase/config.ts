export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True when the public Supabase env vars are present. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Storage bucket holding uploaded dress photography. */
export const PRODUCT_IMAGE_BUCKET = "product-images";

/** Storage bucket holding uploaded product videos. */
export const PRODUCT_VIDEO_BUCKET = "product-videos";
