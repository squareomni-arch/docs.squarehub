"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "system" | "light" | "dark";

const OPTIONS: { value: Theme; label: string; icon: string }[] = [
  { value: "system", label: "Hệ thống", icon: "i-lucide-monitor" },
  { value: "light", label: "Sáng", icon: "i-lucide-sun" },
  { value: "dark", label: "Tối", icon: "i-lucide-moon" },
];

function apply(theme: Theme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && prefersDark);
  root.classList.toggle("dark", dark);
  root.classList.toggle("light", !dark);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) || "system";
    setTheme(stored);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const choose = (value: Theme) => {
    setTheme(value);
    if (value === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", value);
    apply(value);
    setOpen(false);
  };

  const current = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Giao diện"
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer text-n-slate-11 hover:text-n-slate-12 hover:bg-n-alpha-2 transition ${
          open ? "bg-n-alpha-2 text-n-slate-12" : ""
        }`}
      >
        <span className={`${current.icon} size-4`} aria-hidden="true" />
      </button>

      {open && (
        <div
          className="appearance-menu absolute end-0 top-full mt-2 bg-n-slate-1 border border-solid border-n-weak rounded-lg shadow-lg p-1 min-w-44 z-50 flex flex-col gap-0.5"
          data-current-theme={theme}
        >
          <div className="px-2.5 pt-2 pb-1.5 text-xs font-semibold text-n-slate-10 uppercase tracking-wider">Giao diện</div>
          {OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => choose(o.value)}
              className={`flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-md transition ${
                theme === o.value
                  ? "bg-n-portal-soft text-n-portal"
                  : "text-n-slate-11 hover:bg-n-alpha-2 hover:text-n-slate-12"
              }`}
            >
              <span className={`${o.icon} size-4 flex-shrink-0`} aria-hidden="true" />
              <span className="flex-1 text-start font-medium">{o.label}</span>
              {theme === o.value && (
                <span className="i-lucide-check size-3.5 text-n-portal flex-shrink-0" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
