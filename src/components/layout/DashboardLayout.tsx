"use client";

import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh lg:h-dvh bg-[#FAFAFA]">
      <TopBar />
      <main className="lg:min-h-0 lg:overflow-y-auto content-area">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
