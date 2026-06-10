import navJson from "@/data/nav.json";
import homeJson from "@/data/home.json";
import categoriesJson from "@/data/categories.json";
import articlesJson from "@/data/articles.json";

export type Author = { name: string; avatar: string };

export type NavCategory = {
  emoji: string;
  name: string;
  slug: string;
  articles: { slug: string; title: string }[];
};

export type HomeData = {
  heroTopics: { slug: string; emoji: string; name: string }[];
  cards: {
    slug: string;
    emoji: string;
    title: string;
    description: string;
    authors: Author[];
  }[];
  popular: {
    slug: string;
    emoji: string;
    categoryName: string;
    title: string;
    excerpt: string;
  }[];
};

export type Category = {
  slug: string;
  emoji: string;
  title: string;
  description: string;
  articleCount: number;
  authorsText: string;
  authors: Author[];
  articles: { slug: string; title: string; excerpt: string }[];
};

export type Article = {
  slug: string;
  title: string;
  category: { slug: string; emoji: string; name: string };
  author: Author;
  updated: string;
  bodyHtml: string;
};

export const nav = navJson as NavCategory[];
export const home = homeJson as HomeData;
export const categories = categoriesJson as Record<string, Category>;
export const articles = articlesJson as Record<string, Article>;

export const getCategory = (slug: string): Category | undefined => categories[slug];
export const getArticle = (slug: string): Article | undefined => articles[slug];

export const categorySlugs = Object.keys(categories);
export const articleSlugs = Object.keys(articles);

/** Which category does an article belong to (for sidebar highlighting)? */
export function categoryForArticle(slug: string): string | undefined {
  for (const cat of nav) {
    if (cat.articles.some((a) => a.slug === slug)) return cat.slug;
  }
  return articles[slug]?.category.slug;
}
