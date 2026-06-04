import type { CategorySlug, Occasion, ColorOption } from "@/data/products";

export type ProductImageInput = {
  url: string;
  label: string;
  position: number;
};

export type ProductInput = {
  id?: string;
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
  isNew: boolean;
  isBestSeller: boolean;
  published: boolean;
  images: ProductImageInput[];
};

/** Row shape returned to the admin list/edit screens (includes unpublished). */
export type AdminProduct = ProductInput & { id: string };
