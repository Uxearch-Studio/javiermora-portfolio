"use client";

import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col min-h-dvh md:h-dvh bg-[#FAFAFA]">
      <TopBar />
      <main className="flex-1 md:min-h-0 md:overflow-y-auto content-area">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
