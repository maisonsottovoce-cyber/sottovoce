import Link from "next/link";
import { getAdminProducts } from "@/lib/admin-catalog";
import { signOut } from "./actions";
import { ProductTable } from "@/components/admin/ProductTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const products = await getAdminProducts();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="brand-kicker text-purple">Atelier</span>
          <h1 className="editorial-heading mt-1 text-4xl">Products</h1>
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

      <div className="mt-10">
        <ProductTable products={products} />
      </div>
    </div>
  );
}
