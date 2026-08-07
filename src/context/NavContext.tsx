"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Section =
  | "home"
  | "process"
  | "cases"
  | "about"
  | "experience"
  | "contact"
  | "ai-design";

interface NavContextType {
  active: Section;
  setActive: (s: Section) => void;
}

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Section>("home");
  return (
    <NavContext.Provider value={{ active, setActive }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
