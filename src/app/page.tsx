"use client";

import { AnimatePresence, motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useNav } from "@/context/NavContext";
import HomeView from "@/components/views/HomeView";
import ProcessView from "@/components/views/ProcessView";
import CasesView from "@/components/views/CasesView";
import AboutView from "@/components/views/AboutView";
import ExperienceView from "@/components/views/ExperienceView";
import AIDesignView from "@/components/views/AIDesignView";
import ContactView from "@/components/views/ContactView";

function ActiveView() {
  const { active } = useNav();

  const views = {
    home:       <HomeView />,
    process:    <ProcessView />,
    cases:      <CasesView />,
    about:      <AboutView />,
    experience: <ExperienceView />,
    "ai-design":<AIDesignView />,
    contact:    <ContactView />,
  };

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="relative h-full"
      >
        {views[active]}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <DashboardLayout>
      <ActiveView />
    </DashboardLayout>
  );
}
