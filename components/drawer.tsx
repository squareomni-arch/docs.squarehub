"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const DrawerCtx = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
}>({ open: false, setOpen: () => {} });

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <DrawerCtx.Provider value={{ open, setOpen }}>{children}</DrawerCtx.Provider>;
}

export const useDrawer = () => useContext(DrawerCtx);

/** Nút hamburger mở menu trên mobile (đặt trong Header). */
export function MobileMenuButton() {
  const { setOpen } = useDrawer();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Mở menu"
      className="md:hidden -ms-1 p-2 rounded-lg text-n-slate-11 hover:bg-n-alpha-2 cursor-pointer"
    >
      <span className="i-lucide-panel-left-open size-5 block" aria-hidden="true" />
    </button>
  );
}
