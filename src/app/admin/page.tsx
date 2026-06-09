import Link from "next/link";
import { getAdminProducts } from "@/lib/admin-catalog";
import { formatPrice } from "@/lib/format";
import { deleteProduct, setPublished, signOut } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const products = await getAdminProducts();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="brand-kicker text-purple">Atelier</span>
          <h1 className="editorial-heading mt-1 text-4xl">Dresses</h1>
          <p className="small-caps mt-1 text-muted">{products.length} items</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products/new"
            className="nav-link bg-ink px-6 py-3 text-ivory transition-colors hover:bg-purple"
          >
            New dress
          </Link>
          <form action={signOut}>
            <button type="submit" className="small-caps text-muted hover:text-purple">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink/25">
              {["Item", "Category", "Price", "Status", ""].map((h) => (
                <th key={h} className="small-caps py-3 pr-4 text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="body-copy py-10 text-center text-sm">
                  No dresses yet.{" "}
                  <Link href="/admin/products/new" className="link-underline text-purple">
                    Add the first one
                  </Link>
                  .
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b border-line align-middle">
                  <td className="py-4 pr-4">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="product-title hover:text-purple"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="py-4 pr-4 text-sm capitalize text-muted">{p.category}</td>
                  <td className="py-4 pr-4 text-sm tabular-nums">{formatPrice(p.price)}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={
                        p.published
                          ? "small-caps text-ink"
                          : "small-caps text-muted"
                      }
                    >
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="small-caps text-ink hover:text-purple"
                      >
                        Edit
                      </Link>
                      <form action={setPublished.bind(null, p.id, !p.published, p.slug)}>
                        <button type="submit" className="small-caps text-muted hover:text-purple">
                          {p.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <DeleteButton onConfirm={deleteProduct.bind(null, p.id, p.slug)} />
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
