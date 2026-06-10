import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SearchBox from "./SearchBox";
import { MobileMenuButton } from "./drawer";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-n-slate-1 border-b border-solid border-n-weak font-inter tracking-normal [font-optical-sizing:auto]">
      <div className="max-w-screen-2xl w-full mx-auto flex items-center h-16 px-4 md:px-6 gap-4">
        <MobileMenuButton />

        <Link href="/" className="flex items-center min-w-0 gap-2.5">
          <img
            src="/assets/images/logo.png"
            className="h-8 w-auto"
            draggable={false}
            alt="SquareHub"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1 ms-4" aria-label="Primary">
          <Link
            href="/"
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition text-n-portal"
          >
            Trang chủ
          </Link>
          <a
            href="https://squareomni.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-n-slate-11 hover:text-n-slate-12 rounded-md transition"
          >
            Website
            <span className="i-lucide-arrow-up-right size-3.5" aria-hidden="true" />
          </a>
        </nav>

        <div className="hidden md:block flex-1 max-w-md mx-auto relative z-30">
          <SearchBox size="small" kbd />
        </div>

        <div className="ms-auto flex items-center gap-1.5">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
