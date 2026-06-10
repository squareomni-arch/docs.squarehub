import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { articleSlugs, getArticle } from "@/lib/data";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

function htmlToMarkdown(html: string): string {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
  });
  td.use(gfm);
  return td.turndown(html);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return new Response("Không tìm thấy bài viết.", { status: 404 });

  const body = htmlToMarkdown(a.bodyHtml);
  const md =
    `# ${a.title}\n\n` +
    `> ${a.author.name} · ${a.updated}\n\n` +
    `${body}\n`;

  return new Response(md, {
    status: 200,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
