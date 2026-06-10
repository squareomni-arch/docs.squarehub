# Chatwoot Help Center — Next.js + Tailwind

A pixel-perfect rebuild of the Chatwoot User Guide as a modern **Next.js
(App Router) + Tailwind CSS** application. 15 categories and 133 articles are
rendered from structured data through a handful of shared, typed React
components, and the whole site is statically prerendered (`next build` → 152
static pages).

## How it works

- **`data/{nav,categories,articles,home}.json`** holds the content: the sidebar
  tree, category pages, and every article's prose body (HTML reused verbatim,
  with URLs pointing at `/assets`, `/articles`, `/categories`).
- **`tailwind.config.ts` + `app/globals.css`** recreate the design system 1:1:
  - the Radix **slate** scale (`n-slate-1…12`) and `n-weak` / `n-alpha-*` tokens,
    light + dark;
  - the dynamic **portal** colour (`#2881F6`) driving `n-portal` / `-soft` / `-faint`;
  - the custom `font-420` / `font-620` weights and self-hosted **InterVariable**;
  - `i-lucide-*` and `i-ri-*` icons via `@egoist/tailwindcss-icons`.
- **Routes**:
  - `/` — hero, “Browse by topic”, “Popular articles”
  - `/categories/[slug]` — 15 category pages (`generateStaticParams`)
  - `/articles/[slug]` — 133 article pages with prose body + client TOC

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Production build / serve:

```bash
npm run build && npm start
```

## Project layout

```
app/                # App Router pages + root layout + globals.css
components/         # Header, Sidebar, Footer, Shell, ThemeToggle, SearchBox,
                   #   Breadcrumbs, AuthorStack, ArticleToc, ArticleOpenIn
lib/data.ts        # typed loaders over the JSON content
data/              # nav / categories / articles / home
public/assets/     # images + fonts
```

## Notes

- **Theme** — System / Light / Dark via the header toggle; a blocking inline
  script applies the theme before paint to avoid a flash.
- **Sidebar / language / “Open in”** menus use native `<details>` so they work
  without JS.
- **Search** — the live portal proxies queries to a backend search API that is
  not bundled here, so the field renders on-brand and shows an inline notice
  instead of results.
