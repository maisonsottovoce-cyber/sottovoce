"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/admin-guard";
import type { SiteSettings } from "@/lib/admin-types";

export async function saveSettings(input: SiteSettings) {
  await requireUser();
  const admin = createAdminClient();
  const { error } = await admin.from("site_settings").upsert({
    id: true,
    announcement_text: input.announcementText,
    announcement_enabled: input.announcementEnabled,
    free_shipping_threshold: input.freeShippingThreshold ?? null,
    shipping_returns_copy: input.shippingReturnsCopy,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  revalidatePath("/shipping-returns");
  revalidatePath("/admin/settings");
}
