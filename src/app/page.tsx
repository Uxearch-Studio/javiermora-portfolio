"use client";

import { motion } from "framer-motion";
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

  // Sin AnimatePresence: el modo "wait" dejaba vistas en blanco o copias
  // congeladas (Framer deja de animar el árbol "exiting") cuando la
  // transición se interrumpía. El key remonta la vista nueva con fade-in;
  // la anterior se desmonta al instante — sin estados intermedios rotos.
  return (
    <motion.div
      key={active}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      // Home fue diseñado para caber exacto en el viewport (100dvh − 96px de
      // padding del content-area); las demás vistas fluyen con el documento.
      className={`relative ${active === "home" ? "lg:h-[calc(100dvh-96px)]" : ""}`}
    >
      {views[active]}
    </motion.div>
  );
}

export default function Home() {
  return (
    <DashboardLayout>
      <ActiveView />
    </DashboardLayout>
  );
}
