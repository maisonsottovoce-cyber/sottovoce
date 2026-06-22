import { getAdminSettings } from "@/lib/admin-catalog";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const settings = await getAdminSettings();
  return <SettingsForm initial={settings} />;
}
