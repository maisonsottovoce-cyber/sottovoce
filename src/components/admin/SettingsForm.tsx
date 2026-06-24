"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/app/admin/settings/actions";
import type { SiteSettings } from "@/lib/admin-types";
import { Input, Textarea } from "@/components/ui/Input";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [announcementText, setAnnouncementText] = useState(initial.announcementText);
  const [announcementEnabled, setAnnouncementEnabled] = useState(initial.announcementEnabled);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    initial.freeShippingThreshold != null ? String(initial.freeShippingThreshold) : "",
  );
  const [shippingReturnsCopy, setShippingReturnsCopy] = useState(initial.shippingReturnsCopy);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setDone(false);
    setSaving(true);
    try {
      await saveSettings({
        announcementText: announcementText.trim(),
        announcementEnabled,
        freeShippingThreshold: freeShippingThreshold ? Number(freeShippingThreshold) : undefined,
        shippingReturnsCopy: shippingReturnsCopy.trim(),
      });
      setDone(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    }
    setSaving(false);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl pb-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="brand-kicker text-purple">Atelier</span>
          <h1 className="editorial-heading mt-1 text-4xl">Site settings</h1>
        </div>
        <button type="submit" disabled={saving} className="nav-link bg-ink px-7 py-4 text-ivory transition-colors hover:bg-purple disabled:opacity-50">
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error ? <p className="small-caps mt-6 text-purple" role="alert">{error}</p> : null}
      {done ? <p className="small-caps mt-6 text-ink">Saved.</p> : null}

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <span className="small-caps mb-2 block text-muted">Announcement bar</span>
          <Input id="announcementText" label="Text" value={announcementText} onChange={(e) => setAnnouncementText(e.target.value)} placeholder="Complimentary Shipping on All U.S. Orders" />
          <label className="mt-3 flex cursor-pointer items-center gap-2">
            <input type="checkbox" checked={announcementEnabled} onChange={(e) => setAnnouncementEnabled(e.target.checked)} className="h-4 w-4 accent-[#4B245C]" />
            <span className="small-caps text-ink">Show announcement bar</span>
          </label>
        </div>

        <Input id="freeShippingThreshold" type="number" min="0" label="Free-shipping threshold (USD, optional)" value={freeShippingThreshold} onChange={(e) => setFreeShippingThreshold(e.target.value)} placeholder="e.g. 250" />

        <Textarea id="shippingReturnsCopy" label="Shipping & returns copy" rows={6} value={shippingReturnsCopy} onChange={(e) => setShippingReturnsCopy(e.target.value)} />
      </div>
    </form>
  );
}
