import { notFound } from "next/navigation";
import { getAdminCollection } from "@/lib/admin-catalog";
import { CollectionForm } from "@/components/admin/CollectionForm";

export const dynamic = "force-dynamic";

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection = await getAdminCollection(id);
  if (!collection) notFound();
  return <CollectionForm mode="edit" initial={collection} />;
}
