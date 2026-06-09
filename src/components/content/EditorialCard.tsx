import Link from "next/link";
import type { JournalArticle } from "@/data/journal";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function EditorialCard({ article }: { article: JournalArticle }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/journal/${article.slug}`} className="block">
        <div className="overflow-hidden">
          <ImagePlaceholder
            label={article.title}
            tone={article.tone}
            src={article.cover}
            kicker={article.category}
            className="aspect-[4/5] w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <div className="mt-5 flex flex-col gap-2">
        <span className="brand-kicker text-purple">{article.category}</span>
        <h3 className="editorial-heading text-2xl">
          <Link href={`/journal/${article.slug}`} className="hover:text-purple">
            {article.title}
          </Link>
        </h3>
        <p className="body-copy text-sm">{article.excerpt}</p>
        <Link
          href={`/journal/${article.slug}`}
          className="nav-link link-underline mt-1 w-fit text-ink hover:text-purple"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
