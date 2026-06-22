import Link from "next/link";
import { getAdminJournal } from "@/lib/admin-catalog";
import { deleteArticle } from "./actions";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";

export const dynamic = "force-dynamic";

export default async function AdminJournal() {
  const articles = await getAdminJournal();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="brand-kicker text-purple">Atelier</span>
          <h1 className="editorial-heading mt-1 text-4xl">Journal</h1>
          <p className="small-caps mt-1 text-muted">{articles.length} articles</p>
        </div>
        <Link href="/admin/journal/new" className="nav-link bg-ink px-6 py-3 text-ivory transition-colors hover:bg-purple">
          New article
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink/25">
              {["Title", "Category", "Date", "Status", ""].map((h) => (
                <th key={h} className="small-caps py-3 pr-4 text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr><td colSpan={5} className="body-copy py-10 text-center text-sm">No articles yet.</td></tr>
            ) : (
              articles.map((a) => (
                <tr key={a.id} className="border-b border-line align-middle">
                  <td className="py-4 pr-4">
                    <Link href={`/admin/journal/${a.id}/edit`} className="product-title hover:text-purple">{a.title}</Link>
                  </td>
                  <td className="py-4 pr-4 text-sm text-muted">{a.category}</td>
                  <td className="py-4 pr-4 text-sm text-muted">{a.dateLabel}</td>
                  <td className="py-4 pr-4">
                    <span className={a.published ? "small-caps text-ink" : "small-caps text-muted"}>
                      {a.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/journal/${a.id}/edit`} className="small-caps text-ink hover:text-purple">Edit</Link>
                      <ConfirmDelete onConfirm={deleteArticle.bind(null, a.id, a.slug)} message={`Delete "${a.title}"?`} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
