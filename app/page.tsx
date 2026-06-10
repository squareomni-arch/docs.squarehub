import Link from "next/link";
import Shell from "@/components/Shell";
import SearchBox from "@/components/SearchBox";
import AuthorStack from "@/components/AuthorStack";
import { home } from "@/lib/data";
import { categoryIcon } from "@/lib/categoryIcons";

export default function HomePage() {
  return (
    <Shell isHome>
      {/* Hero — bleeds full-width to the right edge on screens wider than the
          centred max-w-screen-2xl container. */}
      <section className="relative border-b border-solid border-n-weak bg-n-slate-1 dark:bg-n-slate-2 min-h-[50vh] flex items-center me-[calc(-1_*_max(0px,(100vw_-_1536px)/2))]">
        <div
          className="absolute inset-0 pointer-events-none text-n-portal-faint [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_50%_30%,black_35%,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_at_50%_30%,black_35%,transparent_80%)]"
          aria-hidden="true"
        />
        <div className="relative w-full px-6 md:px-10 py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl !leading-tight font-620 tracking-tight text-n-slate-12 text-balance">
              Xin chào 👋, chúng tôi có thể giúp gì cho bạn?
            </h1>
            <p className="mt-4 text-lg leading-normal text-n-slate-11 text-pretty">
              Tìm bài viết tại đây hoặc duyệt các danh mục bên dưới.
            </p>

            <div className="mt-8 group/herosearch relative z-30">
              <SearchBox size="large" />
            </div>

            <div className="mt-5 flex items-center gap-2 flex-wrap text-sm">
              <span className="text-n-slate-10">Chủ đề phổ biến:</span>
              {home.heroTopics.map((t) => (
                <Link
                  key={t.slug}
                  href={`/categories/${t.slug}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/60 dark:bg-n-slate-1/60 backdrop-blur border border-solid border-n-weak text-n-slate-11 hover:text-n-portal hover:border-n-portal transition"
                >
                  <span
                    className={`${categoryIcon({ slug: t.slug })} size-3.5`}
                    aria-hidden="true"
                  />
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by topic */}
      <section className="px-6 md:px-10 py-8 md:py-10">
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-620 tracking-tight text-n-slate-12">
            Duyệt theo chủ đề
          </h2>
          <p className="mt-2 text-base text-n-slate-11">
            Tìm hướng dẫn, bài viết và câu trả lời được sắp xếp theo danh mục.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {home.cards.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="group relative flex flex-col p-5 rounded-xl border border-solid border-n-weak hover:border-n-portal hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-n-slate-2 border border-solid border-n-weak text-n-portal">
                <span
                  className={`${categoryIcon({ slug: c.slug })} size-5`}
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-4 text-lg font-620 tracking-tight text-n-slate-12 group-hover:text-n-portal transition">
                {c.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-n-slate-11">
                {c.description}
              </p>
              <div className="mt-auto pt-5 flex items-center justify-between">
                <AuthorStack authors={c.authors} size="md" />
                <span className="inline-flex items-center gap-1 text-sm font-medium text-n-slate-11 group-hover:text-n-portal transition">
                  Xem
                  <span
                    className="i-lucide-arrow-right size-3.5 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular articles */}
      <section className="px-6 md:px-10 py-8 md:py-10 border-t border-n-weak">
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-620 tracking-tight text-n-slate-12">
            Bài viết phổ biến
          </h2>
          <p className="mt-1.5 text-base text-n-slate-11">
            Những bài người khác đang đọc nhiều nhất.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {home.popular.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="group flex flex-col p-5 rounded-xl border border-solid border-n-weak hover:border-n-portal hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="inline-flex items-center gap-1.5 self-start text-xs font-medium text-n-slate-11 mb-3">
                <span
                  className={`${categoryIcon({ emoji: a.emoji })} size-3.5`}
                  aria-hidden="true"
                />
                {a.categoryName}
              </span>
              <h3 className="text-base font-620 text-n-slate-12 group-hover:text-n-portal transition">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-n-slate-11 line-clamp-2">
                {a.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}
