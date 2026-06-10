"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categoryIcon } from "@/lib/categoryIcons";

type Item = { slug: string; title: string; cat: string; catSlug: string; body: string };
type Indexed = Item & { _n: string };
type Result = Item & { snippet: string };

/** Bỏ dấu tiếng Việt + viết thường để so khớp không phân biệt dấu/hoa-thường. */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase();
}

let cache: Indexed[] | null = null;

function snippetOf(body: string, terms: string[]): string {
  const nb = normalize(body);
  let pos = -1;
  for (const t of terms) {
    const i = nb.indexOf(t);
    if (i >= 0 && (pos < 0 || i < pos)) pos = i;
  }
  if (pos < 0) return body.slice(0, 140) + (body.length > 140 ? "…" : "");
  const start = Math.max(0, pos - 50);
  return (start > 0 ? "…" : "") + body.slice(start, start + 150) + "…";
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const nt = normalize(text);
  // tìm vị trí khớp trên chuỗi đã chuẩn hoá (độ dài giữ nguyên vì chỉ bỏ dấu/hạ chữ)
  const marks: Array<[number, number]> = [];
  for (const t of terms) {
    let from = 0;
    let i;
    while ((i = nt.indexOf(t, from)) >= 0) {
      marks.push([i, i + t.length]);
      from = i + t.length;
    }
  }
  if (!marks.length) return <>{text}</>;
  marks.sort((a, b) => a[0] - b[0]);
  const out: React.ReactNode[] = [];
  let cur = 0;
  for (const [s, e] of marks) {
    if (s < cur) continue;
    if (s > cur) out.push(text.slice(cur, s));
    out.push(
      <mark key={s} className="bg-n-portal-soft text-n-portal rounded-sm px-0.5">
        {text.slice(s, e)}
      </mark>
    );
    cur = e;
  }
  if (cur < text.length) out.push(text.slice(cur));
  return <>{out}</>;
}

export default function SearchBox({
  size = "small",
  kbd = false,
}: {
  size?: "small" | "large";
  kbd?: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [items, setItems] = useState<Indexed[] | null>(cache);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const large = size === "large";

  // Nạp chỉ mục (một lần) khi người dùng bắt đầu tương tác.
  const loadIndex = () => {
    if (items || loading) return;
    setLoading(true);
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: Item[]) => {
        cache = data.map((d) => ({ ...d, _n: normalize(`${d.title} ${d.cat} ${d.body}`) }));
        setItems(cache);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!kbd) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        loadIndex();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kbd]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const terms = useMemo(
    () => normalize(value).split(/\s+/).filter(Boolean),
    [value]
  );

  const results = useMemo<Result[]>(() => {
    if (!items || terms.length === 0) return [];
    const scored: Array<{ it: Indexed; score: number }> = [];
    for (const it of items) {
      let score = 0;
      const nt = normalize(it.title);
      const nc = normalize(it.cat);
      let ok = true;
      for (const t of terms) {
        if (!it._n.includes(t)) { ok = false; break; }
        if (nt.includes(t)) score += 10;
        else if (nc.includes(t)) score += 4;
        else score += 1;
        if (nt.startsWith(t)) score += 5;
      }
      if (ok) scored.push({ it, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 8).map(({ it }) => ({ ...it, snippet: snippetOf(it.body, terms) }));
  }, [items, terms]);

  useEffect(() => setActive(0), [value]);

  const go = (slug: string) => {
    setOpen(false);
    setValue("");
    router.push(`/articles/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showPanel = open && value.trim().length > 0;

  return (
    <div className="relative w-full" ref={boxRef}>
      <div
        className={`flex items-center gap-2.5 w-full rounded-lg border border-solid border-n-weak bg-n-slate-2 text-n-slate-11 transition focus-within:border-n-portal ${
          large ? "h-12 px-4 text-base" : "h-9 px-3 text-sm"
        }`}
      >
        <span
          className={`i-lucide-search ${large ? "size-5" : "size-4"} text-n-slate-10 flex-shrink-0`}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            loadIndex();
            if (value.trim()) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder="Tìm bài viết theo tiêu đề hoặc nội dung..."
          aria-label="Tìm bài viết"
          className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-n-slate-10 text-n-slate-12 [&::-webkit-search-cancel-button]:hidden"
        />
        {kbd && !value && (
          <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[11px] font-medium text-n-slate-10 bg-n-slate-1 border border-solid border-n-weak rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        )}
      </div>

      {showPanel && (
        <div
          className={`absolute ${
            large ? "top-14" : "top-11"
          } inset-x-0 bg-n-slate-1 border border-solid border-n-weak rounded-lg shadow-lg overflow-hidden z-50 max-h-[26rem] overflow-y-auto`}
        >
          {!items && loading && (
            <div className="px-4 py-6 text-sm text-n-slate-11 text-center">Đang tải…</div>
          )}
          {items && results.length === 0 && (
            <div className="px-4 py-6 text-sm text-n-slate-11 text-center">
              Không tìm thấy kết quả cho “{value.trim()}”.
            </div>
          )}
          {results.length > 0 && (
            <ul className="py-1.5">
              {results.map((r, i) => (
                <li key={r.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.slug)}
                    className={`w-full text-start px-3 py-2.5 flex flex-col gap-0.5 transition ${
                      i === active ? "bg-n-alpha-2" : ""
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-n-slate-10">
                      <span
                        className={`${categoryIcon({ slug: r.catSlug })} size-3`}
                        aria-hidden="true"
                      />
                      {r.cat}
                    </span>
                    <span className="text-sm font-medium text-n-slate-12 truncate">
                      <Highlight text={r.title} terms={terms} />
                    </span>
                    <span className="text-xs text-n-slate-11 line-clamp-1">
                      <Highlight text={r.snippet} terms={terms} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
