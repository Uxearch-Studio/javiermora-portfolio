"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function Work() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[#7C3AED] font-mono text-sm tracking-widest uppercase mb-4"
      >
        {t.work.label}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8E8F0] leading-tight mb-12 whitespace-pre-line"
      >
        {t.work.title}
      </motion.h2>

      <div className="space-y-6">
        {t.work.projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={project} t={t.work} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  t,
}: {
  project: {
    slug: string;
    title: string;
    category: string;
    description: string;
    tags: readonly string[];
    color: string;
    year: string;
    live: string | null;
  };
  t: { viewCase: string; viewLive: string; comingSoon: string };
}) {
  return (
    <div className="group relative bg-[#0F0F1A] border border-[#1E1E32] rounded-2xl p-6 sm:p-8 hover:border-[#2E2E4A] transition-all duration-300 overflow-hidden">
      {/* Color accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: project.color }}
      />

      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, ${project.color}08, transparent 70%)`,
        }}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
        {/* Left: content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-xs font-mono text-[#4A4A6A]">{project.year}</span>
            <span className="text-[#4A4A6A]">·</span>
            <span className="text-xs text-[#9494AB]">{project.category}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#E8E8F0] mb-3 group-hover:text-white transition-colors">
            {project.title}
          </h3>

          <p className="text-[#9494AB] text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-[#1E1E32] text-[#9494AB] bg-[#16162A]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
                style={{ background: project.color }}
              >
                {t.viewLive} ↗
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-[#4A4A6A] px-4 py-2 border border-[#1E1E32] rounded-lg">
                {t.comingSoon}
              </span>
            )}
          </div>
        </div>

        {/* Right: large number */}
        <div
          className="hidden sm:flex items-center justify-center w-20 h-20 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity flex-shrink-0"
          style={{ background: project.color }}
        >
          <span className="text-3xl font-black text-white">
            {String(
              ["tactica", "kolo", "defi-platform"].indexOf(project.slug) + 1
            ).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
