"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/data";
import { categoryIcon } from "@/lib/categoryIcons";
import { useDrawer } from "./drawer";

export default function Sidebar({
  isHome = false,
  activeCategory,
  activeArticle,
}: {
  isHome?: boolean;
  activeCategory?: string;
  activeArticle?: string;
}) {
  const { open, setOpen } = useDrawer();
  const pathname = usePathname();

  // Đóng drawer khi chuyển trang.
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  // Khoá cuộn nền khi drawer mở trên mobile.
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Lớp phủ mờ phía sau drawer (chỉ mobile) */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 ${open ? "block" : "hidden"}`}
        aria-hidden="true"
      />
      <aside
        className={`fixed md:sticky inset-y-0 md:inset-y-auto md:top-16 left-0 max-md:z-50 md:z-30 w-72 md:w-64 lg:w-72 shrink-0 h-[100dvh] md:h-[calc(100dvh-4rem)] overflow-y-auto bg-white dark:bg-n-slate-2 border-r border-solid border-n-weak transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "max-md:-translate-x-full"
        }`}
      >
        <div className="md:hidden flex items-center justify-end px-4 h-14">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng menu"
            className="p-1.5 rounded-md text-n-slate-11 hover:bg-n-alpha-2 cursor-pointer"
          >
            <span className="i-lucide-x size-5 block" aria-hidden="true" />
          </button>
        </div>

        <nav className="px-3 pt-6 md:pt-8 pb-6 space-y-1">
          <Link
            href="/"
            className={
              isHome
                ? "flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-md transition bg-n-portal-soft text-n-portal"
                : "flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-md transition text-n-slate-11 hover:text-n-slate-12 hover:bg-n-alpha-2"
            }
          >
            <span className="i-lucide-house size-4" aria-hidden="true" />
            Trang chủ
          </Link>

          <div className="pt-6 pb-2 px-3 text-xs font-semibold tracking-wider text-n-slate-10 uppercase">
            Danh mục
          </div>

          {nav.map((cat) => {
            const catActive = cat.slug === activeCategory;
            return (
              <details key={cat.slug} className="group" open={catActive || undefined}>
                <summary
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer list-none select-none hover:bg-n-alpha-2 transition ${
                    catActive ? "text-n-portal font-semibold" : "text-n-slate-12 font-medium"
                  }`}
                >
                  <span className={`${categoryIcon({ slug: cat.slug })} size-4 shrink-0`} aria-hidden="true" />
                  <Link href={`/categories/${cat.slug}`} className="flex-1 truncate">
                    {cat.name}
                  </Link>
                  <span
                    className="i-lucide-chevron-right size-3 text-n-slate-10 transition-transform group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <ul className="mt-1 mb-2 ms-4 ps-3 border-l border-n-weak space-y-px">
                  {cat.articles.map((a) => {
                    const active = a.slug === activeArticle;
                    return (
                      <li key={a.slug}>
                        <Link
                          href={`/articles/${a.slug}`}
                          className={`relative -ms-[13px] ps-3 block py-1.5 text-sm leading-snug truncate transition border-l-2 ${
                            active
                              ? "text-n-portal font-medium border-n-portal"
                              : "text-n-slate-11 hover:text-n-slate-12 border-transparent"
                          }`}
                        >
                          {a.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
