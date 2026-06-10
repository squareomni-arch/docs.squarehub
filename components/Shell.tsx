import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { DrawerProvider } from "./drawer";

export default function Shell({
  children,
  isHome = false,
  activeCategory,
  activeArticle,
}: {
  children: ReactNode;
  isHome?: boolean;
  activeCategory?: string;
  activeArticle?: string;
}) {
  return (
    <DrawerProvider>
    <div id="portal" className="antialiased">
      <main className="flex flex-col min-h-screen bg-white main-content dark:bg-n-slate-1" role="main">
        <Header />
        <div className="bg-white dark:bg-n-slate-2 flex-1 flex font-inter tracking-normal [font-optical-sizing:auto]">
          <div className="max-w-screen-2xl w-full mx-auto flex flex-1">
            <Sidebar isHome={isHome} activeCategory={activeCategory} activeArticle={activeArticle} />
            <main className="flex-1 min-w-0 flex flex-col">
              {children}
            </main>
          </div>
        </div>
      </main>
    </div>
    </DrawerProvider>
  );
}
