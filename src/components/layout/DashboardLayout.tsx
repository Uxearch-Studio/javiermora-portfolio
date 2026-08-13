"use client";

import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col min-h-dvh lg:h-dvh bg-[#FAFAFA]">
      {/* TopBar: mobile only — desktop uses Sidebar for all navigation */}
      <div className="lg:hidden">
        <TopBar />
      </div>
      <div className="flex flex-1 lg:min-h-0">
        <Sidebar mobileOpen={false} onClose={() => {}} />
        <main className="flex-1 lg:min-h-0 lg:overflow-y-auto content-area">
          {children}
        </main>
      </div>
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
