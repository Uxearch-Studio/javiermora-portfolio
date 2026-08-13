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
    <div className="flex flex-col h-dvh bg-[#FAFAFA]">
      {/* TopBar: mobile only — desktop uses Sidebar */}
      <div className="lg:hidden shrink-0">
        <TopBar />
      </div>
      <div className="flex flex-1 min-h-0">
        <Sidebar
          mobileOpen={false}
          onClose={() => {}}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
        <main className="flex-1 min-h-0 overflow-y-auto content-area">
          {children}
        </main>
      </div>
      {/* BottomNav: mobile only, stays fixed at bottom via flex layout */}
      <div className="lg:hidden shrink-0">
        <BottomNav />
      </div>
    </div>
  );
}
