"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

/* ─────────────────────────────────────────────────────────
   AI Native Design — la sección se comporta como lo que
   afirma: eliges un producto y el loop corre en vivo —
   terminal de Claude Code a la izquierda, el producto
   construyéndose dentro de un teléfono a la derecha
   (wireframe → visual → shipped). La prueba, ejecutándose.
───────────────────────────────────────────────────────── */

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* iconos de trazo */
const I = {
  persona: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="4.5" r="2.5" />
      <path d="M2.5 12.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
    </svg>
  ),
  code: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 4L2 7l2.5 3M9.5 4L12 7l-2.5 3" />
    </svg>
  ),
  compass: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5.5" />
      <path d="M9.2 4.8L8 8l-3.2 1.2L6 6l3.2-1.2z" />
    </svg>
  ),
  replay: (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7a4.5 4.5 0 1 1 1.3 3.2" />
      <path d="M2.5 10.5V7h3.5" />
    </svg>
  ),
};

type Stage = "empty" | "wire" | "visual" | "live";

type Demo = {
  id: string;
  name: string;
  accent: string;
  status: { en: string; es: string };
  url?: string;
  desc: { en: string; es: string };
  lines: { t: string; stage?: Stage }[];
};

const DEMOS: Demo[] = [
  {
    id: "tactica",
    name: "Tactica",
    accent: "#7C3AED",
    status: { en: "In the app stores", es: "En las tiendas" },
    url: "https://tactica-deploy.vercel.app",
    desc: {
      en: "Sports booking for players and facility owners — designed and coded entirely with AI, from first screen to store release.",
      es: "Reservas deportivas para jugadores y dueños de canchas — diseñada y programada por completo con IA, de la primera pantalla al release en tiendas.",
    },
    lines: [
      { t: '$ claude "sports booking app — players & court owners"' },
      { t: "stack → React Native · Expo · Firebase · Wompi", stage: "wire" },
      { t: "designing booking flow in working code…", stage: "visual" },
      { t: "frontend PR opened → reviewed → merged" },
      { t: "shipped — live in the app stores", stage: "live" },
    ],
  },
  {
    id: "mefaltauna",
    name: "mefaltauna.com",
    accent: "#D97706",
    status: { en: "Live", es: "En vivo" },
    url: "https://mefaltauna.com",
    desc: {
      en: "Track which stickers you're missing in your Panini album — and which ones you can trade.",
      es: "Lleva la trazabilidad de qué láminas te faltan en tu álbum Panini — y cuáles puedes cambiar.",
    },
    lines: [
      { t: '$ claude "track missing Panini album stickers"' },
      { t: "stack defined → web app, shipped on a live domain", stage: "wire" },
      { t: "designing the album grid in working code…", stage: "visual" },
      { t: "iterating with real collectors…" },
      { t: "shipped — live at mefaltauna.com", stage: "live" },
    ],
  },
  {
    id: "henry",
    name: "Henry",
    accent: "#059669",
    status: { en: "MVP", es: "MVP" },
    desc: {
      en: "A point-of-sale system taken to working MVP, solo — stack decisions, design and code included.",
      es: "Un sistema POS llevado a MVP funcional, solo — decisiones de stack, diseño y código incluidos.",
    },
    lines: [
      { t: '$ claude "point-of-sale MVP for small merchants"' },
      { t: "stack defined → mobile-first web app", stage: "wire" },
      { t: "designing catalog + ticket flow in code…", stage: "visual" },
      { t: "checkout loop working end to end" },
      { t: "MVP running — ready to demo", stage: "live" },
    ],
  },
  {
    id: "arriendoscope",
    name: "Arriendoscope",
    accent: "#0D9488",
    status: { en: "MVP", es: "MVP" },
    desc: {
      en: "A rental-home search app, from idea to working MVP without a dev team.",
      es: "Una app para buscar arriendos, de la idea al MVP funcional sin equipo de desarrollo.",
    },
    lines: [
      { t: '$ claude "rental-home search with map view"' },
      { t: "stack defined → mobile app", stage: "wire" },
      { t: "designing map + listing cards in code…", stage: "visual" },
      { t: "search and filters wired to real data" },
      { t: "MVP running — ready to demo", stage: "live" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   Pantallas por producto — wireframe (gris) o visual (color).
   Bloques CSS puros, mismo lenguaje que los artefactos.
───────────────────────────────────────────────────────── */
function Screen({ id, stage, accent }: { id: string; stage: Stage; accent: string }) {
  const w = stage === "wire"; // modo wireframe
  const on = stage === "visual" || stage === "live";
  if (stage === "empty") {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#E4E4E7] border-t-[#A1A1AA] animate-spin" aria-hidden />
      </div>
    );
  }
  const block = (extra: string) => `rounded transition-colors duration-500 ${extra}`;
  const tone = (colored: string, gray = "bg-[#E4E4E7]") => (on ? colored : gray);

  if (id === "tactica") {
    return (
      <div className="p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className={block(`h-3 w-16 ${tone("bg-[#0A0A0A]")}`)} />
          <div className={block("h-5 w-5 rounded-full " + tone("", "bg-[#E4E4E7]"))} style={on ? { background: accent } : undefined} />
        </div>
        <div className={block(`h-7 w-full rounded-lg ${w ? "border border-dashed border-[#D4D4D8] bg-white" : "bg-[#F4F4F5]"}`)} />
        <div className={`rounded-xl p-2.5 space-y-2 transition-all duration-500 ${w ? "border border-dashed border-[#A1A1AA] bg-white" : "border border-[#E4E4E7] bg-white shadow-sm"}`}>
          <div className={block(`h-2.5 w-3/4 ${tone("bg-[#0A0A0A]", "bg-[#D4D4D8]")}`)} />
          <div className={block(`h-2 w-1/2 ${tone("bg-[#A1A1AA]")}`)} />
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-4 h-4 rounded-full border-2 border-white -ml-1 first:ml-0 transition-colors duration-500"
                style={{ background: on ? accent : "#D4D4D8", opacity: on ? 1 - i * 0.25 : 1 }} />
            ))}
            <div className={block(`h-1.5 w-12 ml-1 ${tone("bg-[#A1A1AA]")}`)} />
          </div>
          <div className={block("h-7 w-full rounded-lg")} style={{ background: on ? accent : "#E4E4E7" }} />
        </div>
        <div className={`rounded-xl p-2.5 space-y-2 ${w ? "border border-dashed border-[#D4D4D8] bg-white" : "border border-[#E4E4E7] bg-white"}`}>
          <div className={block(`h-2.5 w-2/3 ${tone("bg-[#0A0A0A]", "bg-[#D4D4D8]")}`)} />
          <div className={block(`h-2 w-2/5 ${tone("bg-[#A1A1AA]")}`)} />
        </div>
      </div>
    );
  }
  if (id === "mefaltauna") {
    return (
      <div className="p-3 space-y-2.5">
        <div className={block(`h-3 w-24 ${tone("bg-[#0A0A0A]", "bg-[#D4D4D8]")}`)} />
        <div className={`h-2 w-full rounded-full overflow-hidden ${w ? "border border-dashed border-[#D4D4D8] bg-white" : "bg-[#F4F4F5]"}`}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: on ? "68%" : "0%", background: accent }} />
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 20 }).map((_, i) => {
            const filled = [0, 1, 2, 4, 5, 7, 8, 10, 11, 12, 14, 16, 18].includes(i);
            return (
              <div
                key={i}
                className={`aspect-[3/4] rounded transition-all duration-500 ${
                  w
                    ? "border border-dashed border-[#D4D4D8] bg-white"
                    : filled
                      ? "border border-transparent"
                      : "border border-dashed border-[#D4D4D8] bg-white"
                }`}
                style={on && filled ? { background: `${accent}22`, borderColor: `${accent}55` } : undefined}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <div className={block(`h-2 w-16 ${tone("bg-[#A1A1AA]")}`)} />
          <div className={block("h-5 w-14 rounded-md")} style={{ background: on ? accent : "#E4E4E7" }} />
        </div>
      </div>
    );
  }
  if (id === "henry") {
    return (
      <div className="p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className={block(`h-3 w-14 ${tone("bg-[#0A0A0A]", "bg-[#D4D4D8]")}`)} />
          <div className={block(`h-2 w-10 ${tone("bg-[#A1A1AA]")}`)} />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`h-9 rounded-lg transition-all duration-500 ${w ? "border border-dashed border-[#D4D4D8] bg-white" : "border border-[#E4E4E7] bg-white"}`}>
              <div className="h-1.5 w-2/3 rounded m-1.5 transition-colors duration-500" style={{ background: on ? (i === 1 ? accent : "#D4D4D8") : "#E4E4E7" }} />
            </div>
          ))}
        </div>
        <div className={`rounded-xl p-2.5 space-y-1.5 ${w ? "border border-dashed border-[#A1A1AA] bg-white" : "border border-[#E4E4E7] bg-white"}`}>
          {[3, 2, 4].map((n, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className={block(`h-1.5 w-${n === 3 ? "20" : n === 2 ? "14" : "24"} ${tone("bg-[#A1A1AA]")}`)} style={{ width: n * 14 }} />
              <div className={block(`h-1.5 w-8 ${tone("bg-[#52525B]")}`)} />
            </div>
          ))}
          <div className="pt-1.5 border-t border-[#F4F4F5] flex items-center justify-between">
            <div className={block(`h-2 w-10 ${tone("bg-[#0A0A0A]", "bg-[#D4D4D8]")}`)} />
            <div className={block(`h-2.5 w-12 ${tone("bg-[#0A0A0A]", "bg-[#D4D4D8]")}`)} />
          </div>
        </div>
        <div className={block("h-7 w-full rounded-lg")} style={{ background: on ? accent : "#E4E4E7" }} />
      </div>
    );
  }
  // arriendoscope
  return (
    <div className="h-full flex flex-col">
      <div className={`relative flex-1 m-3 mb-0 rounded-xl overflow-hidden transition-colors duration-500 ${w ? "border border-dashed border-[#D4D4D8] bg-white" : "bg-[#F4F4F5]"}`}>
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute top-1/4 left-0 right-0 h-px bg-[#D4D4D8]" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-[#D4D4D8]" />
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-[#D4D4D8]" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-[#D4D4D8]" />
        </div>
        {[
          { top: "22%", left: "26%" },
          { top: "55%", left: "62%" },
          { top: "70%", left: "20%" },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute w-3 h-3 rounded-full border-2 border-white shadow-sm transition-colors duration-500"
            style={{ ...pos, background: on ? accent : "#A1A1AA" }}
          />
        ))}
      </div>
      <div className={`m-3 rounded-xl p-2.5 space-y-1.5 transition-all duration-500 ${w ? "border border-dashed border-[#A1A1AA] bg-white" : "border border-[#E4E4E7] bg-white shadow-sm"}`}>
        <div className="flex gap-2">
          <div className={`w-10 h-10 rounded-lg shrink-0 transition-colors duration-500`} style={{ background: on ? `${accent}22` : "#E4E4E7" }} />
          <div className="flex-1 space-y-1.5 pt-0.5">
            <div className="h-2.5 w-16 rounded transition-colors duration-500" style={{ background: on ? "#0A0A0A" : "#D4D4D8" }} />
            <div className="h-1.5 w-24 rounded transition-colors duration-500" style={{ background: on ? "#A1A1AA" : "#E4E4E7" }} />
          </div>
        </div>
        <div className="h-6 w-full rounded-lg transition-colors duration-500" style={{ background: on ? accent : "#E4E4E7" }} />
      </div>
    </div>
  );
}

/* ── el loop en vivo: terminal + teléfono ── */
function LiveLoop({ en }: { en: boolean }) {
  const [selected, setSelected] = useState("tactica");
  const [runKey, setRunKey] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const demo = useMemo(() => DEMOS.find((d) => d.id === selected)!, [selected]);

  useEffect(() => {
    setLineIdx(0);
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLineIdx(demo.lines.length);
      return;
    }
    const iv = setInterval(() => {
      setLineIdx((i) => {
        if (i >= demo.lines.length) {
          clearInterval(iv);
          return i;
        }
        return i + 1;
      });
    }, 900);
    return () => clearInterval(iv);
  }, [selected, runKey, demo.lines.length]);

  // etapa actual = última etapa declarada entre las líneas ya reveladas
  const stage: Stage = useMemo(() => {
    let s: Stage = "empty";
    demo.lines.slice(0, lineIdx).forEach((l) => { if (l.stage) s = l.stage; });
    return s;
  }, [demo, lineIdx]);

  const done = lineIdx >= demo.lines.length;

  return (
    <div className="border border-[#E4E4E7] rounded-2xl bg-white overflow-hidden">
      {/* selector de producto */}
      <div className="flex items-center gap-1.5 p-3 border-b border-[#F4F4F5] overflow-x-auto no-scrollbar">
        {DEMOS.map((d) => (
          <button
            key={d.id}
            onClick={() => { setSelected(d.id); setRunKey((k) => k + 1); }}
            aria-pressed={selected === d.id}
            className={`px-3 py-[7px] rounded-lg text-[12px] font-semibold whitespace-nowrap transition-colors
              ${selected === d.id ? "bg-[#0A0A0A] text-white" : "text-[#3F3F46] hover:bg-[#F4F4F5]"}`}
          >
            {d.name}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={() => setRunKey((k) => k + 1)}
          aria-label={en ? "Replay" : "Repetir"}
          className="shrink-0 w-8 h-8 rounded-lg border border-[#E4E4E7] text-[#3F3F46] hover:bg-[#FAFAFA] flex items-center justify-center transition-colors"
        >
          {I.replay}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0">
        {/* terminal */}
        <div className="bg-[#0A0A0A] p-5 sm:p-6 flex flex-col min-h-[300px]">
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="ml-2 text-[11px] font-mono text-white/40">claude — {demo.name.toLowerCase()}</span>
          </div>
          <div className="font-mono text-[12px] leading-[2] flex-1">
            {demo.lines.slice(0, lineIdx).map((l, i) => {
              const isPrompt = l.t.startsWith("$");
              const isShip = i === demo.lines.length - 1;
              return (
                <p key={i} className={isPrompt ? "text-white" : isShip ? "text-[#60A5FA]" : "text-white/55"}>
                  {!isPrompt && <span className="text-[#60A5FA] mr-2">▸</span>}
                  {l.t}
                </p>
              );
            })}
            {!done && <span className="inline-block w-[7px] h-[14px] bg-white/70 align-middle animate-pulse" aria-hidden />}
          </div>
          {done && demo.url && (
            <a
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 self-start font-mono text-[12px] text-[#60A5FA] hover:underline"
            >
              {en ? "→ visit the result" : "→ visita el resultado"} ↗
            </a>
          )}
        </div>

        {/* teléfono */}
        <div className="bg-[#F4F4F5] border-t md:border-t-0 md:border-l border-[#E4E4E7] p-6 flex items-center justify-center">
          <div className="relative">
            <div
              className="w-[210px] rounded-[26px] border bg-white p-2 transition-colors duration-500"
              style={{ borderColor: stage === "live" ? demo.accent : "#E4E4E7", boxShadow: "0 1px 3px rgb(0 0 0 / 0.08)" }}
            >
              <div className="mx-auto mb-1.5 h-1 w-12 rounded-full bg-[#E4E4E7]" aria-hidden />
              <div className="rounded-[18px] bg-[#FAFAFA] h-[330px] overflow-hidden relative">
                <Screen id={demo.id} stage={stage} accent={demo.accent} />
              </div>
            </div>
            {/* pill de estado */}
            <span
              className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-[3px] rounded-full text-[10px] font-bold uppercase tracking-[0.06em] transition-all duration-300
                ${stage === "live" ? "text-white opacity-100" : "opacity-0"}`}
              style={{ background: demo.accent }}
            >
              {en ? (demo.url ? "Shipped" : "MVP running") : (demo.url ? "Lanzado" : "MVP corriendo")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIDesignView() {
  const { lang } = useLang();
  const en = lang === "en";

  const stats = [
    { v: "04", en: "products shipped solo", es: "productos lanzados solo" },
    { v: "02", en: "live on the internet today", es: "vivos en internet hoy" },
    { v: "01", en: "in the app stores", es: "en las tiendas de apps" },
    { v: "+1", en: "this portfolio — you're in it", es: "este portafolio — estás dentro" },
  ];

  const skills = [
    {
      icon: I.persona,
      title: { en: "My virtual design self", es: "Mi yo virtual de diseño" },
      desc: {
        en: "Encodes my visual system, UX heuristics and quality bar — AI output starts at my standard, not from zero.",
        es: "Codifica mi sistema visual, heurísticas de UX y estándar de calidad — el output de la IA empieza en mi nivel, no de cero.",
      },
    },
    {
      icon: I.code,
      title: { en: "Frontend implementation agent", es: "Agente de implementación frontend" },
      desc: {
        en: "Turns approved designs into components and PRs that engineers review and merge.",
        es: "Convierte diseños aprobados en componentes y PRs que ingeniería revisa y mergea.",
      },
    },
    {
      icon: I.compass,
      title: { en: "UX strategy agent", es: "Agente de estrategia UX" },
      desc: {
        en: "Explores the problem space and pressure-tests solutions before a single screen gets designed.",
        es: "Explora el espacio del problema y estresa las soluciones antes de diseñar una sola pantalla.",
      },
    },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.p variants={item} className="section-label mb-3">
        AI Native Design
      </motion.p>
      <motion.h1
        variants={item}
        className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-4"
      >
        {en ? "Programming was my ceiling. AI removed it." : "Programar era mi techo. La IA lo quitó."}
      </motion.h1>
      <motion.p variants={item} className="text-[#52525B] text-base leading-relaxed mb-8 max-w-2xl">
        {en
          ? "In the last year I designed and coded complete products — no dev team, no handoffs. This page isn't about using AI for ideas. It's about shipping — and you can watch the loop run."
          : "En el último año diseñé y programé productos completos — sin equipo de desarrollo, sin handoffs. Esta página no va de usar IA para ideas. Va de lanzar — y puedes ver el loop corriendo."}
      </motion.p>

      {/* ── Stats verificables ── */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-[#E4E4E7] rounded-xl px-4 py-3.5">
            <p className="text-[22px] font-bold tabular-nums text-[#0A0A0A] leading-none mb-1">{s.v}</p>
            <p className="text-[12px] text-[#52525B] leading-[1.4]">{en ? s.en : s.es}</p>
          </div>
        ))}
      </motion.div>

      {/* ── El loop en vivo ── */}
      <motion.div variants={item} className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
        <p className="section-label mb-0">
          {en ? "The loop, live" : "El loop, en vivo"}
        </p>
        <p className="text-[12px] text-[#52525B]">
          {en ? "Pick a product — watch how it was shipped" : "Elige un producto — mira cómo se lanzó"}
        </p>
      </motion.div>
      <motion.div variants={item} className="mb-4">
        <LiveLoop en={en} />
      </motion.div>

      {/* descripciones cortas por producto */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {DEMOS.map((d) => (
          <div key={d.id} className="bg-white border border-[#E4E4E7] rounded-xl p-4">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <p className="text-[13.5px] font-semibold text-[#0A0A0A]">{d.name}</p>
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.accent }} aria-hidden />
            </div>
            <p className="text-[12px] text-[#52525B] leading-[1.55]">{en ? d.desc.en : d.desc.es}</p>
            {d.url && (
              <a href={d.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[11.5px] font-semibold text-[#1E40AF] hover:underline">
                {en ? "Visit" : "Visitar"} ↗
              </a>
            )}
          </div>
        ))}
      </motion.div>

      {/* ── Exhibit final: este portafolio ── */}
      <motion.div variants={item} className="bg-[#0A0A0A] rounded-2xl p-6 sm:p-7 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="flex-1 min-w-0">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-2">
              {en ? "Exhibit 05" : "Prueba 05"}
            </p>
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-white mb-2">
              {en ? "The site you're reading right now" : "El sitio que estás leyendo ahora mismo"}
            </h2>
            <p className="text-[13.5px] text-white/60 leading-[1.65] max-w-xl">
              {en
                ? "The walking game in Experience, the vinyls that play on hover, the filterable catalog — this portfolio was designed, animated and deployed with Claude Code. You're inside the evidence."
                : "El juego de caminata en Experience, los vinilos que suenan al hover, el catálogo con filtros — este portafolio fue diseñado, animado y desplegado con Claude Code. Estás dentro de la evidencia."}
            </p>
          </div>
          <span className="shrink-0 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-[11px] font-semibold text-white/80 self-start sm:self-center whitespace-nowrap">
            {en ? "Live — you're here" : "En vivo — estás aquí"}
          </span>
        </div>
      </motion.div>

      {/* ── Skills: el sistema detrás ── */}
      <motion.p variants={item} className="section-label mb-4">
        {en ? "The system — skills that encode my judgment" : "El sistema — skills que codifican mi criterio"}
      </motion.p>
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {skills.map((s, i) => (
          <div key={i} className="bg-white border border-[#E4E4E7] rounded-2xl p-5">
            <span className="w-8 h-8 rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] text-[#3F3F46] flex items-center justify-center mb-3">
              {s.icon}
            </span>
            <p className="text-[13.5px] font-semibold text-[#0A0A0A] leading-tight mb-1">
              {en ? s.title.en : s.title.es}
            </p>
            <p className="text-[12.5px] text-[#52525B] leading-[1.55]">{en ? s.desc.en : s.desc.es}</p>
          </div>
        ))}
      </motion.div>

      {/* ── Cierre ── */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-t border-[#E4E4E7] pt-6">
        <p className="text-[13px] text-[#52525B] leading-[1.6] max-w-xl">
          {en ? (
            <>The step-by-step behind all of this lives in <span className="font-semibold text-[#0A0A0A]">Design Process</span>. What it means for your team: a designer who ships production code — fewer handoffs, faster cycles.</>
          ) : (
            <>El paso a paso detrás de todo esto vive en <span className="font-semibold text-[#0A0A0A]">Design Process</span>. Lo que significa para tu equipo: un diseñador que entrega código de producción — menos handoffs, ciclos más rápidos.</>
          )}
        </p>
        <a
          href="mailto:hello@javiermora.co"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0A0A0A] text-white text-[13px] font-semibold hover:bg-[#2563EB] transition-colors self-start"
        >
          {en ? "Let's build yours" : "Construyamos el tuyo"}
          <span aria-hidden>→</span>
        </a>
      </motion.div>
    </motion.div>
  );
}
