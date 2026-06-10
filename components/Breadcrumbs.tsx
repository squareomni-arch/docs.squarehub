import Link from "next/link";
import { Fragment } from "react";

export type Crumb = {
  label: string;
  href?: string;
  emoji?: string;
  icon?: string;
  home?: boolean;
  current?: boolean;
};

function Glyph({ c }: { c: Crumb }) {
  if (c.icon) return <span className={`${c.icon} size-3.5`} aria-hidden="true" />;
  if (c.emoji) return <span>{c.emoji}</span>;
  return null;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-n-slate-11 mb-8 flex-wrap">
      {items.map((c, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span className="i-lucide-chevron-right size-3 text-n-slate-9" aria-hidden="true" />
          )}
          {c.home ? (
            <Link
              href={c.href ?? "/"}
              className="inline-flex items-center gap-1.5 hover:text-n-slate-12 transition"
            >
              <span className="i-lucide-house size-3.5" aria-hidden="true" />
              Trang chủ
            </Link>
          ) : c.href ? (
            <Link
              href={c.href}
              className="inline-flex items-center gap-1.5 hover:text-n-slate-12 transition"
            >
              <Glyph c={c} />
              {c.label}
            </Link>
          ) : c.current ? (
            <span className="text-n-slate-12 font-medium truncate">{c.label}</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-n-slate-12 font-medium truncate">
              <Glyph c={c} />
              {c.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
