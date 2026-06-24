import Link from "next/link";
import { getAdminCollections, getAdminOccasionEdits } from "@/lib/admin-catalog";
import { deleteCollection } from "./actions";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { OccasionEditsManager } from "@/components/admin/OccasionEditsManager";

export const dynamic = "force-dynamic";

export default async function AdminCollections() {
  const [collections, occasionEdits] = await Promise.all([
    getAdminCollections(),
    getAdminOccasionEdits(),
  ]);

  return (
    <div className="flex flex-col gap-14">
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="brand-kicker text-purple">Atelier</span>
            <h1 className="editorial-heading mt-1 text-4xl">Collections</h1>
            <p className="small-caps mt-1 text-muted">{collections.length} collections</p>
          </div>
          <Link href="/admin/collections/new" className="nav-link bg-ink px-6 py-3 text-ivory transition-colors hover:bg-purple">
            New collection
          </Link>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/25">
                {["Title", "Slug", "Order", "Status", ""].map((h) => (
                  <th key={h} className="small-caps py-3 pr-4 text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {collections.length === 0 ? (
                <tr><td colSpan={5} className="body-copy py-10 text-center text-sm">No collections yet.</td></tr>
              ) : (
                collections.map((c) => (
                  <tr key={c.id} className="border-b border-line align-middle">
                    <td className="py-4 pr-4">
                      <Link href={`/admin/collections/${c.id}/edit`} className="product-title hover:text-purple">{c.title}</Link>
                    </td>
                    <td className="py-4 pr-4 text-sm text-muted">{c.slug}</td>
                    <td className="py-4 pr-4 text-sm tabular-nums">{c.sortOrder}</td>
                    <td className="py-4 pr-4">
                      <span className={c.published ? "small-caps text-ink" : "small-caps text-muted"}>
                        {c.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-end gap-4">
                        <Link href={`/admin/collections/${c.id}/edit`} className="small-caps text-ink hover:text-purple">Edit</Link>
                        <ConfirmDelete onConfirm={deleteCollection.bind(null, c.id)} message={`Delete the "${c.title}" collection?`} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-t border-line pt-12">
        <OccasionEditsManager initial={occasionEdits} />
      </div>
    </div>
  );
}
