"use client";

import { useEffect, useState } from "react";

type Item = { id: string; text: string; level: number };

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export default function ArticleToc() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const root = document.getElementById("cw-article-content");
    if (!root) return;
    const headings = Array.from(
      root.querySelectorAll<HTMLHeadingElement>("h2, h3")
    );
    const used = new Set<string>();
    const next: Item[] = headings.map((h) => {
      let id = h.id || slugify(h.textContent || "");
      while (id && used.has(id)) id += "-";
      used.add(id);
      if (!h.id) h.id = id;
      h.style.scrollMarginTop = "5rem";
      return { id, text: h.textContent || "", level: h.tagName === "H3" ? 3 : 2 };
    });
    setItems(next);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Mục lục">
      <p className="text-xs font-semibold uppercase tracking-wider text-n-slate-10 mb-3">Mục lục</p>
      <ul className="border-l border-n-weak space-y-px">
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`block py-1.5 pe-2 text-sm leading-snug -ml-px border-l-2 transition ${
                  it.level === 3 ? "ps-6" : "ps-3"
                } ${
                  isActive
                    ? "text-n-portal font-medium border-n-portal"
                    : "text-n-slate-11 hover:text-n-slate-12 border-transparent"
                }`}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
