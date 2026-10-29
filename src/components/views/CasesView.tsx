"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import WorkCard from "@/components/cards/WorkCard";
import { WORK, INDUSTRIES, ENGAGEMENTS, type Work } from "@/data/work";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

/* ── dropdown de faceta: botón que adopta el valor activo + panel con check ── */
function Dropdown<T extends string | number>({
  label,
  allLabel,
  value,
  options,
  onChange,
  align = "left",
}: {
  label: string;
  allLabel: string;
  value: T | null;
  options: { v: T; label: string }[];
  onChange: (v: T | null) => void;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = options.find((o) => o.v === value);
  const active = current !== undefined;

  const Row = ({ selected, text, onClick }: { selected: boolean; text: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      role="option"
      aria-selected={selected}
      className={`w-full flex items-center justify-between gap-3 px-2.5 py-[7px] rounded-lg text-[12.5px] text-left transition-colors
        ${selected ? "bg-[#F4F4F5] font-semibold text-[#0A0A0A]" : "text-[#3F3F46] hover:bg-[#FAFAFA]"}`}
    >
      {text}
      {selected && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6.5L4.8 9.5L10 3" />
        </svg>
      )}
    </button>
  );

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`h-9 pl-3 pr-2 rounded-lg text-[12.5px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap
          ${active
            ? "bg-[#0A0A0A] text-white"
            : "text-[#3F3F46] hover:bg-[#F4F4F5]"}`}
      >
        <span>{active ? current.label : label}</span>
        <svg
          width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""} ${active ? "opacity-70" : "opacity-50"}`}
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </button>
      {open && (
        <div
          role="listbox"
          className={`absolute top-[calc(100%+6px)] z-50 min-w-[180px] max-h-[280px] overflow-y-auto no-scrollbar
                      bg-white border border-[#E4E4E7] rounded-xl shadow-lg p-1
                      ${align === "right" ? "right-0" : "left-0"}`}
        >
          <Row selected={!active} text={allLabel} onClick={() => { onChange(null); setOpen(false); }} />
          <div className="my-1 h-px bg-[#F4F4F5]" />
          {options.map((o) => (
            <Row
              key={String(o.v)}
              selected={value === o.v}
              text={o.label}
              onClick={() => { onChange(o.v); setOpen(false); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CasesView() {
  const { lang } = useLang();
  const en = lang === "en";

  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [engagement, setEngagement] = useState<Work["engagement"] | null>(null);
  const [sortDesc, setSortDesc] = useState(true);
  const [selected, setSelected] = useState<Work | null>(null);

  // facetas derivadas del catálogo: solo se muestran filtros con al menos 1 proyecto
  const industryKeys = useMemo(
    () => Object.keys(INDUSTRIES).filter((k) => WORK.some((w) => w.industries.includes(k))),
    []
  );
  const years = useMemo(
    () => [...new Set(WORK.map((w) => w.year))].sort((a, b) => b - a),
    []
  );
  const engagementKeys = useMemo(
    () => (Object.keys(ENGAGEMENTS) as Work["engagement"][]).filter((k) => WORK.some((w) => w.engagement === k)),
    []
  );

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = WORK.filter((w) => {
      if (industry && !w.industries.includes(industry)) return false;
      if (year && w.year !== year) return false;
      if (engagement && w.engagement !== engagement) return false;
      if (needle) {
        const hay = [
          w.name,
          w.en,
          w.es,
          w.type.en,
          w.type.es,
          ...w.industries.map((k) => `${INDUSTRIES[k].en} ${INDUSTRIES[k].es}`),
          ...(w.caseStudy?.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    return list.sort((a, b) => (sortDesc ? b.year - a.year : a.year - b.year));
  }, [q, industry, year, engagement, sortDesc]);

  const hasFilters = q.trim() !== "" || industry !== null || year !== null || engagement !== null;
  const clearAll = () => {
    setQ("");
    setIndustry(null);
    setYear(null);
    setEngagement(null);
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.p variants={item} className="section-label mb-3">
        {en ? "Work" : "Proyectos"}
      </motion.p>
      <motion.h1
        variants={item}
        className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-4"
      >
        {en
          ? `${WORK.length} projects. Real problems, real results.`
          : `${WORK.length} proyectos. Problemas reales, resultados reales.`}
      </motion.h1>
      <motion.p variants={item} className="text-[#52525B] text-base leading-relaxed mb-8 max-w-2xl">
        {en
          ? "Seven years across SaaS, blockchain, design systems and AI — full-time, agency and freelance. Browse it like a catalog: search, filter, open a case."
          : "Siete años entre SaaS, blockchain, design systems e IA — tiempo completo, agencia y freelance. Navégalo como un catálogo: busca, filtra, abre un caso."}
      </motion.p>

      {/* ── Strip de acciones: búsqueda + facetas + orden en una sola barra ── */}
      <motion.div
        variants={item}
        className="mb-4 bg-white border border-[#E4E4E7] rounded-xl p-1.5 flex flex-wrap items-center gap-1.5"
      >
        {/* Búsqueda — ancho completo en móvil, crece en desktop */}
        <div className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[200px]">
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <circle cx="6" cy="6" r="4.5" />
            <path d="M9.5 9.5L13 13" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={en ? "Search projects, tech, industries…" : "Busca proyectos, tech, industrias…"}
            aria-label={en ? "Search projects" : "Buscar proyectos"}
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-transparent text-[13px] text-[#0A0A0A]
                       placeholder:text-[#52525B] focus:outline-none focus:bg-[#FAFAFA] transition-colors"
          />
        </div>

        <div className="hidden sm:block w-px h-5 bg-[#E4E4E7] mx-0.5" />

        <Dropdown
          label={en ? "Industry" : "Industria"}
          allLabel={en ? "All industries" : "Todas las industrias"}
          value={industry}
          options={industryKeys.map((k) => ({ v: k, label: en ? INDUSTRIES[k].en : INDUSTRIES[k].es }))}
          onChange={setIndustry}
        />
        <Dropdown
          label={en ? "Year" : "Año"}
          allLabel={en ? "All years" : "Todos los años"}
          value={year}
          options={years.map((y) => ({ v: y, label: String(y) }))}
          onChange={setYear}
        />
        <Dropdown
          label={en ? "Mode" : "Modalidad"}
          allLabel={en ? "All modes" : "Todas las modalidades"}
          value={engagement}
          options={engagementKeys.map((k) => ({
            v: k,
            label: en ? ENGAGEMENTS[k].en : ENGAGEMENTS[k].es,
          }))}
          onChange={(v) => setEngagement(v)}
          align="right"
        />

        <div className="w-px h-5 bg-[#E4E4E7] mx-0.5" />

        {/* Orden */}
        <button
          onClick={() => setSortDesc((s) => !s)}
          className="h-9 px-3 rounded-lg text-[12.5px] font-medium text-[#3F3F46] hover:bg-[#F4F4F5]
                     transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
            {sortDesc
              ? <path d="M3 2v8M3 10L1 8M3 10l2-2M8 2h3M8 5h2.5M8 8h2" />
              : <path d="M3 10V2M3 2L1 4M3 2l2 2M8 2h2M8 5h2.5M8 8h3" />}
          </svg>
          {sortDesc ? (en ? "Newest" : "Recientes") : (en ? "Oldest" : "Antiguos")}
        </button>
      </motion.div>

      {/* ── Contador de resultados + limpiar ── */}
      <motion.div variants={item} className="flex items-center justify-between mb-4" aria-live="polite">
        <p className="text-[12px] text-[#52525B]">
          {en
            ? `${results.length} of ${WORK.length} projects`
            : `${results.length} de ${WORK.length} proyectos`}
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-[12px] font-medium text-[#1E40AF] hover:underline"
          >
            {en ? "Clear filters" : "Limpiar filtros"}
          </button>
        )}
      </motion.div>

      {/* ── Grid de resultados ── */}
      {results.length > 0 ? (
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {results.map((p) => (
            <WorkCard
              key={p.slug}
              p={p}
              lang={lang}
              onClick={() => setSelected(p)}
              ctaEn={p.caseStudy ? "View Case Study" : "View Details"}
              ctaEs={p.caseStudy ? "Ver Caso de Estudio" : "Ver Detalles"}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={item}
          className="border border-dashed border-[#E4E4E7] rounded-2xl py-16 text-center"
        >
          <p className="text-[14px] font-medium text-[#0A0A0A] mb-1">
            {en ? "No projects match those filters" : "Ningún proyecto coincide con esos filtros"}
          </p>
          <p className="text-[12.5px] text-[#52525B] mb-4">
            {en ? "Try removing a filter or clearing the search." : "Prueba quitando un filtro o limpiando la búsqueda."}
          </p>
          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-lg bg-[#0A0A0A] text-white text-[12px] font-semibold hover:bg-[#2563EB] transition-colors"
          >
            {en ? "Clear all filters" : "Limpiar todos los filtros"}
          </button>
        </motion.div>
      )}

      {/* ── Modal de detalle ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-1 w-full" style={{ background: selected.color }} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-[#52525B]">{selected.yearLabel}</span>
                      <span className="text-[#E4E4E7]">·</span>
                      <span className="text-[11px] text-[#52525B]">
                        {en ? selected.type.en : selected.type.es}
                      </span>
                      <span className="text-[#E4E4E7]">·</span>
                      <span className="text-[11px] text-[#52525B]">
                        {en ? ENGAGEMENTS[selected.engagement].en : ENGAGEMENTS[selected.engagement].es}
                      </span>
                    </div>
                    <h2 className="text-[#0A0A0A] font-semibold text-xl">{selected.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label={en ? "Close" : "Cerrar"}
                    className="shrink-0 w-8 h-8 rounded-lg border border-[#E4E4E7] text-[#3F3F46] hover:bg-[#FAFAFA] flex items-center justify-center transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M2 2l8 8M10 2l-8 8" />
                    </svg>
                  </button>
                </div>

                {/* Métricas del strip, en grande */}
                {selected.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {selected.metrics.map((m, i) => (
                    <div key={i} className="rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2.5">
                      <p className="text-[16px] font-bold tabular-nums" style={{ color: selected.color }}>{m.v}</p>
                      <p className="text-[11px] text-[#3F3F46] leading-[1.3]">{en ? m.en : m.es}</p>
                    </div>
                  ))}
                </div>
                )}

                {selected.caseStudy ? (
                  <>
                    <div className="mb-4">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3F3F46] mb-1.5">
                        {en ? "Problem" : "Problema"}
                      </p>
                      <p className="text-[#52525B] text-sm leading-[1.65]">
                        {en ? selected.caseStudy.problemEn : selected.caseStudy.problemEs}
                      </p>
                    </div>
                    <div className="mb-5 px-3.5 py-2.5 rounded-lg bg-[#F4F4F5] border border-[#E4E4E7]">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3F3F46] mb-1">
                        {en ? "Result" : "Resultado"}
                      </p>
                      <p className="text-[#0A0A0A] text-sm font-medium">
                        {en ? selected.caseStudy.resultEn : selected.caseStudy.resultEs}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-1">
                      {selected.caseStudy.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-[#F4F4F5] text-[#3F3F46]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-[#52525B] text-sm leading-[1.65] mb-1">
                    {en ? selected.en : selected.es}
                    {" "}
                    <span className="text-[#52525B]">
                      {en ? "Full case study coming soon." : "Caso de estudio completo próximamente."}
                    </span>
                  </p>
                )}

                {selected.live && (
                  <a
                    href={selected.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1E40AF] hover:underline"
                  >
                    {en ? "View live project" : "Ver proyecto en vivo"} ↗
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
