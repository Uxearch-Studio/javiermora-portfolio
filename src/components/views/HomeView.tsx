"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNav } from "@/context/NavContext";
import { useLang } from "@/context/LangContext";

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
   Career Journey Timeline
   Shows the story of becoming an AI-native designer
───────────────────────────────────────────────────────── */
const CAREER_PHASES = [
  {
    period: "2010 – 2017",
    type: "EDUCATION",
    typeColor: "#3B82F6",
    company: "Universidad Icesi",
    location: "Cali, Colombia",
    duration: { en: "8 years", es: "8 años" },
    highlight: { en: "Interactive Media Design", es: "Diseño de Medios Interactivos" },
    desc: { en: "Where systematic thinking began.", es: "Donde comenzó el pensamiento sistémico." },
  },
  {
    period: "2018",
    type: "INTERNATIONAL",
    typeColor: "#8B5CF6",
    company: "France Internship",
    location: "France",
    duration: { en: "8 months", es: "8 meses" },
    highlight: { en: "First product work abroad", es: "Primer trabajo de producto en el exterior" },
    desc: { en: "Design problems are universal.", es: "Los problemas de diseño son universales." },
  },
  {
    period: "2019 – 2023",
    type: "STARTUP ×3",
    typeColor: "#10B981",
    company: "Egypt → Blockchain → Crypto",
    location: "Cairo / Remote",
    duration: { en: "4+ years", es: "4+ años" },
    highlight: { en: "Led full product design at 3 startups", es: "Lideré diseño de producto en 3 startups" },
    desc: { en: "Built systems from zero. Shipped under real constraints.", es: "Construí sistemas desde cero. Entregué bajo restricciones reales." },
  },
  {
    period: "2024",
    type: "AGENCY",
    typeColor: "#F59E0B",
    company: "HUGE · Google",
    location: "Remote",
    duration: { en: "4 months", es: "4 meses" },
    highlight: { en: "Enterprise design systems", es: "Design systems empresariales" },
    desc: { en: "Enterprise scale. Different constraints, same craft.", es: "Escala empresarial. Diferentes restricciones, el mismo oficio." },
  },
  {
    period: "2024 – 2025",
    type: "FREELANCE",
    typeColor: "#EC4899",
    company: "Independent Work",
    location: "Remote",
    duration: { en: "6 months", es: "6 meses" },
    highlight: { en: "UI/UX across product verticals", es: "UI/UX en verticales de producto" },
    desc: { en: "Freedom to choose problems worth solving.", es: "Libertad para elegir problemas que vale la pena resolver." },
  },
  {
    period: "2025 – Now",
    type: "AI NATIVE",
    typeColor: "#2563EB",
    company: "KOLO",
    location: "Colombia",
    duration: { en: "9+ months", es: "9+ meses" },
    highlight: { en: "Design + build with Claude Code", es: "Diseño + construyo con Claude Code" },
    desc: { en: "The boundary between designer and engineer dissolved.", es: "El límite entre diseñador e ingeniero desapareció." },
  },
];

function CareerTimeline({ lang }: { lang: "en" | "es" }) {
  return (
    <div className="flex flex-col">
      {CAREER_PHASES.map((phase, i) => (
        <div key={phase.period} className="flex gap-3">
          {/* Dot + connector line */}
          <div className="flex flex-col items-center pt-[4px] shrink-0" style={{ width: 14 }}>
            <div className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: phase.typeColor, boxShadow: `0 0 0 2px #0A0A0A` }} />
            {i < CAREER_PHASES.length - 1 && (
              <div className="w-px flex-1 mt-1" style={{ backgroundColor: "rgba(255,255,255,0.08)", minHeight: 12 }} />
            )}
          </div>

          {/* Content — compact, no scroll needed */}
          <div style={{ paddingBottom: i < CAREER_PHASES.length - 1 ? 12 : 0 }} className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-[3px]">
              <span className="text-[10px] font-bold tracking-[0.06em] px-[6px] py-[2px] rounded-[3px] leading-none"
                style={{ backgroundColor: `${phase.typeColor}20`, color: phase.typeColor }}>
                {phase.type}
              </span>
              <span className="text-[11px] tabular-nums" style={{ color: "rgba(255,255,255,0.50)" }}>
                {phase.period}
              </span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                · {lang === "en" ? phase.duration.en : phase.duration.es}
              </span>
            </div>
            <p className="text-[13px] font-semibold leading-snug truncate"
              style={{ color: "rgba(255,255,255,0.85)" }}>
              {phase.company}
            </p>
          </div>
        </div>
      ))}
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
  desc: { en: string; es: string };
  tags: string[];
}

const SKILLS: SkillItem[] = [
  {
    id: "problem", label: "Problem Solving", shortLabel: "Problem", score: 93, years: "6y", color: "#D97706",
    desc: {
      en: "Translating vague, high-stakes business problems into clear, actionable design challenges. The most underrated skill in product design. You cannot design the right solution without first defining the right problem.",
      es: "Traducir problemas de negocio vagos en desafíos de diseño claros. La habilidad más subestimada del diseño de producto. No puedes diseñar la solución correcta sin definir primero el problema correcto.",
    },
    tags: ["Problem Framing", "JTBD", "Opportunity Trees", "Root Cause Analysis"],
  },
  {
    id: "research", label: "User Research", shortLabel: "Research", score: 92, years: "8y", color: "#EC4899",
    desc: {
      en: "Building empathy through structured observation. Research is how I avoid building the wrong thing with great execution. The goal: surface what people don't say. From guerrilla testing to contextual inquiry.",
      es: "Construir empatía a través de observación estructurada. La investigación es cómo evito construir lo incorrecto con gran ejecución. El objetivo: descubrir lo que la gente no dice.",
    },
    tags: ["Contextual Inquiry", "Usability Testing", "Jobs Theory", "Synthesis"],
  },
  {
    id: "systems", label: "Design Systems", shortLabel: "Systems", score: 97, years: "5y", color: "#059669",
    desc: {
      en: "Systems thinking applied to design at scale. Built systems from scratch for startups needing speed without losing consistency — tokens, component APIs, documentation, and the team culture that makes it stick.",
      es: "Pensamiento sistémico aplicado al diseño. He construido sistemas para startups que necesitaban velocidad sin perder consistencia — tokens, APIs de componentes, documentación y la cultura de equipo.",
    },
    tags: ["Token Architecture", "Component APIs", "Multi-product", "Figma Libraries"],
  },
  {
    id: "proto", label: "Prototyping", shortLabel: "Prototyping", score: 90, years: "6y", color: "#EF4444",
    desc: {
      en: "A prototype is worth a thousand meetings. From rough sketches to interactive Figma flows to functional code — the right fidelity at the right moment. Prototyping forces specificity and exposes assumptions early.",
      es: "Un prototipo vale mil reuniones. Desde bocetos hasta flujos en Figma hasta código funcional — la fidelidad correcta en el momento correcto. Prototipar fuerza especificidad y expone supuestos temprano.",
    },
    tags: ["Figma Advanced", "ProtoPie", "Code Prototypes", "Rapid Iteration"],
  },
  {
    id: "ai", label: "AI Native Design", shortLabel: "AI Native", score: 72, years: "9m", color: "#2563EB",
    desc: {
      en: "Designing products where AI is the core interaction layer — not a feature bolted on. I explore how to calibrate trust, set honest expectations, and build conversations between humans and models that feel intentional. I also use AI as a coding partner: this portfolio is built with Claude Code — designing and shipping at production speed without an engineering dependency.",
      es: "Diseñar productos donde la IA es la capa central de interacción, no una función adicional. Exploro cómo calibrar confianza y construir conversaciones intencionales entre humanos y modelos. También uso IA como partner de código — este portafolio está construido con Claude Code, diseñando y publicando a velocidad de producción.",
    },
    tags: ["Prompt Design", "Trust Calibration", "Agentic UX", "Claude Code", "Next.js", "Framer Motion"],
  },
];

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
  const cx = 140, cy = 126, R = 65;
  const LR = 102;
  const LEVELS = [0.25, 0.5, 0.75, 1.0];

  const polyPoints = (scale: number) =>
    items.map((_, i) => {
      const { x, y } = polarXY(cx, cy, R * scale, (i * 360) / n);
      return `${x},${y}`;
    }).join(" ");

  return (
    <svg viewBox="0 0 280 256" className="w-full h-full" style={{ display: "block", minHeight: 80 }}>
      {/* Grid rings */}
      {LEVELS.map((lvl, li) => (
        <polygon key={li} points={polyPoints(lvl)}
          fill="none"
          stroke={lvl === 1.0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}
          strokeWidth={lvl === 1.0 ? 0.8 : 0.6} />
      ))}
      {/* Axis lines */}
      {items.map((_, i) => {
        const { x, y } = polarXY(cx, cy, R, (i * 360) / n);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y}
          stroke="rgba(255,255,255,0.06)" strokeWidth={0.6} />;
      })}
      {/* Value polygon */}
      <polygon
        points={items.map((s, i) => {
          const { x, y } = polarXY(cx, cy, R * (s.score / 100), (i * 360) / n);
          return `${x},${y}`;
        }).join(" ")}
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* Vertex labels — name + years */}
      {items.map((s, i) => {
        const angle = (i * 360) / n;
        const rad = (angle - 90) * (Math.PI / 180);
        const lx = cx + LR * Math.cos(rad);
        const ly = cy + LR * Math.sin(rad);
        const xNorm = Math.cos(rad);
        const anchor = Math.abs(xNorm) < 0.2 ? "middle" : xNorm > 0 ? "start" : "end";
        const words = s.shortLabel.split(" ");
        const totalLines = words.length + 1;
        const lineH = 7.5;
        const firstY = ly - ((totalLines - 1) / 2) * lineH;
        return (
          <g key={`lbl-${s.id}`} className="cursor-pointer" onClick={() => onSelect(s)}>
            {words.map((word, wi) => (
              <text key={wi} x={lx} y={firstY + wi * lineH}
                textAnchor={anchor}
                fill="rgba(255,255,255,0.50)"
                fontSize={6.5} fontWeight={600}
                fontFamily="Red Hat Display, sans-serif">
                {word}
              </text>
            ))}
            <text x={lx} y={firstY + words.length * lineH}
              textAnchor={anchor}
              fill={s.color}
              fontSize={6} fontWeight={700}
              fontFamily="Red Hat Display, sans-serif">
              {s.years}
            </text>
          </g>
        );
      })}

      {/* Vertex dots */}
      {items.map((s, i) => {
        const angle = (i * 360) / n;
        const dot = polarXY(cx, cy, R * (s.score / 100), angle);
        const isHov = hovered === s.id;
        return (
          <g key={s.id}
            onClick={() => onSelect(s)}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <circle cx={dot.x} cy={dot.y} r={14} fill="transparent" />
            <circle cx={dot.x} cy={dot.y} r={isHov ? 12 : 7}
              fill={s.color} opacity={isHov ? 0.30 : 0.15}
              style={{ transition: "r 0.15s, opacity 0.15s" }} />
            <circle cx={dot.x} cy={dot.y} r={isHov ? 5.5 : 4}
              fill={s.color}
              style={{ transition: "r 0.15s" }} />
          </g>
        );
      })}

      {/* Center score */}
      <text x={cx} y={cy + 7} textAnchor="middle"
        fill="rgba(255,255,255,0.60)" fontSize={18} fontWeight={800}
        fontFamily="Red Hat Display, sans-serif">
        97
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle"
        fill="rgba(255,255,255,0.22)" fontSize={7} fontWeight={500}
        fontFamily="Red Hat Display, sans-serif">
        OVERALL
      </text>
    </svg>
  );
}

/* ─── Glassmorphism skill overlay ─── */
function SkillOverlay({
  skill,
  onClose,
  lang,
}: {
  skill: SkillItem;
  onClose: () => void;
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

        <div className="p-7 sm:p-8">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div className="pr-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-1.5"
                style={{ color: skill.color }}>
                {lang === "en" ? "Skill in Progress" : "Habilidad en Progreso"}
              </p>
              <h2 className="text-white text-[24px] sm:text-[28px] font-bold leading-[1.1] tracking-[-0.02em]">
                {skill.label}
              </h2>
            </div>
            {/* Score circle */}
            <div className="flex items-center justify-center shrink-0"
              style={{
                width: 60, height: 60, borderRadius: "50%",
                border: `1.5px solid ${skill.color}55`,
                background: `${skill.color}10`,
              }}>
              <span className="text-[22px] font-extrabold tabular-nums" style={{ color: skill.color }}>
                {skill.score}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[14px] leading-[1.78] mb-6"
            style={{ color: "rgba(255,255,255,0.62)" }}>
            {lang === "en" ? skill.desc.en : skill.desc.es}
          </p>

          {/* Divider */}
          <div className="w-full h-px mb-5" style={{ background: "rgba(255,255,255,0.07)" }} />

          {/* Exploring section */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] mb-3"
              style={{ color: "rgba(255,255,255,0.28)" }}>
              {lang === "en" ? "Currently Exploring" : "Explorando Ahora"}
            </p>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <span key={tag} className="text-[12px] font-medium px-2.5 py-1 rounded-[4px]"
                  style={{
                    background: `${skill.color}15`,
                    border: `1px solid ${skill.color}30`,
                    color: skill.color,
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-full text-[11px] transition-colors hover:bg-white/10"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.45)", cursor: "pointer" }}>
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Projects
───────────────────────────────────────────────────────── */
const projects = [
  {
    name: "Tactica", year: "2025", type: "Mobile App", color: "#7C3AED",
    metric: "−64% no-shows",
    en: "Sports booking replacing broken manual process costing owners every weekend.",
    es: "Reservas deportivas que reemplazó el caos manual que costaba ingresos cada fin de semana.",
  },
  {
    name: "KOLO", year: "2024–25", type: "SaaS · ERP", color: "#059669",
    metric: "40+ merchants",
    en: "POS + inventory + FEL for SMEs running on WhatsApp and Excel.",
    es: "POS + inventario + FEL para pymes que operaban en WhatsApp y Excel.",
  },
  {
    name: "DeFi Platform", year: "2023", type: "Web3", color: "#D97706",
    metric: "Session +3×",
    en: "Staking redesign that tripled session length. The data was there — the design wasn't.",
    es: "Rediseño de staking que triplicó sesiones. Los datos estaban — el diseño no.",
  },
];

/* ─────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────── */
export default function HomeView() {
  const { setActive } = useNav();
  const { lang } = useLang();
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3 md:h-full">

        {/* ── ROW 1: Bio + Career ─────────────────────────── */}
        <motion.div variants={rowStagger} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:flex-1 md:min-h-0">

          {/* Bio card */}
          <motion.div variants={slideFromLeft} className="bg-white border border-[#E4E4E7] rounded-xl p-4 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[17px] leading-none">👋</span>
              <span className="text-[12px] text-[#71717A] font-medium">
                {lang === "en" ? "Hey there" : "Hola"}
              </span>
            </div>

            <h1 className="text-[28px] font-bold text-[#0A0A0A] leading-[1.0] tracking-[-0.03em] mb-1">
              I&rsquo;m Javier Mora
            </h1>
            <p className="text-[#2563EB] text-[13px] font-semibold mb-3">
              {lang === "en" ? "UX Product Designer → AI Native" : "UX Product Designer → AI Native"}
            </p>

            <p className="text-[#52525B] text-[12px] leading-[1.65] mb-3">
              {lang === "en"
                ? "7+ years turning complex products into things people actually use — across startups, agencies and 3 continents. Today I design and ship with Claude Code."
                : "7+ años convirtiendo productos complejos en cosas que la gente realmente usa — en startups, agencias y 3 continentes. Hoy diseño y construyo con Claude Code."}
            </p>

            {/* Stats */}
            <div className="mt-auto pt-3 border-t border-[#F4F4F5]">
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#C4C4CC] mb-3">
                {lang === "en" ? "My Stats" : "Mis Stats"}
              </p>
              <div className="grid grid-cols-4 divide-x divide-[#F0F0F2]">
                {[
                  { v: "22+", en: "Products", es: "Productos" },
                  { v: "5",   en: "Systems", es: "Sistemas" },
                  { v: "7+",  en: "Years", es: "Años" },
                  { v: "10+", en: "Mentored", es: "Mentoreados" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col gap-[3px] px-2.5 first:pl-0 last:pr-0">
                    <span className="text-[26px] font-black text-[#0A0A0A] leading-none tabular-nums tracking-[-0.03em]">
                      {s.v}
                    </span>
                    <span className="text-[9px] font-medium text-[#A1A1AA] leading-none uppercase tracking-[0.05em]">
                      {lang === "en" ? s.en : s.es}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-emerald-600 text-[12px] font-medium">
                {lang === "en" ? "Open to work · Colombia" : "Disponible · Colombia"}
              </span>
            </div>
          </motion.div>

          {/* Career Journey card */}
          <motion.div variants={slideFromRight} className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4 flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-0.5"
                  style={{ color: "rgba(255,255,255,0.55)" }}>
                  {lang === "en" ? "Career Journey" : "Trayectoria"}
                </p>
                <p className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {lang === "en"
                    ? "Education → Startups → Agency → Freelance → AI Native"
                    : "Educación → Startups → Agencia → Freelance → AI Native"}
                </p>
              </div>
              <span className="text-[11px] font-mono tabular-nums shrink-0 ml-4 mt-0.5"
                style={{ color: "rgba(255,255,255,0.40)" }}>
                2010 → Now
              </span>
            </div>

            {/* Arc chips */}
            <div className="flex flex-wrap gap-1 mb-3 pb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              {[
                { label: lang === "en" ? "University" : "Universidad", color: "#3B82F6" },
                { label: lang === "en" ? "International" : "Internacional", color: "#8B5CF6" },
                { label: "Startup ×3", color: "#10B981" },
                { label: "Agency", color: "#F59E0B" },
                { label: "Freelance", color: "#EC4899" },
                { label: "AI Native", color: "#2563EB" },
              ].map((chip) => (
                <span key={chip.label}
                  className="text-[10px] font-medium px-1.5 py-[2px] rounded-[3px]"
                  style={{ backgroundColor: `${chip.color}20`, color: chip.color, border: `1px solid ${chip.color}30` }}>
                  {chip.label}
                </span>
              ))}
            </div>

            {/* Timeline — desktop: constrained height with fade; mobile: full height, no clip */}
            <div className="relative md:flex-1 md:min-h-0 md:overflow-hidden">
              <CareerTimeline lang={lang} />
              <div className="hidden md:block absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                style={{ background: "linear-gradient(to top, #0A0A0A 60%, transparent 100%)" }} />
            </div>
          </motion.div>
        </motion.div>

        {/* ── ROW 2: Projects + Skill Radar ───────────────── */}
        <motion.div variants={rowStagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:flex-1 md:min-h-0">

          {projects.map((p) => (
            <motion.button variants={popUp} key={p.name} onClick={() => setActive("cases")}
              className="group text-left bg-white border border-[#E4E4E7] rounded-xl overflow-hidden hover:border-[#0A0A0A] hover:shadow-md transition-all duration-200 flex flex-col md:h-full">
              {/* Image area — fixed height mobile, 40% flex on desktop */}
              <div className="relative h-52 md:h-auto md:flex-[0_0_40%] w-full overflow-hidden shrink-0"
                style={{ background: `linear-gradient(145deg, ${p.color}28 0%, ${p.color}10 100%)` }}>
                {/* Abstract UI mockup shapes */}
                <div className="absolute inset-0 p-4 flex flex-col gap-2 justify-center">
                  <div className="h-2 rounded-full w-3/4 opacity-20" style={{ background: p.color }} />
                  <div className="h-1.5 rounded-full w-1/2 opacity-12" style={{ background: p.color }} />
                  <div className="flex gap-1.5 mt-1">
                    <div className="h-6 rounded w-1/3 opacity-15" style={{ background: p.color }} />
                    <div className="h-6 rounded w-1/4 opacity-10" style={{ background: p.color }} />
                  </div>
                  <div className="h-1 rounded-full w-2/3 opacity-08" style={{ background: p.color }} />
                </div>
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, ${p.color} 0px, ${p.color} 1px, transparent 1px, transparent 24px),
                                      repeating-linear-gradient(90deg, ${p.color} 0px, ${p.color} 1px, transparent 1px, transparent 24px)`,
                  }} />
                {/* Year + type badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[9px] font-mono px-1.5 py-[2px] rounded"
                    style={{ background: `${p.color}30`, color: p.color }}>
                    {p.type}
                  </span>
                </div>
                <span className="absolute top-3 right-3 text-[10px] font-mono px-1.5 py-[2px] rounded"
                  style={{ background: `${p.color}25`, color: p.color }}>
                  {p.year}
                </span>
                {/* Bottom fade into card */}
                <div className="absolute inset-x-0 bottom-0 h-8"
                  style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }} />
              </div>

              <div className="p-3 flex flex-col flex-1">
                <p className="text-[#0A0A0A] font-semibold text-[14px] leading-tight group-hover:text-[#2563EB] transition-colors mb-1">
                  {p.name}
                </p>
                <p className="text-[#52525B] text-[11px] leading-relaxed flex-1">
                  {lang === "en" ? p.en : p.es}
                </p>

                {/* Metric badge */}
                <span className="mt-1.5 self-start inline-flex items-center px-1.5 py-[3px] rounded text-[10px] font-semibold"
                  style={{ backgroundColor: `${p.color}18`, color: p.color }}>
                  {p.metric}
                </span>

                {/* CTA button */}
                <div className="mt-2 flex items-center justify-between px-3 py-[10px] rounded-lg border border-[#E8E8EA] bg-[#F8F8F9] group-hover:border-[#0A0A0A] group-hover:bg-[#0A0A0A] transition-all duration-200">
                  <span className="text-[12px] font-semibold text-[#0A0A0A] group-hover:text-white transition-colors duration-200">
                    {lang === "en" ? "View Case Study" : "Ver Caso de Estudio"}
                  </span>
                  <span className="text-[14px] font-medium text-[#B0B0BA] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 inline-block">
                    →
                  </span>
                </div>
              </div>
            </motion.button>
          ))}

          {/* ── Skill Radar card ── */}
          <motion.div variants={popUp} className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-3 flex flex-col overflow-hidden h-full">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0 mb-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] leading-none"
                  style={{ color: "rgba(255,255,255,0.55)" }}>
                  {lang === "en" ? "Learning Radar" : "Radar de Skills"}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {lang === "en" ? "Tap a skill to explore" : "Toca un skill para explorar"}
                </p>
              </div>
              <span className="text-[10px] font-medium px-2 py-[3px] rounded-[4px]"
                style={{ color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}>
                {lang === "en" ? "In Progress" : "En Progreso"}
              </span>
            </div>

            {/* SVG — fills available space */}
            <div className="flex-1 min-h-0 flex items-center justify-center">
              <HexRadar items={SKILLS} onSelect={setSelectedSkill} />
            </div>

            {/* Compact skill bar chart */}
            <div className="shrink-0 mt-1 pt-1.5 border-t border-white/[0.06]">
              <div className="flex items-end gap-[3px] h-[26px]">
                {SKILLS.map((s) => {
                  const barH = Math.max(5, Math.round((s.score / 100) * 26));
                  return (
                    <button key={s.id} onClick={() => setSelectedSkill(s)} title={s.label}
                      className="flex-1 flex items-end h-full cursor-pointer group">
                      <div className="w-full rounded-t-[2px] overflow-hidden relative group-hover:opacity-75 transition-opacity"
                        style={{ height: barH }}>
                        <div className="absolute inset-0" style={{ background: `${s.color}30` }} />
                        <div className="absolute bottom-0 inset-x-0 rounded-t-[2px]"
                          style={{ height: "55%", background: s.color }} />
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-[3px] mt-[3px]">
                {SKILLS.map((s) => {
                  const abbr: Record<string, string> = { problem: "PS", research: "UR", systems: "DS", proto: "PT", ai: "AI" };
                  return (
                    <div key={s.id} className="flex-1 flex flex-col items-center gap-[1.5px]">
                      <span className="font-bold leading-none" style={{ fontSize: 6.5, color: s.color }}>
                        {abbr[s.id]}
                      </span>
                      <span className="font-medium leading-none" style={{ fontSize: 5.5, color: "rgba(255,255,255,0.28)" }}>
                        {s.years}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Portal: overlay rendered at document.body to avoid transform stacking issues */}
      {mounted && selectedSkill && createPortal(
        <AnimatePresence>
          <SkillOverlay
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
            lang={lang}
          />
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
