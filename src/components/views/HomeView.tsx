"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNav } from "@/context/NavContext";
import { useLang } from "@/context/LangContext";
import WorkCard from "@/components/cards/WorkCard";
import { WORK } from "@/data/work";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};
const rowStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.0 } },
};
const slideFromLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const slideFromRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const popUp = {
  hidden: { opacity: 0, y: 22, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, damping: 24, stiffness: 300 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────────────────────────────────────────────────
   Activity Grid — GitHub-style career heatmap
   6 role tracks × 17 years × 4 quarters × 3 rows of squares
   Colors: AAA-compliant on #0A0A0A (≥7:1 contrast)
───────────────────────────────────────────────────────── */
const ACTIVITY_YEARS = [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];

const ACTIVITY_TRACKS = [
  {
    id: "education",
    // Y-axis: two-line role label
    roleLine1: { en: "Education", es: "Educación" },
    roleLine2: { en: "University", es: "Universidad" },
    // #C4B5FD purple-300 — contrast 7.9:1 AAA
    color: "#C4B5FD",
    data: {2010:3,2011:3,2012:3,2013:3,2014:3,2015:3,2016:2,2017:1,2024:1,2025:2,2026:3} as Record<number,number>,
    period: "2010 – Present",
    title: { en: "Education", es: "Educación" },
    role: { en: "Design Student · Icesi University", es: "Estudiante de Diseño · U. Icesi" },
    desc: {
      en: "A foundation in design thinking, and a commitment to keeping learning. From academia to AI-native development.",
      es: "Una base en design thinking y el compromiso de seguir aprendiendo. De la academia al desarrollo AI-native.",
    },
    tags: ["Design Theory", "HCI", "Typography", "AI-Native", "Claude Code"],
    timeline: [
      { year: "2010–17", title: { en: "Interactive Media Design, B.A.", es: "Diseño de Medios Interactivos" }, place: "Universidad Icesi · Cali, Colombia" },
      { year: "2014–15", title: { en: "English Immersion Course", es: "Curso de Inglés Intensivo" },          place: "Fort Lauderdale, FL" },
      { year: "2022+",   title: { en: "Design Systems", es: "Design Systems" },                              place: "Self-study · Teams · Practice" },
      { year: "2025+",   title: { en: "Claude Code Courses", es: "Cursos Claude Code" },                     place: "AI-native design & development" },
    ],
  },
  {
    id: "ux",
    roleLine1: { en: "UX/UI", es: "UX/UI" },
    roleLine2: { en: "Designer", es: "Diseñador" },
    // #22D3EE cyan-400 — contrast 9.4:1 AAA
    color: "#22D3EE",
    data: {2014:1,2015:2,2016:2,2017:2,2018:3,2019:3,2020:3,2021:2,2022:2,2023:2,2024:2,2025:2,2026:2} as Record<number,number>,
    period: "2016 – 2022",
    title: { en: "UX/UI Designer", es: "Diseñador UX/UI" },
    role: { en: "UX Designer · France · Egypt · Crypto", es: "UX Designer · Francia · Egipto · Cripto" },
    desc: {
      en: "Research-led design across France, Egypt and the crypto space. 10+ products shipped with contextual inquiry, usability testing and JTBD frameworks.",
      es: "Diseño centrado en investigación en Francia, Egipto y cripto. 10+ productos con entrevistas contextuales y JTBD.",
    },
    tags: ["User Research", "Usability Testing", "Wireframing", "JTBD"],
  },
  {
    id: "product",
    roleLine1: { en: "Product", es: "Producto" },
    roleLine2: { en: "Designer", es: "Diseñador" },
    // #34D399 emerald-400 — contrast 8.1:1 AAA
    color: "#34D399",
    data: {2019:1,2020:2,2021:3,2022:3,2023:3,2024:3,2025:2,2026:2} as Record<number,number>,
    period: "2019 – Present",
    title: { en: "Product Designer", es: "Product Designer" },
    role: { en: "Product Designer · 3 Startups · 0→1", es: "Product Designer · 3 Startups · 0→1" },
    desc: {
      en: "5+ years owning end-to-end product design. Led 3 startups from 0→1, then scaled to enterprise at HUGE · Google. Responsible for research, vision, delivery and OKRs.",
      es: "5+ años liderando diseño end-to-end. De 0→1 en 3 startups, luego enterprise en HUGE · Google.",
    },
    tags: ["0→1 Products", "Prototyping", "OKRs", "Stakeholders"],
  },
  {
    id: "systems",
    roleLine1: { en: "Design", es: "Design" },
    roleLine2: { en: "Systems", es: "Systems" },
    // #FCD34D amber-300 — contrast 12.7:1 AAA
    color: "#FCD34D",
    data: {2020:1,2021:1,2022:2,2023:2,2024:3,2025:3,2026:2} as Record<number,number>,
    period: "2022 – Present",
    title: { en: "Design Systems", es: "Design Systems" },
    role: { en: "Design Systems Lead", es: "Design Systems Lead" },
    desc: {
      en: "Token-based design systems for multiple products and teams. Component APIs, Figma libraries, multi-product documentation and team culture that makes systems stick.",
      es: "Sistemas de diseño basados en tokens. APIs de componentes, librerías Figma, documentación.",
    },
    tags: ["Token Architecture", "Component APIs", "Figma Libraries", "Docs"],
  },
  {
    id: "lead",
    roleLine1: { en: "Lead", es: "Lead" },
    roleLine2: { en: "Designer", es: "Designer" },
    // #FB923C orange-400 — contrast 9.2:1 AAA
    color: "#FB923C",
    data: {2023:1,2024:3,2025:2,2026:2} as Record<number,number>,
    period: "2023 – 2025",
    title: { en: "Lead Designer", es: "Lead Designer" },
    role: { en: "Senior / Lead · HUGE · Google · Freelance", es: "Senior / Lead · HUGE · Google · Freelance" },
    desc: {
      en: "Led design at HUGE for Google enterprise products. Then freelanced as a senior solo designer — owning research, UX strategy and delivery across multiple product verticals.",
      es: "Lideré diseño en HUGE para productos enterprise de Google. Luego freelance como diseñador senior independiente, liderando research, estrategia UX y entrega.",
    },
    tags: ["Design Leadership", "Enterprise", "Agency", "Freelance"],
  },
  {
    id: "ai",
    roleLine1: { en: "AI Native", es: "AI Native" },
    roleLine2: { en: "Designer", es: "Designer" },
    // #93C5FD blue-300 — contrast 8.5:1 AAA
    color: "#93C5FD",
    data: {2025:2,2026:3} as Record<number,number>,
    period: "2024 – Now",
    title: { en: "AI Native Designer", es: "AI Native Designer" },
    role: { en: "AI-Native Designer · KOLO", es: "Diseñador AI-Native · KOLO" },
    desc: {
      en: "Designing products where AI is the core interaction layer. This portfolio was built with Claude Code — design and dev in one single loop, no engineering dependency.",
      es: "Diseñando productos donde la IA es la capa principal. Este portfolio fue construido con Claude Code.",
    },
    tags: ["Prompt Design", "Agentic UX", "Claude Code", "Next.js"],
  },
];

// Journey phase arcs — 4 major career phases (Systems/Lead emerge within phases, not separate)
const CAREER_MILESTONES = [
  { year: 2010, label: { en: "Study",    es: "Estudio" },   color: "#C4B5FD" },
  { year: 2016, label: { en: "UX/UI",   es: "UX/UI" },     color: "#22D3EE" },
  { year: 2019, label: { en: "Product", es: "Producto" },  color: "#34D399" },
  { year: 2024, label: { en: "AI Native", es: "AI Native" }, color: "#93C5FD" },
];

// Quarter cells with per-row deterministic jitter — creates dense multi-row patterns
function buildRowCells(trackId: string, data: Record<number,number>, years: number[], row: number): number[] {
  return years.flatMap((year, yi) => {
    const v = data[year] ?? 0;
    return [0,1,2,3].map(q => {
      if (v === 0) return 0;
      const s = (trackId.charCodeAt(0) * 17 + yi * 11 + q * 7 + row * 31) % 8;
      if (v === 1) return s < 3 ? 1 : 0;
      if (v === 2) return s < 2 ? 1 : 2;
      return s < 2 ? 2 : 3;
    });
  });
}

/* ── Career Modal — floating overlay via portal ── */
function CareerModal({
  track,
  lang,
  onClose,
  onNavigate,
}: {
  track: (typeof ACTIVITY_TRACKS)[number];
  lang: "en" | "es";
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.14 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.58)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.97 }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[380px] rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1c1c1c 0%, #111 100%)",
          border: `1px solid ${track.color}28`,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 28px 56px rgba(0,0,0,0.75), 0 0 80px ${track.color}10`,
        }}
      >
        {/* Top accent bar */}
        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${track.color}CC, ${track.color}30, transparent)` }} />

        <div className="p-5">
          {/* Section breadcrumb */}
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: "rgba(255,255,255,0.22)" }}>
            {lang === "en" ? "Career Journey" : "Trayectoria"}
          </p>

          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-[2px]"
                style={{ background: track.color, boxShadow: `0 0 8px ${track.color}80` }} />
              <div>
                <p className="text-[15px] font-bold leading-none" style={{ color: "rgba(255,255,255,0.95)" }}>
                  {track.title[lang]}
                </p>
                <p className="text-[10px] font-mono mt-1" style={{ color: track.color }}>
                  {track.period}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              style={{ color: "rgba(255,255,255,0.40)", background: "rgba(255,255,255,0.07)" }}
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1 1l7 7M8 1L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Role label */}
          <p className="text-[10.5px] font-medium mb-3 ml-[26px]" style={{ color: "rgba(255,255,255,0.38)" }}>
            {track.role[lang]}
          </p>

          {/* Divider */}
          <div className="h-px mb-3" style={{ background: "rgba(255,255,255,0.07)" }} />

          {/* Description */}
          <p className="text-[12.5px] leading-[1.72]" style={{ color: "rgba(255,255,255,0.72)" }}>
            {track.desc[lang]}
          </p>

          {/* Timeline — only for tracks that have one (e.g. Education) */}
          {"timeline" in track && track.timeline && (
            <div className="mt-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] mb-2.5"
                style={{ color: "rgba(255,255,255,0.28)" }}>
                {lang === "en" ? "Milestones" : "Hitos"}
              </p>
              <div className="flex flex-col gap-0">
                {(track.timeline as Array<{ year: string; title: { en: string; es: string }; place: string }>).map((item, idx) => (
                  <div key={idx} className="flex gap-3 relative">
                    {/* Vertical connector */}
                    <div className="flex flex-col items-center shrink-0 w-[2px] mt-[5px]">
                      <div className="w-[6px] h-[6px] rounded-full shrink-0 -ml-[2px]"
                        style={{ background: track.color, opacity: 0.85 }} />
                      {idx < (track.timeline as []).length - 1 && (
                        <div className="w-px flex-1 mt-0.5" style={{ background: `${track.color}25`, minHeight: 14 }} />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-3">
                      <p className="text-[11px] font-semibold leading-tight" style={{ color: "rgba(255,255,255,0.88)" }}>
                        {item.title[lang]}
                      </p>
                      <div className="flex items-center gap-1.5 mt-[2px]">
                        <span className="text-[9.5px] font-mono" style={{ color: track.color }}>{item.year}</span>
                        <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 8 }}>·</span>
                        <span className="text-[9.5px]" style={{ color: "rgba(255,255,255,0.38)" }}>{item.place}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {track.tags.map(tag => (
              <span key={tag}
                className="text-[10px] font-semibold px-2 py-[3px] rounded-md"
                style={{ color: track.color, background: `${track.color}15`, border: `1px solid ${track.color}25` }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Track navigation — prev/next arrows + position dots */}
          {(() => {
            const idx = ACTIVITY_TRACKS.findIndex(t => t.id === track.id);
            const btnCls = "flex items-center justify-center w-7 h-7 rounded-lg shrink-0 transition-all duration-150 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed";
            const btnStyle = { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.65)" };
            return (
              <div className="mt-4 pt-3 flex items-center gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <button disabled={idx === 0} onClick={() => onNavigate(ACTIVITY_TRACKS[idx - 1].id)}
                  className={btnCls} style={btnStyle}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M7.5 2L3.5 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="flex items-center gap-1 flex-1 justify-center">
                  {ACTIVITY_TRACKS.map((t) => (
                    <button key={t.id} onClick={() => onNavigate(t.id)}
                      className="rounded-full transition-all duration-300 cursor-pointer shrink-0"
                      style={{ width: t.id === track.id ? 14 : 5, height: 5,
                        backgroundColor: t.id === track.id ? track.color : "rgba(255,255,255,0.15)" }} />
                  ))}
                </div>
                <button disabled={idx === ACTIVITY_TRACKS.length - 1} onClick={() => onNavigate(ACTIVITY_TRACKS[idx + 1].id)}
                  className={btnCls} style={btnStyle}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4.5 2L8.5 6l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            );
          })()}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Activity Grid ── */
function ActivityGrid({ lang }: { lang: "en" | "es" }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const activeTrack = ACTIVITY_TRACKS.find(t => t.id === activeId) ?? null;
  const totalYears = ACTIVITY_YEARS.length;
  const N_ROWS = 3;

  return (
    <div className="flex flex-col gap-[6px] flex-1 min-h-0">

      {/* Journey phase ticks — vertical colored tick + label at each phase transition */}
      <div className="flex gap-[1px] shrink-0">
        <div className="w-[76px] shrink-0" />
        <div className="relative flex-1 h-[14px]">
          {CAREER_MILESTONES.map((m) => {
            const startPct = ((m.year - 2010) / totalYears) * 100;
            return (
              <div key={m.year}
                className="absolute top-0 bottom-0 flex items-center"
                style={{
                  left: `${startPct}%`,
                  borderLeft: `1.5px solid ${m.color}`,
                  paddingLeft: 3,
                }}>
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.07em",
                  textTransform: "uppercase", color: m.color,
                  whiteSpace: "nowrap", lineHeight: 1,
                }}>
                  {m.label[lang]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Year axis — AAA contrast (≥7:1) on #0A0A0A */}
      <div className="flex gap-[1px] shrink-0">
        <div className="w-[76px] shrink-0" />
        {ACTIVITY_YEARS.map(y => (
          <div key={y} className="flex-1">
            <span style={{
              fontSize: 9, fontWeight: 700, lineHeight: 1,
              color: y % 5 === 0 ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.55)",
              display: y % 2 === 0 ? "block" : "none",
            }}>
              {y % 10 === 0 ? y : `'${String(y).slice(2)}`}
            </span>
          </div>
        ))}
      </div>

      {/* Track rows — fixed-height cells so width never drives height overflow */}
      <div className="flex flex-col gap-[10px] md:gap-0 flex-1 min-h-0 md:justify-between">
        {ACTIVITY_TRACKS.map(track => {
          const isActive = activeId === track.id;
          return (
            <button
              key={track.id} type="button"
              onClick={() => setActiveId(isActive ? null : track.id)}
              className="flex gap-[1px] w-full text-left cursor-pointer"
            >
              {/* Two-line role label — left-aligned */}
              <div className="w-[76px] shrink-0 flex flex-col items-start justify-center pl-1 gap-[1px]">
                <span style={{
                  fontSize: 9.5, fontWeight: 800, letterSpacing: "0.02em", lineHeight: 1.15,
                  textAlign: "left",
                  color: isActive ? track.color : "rgba(255,255,255,0.82)",
                  transition: "color 0.15s",
                }}>
                  {track.roleLine1[lang]}
                </span>
                <span style={{
                  fontSize: 9, fontWeight: 600, letterSpacing: "0.01em", lineHeight: 1.15,
                  textAlign: "left",
                  color: isActive ? track.color : "rgba(255,255,255,0.50)",
                  transition: "color 0.15s",
                }}>
                  {track.roleLine2[lang]}
                </span>
              </div>

              {/* 3 rows of fixed-height cells — no aspect-square so width never drives height */}
              <div className="flex-1 flex flex-col gap-[2px]">
                {Array.from({ length: N_ROWS }, (_, row) => {
                  const cells = buildRowCells(track.id, track.data, ACTIVITY_YEARS, row);
                  return (
                    <div key={row} className="flex gap-[1px] h-[5px]">
                      {ACTIVITY_YEARS.map((year, yi) => (
                        <div key={year} className="flex flex-1 gap-[1px]">
                          {[0,1,2,3].map(q => {
                            const v = cells[yi * 4 + q];
                            return (
                              <div key={q} className="flex-1 h-full rounded-[1px]"
                                style={{
                                  backgroundColor: v === 0
                                    ? "rgba(255,255,255,0.07)"
                                    : track.color,
                                  opacity: v === 0 ? 1 : v === 1 ? 0.25 : v === 2 ? 0.60 : 1,
                                  transition: "opacity 0.12s",
                                }} />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center shrink-0 pt-[2px]">
        <div className="w-[76px] shrink-0" />
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
            {lang === "en" ? "Less" : "Menos"}
          </span>
          {[0,1,2,3].map(v => (
            <div key={v} className="rounded-[1px]"
              style={{
                width: 8, height: 8,
                backgroundColor: v === 0 ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.82)",
                opacity: v === 0 ? 1 : v === 1 ? 0.25 : v === 2 ? 0.60 : 1,
              }} />
          ))}
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
            {lang === "en" ? "More" : "Más"}
          </span>
        </div>
        <span className="ml-auto" style={{ fontSize: 9, color: "rgba(255,255,255,0.40)", fontStyle: "italic" }}>
          {lang === "en" ? "click a track ↑" : "clic en un track ↑"}
        </span>
      </div>

      {/* Floating modal via portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeTrack && (
            <CareerModal
              key={activeTrack.id}
              track={activeTrack}
              lang={lang}
              onClose={() => setActiveId(null)}
              onNavigate={setActiveId}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Skill Radar — interactive hexagon
───────────────────────────────────────────────────────── */
interface SkillItem {
  id: string;
  label: string;
  shortLabel: string;
  score: number;
  years: string;
  color: string;
  status: "active" | "building" | "exploring";
  desc: { en: string; es: string };
  tags: string[];
}

const SKILLS: SkillItem[] = [
  {
    id: "problem", label: "Problem Solving", shortLabel: "Problem Solving", score: 82, years: "2y+", color: "#D97706",
    status: "active",
    desc: {
      en: "Mental models and structured decision frameworks — the foundation before any solution. Learning to separate symptoms from root causes, frame problems clearly, and use tools like JTBD and Opportunity Trees to define what's actually worth building.",
      es: "Modelos mentales y marcos de decisión — la base antes de cualquier solución. Separar síntomas de causas raíz, enmarcar problemas con claridad y usar JTBD y Opportunity Trees para definir qué vale la pena construir.",
    },
    tags: ["JTBD", "Opportunity Trees", "Root Cause Analysis", "First Principles"],
  },
  {
    id: "ai-tools", label: "AI Tools", shortLabel: "AI Tools", score: 76, years: "1y+", color: "#2563EB",
    status: "active",
    desc: {
      en: "Deep daily use of Claude and Cursor as true co-pilots for design-to-code workflows. Learning effective prompting, critical review of AI output, and how to integrate AI into the design process without losing craft.",
      es: "Uso diario profundo de Claude y Cursor como copilotos reales para flujos de diseño a código. Aprendiendo prompting efectivo, revisión crítica del output de IA e integración en el proceso sin perder el oficio.",
    },
    tags: ["Claude", "Cursor", "Prompt Design", "Design-to-Code"],
  },
  {
    id: "frontend", label: "Frontend PRs", shortLabel: "Frontend PRs", score: 66, years: "8m", color: "#059669",
    status: "building",
    desc: {
      en: "Writing React components that engineers review and merge to production. Learning component structure, TypeScript, and how to work inside a real codebase — not just prototypes. This portfolio is built with this skill in practice.",
      es: "Escribiendo componentes React que los devs revisan y mergean a producción. Aprendiendo estructura de componentes, TypeScript y trabajo en un codebase real. Este portafolio está construido con esta habilidad.",
    },
    tags: ["React", "TypeScript", "GitHub PRs", "Component Architecture"],
  },
  {
    id: "ai-dev", label: "AI-Native Dev", shortLabel: "AI-Native Dev", score: 70, years: "6m", color: "#8B5CF6",
    status: "building",
    desc: {
      en: "Building full applications solo using AI as co-developer — from architecture to deployment. Learning the workflow where a designer can own the full stack of a product idea without depending on an engineering team.",
      es: "Construyendo aplicaciones completas solo usando IA como co-desarrollador — de la arquitectura al deploy. El flujo donde un designer puede ser dueño del stack completo sin depender de un equipo de ingeniería.",
    },
    tags: ["Next.js", "Firebase", "Vercel", "AI-Assisted Architecture"],
  },
  {
    id: "agent-ds", label: "Agent Experience", shortLabel: "Agent Experience", score: 55, years: "3m", color: "#EC4899",
    status: "exploring",
    desc: {
      en: "Exploring design systems for AI agent interfaces — the emerging frontier of product design. How do you design trust, handoffs, and mental models when AI is the primary actor? Early exploration, watching this space closely.",
      es: "Explorando design systems para interfaces de agentes IA — la nueva frontera del diseño de producto. ¿Cómo diseñas confianza y handoffs cuando la IA es el actor principal? Exploración temprana, siguiendo este espacio.",
    },
    tags: ["Agentic UX", "Trust Design", "AI Handoffs", "Agent Patterns"],
  },
];

const LEARNING_STACK = [
  {
    id: "problem",
    label:  { en: "Problem Solving",   es: "Problem Solving" },
    detail: { en: "Mental models & structured decision frameworks", es: "Modelos mentales y marcos de decisión estructurados" },
    status: "active" as const,
  },
  {
    id: "ai-tools",
    label:  { en: "AI Tools",          es: "Herramientas IA" },
    detail: { en: "Claude & Cursor for design-to-code workflows", es: "Claude y Cursor para flujos de diseño a código" },
    status: "active" as const,
  },
  {
    id: "frontend",
    label:  { en: "Frontend PRs",      es: "Frontend PRs" },
    detail: { en: "React components reviewed & merged to production", es: "Componentes React revisados y mergeados a producción" },
    status: "building" as const,
  },
  {
    id: "ai-dev",
    label:  { en: "AI-Native Dev",     es: "Desarrollo con IA" },
    detail: { en: "Building full apps solo using AI as co-developer", es: "Apps completas solo usando IA como co-desarrollador" },
    status: "building" as const,
  },
  {
    id: "agent-ds",
    label:  { en: "Agent Experience",  es: "Agent Experience" },
    detail: { en: "Design systems for AI agent interfaces", es: "Design systems para interfaces de agentes IA" },
    status: "exploring" as const,
  },
] satisfies { id: string; label: { en: string; es: string }; detail: { en: string; es: string }; status: "active" | "building" | "exploring" }[];

const STACK_STATUS = {
  active:    { en: "Active",     es: "Activo",        bg: "rgba(217,119,6,0.14)",  color: "#D97706" },
  building:  { en: "Building",   es: "Construyendo",  bg: "rgba(5,150,105,0.14)",  color: "#059669" },
  exploring: { en: "Exploring",  es: "Explorando",    bg: "rgba(139,92,246,0.14)", color: "#8B5CF6" },
};

function polarXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function HexRadar({
  items,
  onSelect,
}: {
  items: SkillItem[];
  onSelect: (s: SkillItem) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const n = items.length;
  // R=123 → ~10% smaller than original (137). Vertices ~17px from viewBox edges.
  const cx = 140, cy = 165, R = 123;
  const LEVELS = [0.25, 0.5, 0.75, 1.0];

  const polyPoints = (scale: number) =>
    items.map((_, i) => {
      const { x, y } = polarXY(cx, cy, R * scale, (i * 360) / n);
      return `${x},${y}`;
    }).join(" ");

  return (
    <svg viewBox="0 0 280 308" className="w-full" style={{ display: "block", overflow: "visible", transform: "scale(0.95)", transformOrigin: "center" }}>

      {/* Radar web — concentric rings that make it look like a real radar */}
      {LEVELS.map((lvl, li) => (
        <polygon key={li} points={polyPoints(lvl)}
          fill="none"
          stroke={lvl === 1.0
            ? "rgba(255,255,255,0.22)"
            : `rgba(255,255,255,${0.05 + li * 0.025})`}
          strokeWidth={lvl === 1.0 ? 1.0 : 0.6}
          strokeDasharray={lvl === 1.0 ? undefined : "3 4"} />
      ))}

      {/* Axis spokes */}
      {items.map((_, i) => {
        const { x, y } = polarXY(cx, cy, R, (i * 360) / n);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y}
          stroke="rgba(255,255,255,0.12)" strokeWidth={0.6} />;
      })}

      {/* Skill value polygon */}
      <polygon
        points={items.map((s, i) => {
          const { x, y } = polarXY(cx, cy, R * (s.score / 100), (i * 360) / n);
          return `${x},${y}`;
        }).join(" ")}
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />

      {/* Floating labels — skill names at card edges, exp labels near each dot inside the polygon.
          Right side (V1 User Research, V2 Design Systems): anchor="end" at x=272.
          Left side  (V3 Prototyping,  V4 AI Native):       anchor="start" at x=8.
          Only V0 (Problem Solving, cos≈0) stays centered on dot.
          Pairs share outer-ring y as refY → identical height per pair. */}
      {items.map((s, i) => {
        const angle  = (i * 360) / n;
        const rad    = (angle - 90) * (Math.PI / 180);
        const dot    = polarXY(cx, cy, R * (s.score / 100), angle);
        const outer  = polarXY(cx, cy, R, angle);
        const above  = Math.sin(rad) < 0;
        const cosRad = Math.cos(rad);
        const isSide = Math.abs(cosRad) > 0.3;

        let lx: number;
        let anchor: "start" | "middle" | "end";
        if (cosRad > 0.3)       { anchor = "end";    lx = 272; }
        else if (cosRad < -0.3) { anchor = "start";  lx = 8;   }
        else                    { anchor = "middle";  lx = dot.x; }

        const refY   = isSide ? outer.y : dot.y;
        const lyName = above ? refY - 30 : refY + 22;

        // Exp label: 26px inward from dot toward center — clears glow circle (r=10) + text half-height
        const dx     = cx - dot.x;
        const dy     = cy - dot.y;
        const len    = Math.sqrt(dx * dx + dy * dy) || 1;
        const ex     = dot.x + (dx / len) * 26;
        const ey     = dot.y + (dy / len) * 26;

        return (
          <g key={`lbl-${s.id}`}>
            {/* Skill name + score% — stays at card edge */}
            <text
              textAnchor={anchor}
              fontFamily="Red Hat Display, sans-serif"
              stroke="rgba(6,6,6,0.95)" strokeWidth={3.5} strokeLinejoin="round"
              style={{ paintOrder: "stroke" }}
            >
              <tspan x={lx} y={lyName} fill="rgba(255,255,255,0.90)" fontSize={13} fontWeight={600}>
                {s.shortLabel}
              </tspan>
              <tspan x={lx} dy={15} fill={s.color} fontSize={10} fontWeight={700}>
                {s.score}%
              </tspan>
            </text>
            {/* Exp label — floating near the dot inside the polygon */}
            <text
              x={ex} y={ey}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="Red Hat Display, sans-serif"
              stroke="rgba(6,6,6,0.90)" strokeWidth={3} strokeLinejoin="round"
              style={{ paintOrder: "stroke" }}
              fill={s.color} fontSize={9.5} fontWeight={700}
            >
              {s.years} exp
            </text>
          </g>
        );
      })}

      {/* Sequential sonar ping — CSS animation (mobile Safari compat) */}
      {items.map((s, i) => {
        const dot = polarXY(cx, cy, R * (s.score / 100), (i * 360) / n);
        return (
          <g key={`ping-${s.id}`} transform={`translate(${dot.x}, ${dot.y})`}>
            <circle
              r={5}
              fill="none"
              stroke={s.color}
              strokeWidth={1.5}
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
                animation: `radar-ping 4.5s ease-out infinite`,
                animationDelay: `${i * 0.9}s`,
              }}
            />
          </g>
        );
      })}

      {/* Interactive vertex dots */}
      {items.map((s, i) => {
        const dot   = polarXY(cx, cy, R * (s.score / 100), (i * 360) / n);
        const isHov = hovered === s.id;
        return (
          <g key={s.id}
            onClick={() => onSelect(s)}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <circle cx={dot.x} cy={dot.y} r={16} fill="transparent" />
            <circle cx={dot.x} cy={dot.y} r={isHov ? 16 : 10}
              fill={s.color} opacity={isHov ? 0.30 : 0.16}
              style={{ transition: "r 0.18s, opacity 0.18s" }} />
            <circle cx={dot.x} cy={dot.y} r={isHov ? 7 : 4.5}
              fill={s.color}
              style={{ transition: "r 0.18s" }} />
          </g>
        );
      })}

      {/* Center score — cy updated to 165 */}
      <text x={cx} y={cy + 8} textAnchor="middle"
        fill="rgba(255,255,255,0.72)" fontSize={13} fontWeight={700}
        fontFamily="Red Hat Display, sans-serif" letterSpacing={2}>
        LEARNING
      </text>
    </svg>
  );
}

/* ─── Glassmorphism skill overlay ─── */
function SkillOverlay({
  skill,
  onClose,
  onNavigate,
  lang,
}: {
  skill: SkillItem;
  onClose: () => void;
  onNavigate: (s: SkillItem) => void;
  lang: "en" | "es";
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", backgroundColor: "rgba(3,3,3,0.78)" }}
      onClick={onClose}
    >
      {/* Abstract background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary blob */}
        <div className="absolute" style={{
          width: 720, height: 720, top: -220, left: -180,
          borderRadius: "37% 63% 70% 30% / 30% 52% 48% 70%",
          background: `${skill.color}1E`,
          filter: "blur(90px)",
        }} />
        {/* Secondary blob */}
        <div className="absolute" style={{
          width: 480, height: 480, bottom: -140, right: -80,
          borderRadius: "63% 37% 30% 70% / 70% 48% 52% 30%",
          background: `${skill.color}14`,
          filter: "blur(60px)",
        }} />
        {/* Tertiary accent */}
        <div className="absolute" style={{
          width: 280, height: 280, top: "40%", right: "20%",
          borderRadius: "50%",
          background: `${skill.color}0A`,
          filter: "blur(40px)",
        }} />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.035 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dg" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dg)" />
        </svg>
        {/* Diagonal lines accent */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.025 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diag" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag)" />
        </svg>
      </div>

      {/* Glass card */}
      <motion.div
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 24 }}
        transition={{ type: "spring", damping: 26, stiffness: 340 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[500px] w-full rounded-2xl overflow-hidden"
        style={{
          background: "rgba(7,7,7,0.80)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(48px)",
          WebkitBackdropFilter: "blur(48px)",
        }}
      >
        {/* Top color accent */}
        <div className="h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${skill.color} 40%, ${skill.color}80 70%, transparent 100%)` }} />

        <div className="p-6 sm:p-7">
          {/* Header row — label + X (same pattern as CareerModal) */}
          <div className="flex items-start justify-between mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: skill.color }}>
              {lang === "en" ? "Learning Area" : "Área de Aprendizaje"}
            </p>
            <button onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors hover:bg-white/10 cursor-pointer"
              style={{ color: "rgba(255,255,255,0.50)", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1 1l7 7M8 1L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Title */}
          <h2 className="text-white text-[24px] sm:text-[26px] font-bold leading-[1.1] tracking-[-0.02em] mb-3">
            {skill.label}
          </h2>

          {/* Status + time row */}
          <div className="flex items-center gap-2 mb-5">
            {(() => {
              const cfg = {
                active:    { en: "Active",     es: "Activo",       bg: "rgba(217,119,6,0.14)",  color: "#D97706" },
                building:  { en: "Building",   es: "Construyendo", bg: "rgba(5,150,105,0.14)",  color: "#059669" },
                exploring: { en: "Exploring",  es: "Explorando",   bg: "rgba(139,92,246,0.14)", color: "#8B5CF6" },
              }[skill.status];
              return (
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] px-2 py-[3px] rounded-[5px]"
                  style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}40` }}>
                  {cfg[lang]}
                </span>
              );
            })()}
            <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.40)" }}>
              · {skill.years} {lang === "en" ? "active study" : "de estudio activo"}
            </span>
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-5" style={{ background: "rgba(255,255,255,0.08)" }} />

          {/* Description — AAA contrast */}
          <p className="text-[14px] leading-[1.75] mb-5"
            style={{ color: "rgba(255,255,255,0.82)" }}>
            {lang === "en" ? skill.desc.en : skill.desc.es}
          </p>

          {/* Exploring section */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-3"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              {lang === "en" ? "Currently Exploring" : "Explorando Ahora"}
            </p>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <span key={tag} className="text-[12px] font-medium px-2.5 py-1 rounded-[4px]"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.82)",
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Skill navigation — prev/next arrows + position dots */}
          {(() => {
            const idx = SKILLS.findIndex(s => s.id === skill.id);
            const btnCls = "flex items-center justify-center w-7 h-7 rounded-lg shrink-0 transition-all duration-150 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed";
            const btnStyle = { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.65)" };
            return (
              <div className="mt-5 pt-4 flex items-center gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <button disabled={idx === 0} onClick={() => onNavigate(SKILLS[idx - 1])}
                  className={btnCls} style={btnStyle}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M7.5 2L3.5 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="flex items-center gap-1 flex-1 justify-center">
                  {SKILLS.map((s) => (
                    <button key={s.id} onClick={() => onNavigate(s)}
                      className="rounded-full transition-all duration-300 cursor-pointer shrink-0"
                      style={{ width: s.id === skill.id ? 14 : 5, height: 5,
                        backgroundColor: s.id === skill.id ? skill.color : "rgba(255,255,255,0.15)" }} />
                  ))}
                </div>
                <button disabled={idx === SKILLS.length - 1} onClick={() => onNavigate(SKILLS[idx + 1])}
                  className={btnCls} style={btnStyle}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4.5 2L8.5 6l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            );
          })()}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Projects
───────────────────────────────────────────────────────── */
// Latest Work usa el catálogo compartido: src/data/work.ts (featured)
const projects = WORK.filter((w) => w.featured);

/* ─────────────────────────────────────────────────────────
   Open Signal — broadcasting pill + popover
───────────────────────────────────────────────────────── */
const OPEN_MODES = [
  {
    color: "#F59E0B",
    label: { en: "Ideas", es: "Ideas" },
    title: { en: "Brainstorming", es: "Lluvia de ideas" },
    desc:  { en: "Strategy sessions, UX concepts, new directions", es: "Sesiones de estrategia, conceptos UX, nuevas rutas" },
  },
  {
    color: "#10B981",
    label: { en: "Alliances", es: "Alianzas" },
    title: { en: "Alliances", es: "Alianzas" },
    desc:  { en: "Partnerships, referrals, cross-company work", es: "Asociaciones, referencias, trabajo cross-company" },
  },
  {
    color: "#3B82F6",
    label: { en: "Networking", es: "Networking" },
    title: { en: "Networking", es: "Networking" },
    desc:  { en: "Coffee chats, intros, industry conversations", es: "Charlas de café, intros, conversaciones de industria" },
  },
  {
    color: "#8B5CF6",
    label: { en: "Collaboration", es: "Colaboración" },
    title: { en: "Collaboration", es: "Colaboración" },
    desc:  { en: "Design reviews, workshops, project partnerships", es: "Revisiones de diseño, talleres, proyectos conjuntos" },
  },
  {
    color: "#EC4899",
    label: { en: "Experiences", es: "Vivencias" },
    title: { en: "Experiences", es: "Vivencias" },
    desc:  { en: "Events, travel, anything worth doing together", es: "Eventos, viajes, todo lo que vale la pena vivir" },
  },
];

function OpenSignal({ lang }: { lang: "en" | "es" }) {
  const [activeMode, setActiveMode] = useState(0);
  const [open, setOpen]             = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [btnRect, setBtnRect]       = useState<DOMRect | null>(null);
  const buttonRef                   = useRef<HTMLButtonElement>(null);
  const popoverRef                  = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) return;
    const id = setInterval(() => setActiveMode(m => (m + 1) % OPEN_MODES.length), 2200);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const fn = (e: MouseEvent) => {
      if (buttonRef.current?.contains(e.target as Node)) return;
      if (popoverRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  const handleClick = () => {
    if (buttonRef.current) setBtnRect(buttonRef.current.getBoundingClientRect());
    setOpen(o => !o);
  };

  const mode = OPEN_MODES[activeMode];

  const popover = (
    <AnimatePresence>
      {open && btnRect && (
        <motion.div
          ref={popoverRef}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-[288px] rounded-xl p-4"
          style={{
            position: "fixed",
            bottom: window.innerHeight - btnRect.top + 8,
            left: btnRect.left,
            zIndex: 1000,
            background: "#0A0A0A",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.10em] mb-3"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            {lang === "en" ? "Currently open to" : "Actualmente abierto a"}
          </p>
          <div className="flex flex-col gap-3">
            {OPEN_MODES.map((m, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-[3px] self-stretch rounded-full shrink-0 mt-[2px]" style={{ backgroundColor: m.color }} />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-none mb-1"
                    style={{ color: "rgba(255,255,255,0.90)" }}>
                    {m.title[lang]}
                  </p>
                  <p className="text-[12px] leading-[1.45]"
                    style={{ color: "rgba(255,255,255,0.50)" }}>
                    {m.desc[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="flex items-center gap-1.5 h-[26px] px-2.5 rounded-full transition-all duration-300 cursor-pointer"
        style={{
          background: "#0A0A0A",
          border: `1px solid ${open ? mode.color + "50" : "rgba(255,255,255,0.10)"}`,
          boxShadow: open ? `0 0 10px ${mode.color}20` : "none",
        }}
      >
        <span
          className="w-[5px] h-[5px] rounded-full shrink-0 animate-pulse"
          style={{ backgroundColor: mode.color, boxShadow: `0 0 6px ${mode.color}` }}
        />
        <span className="text-[11px] font-medium leading-none" style={{ color: "rgba(255,255,255,0.40)" }}>
          Open ·
        </span>
        <div className="relative overflow-hidden w-[74px] h-[14px] shrink-0">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeMode}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center text-[11px] font-bold whitespace-nowrap"
              style={{ color: mode.color }}
            >
              {mode.label[lang]}
            </motion.span>
          </AnimatePresence>
        </div>
      </button>

      {mounted && createPortal(popover, document.body)}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────── */
export default function HomeView() {
  const { setActive } = useNav();
  const { lang } = useLang();
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const [bogotaTime, setBogotaTime] = useState<string>("");
  useEffect(() => {
    const tick = () => new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Bogota",
      hour: "2-digit", minute: "2-digit", hour12: true,
    });
    setBogotaTime(tick());
    const id = setInterval(() => setBogotaTime(tick()), 60000);
    return () => clearInterval(id);
  }, []);

  const greeting = mounted ? (() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return { en: "Good morning, welcome friend", es: "Buenos días, bienvenido" };
    if (h >= 12 && h < 18) return { en: "Good afternoon, welcome friend", es: "Buenas tardes, bienvenido" };
    if (h >= 18 && h < 22) return { en: "Good evening, welcome friend", es: "Buenas noches, bienvenido" };
    return { en: "Good night, welcome friend", es: "Buenas noches, bienvenido" };
  })() : null;

  return (
    <>
      <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3 lg:h-full">

        {/* ── ROW 1: Bio + Career ─────────────────────────── */}
        <motion.div variants={rowStagger} className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:flex-1 lg:min-h-0">

          {/* Bio card */}
          <motion.div variants={slideFromLeft} className="bg-white border border-[#E4E4E7] rounded-xl p-4 flex flex-col overflow-hidden">
            {/* Greeting */}
            {greeting && (
              <p className="text-[11px] font-medium text-[#A1A1AA] mb-2.5 tracking-[0.01em]">
                {lang === "en" ? greeting.en : greeting.es}
              </p>
            )}
            {/* Photo + heading row */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3">
              {/* Photo */}
              <button
                onClick={() => setPhotoOpen(true)}
                className="shrink-0 rounded-xl overflow-hidden cursor-zoom-in focus:outline-none w-[60px] h-[60px] sm:w-[140px] sm:h-[140px] xl:w-[120px] xl:h-[120px]"
              >
                <img
                  src="/javier.png"
                  alt="Javier Mora"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 10%" }}
                />
              </button>

              {/* Text */}
              <div className="flex flex-col">
                <h1 className="text-[28px] font-bold text-[#0A0A0A] leading-[1.0] tracking-[-0.03em] mb-1">
                  I&rsquo;m Javier Mora
                </h1>
                <p className="text-[#2563EB] text-[13px] font-semibold mb-2">
                  {lang === "en" ? "Senior Product Designer · AI-Native" : "Senior Product Designer · AI-Native"}
                </p>
                {/* Location + LinkedIn + Bogotá time */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                  <span className="flex items-center gap-1 text-[11px] text-[#71717A] font-medium">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1a3.5 3.5 0 013.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 016 1z" stroke="#71717A" strokeWidth="1.1"/>
                      <circle cx="6" cy="4.5" r="1.2" fill="#71717A"/>
                    </svg>
                    Bogotá, Colombia · Remote
                  </span>
                  <a
                    href="https://www.linkedin.com/in/javiermoraux/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-[#71717A] hover:text-[#0A66C2] font-medium transition-colors"
                  >
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M0 1.146C0 .514.527 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                    LinkedIn
                  </a>
                  {bogotaTime && (
                    <span className="flex items-center gap-1 text-[11px] text-[#71717A] font-medium">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="4.5" stroke="#71717A" strokeWidth="1.1"/>
                        <path d="M6 3.5V6l1.5 1.5" stroke="#71717A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {bogotaTime} COT
                    </span>
                  )}
                </div>
                {/* Description — desktop only (beside photo). Clamped at 3 lines; 2xl shows full text */}
                <p className="hidden sm:line-clamp-3 2xl:line-clamp-none text-[#52525B] text-[13px] leading-[1.65]">
                  {lang === "en"
                    ? "Honed design systems at HUGE on Google Gemini. Joined startups as founding designer — idea to market in fintech, blockchain, and more. Leading design at KOLO — with AI, I write code that ships."
                    : "Profundicé en design systems en HUGE — Google Gemini. Founding designer en startups de fintech, blockchain y más — idea al mercado. Lidero diseño en KOLO — con IA, mi código llega a producción."}
                </p>
              </div>
            </div>

            {/* Description — mobile only (full width below photo row) */}
            <p className="sm:hidden text-[#52525B] text-[13px] leading-[1.65] mb-3">
              {lang === "en"
                ? "Senior product designer with AI experience — shaped Google Bard & Gemini's design systems, built multiple startups from 0 to 1, and lead design at KOLO. With AI, I write frontend code that engineers review and merge to production."
                : "Senior product designer con experiencia en IA — aporté a los design systems de Google Bard & Gemini en HUGE, construí múltiples startups desde cero, y lidero diseño en KOLO. Con IA, escribo código frontend que los devs revisan y mergean a producción."}
            </p>

            {/* Stats */}
            <div className="pt-3 border-t border-[#F4F4F5] flex flex-col flex-1 min-h-0 overflow-hidden">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#71717A] mb-2.5 shrink-0">
                {lang === "en" ? "In Numbers" : "En Números"}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 shrink-0">
                {[
                  {
                    v: "22+",
                    l1: { en: "Products shipped", es: "Productos enviados" },
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <rect x="4" y="16" width="20" height="7" rx="1.5" stroke="#0A0A0A" strokeWidth="1.2"/>
                        <rect x="6" y="10" width="16" height="7" rx="1.5" stroke="#0A0A0A" strokeWidth="1.2"/>
                        <rect x="8" y="5" width="12" height="6" rx="1.5" stroke="#0A0A0A" strokeWidth="1.2"/>
                        <path d="M11 8h6" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    ),
                  },
                  {
                    v: "5",
                    l1: { en: "Design systems built", es: "Sistemas de diseño" },
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="3" fill="#0A0A0A"/>
                        <circle cx="5" cy="8" r="2" stroke="#0A0A0A" strokeWidth="1.2"/>
                        <circle cx="23" cy="8" r="2" stroke="#0A0A0A" strokeWidth="1.2"/>
                        <circle cx="5" cy="20" r="2" stroke="#0A0A0A" strokeWidth="1.2"/>
                        <circle cx="23" cy="20" r="2" stroke="#0A0A0A" strokeWidth="1.2"/>
                        <path d="M7 8.8L11.5 12M16.5 12L21 8.8M7 19.2L11.5 16M16.5 16L21 19.2" stroke="#0A0A0A" strokeWidth="1.1" strokeLinecap="round"/>
                      </svg>
                    ),
                  },
                  {
                    v: "7+",
                    l1: { en: "Years of practice", es: "Años de práctica" },
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="9" stroke="#0A0A0A" strokeWidth="1.2"/>
                        <path d="M14 8v6.5l4 2.5" stroke="#0A0A0A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="14" cy="4" r="1" fill="#0A0A0A"/>
                        <circle cx="14" cy="24" r="1" fill="#0A0A0A"/>
                        <circle cx="4" cy="14" r="1" fill="#0A0A0A"/>
                        <circle cx="24" cy="14" r="1" fill="#0A0A0A"/>
                      </svg>
                    ),
                  },
                  {
                    v: "10+",
                    l1: { en: "Designers mentored", es: "Diseñadores guiados" },
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="10" cy="9" r="3.5" stroke="#0A0A0A" strokeWidth="1.2"/>
                        <path d="M3 22c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round"/>
                        <circle cx="20" cy="9" r="2.5" stroke="#0A0A0A" strokeWidth="1.1"/>
                        <path d="M22.5 21c0-2.761-1.567-5-3.5-5" stroke="#0A0A0A" strokeWidth="1.1" strokeLinecap="round"/>
                        <path d="M19 13.5l1.5 1.5-1.5 1.5" stroke="#0A0A0A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                  },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#F9F9F9] rounded-lg px-2.5 py-2 sm:flex-col sm:items-start sm:gap-1 sm:px-3 sm:py-2.5">
                    <div className="shrink-0 opacity-80 sm:hidden">{s.icon}</div>
                    <div className="flex flex-col gap-[1px]">
                      <span className="text-[20px] font-black text-[#0A0A0A] leading-none tabular-nums tracking-[-0.04em]">
                        {s.v}
                      </span>
                      <span className="text-[11px] font-medium text-[#0A0A0A] leading-tight">
                        {lang === "en" ? s.l1.en : s.l1.es}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom CTA row: Open Signal + Email — sibling of stats, always visible */}
            <div className="shrink-0 pt-3 border-t border-[#F4F4F5] flex items-center justify-between gap-3">
              <OpenSignal lang={lang} />
              <a
                href="mailto:hello@javiermora.co"
                className="flex items-center gap-2 group shrink-0"
              >
                <svg width="13" height="13" viewBox="0 0 15 15" fill="none" className="text-[#A1A1AA] shrink-0 group-hover:text-[#2563EB] transition-colors">
                  <rect x="1.5" y="3.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1.5 5.5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <span className="text-[12px] text-[#71717A] font-medium group-hover:text-[#0A0A0A] transition-colors">
                  {lang === "en" ? "Email me directly" : "Escríbeme directo"}
                </span>
                <span className="text-[12px] text-[#2563EB] font-semibold group-hover:underline">
                  hello@javiermora.co
                </span>
              </a>
            </div>

          </motion.div>

          {/* Career Journey card */}
          <motion.div variants={slideFromRight} className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4 flex flex-col min-h-0 overflow-hidden">
            {/* Header — tappable on mobile to expand/collapse */}
            <button
              className="flex items-start justify-between w-full text-left shrink-0 mb-3 lg:pointer-events-none"
              onClick={() => setJourneyOpen(o => !o)}
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-0.5"
                  style={{ color: "rgba(255,255,255,0.55)" }}>
                  {lang === "en" ? "Career Journey" : "Trayectoria"}
                </p>
                <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.40)" }}>
                  {lang === "en"
                    ? "7y · 6 disciplines — darker = deeper focus"
                    : "7 años · 6 disciplinas — más oscuro = mayor enfoque"}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4 mt-0.5">
                <span className="text-[10px] font-mono tabular-nums"
                  style={{ color: "rgba(255,255,255,0.30)" }}>
                  2010 → Now
                </span>
                {/* Chevron — mobile only */}
                <motion.svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className="lg:hidden shrink-0"
                  animate={{ rotate: journeyOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </div>
            </button>

            {/* Collapsible body — mobile: collapsed by default; desktop: always open + fills card */}
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out lg:grid-rows-[1fr] lg:flex-1 lg:min-h-0 ${journeyOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden lg:flex lg:flex-col">
                <ActivityGrid lang={lang} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── ROW 2: Projects + Skill Radar ───────────────── */}
        <div className="lg:flex-1 lg:min-h-0 flex flex-col gap-2">
          <p className="text-[18px] font-bold tracking-[-0.02em] text-[#0A0A0A] shrink-0">
            {lang === "en" ? "Latest Work" : "Últimos Trabajos"}
          </p>
          <motion.div variants={rowStagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-1 gap-3 lg:flex-1 lg:min-h-0">

          {projects.map((p) => (
            <WorkCard
              key={p.slug}
              p={p}
              lang={lang}
              variants={popUp}
              onClick={() => setActive("cases")}
            />
          ))}

          {/* ── Learning Radar card — overflow-visible so labels float past SVG bounds ── */}
          <motion.div variants={popUp} className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-3 flex flex-col h-full min-h-[240px]" style={{ overflow: "visible" }}>
            <div className="flex items-center justify-between shrink-0 mb-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] leading-none" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {lang === "en" ? "Currently Learning" : "Aprendiendo Ahora"}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {lang === "en" ? "Click a skill to explore" : "Clic en un skill para explorar"}
                </p>
              </div>
            </div>
            <div className="flex-1 min-h-0 flex items-center justify-center" style={{ overflow: "visible" }}>
              <HexRadar items={SKILLS} onSelect={setSelectedSkill} />
            </div>
          </motion.div>
          </motion.div>
        </div>
      </motion.div>


      {/* Portal: SkillOverlay rendered at document.body */}
      {mounted && selectedSkill && createPortal(
        <AnimatePresence>
          <SkillOverlay
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
            onNavigate={setSelectedSkill}
            lang={lang}
          />
        </AnimatePresence>,
        document.body
      )}

      {/* Photo lightbox */}
      {mounted && photoOpen && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}
          onClick={() => setPhotoOpen(false)}
        >
          <img
            src="/javier.png"
            alt="Javier Mora"
            className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl"
            style={{ objectFit: "contain" }}
            onClick={e => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
}
