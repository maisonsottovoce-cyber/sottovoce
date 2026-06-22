"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PRODUCT_IMAGE_BUCKET } from "@/lib/supabase/config";
import { saveArticle } from "@/app/admin/journal/actions";
import type { AdminJournalArticle } from "@/lib/admin-types";
import type { PlaceholderTone } from "@/data/products";
import { Input, Textarea } from "@/components/ui/Input";

const TONES: PlaceholderTone[] = ["ink", "charcoal", "espresso", "twilight", "sand", "cream", "purple"];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function JournalForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: AdminJournalArticle;
}) {
  const router = useRouter();
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Styling");
  const [dateLabel, setDateLabel] = useState(initial?.dateLabel ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [tone, setTone] = useState<PlaceholderTone>(initial?.tone ?? "charcoal");
  const [coverUrl, setCoverUrl] = useState(initial?.coverUrl ?? "");
  const [productSlugs, setProductSlugs] = useState((initial?.productSlugs ?? []).join(", "));
  const [body, setBody] = useState((initial?.body ?? []).join("\n\n"));
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [published, setPublished] = useState(initial?.published ?? true);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    const base = slug || slugify(title) || "article";
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `journal/${base}/${Date.now()}-${safe}`;
    const { error: upErr } = await supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .upload(path, file, { upsert: false, cacheControl: "3600" });
    if (upErr) {
      setError(`Upload failed: ${upErr.message}`);
    } else {
      const { data } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path);
      setCoverUrl(data.publicUrl);
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
      await saveArticle({
        id: initial?.id,
        slug: finalSlug,
        title: title.trim(),
        category: category.trim(),
        dateLabel: dateLabel.trim(),
        excerpt: excerpt.trim(),
        tone,
        coverUrl: coverUrl.trim(),
        productSlugs: productSlugs.split(",").map((s) => s.trim()).filter(Boolean),
        body: body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
        sortOrder: Number(sortOrder) || 0,
        published,
      });
      router.push("/admin/journal");
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
          <Link href="/admin/journal" className="small-caps text-muted hover:text-purple">← Journal</Link>
          <h1 className="editorial-heading mt-2 text-4xl">{mode === "create" ? "New article" : "Edit article"}</h1>
        </div>
        <button type="submit" disabled={saving || uploading} className="nav-link bg-ink px-7 py-4 text-ivory transition-colors hover:bg-purple disabled:opacity-50">
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error ? (
        <p className="small-caps mt-6 border border-purple/40 bg-purple/5 px-4 py-3 text-purple" role="alert">{error}</p>
      ) : null}

      <div className="mt-8 flex flex-col gap-6">
        <Input id="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => { if (!slug) setSlug(slugify(title)); }} placeholder="The Cocktail Edit" />
        <div className="flex items-end gap-3">
          <Input id="slug" label="Slug (URL)" value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="the-cocktail-edit" />
          <button type="button" onClick={() => setSlug(slugify(title))} className="small-caps shrink-0 border border-line px-3 py-3 text-ink hover:border-ink">Auto</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input id="category" label="Category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Styling" />
          <Input id="dateLabel" label="Date label" value={dateLabel} onChange={(e) => setDateLabel(e.target.value)} placeholder="May 2026" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label className="w-full">
            <span className="small-caps mb-1 block text-muted">Tone (fallback colour)</span>
            <select value={tone} onChange={(e) => setTone(e.target.value as PlaceholderTone)} className="w-full border-b border-line bg-transparent py-3 text-sm capitalize text-ink focus:border-purple focus:outline-none">
              {TONES.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
          </label>
          <Input id="sortOrder" type="number" label="Display order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} placeholder="0" />
        </div>
        <Textarea id="excerpt" label="Excerpt" rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />

        <div>
          <span className="small-caps mb-2 block text-muted">Cover image</span>
          <div className="border border-dashed border-line p-4">
            <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} className="block w-full text-sm text-muted file:mr-4 file:border file:border-ink file:bg-ivory file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-wider file:text-ink hover:file:bg-cream" />
            <p className="body-copy mt-2 text-xs">{uploading ? "Uploading…" : "Optional — falls back to the tone colour."}</p>
          </div>
          {coverUrl ? (
            <div className="mt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverUrl} alt={title} className="h-40 w-full object-cover" />
              <button type="button" onClick={() => setCoverUrl("")} className="small-caps mt-1 text-muted hover:text-purple">Remove image</button>
            </div>
          ) : null}
        </div>

        <Input id="productSlugs" label="Linked product slugs (comma-separated)" value={productSlugs} onChange={(e) => setProductSlugs(e.target.value)} placeholder="the-amara-cocktail-dress, the-alessia-corset" />
        <Textarea id="body" label="Body (separate paragraphs with a blank line)" rows={10} value={body} onChange={(e) => setBody(e.target.value)} />

        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-4 w-4 accent-[#4B245C]" />
          <span className="small-caps text-ink">Published</span>
        </label>
      </div>
    </form>
  );
}
