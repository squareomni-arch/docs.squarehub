import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleToc from "@/components/ArticleToc";
import ArticleOpenIn from "@/components/ArticleOpenIn";
import Avatar from "@/components/Avatar";
import { articleSlugs, getArticle, categoryForArticle } from "@/lib/data";
import { categoryIcon } from "@/lib/categoryIcons";

const PROSE_CLASS = [
  "prose dark:prose-invert max-w-none break-words",
  "prose-headings:font-620",
  "prose-p:font-420 prose-li:font-420 prose-blockquote:font-420 prose-td:font-420",
  "prose-a:text-n-portal prose-a:no-underline hover:prose-a:underline",
  "[&_li>p]:m-0",
  "[&_.tableWrapper]:overflow-x-auto [&_.tableWrapper]:mb-4 [&_.tableWrapper]:rounded-lg [&_.tableWrapper]:border [&_.tableWrapper]:border-solid [&_.tableWrapper]:border-n-weak",
  "[&_table]:!my-0 [&_table]:!min-w-full [&_table]:!border-separate [&_table]:!border-spacing-0",
  "[&_th]:!bg-n-slate-2 [&_th]:!text-n-slate-12 [&_th]:!font-semibold [&_th]:!text-start [&_th]:!px-3 [&_th]:!py-2 [&_th]:!border-0 [&_th]:!border-b [&_th]:!border-solid [&_th]:!border-n-weak",
  "[&_td]:!text-n-slate-11 [&_td]:!align-top [&_td]:!text-start [&_td]:!px-3 [&_td]:!py-2 [&_td]:!border-0 [&_td]:!border-b [&_td]:!border-solid [&_td]:!border-n-weak",
  "[&_th:not(:last-child)]:!border-e [&_td:not(:last-child)]:!border-e",
  "[&_tr:last-child_td]:!border-b-0",
].join(" ");

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  return { title: a ? `${a.title} | SquareHub` : "SquareHub" };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const activeCategory = categoryForArticle(slug);

  return (
    <Shell activeCategory={activeCategory} activeArticle={slug}>
      <div className="px-6 md:px-10 py-8 md:py-10">
        <div className="flex gap-10">
          <article className="flex-1 min-w-0">
            <Breadcrumbs
              items={[
                { home: true, label: "Trang chủ" },
                {
                  icon: categoryIcon({ slug: a.category.slug }),
                  label: a.category.name,
                  href: `/categories/${a.category.slug}`,
                },
                { label: a.title, current: true },
              ]}
            />

            <header className="mb-12 border-b border-n-weak">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl md:text-4xl leading-snug font-620 tracking-tight text-n-slate-12 min-w-0">
                  {a.title}
                </h1>
                <div className="shrink-0 mt-1">
                  <ArticleOpenIn slug={a.slug} />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 pb-3">
                <Avatar
                  name={a.author.name}
                  className="w-10 h-10 rounded-xl text-sm shrink-0"
                />
                <div>
                  <p className="text-sm font-medium text-n-slate-12">
                    {a.author.name}
                  </p>
                  <p className="mt-0.5 text-xs text-n-slate-11">{a.updated}</p>
                </div>
              </div>
            </header>

            <div
              id="cw-article-content"
              className={PROSE_CLASS}
              dangerouslySetInnerHTML={{ __html: a.bodyHtml }}
            />

            <footer className="mt-20 pt-8 border-t border-n-weak flex items-center justify-between gap-4 flex-wrap">
              <Link
                href={`/categories/${a.category.slug}`}
                className="group inline-flex items-center gap-2 px-3 py-2 -ml-3 text-sm font-medium text-n-slate-11 hover:text-n-slate-12 hover:bg-n-alpha-2 rounded-md transition"
              >
                <span
                  className="i-lucide-arrow-left size-3.5 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                Quay lại {a.category.name}
              </Link>
            </footer>
          </article>

          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20">
              <ArticleToc />
            </div>
          </aside>
        </div>
      </div>
    </Shell>
  );
}
