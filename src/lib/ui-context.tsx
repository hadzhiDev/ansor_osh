"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UiContextValue = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const UiContext = createContext<UiContextValue | undefined>(undefined);

export function UiProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const value: UiContextValue = {
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used within a UiProvider");
  return ctx;
}
