"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PRODUCT_IMAGE_BUCKET } from "@/lib/supabase/config";
import { saveOccasionEdits } from "@/app/admin/collections/actions";
import type { AdminOccasionEdit, OccasionEditInput } from "@/lib/admin-types";
import type { PlaceholderTone } from "@/data/products";
import { Input } from "@/components/ui/Input";

const TONES: PlaceholderTone[] = ["ink", "charcoal", "espresso", "twilight", "sand", "cream", "purple"];

type Row = OccasionEditInput;

export function OccasionEditsManager({ initial }: { initial: AdminOccasionEdit[] }) {
  const router = useRouter();
  const supabase = createClient();
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const [rows, setRows] = useState<Row[]>(
    initial.map((e) => ({
      title: e.title,
      caption: e.caption,
      href: e.href,
      tone: e.tone,
      label: e.label,
      imageUrl: e.imageUrl,
      sortOrder: e.sortOrder,
    })),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function update(i: number, patch: Partial<Row>) {
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }

  async function handleFile(i: number, file: File) {
    setError(null);
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `occasion/${Date.now()}-${safe}`;
    const { error: upErr } = await supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .upload(path, file, { upsert: false, cacheControl: "3600" });
    if (upErr) {
      setError(`Upload failed: ${upErr.message}`);
      return;
    }
    const { data } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path);
    update(i, { imageUrl: data.publicUrl });
  }

  async function onSave() {
    setSaving(true);
    setError(null);
    setDone(false);
    try {
      await saveOccasionEdits(rows.map((r, i) => ({ ...r, sortOrder: i })));
      setDone(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="editorial-heading text-2xl">Shop-by-Occasion tiles</h2>
        <button onClick={onSave} disabled={saving} className="nav-link bg-ink px-5 py-2.5 text-ivory hover:bg-purple disabled:opacity-50">
          {saving ? "Saving…" : "Save tiles"}
        </button>
      </div>
      {error ? <p className="small-caps mt-3 text-purple">{error}</p> : null}
      {done ? <p className="small-caps mt-3 text-ink">Saved.</p> : null}

      <div className="mt-5 flex flex-col gap-4">
        {rows.map((r, i) => (
          <div key={i} className="grid gap-3 border border-line p-4 md:grid-cols-2">
            <Input id={`oe-title-${i}`} label="Title" value={r.title} onChange={(e) => update(i, { title: e.target.value })} placeholder="The Cocktail Edit" />
            <Input id={`oe-caption-${i}`} label="Caption" value={r.caption} onChange={(e) => update(i, { caption: e.target.value })} placeholder="After dark, softly" />
            <Input id={`oe-href-${i}`} label="Link" value={r.href} onChange={(e) => update(i, { href: e.target.value })} placeholder="/collections/cocktail" />
            <Input id={`oe-label-${i}`} label="Image label" value={r.label} onChange={(e) => update(i, { label: e.target.value })} placeholder="Cocktail Evening" />
            <label className="w-full">
              <span className="small-caps mb-1 block text-muted">Tone</span>
              <select value={r.tone} onChange={(e) => update(i, { tone: e.target.value as PlaceholderTone })} className="w-full border-b border-line bg-transparent py-3 text-sm capitalize text-ink focus:border-purple focus:outline-none">
                {TONES.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </label>
            <div>
              <span className="small-caps mb-1 block text-muted">Image</span>
              <input
                ref={(el) => { fileRefs.current[i] = el; }}
                type="file"
                accept="image/*"
                onChange={(e) => { if (e.target.files?.[0]) handleFile(i, e.target.files[0]); }}
                className="block w-full text-xs text-muted file:mr-3 file:border file:border-ink file:bg-ivory file:px-3 file:py-1.5 file:text-[0.6rem] file:uppercase file:tracking-wider file:text-ink"
              />
              {r.imageUrl ? (
                <div className="mt-2 flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.imageUrl} alt={r.label} className="h-12 w-10 object-cover" />
                  <button type="button" onClick={() => update(i, { imageUrl: "" })} className="small-caps text-muted hover:text-purple">Clear</button>
                </div>
              ) : null}
            </div>
            <div className="md:col-span-2">
              <button type="button" onClick={() => setRows((prev) => prev.filter((_, j) => j !== i))} className="small-caps text-muted hover:text-purple">
                Remove tile
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setRows((prev) => [...prev, { title: "", caption: "", href: "", tone: "charcoal", label: "", imageUrl: "", sortOrder: prev.length }])}
          className="small-caps w-fit text-ink hover:text-purple"
        >
          + Add tile
        </button>
      </div>
    </div>
  );
}
