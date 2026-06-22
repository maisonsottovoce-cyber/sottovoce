"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PRODUCT_IMAGE_BUCKET, PRODUCT_VIDEO_BUCKET } from "@/lib/supabase/config";
import { saveProduct } from "@/app/admin/actions";
import type { AdminProduct, ProductImageInput, SizeStockInput } from "@/lib/admin-types";
import type { CategorySlug, Occasion } from "@/data/products";
import { Input, Textarea } from "@/components/ui/Input";
import { cx } from "@/lib/format";

const CATEGORIES: CategorySlug[] = ["dresses", "jumpsuits", "tops", "bottoms", "sets"];
const STANDARD_SIZES = ["XS", "S", "M", "L", "XL"];
const OCCASIONS: Occasion[] = [
  "Cocktail",
  "Evening",
  "Dinner",
  "Vacation",
  "Day to Night",
  "Event",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

function initialSizeStock(initial?: AdminProduct): SizeStockInput[] {
  if (initial?.sizeStock?.length) return initial.sizeStock;
  if (initial?.sizes?.length) {
    return initial.sizes.map((size) => ({ size, available: true }));
  }
  return ["XS", "S", "M", "L"].map((size) => ({ size, available: true }));
}

export function ProductForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: AdminProduct;
}) {
  const router = useRouter();
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState<CategorySlug>(initial?.category ?? "dresses");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [compareAtPrice, setCompareAtPrice] = useState(
    initial?.compareAtPrice != null ? String(initial.compareAtPrice) : "",
  );
  const [color, setColor] = useState(initial?.color ?? "");
  const [availableColors, setAvailableColors] = useState(
    initial?.availableColors ?? [{ name: "", hex: "#241B18" }],
  );
  const [sizeStock, setSizeStock] = useState<SizeStockInput[]>(initialSizeStock(initial));
  const [occasion, setOccasion] = useState<Occasion[]>(initial?.occasion ?? []);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [fit, setFit] = useState(initial?.fit ?? "");
  const [fabricCare, setFabricCare] = useState(initial?.fabricCare ?? "");
  const [stylistNote, setStylistNote] = useState(initial?.stylistNote ?? "");
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription ?? "");
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [isNew, setIsNew] = useState(initial?.isNew ?? true);
  const [isBestSeller, setIsBestSeller] = useState(initial?.isBestSeller ?? false);
  const [published, setPublished] = useState(initial?.published ?? true);
  const [images, setImages] = useState<ProductImageInput[]>(initial?.images ?? []);

  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList) {
    setError(null);
    setUploading(true);
    const base = slug || slugify(name) || "draft";
    const added: ProductImageInput[] = [];
    for (const file of Array.from(files)) {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${base}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${safe}`;
      const { error: upErr } = await supabase.storage
        .from(PRODUCT_IMAGE_BUCKET)
        .upload(path, file, { upsert: false, cacheControl: "3600" });
      if (upErr) {
        setError(`Upload failed: ${upErr.message}`);
        continue;
      }
      const { data } = supabase.storage.from(PRODUCT_IMAGE_BUCKET).getPublicUrl(path);
      added.push({ url: data.publicUrl, label: name || "", position: images.length + added.length });
    }
    setImages((prev) => [...prev, ...added]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleVideo(file: File) {
    setError(null);
    setUploadingVideo(true);
    const base = slug || slugify(name) || "draft";
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${base}/${Date.now()}-${safe}`;
    const { error: upErr } = await supabase.storage
      .from(PRODUCT_VIDEO_BUCKET)
      .upload(path, file, { upsert: false, cacheControl: "3600" });
    if (upErr) {
      setError(`Video upload failed: ${upErr.message}`);
    } else {
      const { data } = supabase.storage.from(PRODUCT_VIDEO_BUCKET).getPublicUrl(path);
      setVideoUrl(data.publicUrl);
    }
    setUploadingVideo(false);
    if (videoRef.current) videoRef.current.value = "";
  }

  function moveImage(index: number, dir: -1 | 1) {
    setImages((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((img, i) => ({ ...img, position: i }));
    });
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index).map((img, i) => ({ ...img, position: i })));
  }

  function addSize(size: string) {
    setSizeStock((prev) =>
      prev.some((s) => s.size.toLowerCase() === size.toLowerCase())
        ? prev
        : [...prev, { size, available: true }],
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const finalSlug = slug || slugify(name);
    if (!name.trim() || !finalSlug) {
      setError("Name is required.");
      return;
    }
    const cleanSizes = sizeStock.filter((s) => s.size.trim());
    setSaving(true);
    try {
      await saveProduct({
        id: initial?.id,
        slug: finalSlug,
        name: name.trim(),
        category,
        price: Number(price) || 0,
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
        color: color.trim(),
        availableColors: availableColors.filter((c) => c.name.trim()),
        sizes: cleanSizes.map((s) => s.size.trim()),
        sizeStock: cleanSizes.map((s) => ({
          size: s.size.trim(),
          available: s.available,
          quantity: s.quantity,
        })),
        occasion,
        description: description.trim(),
        fit: fit.trim(),
        fabricCare: fabricCare.trim(),
        stylistNote: stylistNote.trim(),
        seoTitle: seoTitle.trim(),
        seoDescription: seoDescription.trim(),
        videoUrl: videoUrl.trim(),
        sortOrder: Number(sortOrder) || 0,
        isNew,
        isBestSeller,
        published,
        images: images.map((img, i) => ({ ...img, position: i })),
      });
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="pb-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="small-caps text-muted hover:text-purple">
            ← Atelier
          </Link>
          <h1 className="editorial-heading mt-2 text-4xl">
            {mode === "create" ? "New dress" : "Edit dress"}
          </h1>
        </div>
        <button
          type="submit"
          disabled={saving || uploading || uploadingVideo}
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

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: details */}
        <div className="flex flex-col gap-6">
          <Input
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              if (!slug) setSlug(slugify(name));
            }}
            placeholder="The Alessia Corset"
          />
          <div className="flex items-end gap-3">
            <Input
              id="slug"
              label="Slug (URL)"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="the-alessia-corset"
            />
            <button
              type="button"
              onClick={() => setSlug(slugify(name))}
              className="small-caps shrink-0 border border-line px-3 py-3 text-ink hover:border-ink"
            >
              Auto
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="w-full">
              <span className="small-caps mb-1 block text-muted">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategorySlug)}
                className="w-full border-b border-line bg-transparent py-3 text-sm capitalize text-ink focus:border-purple focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <Input
              id="sortOrder"
              type="number"
              label="Display order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              id="price"
              type="number"
              min="0"
              label="Price (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="290"
            />
            <Input
              id="compareAtPrice"
              type="number"
              min="0"
              label="Compare-at price (optional)"
              value={compareAtPrice}
              onChange={(e) => setCompareAtPrice(e.target.value)}
              placeholder="Was…"
            />
          </div>
          {compareAtPrice && Number(compareAtPrice) > Number(price) ? (
            <p className="small-caps -mt-3 text-purple">
              On sale — original ${compareAtPrice}, now ${price}.
            </p>
          ) : null}

          <Input
            id="color"
            label="Primary color name"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Espresso"
          />

          {/* Available colors */}
          <div>
            <span className="small-caps mb-2 block text-muted">Available colors</span>
            <div className="flex flex-col gap-2">
              {availableColors.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={c.hex}
                    onChange={(e) =>
                      setAvailableColors((prev) =>
                        prev.map((x, j) => (j === i ? { ...x, hex: e.target.value } : x)),
                      )
                    }
                    className="h-9 w-10 shrink-0 cursor-pointer border border-line bg-transparent"
                    aria-label="Colour swatch"
                  />
                  <input
                    value={c.name}
                    onChange={(e) =>
                      setAvailableColors((prev) =>
                        prev.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)),
                      )
                    }
                    placeholder="Colour name"
                    className="flex-1 border-b border-line bg-transparent py-2 text-sm text-ink focus:border-purple focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setAvailableColors((prev) => prev.filter((_, j) => j !== i))}
                    className="small-caps text-muted hover:text-purple"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setAvailableColors((prev) => [...prev, { name: "", hex: "#241B18" }])}
                className="small-caps mt-1 w-fit text-ink hover:text-purple"
              >
                + Add colour
              </button>
            </div>
          </div>

          {/* Sizes + per-size stock */}
          <div>
            <span className="small-caps mb-2 block text-muted">Sizes & stock</span>
            <div className="mb-3 flex flex-wrap gap-2">
              {STANDARD_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addSize(s)}
                  disabled={sizeStock.some((x) => x.size === s)}
                  className="small-caps min-w-11 border border-line px-3 py-2 text-ink hover:border-ink disabled:opacity-30"
                >
                  + {s}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {sizeStock.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={s.size}
                    onChange={(e) =>
                      setSizeStock((prev) =>
                        prev.map((x, j) => (j === i ? { ...x, size: e.target.value } : x)),
                      )
                    }
                    placeholder="Size"
                    className="w-20 border-b border-line bg-transparent py-2 text-sm text-ink focus:border-purple focus:outline-none"
                  />
                  <label className="flex cursor-pointer items-center gap-1">
                    <input
                      type="checkbox"
                      checked={s.available}
                      onChange={(e) =>
                        setSizeStock((prev) =>
                          prev.map((x, j) => (j === i ? { ...x, available: e.target.checked } : x)),
                        )
                      }
                      className="h-4 w-4 accent-[#4B245C]"
                    />
                    <span className="small-caps text-ink">In stock</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={s.quantity ?? ""}
                    onChange={(e) =>
                      setSizeStock((prev) =>
                        prev.map((x, j) =>
                          j === i
                            ? { ...x, quantity: e.target.value === "" ? undefined : Number(e.target.value) }
                            : x,
                        ),
                      )
                    }
                    placeholder="Qty"
                    className="w-20 border-b border-line bg-transparent py-2 text-sm text-ink focus:border-purple focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSizeStock((prev) => prev.filter((_, j) => j !== i))}
                    className="small-caps text-muted hover:text-purple"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setSizeStock((prev) => [...prev, { size: "", available: true }])}
                className="small-caps mt-1 w-fit text-ink hover:text-purple"
              >
                + Add custom size
              </button>
            </div>
          </div>

          {/* Occasion */}
          <div>
            <span className="small-caps mb-2 block text-muted">Occasion</span>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOccasion((prev) => toggle(prev, o))}
                  className={cx(
                    "small-caps border px-3 py-2",
                    occasion.includes(o)
                      ? "border-purple bg-purple text-ivory"
                      : "border-line text-ink hover:border-ink",
                  )}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            id="description"
            label="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Textarea
            id="fit"
            label="Fit"
            rows={2}
            value={fit}
            onChange={(e) => setFit(e.target.value)}
          />
          <Textarea
            id="fabricCare"
            label="Fabric & care"
            rows={2}
            value={fabricCare}
            onChange={(e) => setFabricCare(e.target.value)}
          />
          <Textarea
            id="stylistNote"
            label="Stylist note"
            rows={2}
            value={stylistNote}
            onChange={(e) => setStylistNote(e.target.value)}
          />

          {/* SEO */}
          <div className="border-t border-line pt-6">
            <span className="small-caps mb-3 block text-muted">Search engine (SEO)</span>
            <div className="flex flex-col gap-4">
              <Input
                id="seoTitle"
                label="Meta title"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={name || "Defaults to the product name"}
              />
              <Textarea
                id="seoDescription"
                label="Meta description"
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { label: "New", value: isNew, set: setIsNew },
              { label: "Bestseller", value: isBestSeller, set: setIsBestSeller },
              { label: "Published", value: published, set: setPublished },
            ].map((t) => (
              <label key={t.label} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.value}
                  onChange={(e) => t.set(e.target.checked)}
                  className="h-4 w-4 accent-[#4B245C]"
                />
                <span className="small-caps text-ink">{t.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Right: media */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="small-caps mb-2 block text-muted">Photos</span>
            <div className="border border-dashed border-line p-4">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files?.length) handleFiles(e.target.files);
                }}
                className="block w-full text-sm text-muted file:mr-4 file:border file:border-ink file:bg-ivory file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-wider file:text-ink hover:file:bg-cream"
              />
              <p className="body-copy mt-2 text-xs">
                {uploading ? "Uploading…" : "First photo is the main image; reorder with the arrows."}
              </p>
            </div>

            <ul className="mt-4 flex flex-col gap-3">
              {images.map((img, i) => (
                <li key={img.url} className="flex gap-3 border border-line p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.label} className="h-24 w-20 shrink-0 object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <input
                      value={img.label}
                      onChange={(e) =>
                        setImages((prev) =>
                          prev.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)),
                        )
                      }
                      placeholder="Label (e.g. Front view)"
                      className="border-b border-line bg-transparent py-1 text-sm text-ink focus:border-purple focus:outline-none"
                    />
                    <div className="flex items-center gap-3">
                      {i === 0 ? <span className="small-caps text-purple">Main</span> : null}
                      <button type="button" onClick={() => moveImage(i, -1)} className="small-caps text-muted hover:text-purple" aria-label="Move up">
                        ↑
                      </button>
                      <button type="button" onClick={() => moveImage(i, 1)} className="small-caps text-muted hover:text-purple" aria-label="Move down">
                        ↓
                      </button>
                      <button type="button" onClick={() => removeImage(i)} className="small-caps text-muted hover:text-purple">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {images.length === 0 ? (
                <li className="body-copy py-6 text-center text-xs">No photos yet.</li>
              ) : null}
            </ul>
          </div>

          {/* Video */}
          <div>
            <span className="small-caps mb-2 block text-muted">Video</span>
            <div className="border border-dashed border-line p-4">
              <input
                ref={videoRef}
                type="file"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleVideo(e.target.files[0]);
                }}
                className="block w-full text-sm text-muted file:mr-4 file:border file:border-ink file:bg-ivory file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-wider file:text-ink hover:file:bg-cream"
              />
              <p className="body-copy mt-2 text-xs">
                {uploadingVideo ? "Uploading…" : "Upload a clip, or paste a video URL below."}
              </p>
            </div>
            <div className="mt-3">
              <Input
                id="videoUrl"
                label="Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://…"
              />
            </div>
            {videoUrl ? (
              <div className="mt-3">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={videoUrl} controls className="w-full border border-line" />
                <button
                  type="button"
                  onClick={() => setVideoUrl("")}
                  className="small-caps mt-1 text-muted hover:text-purple"
                >
                  Remove video
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}
