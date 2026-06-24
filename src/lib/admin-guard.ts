import "server-only";
import { createClient } from "@/lib/supabase/server";

/** Throws when no authenticated admin session is present. */
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
}
