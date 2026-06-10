/** Avatar chữ cái: hiển thị viết tắt của tên trên nền màu suy ra từ tên. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

export default function Avatar({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center font-semibold text-white select-none ${className}`}
      style={{ backgroundColor: `hsl(${hue(name)} 52% 48%)` }}
      aria-label={name}
      title={name}
    >
      {initials(name)}
    </span>
  );
}
