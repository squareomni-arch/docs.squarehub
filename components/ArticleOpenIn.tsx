// Đường dẫn Markdown nội bộ (tiếng Việt) do route /md/[slug] tạo ra.
// Đặt NEXT_PUBLIC_SITE_URL khi triển khai để link ChatGPT/Claude có URL tuyệt đối
// mà các trợ lý AI có thể truy cập được.
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "";

export default function ArticleOpenIn({ slug }: { slug: string }) {
  const md = `/md/${slug}`;
  const prompt = `Đọc bài viết sau và giúp tôi hiểu nội dung: ${SITE}${md}`;
  const enc = encodeURIComponent(prompt);
  const chatgpt = `https://chatgpt.com/?q=${enc}`;
  const claude = `https://claude.ai/new?q=${enc}`;

  const item =
    "w-full flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-md text-n-slate-12 hover:bg-n-alpha-2 transition";
  const badge =
    "shrink-0 inline-flex items-center justify-center size-5 rounded bg-n-alpha-2 border border-solid border-n-weak text-n-slate-12";
  const ext = "i-lucide-arrow-up-right size-3.5 text-n-slate-10";

  return (
    <details className="relative group">
      <summary className="list-none inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md cursor-pointer text-n-slate-11 hover:text-n-slate-12 hover:bg-n-alpha-2 border border-solid border-n-weak transition group-open:bg-n-alpha-2 group-open:text-n-slate-12 [&::-webkit-details-marker]:hidden">
        <span className="i-lucide-message-square-text size-3" aria-hidden="true" />
        Mở trong
        <span className="i-lucide-chevron-down size-2.5 opacity-60 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>

      <div className="absolute end-0 top-full mt-2 bg-n-slate-1 border border-solid border-n-weak rounded-lg shadow-lg p-1 min-w-64 z-30">
        <a href={md} target="_blank" rel="noopener noreferrer" className={item}>
          <span className={badge}>
            <span className="i-lucide-file-text size-3" aria-hidden="true" />
          </span>
          <span className="flex-1">Xem dạng Markdown</span>
          <span className={ext} aria-hidden="true" />
        </a>
        <div className="my-1 h-px bg-n-weak" role="separator" />
        <a href={chatgpt} target="_blank" rel="noopener noreferrer" className={item}>
          <span className={badge}>
            <span className="i-ri-openai-fill size-3" aria-hidden="true" />
          </span>
          <span className="flex-1">Mở trong ChatGPT</span>
          <span className={ext} aria-hidden="true" />
        </a>
        <a href={claude} target="_blank" rel="noopener noreferrer" className={item}>
          <span className={badge}>
            <span className="i-ri-claude-fill size-3" aria-hidden="true" />
          </span>
          <span className="flex-1">Mở trong Claude</span>
          <span className={ext} aria-hidden="true" />
        </a>
      </div>
    </details>
  );
}
