import type { Author } from "@/lib/data";
import Avatar from "./Avatar";

/** Avatar chữ cái xếp chồng. `size` khớp hai chỗ dùng trong thiết kế. */
export default function AuthorStack({
  authors,
  size = "md",
}: {
  authors: Author[];
  size?: "md" | "sm";
}) {
  const dim =
    size === "md"
      ? "w-6 h-6 rounded-md text-[10px]"
      : "w-5 h-5 rounded text-[8px]";
  const overlap = size === "md" ? "-ml-1.5" : "-ml-0.5";
  return (
    <span className="inline-flex items-center">
      {authors.map((a, i) => (
        <Avatar
          key={a.name + i}
          name={a.name}
          className={`${dim} ring-2 ring-solid ring-white dark:ring-n-slate-2 relative ${
            i === 0 ? "z-30" : `z-20 ${overlap}`
          }`}
        />
      ))}
    </span>
  );
}
