import { notFound } from "next/navigation";
import { getAdminProduct } from "@/lib/admin-catalog";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getAdminProduct(id);
  if (!product) notFound();
  return <ProductForm mode="edit" initial={product} />;
}
