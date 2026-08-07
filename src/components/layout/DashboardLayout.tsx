"use client";

import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-dvh bg-[#FAFAFA]">
      <TopBar />
      <main className="flex-1 min-h-0 overflow-y-auto content-area">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
