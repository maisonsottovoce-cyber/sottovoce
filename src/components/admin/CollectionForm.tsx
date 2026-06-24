"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PRODUCT_IMAGE_BUCKET } from "@/lib/supabase/config";
import { saveCollection } from "@/app/admin/collections/actions";
import type { AdminCollection } from "@/lib/admin-types";
import type { PlaceholderTone } from "@/data/products";
import { Input, Textarea } from "@/components/ui/Input";

const TONES: PlaceholderTone[] = [
  "ink",
  "charcoal",
  "espresso",
  "twilight",
  "sand",
  "cream",
  "purple",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CollectionForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: AdminCollection;
}) {
  const router = useRouter();
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [kicker, setKicker] = useState(initial?.kicker ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [heroLabel, setHeroLabel] = useState(initial?.heroLabel ?? "");
  const [heroTone, setHeroTone] = useState<PlaceholderTone>(initial?.heroTone ?? "charcoal");
  const [heroImageUrl, setHeroImageUrl] = useState(initial?.heroImageUrl ?? "");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [published, setPublished] = useState(initial?.published ?? true);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    const base = slug || slugify(title) || "collection";
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `collections/${base}/${Date.now()}-${safe}`;
    const { error: upErr } = await supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .upload(path, file, { upsert: false, cacheControl: "3600" });
    if (upErr) {
      setError(`Upload failed: ${upErr.message}`);
    } else {
      const { data } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path);
      setHeroImageUrl(data.publicUrl);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const finalSlug = slug || slugify(title);
    if (!title.trim() || !finalSlug) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    try {
      await saveCollection({
        id: initial?.id,
        slug: finalSlug,
        title: title.trim(),
        kicker: kicker.trim(),
        description: description.trim(),
        heroLabel: heroLabel.trim(),
        heroTone,
        heroImageUrl: heroImageUrl.trim(),
        sortOrder: Number(sortOrder) || 0,
        published,
      });
      router.push("/admin/collections");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl pb-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link href="/admin/collections" className="small-caps text-muted hover:text-purple">
            ← Collections
          </Link>
          <h1 className="editorial-heading mt-2 text-4xl">
            {mode === "create" ? "New collection" : "Edit collection"}
          </h1>
        </div>
        <button
          type="submit"
          disabled={saving || uploading}
          className="nav-link bg-ink px-7 py-4 text-ivory transition-colors hover:bg-purple disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error ? (
        <p className="small-caps mt-6 border border-purple/40 bg-purple/5 px-4 py-3 text-purple" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-6">
        <Input id="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => { if (!slug) setSlug(slugify(title)); }} placeholder="Cocktail" />
        <div className="flex items-end gap-3">
          <Input id="slug" label="Slug (URL)" value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="cocktail" />
          <button type="button" onClick={() => setSlug(slugify(title))} className="small-caps shrink-0 border border-line px-3 py-3 text-ink hover:border-ink">
            Auto
          </button>
        </div>
        <Input id="kicker" label="Kicker" value={kicker} onChange={(e) => setKicker(e.target.value)} placeholder="After dark, softly" />
        <Textarea id="description" label="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="grid grid-cols-2 gap-4">
          <Input id="heroLabel" label="Hero label" value={heroLabel} onChange={(e) => setHeroLabel(e.target.value)} placeholder="Cocktail Evening" />
          <label className="w-full">
            <span className="small-caps mb-1 block text-muted">Hero tone (fallback colour)</span>
            <select value={heroTone} onChange={(e) => setHeroTone(e.target.value as PlaceholderTone)} className="w-full border-b border-line bg-transparent py-3 text-sm capitalize text-ink focus:border-purple focus:outline-none">
              {TONES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        <Input id="sortOrder" type="number" label="Display order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} placeholder="0" />

        <div>
          <span className="small-caps mb-2 block text-muted">Hero image</span>
          <div className="border border-dashed border-line p-4">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
              className="block w-full text-sm text-muted file:mr-4 file:border file:border-ink file:bg-ivory file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-wider file:text-ink hover:file:bg-cream"
            />
            <p className="body-copy mt-2 text-xs">{uploading ? "Uploading…" : "Optional — falls back to the tone colour."}</p>
          </div>
          {heroImageUrl ? (
            <div className="mt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImageUrl} alt={heroLabel} className="h-40 w-full object-cover" />
              <button type="button" onClick={() => setHeroImageUrl("")} className="small-caps mt-1 text-muted hover:text-purple">
                Remove image
              </button>
            </div>
          ) : null}
        </div>

        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-4 w-4 accent-[#4B245C]" />
          <span className="small-caps text-ink">Published</span>
        </label>
      </div>
    </form>
  );
}
