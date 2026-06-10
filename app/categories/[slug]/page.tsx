import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import Breadcrumbs from "@/components/Breadcrumbs";
import AuthorStack from "@/components/AuthorStack";
import { categories, categorySlugs, getCategory } from "@/lib/data";
import { categoryIcon } from "@/lib/categoryIcons";

export function generateStaticParams() {
  return categorySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  return { title: cat ? `${cat.title} | SquareHub` : "SquareHub" };
}

function Meta({
  count,
  authors,
  authorsText,
}: {
  count: number;
  authors: any[];
  authorsText: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-n-slate-10 flex-wrap">
      <span className="tabular-nums">{count} bài viết</span>
      {authorsText && (
        <>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-2">
            <AuthorStack authors={authors} size="sm" />
            <span>{authorsText}</span>
          </span>
        </>
      )}
    </div>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  return (
    <Shell activeCategory={slug}>
      <div className="px-6 md:px-10 py-8 md:py-10">
        <Breadcrumbs
          items={[
            { home: true, label: "Trang chủ" },
            { icon: categoryIcon({ slug: cat.slug }), label: cat.title },
          ]}
        />

        <header className="mb-8">
          <div className="flex items-center gap-4">
            <span className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-n-slate-1 border border-solid border-n-weak shadow-sm text-n-portal">
              <span
                className={`${categoryIcon({ slug: cat.slug })} size-7`}
                aria-hidden="true"
              />
            </span>
            <div className="min-w-0">
              <h1 className="text-3xl leading-snug font-620 tracking-tight text-n-slate-12 text-balance mb-1">
                {cat.title}
              </h1>
              <div className="hidden sm:block">
                <Meta
                  count={cat.articleCount}
                  authors={cat.authors}
                  authorsText={cat.authorsText}
                />
              </div>
            </div>
          </div>
          <div className="sm:hidden mt-3">
            <Meta
              count={cat.articleCount}
              authors={cat.authors}
              authorsText={cat.authorsText}
            />
          </div>
          {cat.description && (
            <p className="mt-6 text-lg leading-relaxed text-n-slate-11 text-pretty">
              {cat.description}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 gap-4">
          {cat.articles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="group flex flex-col p-5 rounded-xl border border-solid border-n-weak hover:border-n-portal hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <h3 className="text-base font-620 text-n-slate-12 group-hover:text-n-portal transition">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-n-slate-11 line-clamp-2">
                {a.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
