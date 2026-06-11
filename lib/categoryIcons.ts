/**
 * Mỗi danh mục dùng một icon lucide thay cho emoji. Tra theo slug (ưu tiên) hoặc
 * theo emoji gốc (cho những chỗ dữ liệu chỉ còn emoji, vd thẻ "Bài viết phổ biến").
 *
 * Lưu nguyên class đầy đủ "i-lucide-..." (không ghép động) để Tailwind quét được
 * và sinh ra các utility icon tương ứng.
 */
export const ICON_BY_SLUG: Record<string, string> = {
  "squarehub-101": "i-lucide-rocket",
  "setup-account": "i-lucide-user-cog",
  "website-live-chat": "i-lucide-message-circle",
  "other-channels": "i-lucide-share-2",
  "voice-channels": "i-lucide-phone",
  "features-explained": "i-lucide-book-open",
  "advanced-features-explained": "i-lucide-sliders-horizontal",
  "apps-and-integrations": "i-lucide-blocks",
  reports: "i-lucide-chart-bar",
  "help-center": "i-lucide-life-buoy",
  "best-practices": "i-lucide-lightbulb",
  captain: "i-lucide-sparkles",
  migrations: "i-lucide-arrow-right-left",
  "other-topics": "i-lucide-folder",
  "how-to": "i-lucide-graduation-cap",
  "ban-hang-tu-dong-hoa": "i-lucide-workflow",
};

const ICON_BY_EMOJI: Record<string, string> = {
  "🚀": "i-lucide-rocket",
  "👝": "i-lucide-user-cog",
  "💬": "i-lucide-message-circle",
  "🪵": "i-lucide-share-2",
  "📞": "i-lucide-phone",
  "📚": "i-lucide-book-open",
  "🔎": "i-lucide-sliders-horizontal",
  "⚡": "i-lucide-blocks",
  "📊": "i-lucide-chart-bar",
  "❓": "i-lucide-life-buoy",
  "💫": "i-lucide-lightbulb",
  "🔥": "i-lucide-sparkles",
  "🛳️": "i-lucide-arrow-right-left",
  "📌": "i-lucide-folder",
  "⚙️": "i-lucide-graduation-cap",
  "🛒": "i-lucide-workflow",
};

/** Trả về class icon đầy đủ; mặc định folder nếu không khớp. */
export function categoryIcon({ slug, emoji }: { slug?: string; emoji?: string }): string {
  return (
    (slug && ICON_BY_SLUG[slug]) ||
    (emoji && ICON_BY_EMOJI[emoji]) ||
    "i-lucide-folder"
  );
}
