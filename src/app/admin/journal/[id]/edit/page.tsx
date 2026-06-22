import { notFound } from "next/navigation";
import { getAdminArticle } from "@/lib/admin-catalog";
import { JournalForm } from "@/components/admin/JournalForm";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getAdminArticle(id);
  if (!article) notFound();
  return <JournalForm mode="edit" initial={article} />;
}
