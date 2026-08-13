"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Section =
  | "home"
  | "process"
  | "cases"
  | "about"
  | "experience"
  | "contact"
  | "ai-design";

const VALID: Section[] = ["home", "process", "cases", "about", "experience", "contact", "ai-design"];

function parseHash(): Section {
  if (typeof window === "undefined") return "home";
  const s = window.location.hash.slice(1) as Section;
  return VALID.includes(s) ? s : "home";
}

interface NavContextType {
  active: Section;
  setActive: (s: Section) => void;
}

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [active, setActiveState] = useState<Section>("home");

  useEffect(() => {
    setActiveState(parseHash());
    const onPop = () => setActiveState(parseHash());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const setActive = (s: Section) => {
    const hash = s === "home" ? window.location.pathname : "#" + s;
    history.pushState(null, "", hash);
    setActiveState(s);
  };

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
