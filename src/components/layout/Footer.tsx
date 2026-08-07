"use client";

import { useLang } from "@/context/LangContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-[#1E1E32] py-8 px-5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#7C3AED] to-[#14B8A6] flex items-center justify-center text-white text-xs font-bold">
            JM
          </div>
          <p className="text-[#4A4A6A] text-sm">
            {t.footer.copy} · {t.footer.year}
          </p>
        </div>
        <p className="text-[#4A4A6A] text-xs font-mono">
          Built with Next.js · Framer Motion · Tailwind
        </p>
      </div>
    </footer>
  );
}
