"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    // El documento scrollea (scrollbar nativo pegado al borde del browser);
    // sidebar y topbar quedan sticky, bottom nav fijo en móvil.
    <div className="flex flex-col min-h-dvh bg-[#FAFAFA]">
      {/* TopBar: mobile only — desktop uses Sidebar */}
      <div className="lg:hidden shrink-0">
        <TopBar />
      </div>
      <div className="flex flex-1">
        <Sidebar
          mobileOpen={false}
          onClose={() => {}}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
        <main className="flex-1 min-w-0 content-area max-lg:pb-24">
          {children}
        </main>
      </div>
      {/* BottomNav: mobile only, fijo al fondo del viewport */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40">
        <BottomNav />
      </div>
    </div>
  );
}
