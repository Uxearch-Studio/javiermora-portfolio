"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";

// ── Career data ─────────────────────────────────────────────
const TOTAL_XP = 8_400;
const MAX_XP   = 10_000;

const chapters = [
  {
    roman: "III",
    company: "Uxearch Studio",
    xp: 4_200,
    roleEn: "Co-founder · Lead UX Designer",
    roleEs: "Co-fundador · Lead UX Designer",
    period: "2022 — Present",
    periodEs: "2022 — Presente",
    locationEn: "Miami, FL",
    locationEs: "Miami, FL",
    isCurrent: true,
    descEn: "Co-founded a UX studio focused on Web3, fintech, and AI products. Led design for 10+ startups from zero to launch. Built client relationships in Miami and LATAM.",
    descEs: "Co-fundé un estudio UX enfocado en Web3, fintech e IA. Lideré el diseño de 10+ startups desde cero hasta el lanzamiento. Construí relaciones con clientes en Miami y LATAM.",
    achievementsEn: [
      "Led design for 10+ startups from 0 to launch",
      "Built a client network across Miami & LATAM",
      "Defined the studio's UX process and team culture",
    ],
    achievementsEs: [
      "Lideré el diseño de 10+ startups desde 0 al lanzamiento",
      "Construí red de clientes en Miami y LATAM",
      "Definí el proceso UX del estudio y la cultura de equipo",
    ],
    tags: ["UX Strategy", "Design Systems", "Leadership", "Web3", "Fintech"],
  },
  {
    roman: "II",
    company: "HUGE Inc.",
    xp: 2_800,
    roleEn: "Senior UX Designer · Google Team",
    roleEs: "Senior UX Designer · Equipo Google",
    period: "2020 — 2022",
    periodEs: "2020 — 2022",
    locationEn: "New York, NY",
    locationEs: "Nueva York, NY",
    isCurrent: false,
    descEn: "Embedded on the Google team at HUGE. Built and maintained large-scale design systems, collaborating daily with engineering across multiple Google product lines. Sharpened expertise in component architecture and cross-functional communication.",
    descEs: "Integrado en el equipo de Google en HUGE. Construí y mantuve sistemas de diseño a gran escala, colaborando diariamente con ingeniería en múltiples líneas de productos de Google.",
    achievementsEn: [
      "Shipped features to 100M+ Google users",
      "Maintained design systems at Google scale",
      "Daily cross-functional collaboration with Google engineering",
    ],
    achievementsEs: [
      "Features enviadas a 100M+ usuarios de Google",
      "Sistemas de diseño mantenidos a escala Google",
      "Colaboración transversal diaria con ingeniería de Google",
    ],
    tags: ["Design Systems", "Google Products", "Engineering Collaboration", "Figma"],
  },
  {
    roman: "I",
    company: "Freelance",
    xp: 1_400,
    roleEn: "UX/UI Designer",
    roleEs: "Diseñador UX/UI",
    period: "2018 — 2020",
    periodEs: "2018 — 2020",
    locationEn: "Colombia · Remote",
    locationEs: "Colombia · Remoto",
    isCurrent: false,
    descEn: "Designed mobile apps, dashboards, and brand identities for startups and agencies across LATAM. First exposure to fast-moving product cycles and the realities of limited research budgets.",
    descEs: "Diseñé apps móviles, dashboards e identidades de marca para startups y agencias en LATAM. Primera exposición a ciclos de producto acelerados y a la realidad de los presupuestos limitados.",
    achievementsEn: [
      "Delivered 20+ products across LATAM markets",
      "Mastered fast-paced client work at scale",
      "First steps into Web3 and fintech design",
    ],
    achievementsEs: [
      "Entregué 20+ productos en mercados LATAM",
      "Dominé el trabajo acelerado con clientes",
      "Primeros pasos en diseño Web3 y fintech",
    ],
    tags: ["Mobile Design", "Branding", "Startups", "LATAM"],
  },
];

const skills = [
  { name: "Figma",           value: 98 },
  { name: "User Research",   value: 95 },
  { name: "Design Systems",  value: 92 },
  { name: "Framer",          value: 82 },
  { name: "ProtoPie",        value: 80 },
  { name: "React / Next.js", value: 75 },
  { name: "Webflow",         value: 70 },
  { name: "Firebase",        value: 55 },
];

// ── Component ────────────────────────────────────────────────
export default function ExperienceView() {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-2xl">
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
        className="section-label mb-3"
      >
        {lang === "en" ? "Career Journey" : "Trayectoria"}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-6"
      >
        {lang === "en" ? "8 years, 3 chapters." : "8 años, 3 capítulos."}
      </motion.h1>

      {/* ── Character stats card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-[#E4E4E7] bg-white p-5 mb-8"
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold tracking-widest bg-[#0A0A0A] text-white font-mono select-none">
              LV.08
            </span>
            <span className="text-[14px] font-semibold text-[#0A0A0A]">
              Senior Product Designer
            </span>
          </div>
          <span className="text-[12px] text-[#52525B] font-mono tabular-nums">
            {TOTAL_XP.toLocaleString()} / {MAX_XP.toLocaleString()} XP
          </span>
        </div>

        {/* XP bar */}
        <div className="h-2 bg-[#F4F4F5] rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(TOTAL_XP / MAX_XP) * 100}%` }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)" }}
          />
        </div>

        {/* Stats row */}
        <div className="flex gap-6">
          {[
            { labelEn: "Companies",  labelEs: "Empresas",  value: "3"   },
            { labelEn: "Years",      labelEs: "Años",      value: "8"   },
            { labelEn: "Products",   labelEs: "Productos", value: "30+" },
          ].map((s) => (
            <div key={s.labelEn}>
              <p className="text-[12px] font-medium text-[#52525B] mb-0.5">
                {lang === "en" ? s.labelEn : s.labelEs}
              </p>
              <p className="text-[18px] font-bold text-[#0A0A0A] font-mono leading-none">{s.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Chapter cards ── */}
      <div className="space-y-3 mb-10">
        {chapters.map((ch, i) => {
          const isOpen = expanded === ch.company;
          return (
            <motion.div
              key={ch.company}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-[#E4E4E7] bg-white overflow-hidden"
            >
              {/* Clickable header */}
              <button
                onClick={() => setExpanded(isOpen ? null : ch.company)}
                className="w-full text-left p-5 hover:bg-[#FAFAFA] transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* Chapter label */}
                  <span className="text-[10px] font-bold tracking-[0.18em] text-[#A1A1AA] font-mono mt-1 shrink-0 select-none">
                    CH.{ch.roman}
                  </span>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h2 className="text-[15px] font-semibold text-[#0A0A0A]">{ch.company}</h2>
                      {ch.isCurrent && (
                        <span className="px-1.5 py-px text-[10px] font-bold rounded-full bg-[#DCFCE7] text-[#166534]">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-[#2563EB] font-medium">
                      {lang === "en" ? ch.roleEn : ch.roleEs}
                    </p>
                    <p className="text-[12px] text-[#52525B] mt-1">
                      {lang === "en" ? ch.locationEn : ch.locationEs}
                      {" · "}
                      <span className="font-mono">{lang === "en" ? ch.period : ch.periodEs}</span>
                    </p>
                  </div>

                  {/* XP + chevron */}
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <span className="text-[13px] font-bold font-mono text-[#7C3AED]">
                      +{ch.xp.toLocaleString()} XP
                    </span>
                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      width="15" height="15" viewBox="0 0 15 15" fill="none"
                      className="text-[#A1A1AA]"
                    >
                      <path d="M3 5.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </div>
                </div>
              </button>

              {/* Expanded quest details */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-5 pb-5 pt-4 border-t border-[#F4F4F5]">
                      <p className="text-[13px] text-[#3F3F46] leading-[1.7] mb-5">
                        {lang === "en" ? ch.descEn : ch.descEs}
                      </p>

                      {/* Achievements */}
                      <p className="text-[12px] font-bold text-[#52525B] uppercase tracking-[0.1em] mb-2.5">
                        {lang === "en" ? "Achievements Unlocked" : "Logros Desbloqueados"}
                      </p>
                      <ul className="space-y-2 mb-5">
                        {(lang === "en" ? ch.achievementsEn : ch.achievementsEs).map((a, ai) => (
                          <motion.li
                            key={a}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: ai * 0.07, duration: 0.3 }}
                            className="flex items-start gap-2 text-[13px] text-[#3F3F46]"
                          >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0 mt-px text-[#16A34A]">
                              <path d="M2.5 7.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {a}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {ch.tags.map((t) => (
                          <span key={t} className="px-2.5 py-1 text-[12px] font-medium rounded-md bg-[#F4F4F5] text-[#3F3F46]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <hr className="divider" />

      {/* ── Skill stats ── */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="section-label mb-5"
      >
        {lang === "en" ? "Skill Stats" : "Stats de Habilidades"}
      </motion.p>

      <div className="space-y-4">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-medium text-[#0A0A0A]">{s.name}</span>
              <span className="text-[12px] font-mono font-semibold text-[#52525B] tabular-nums">{s.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#F4F4F5] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.value}%` }}
                transition={{ duration: 1.0, delay: 0.55 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{
                  background: s.value >= 90
                    ? "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)"
                    : s.value >= 75
                    ? "#2563EB"
                    : "#52525B",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="flex items-center gap-5 mt-6 pt-5 border-t border-[#E4E4E7]"
      >
        {[
          { colorClass: "bg-gradient-to-r from-[#2563EB] to-[#7C3AED]", labelEn: "Expert (90+)", labelEs: "Experto (90+)" },
          { colorClass: "bg-[#2563EB]", labelEn: "Advanced (75–89)", labelEs: "Avanzado (75–89)" },
          { colorClass: "bg-[#52525B]", labelEn: "Working (< 75)", labelEs: "Funcional (< 75)" },
        ].map((l) => (
          <div key={l.labelEn} className="flex items-center gap-1.5">
            <span className={`w-3 h-1.5 rounded-full ${l.colorClass}`} />
            <span className="text-[12px] text-[#52525B]">{lang === "en" ? l.labelEn : l.labelEs}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
