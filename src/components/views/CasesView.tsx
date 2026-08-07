"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const cases = [
  {
    slug: "tactica",
    titleEn: "Tactica",
    titleEs: "Tactica",
    categoryEn: "Mobile App · UX/UI Design",
    categoryEs: "App Móvil · Diseño UX/UI",
    yearEn: "2025",
    yearEs: "2025",
    problemEn:
      "Sports facility owners in Bogotá were losing revenue to no-shows and double bookings. Existing tools were desktop-only, slow, and built for admins — not players.",
    problemEs:
      "Los dueños de canchas deportivas en Bogotá perdían ingresos por no-shows y dobles reservas. Las herramientas existentes eran solo desktop, lentas y construidas para admins — no para jugadores.",
    resultEn: "Checkout time: 8 min → 90 sec. No-show rate: −64% after 3 months.",
    resultEs: "Tiempo de checkout: 8 min → 90 seg. Tasa de no-show: −64% en 3 meses.",
    tags: ["React Native", "Firebase", "Wompi", "Push Notifications"],
    accent: "#7C3AED",
    live: "https://tactica-deploy.vercel.app",
  },
  {
    slug: "kolo",
    titleEn: "KOLO",
    titleEs: "KOLO",
    categoryEn: "SaaS · ERP/POS",
    categoryEs: "SaaS · ERP/POS",
    yearEn: "2024–2025",
    yearEs: "2024–2025",
    problemEn:
      "SMEs in Guatemala, El Salvador, and Honduras were running their businesses on WhatsApp and Excel. They needed a POS + inventory + billing tool that worked offline, in Spanish, and on a $15 phone.",
    problemEs:
      "Las PyMEs de Guatemala, El Salvador y Honduras llevaban su negocio por WhatsApp y Excel. Necesitaban una herramienta de POS + inventario + facturación que funcionara sin internet, en español y en un celular de $15.",
    resultEn: "Currently in beta with 40+ merchants. Target: $1M ARR.",
    resultEs: "Actualmente en beta con 40+ comercios. Meta: $1M ARR.",
    tags: ["SaaS", "ERP", "POS", "FEL", "Mobile First"],
    accent: "#059669",
    live: null,
  },
  {
    slug: "defi",
    titleEn: "DeFi Platform",
    titleEs: "Plataforma DeFi",
    categoryEn: "Web3 · Product Design",
    categoryEs: "Web3 · Diseño de Producto",
    yearEn: "2023",
    yearEs: "2023",
    problemEn:
      "A DeFi protocol had high TVL but terrible retention — users deposited once, couldn't understand their position, and left. The data was there, the design wasn't.",
    problemEs:
      "Un protocolo DeFi tenía alto TVL pero pésima retención — los usuarios depositaban una vez, no entendían su posición y se iban. Los datos estaban, el diseño no.",
    resultEn: "Staking flow redesigned. Session length +3x. Full case study pending.",
    resultEs: "Flujo de staking rediseñado. Duración de sesión +3x. Caso completo pendiente.",
    tags: ["Web3", "DeFi", "Dashboard", "Staking", "Governance"],
    accent: "#D97706",
    live: null,
  },
];

export default function CasesView() {
  const { lang } = useLang();

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
      <motion.p variants={item} className="section-label mb-3">
        {lang === "en" ? "Selected work" : "Trabajo selecto"}
      </motion.p>

      <motion.h1
        variants={item}
        className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-4"
      >
        {lang === "en" ? "3 projects.\nReal problems, real results." : "3 proyectos.\nProblemas reales, resultados reales."}
      </motion.h1>

      <motion.p variants={item} className="text-[#52525B] text-base leading-relaxed mb-10">
        {lang === "en"
          ? "I don't show 8 thumbnails. Each project here has a problem worth reading."
          : "No muestro 8 thumbnails. Cada proyecto aquí tiene un problema que vale leer."}
      </motion.p>

      <div className="space-y-4">
        {cases.map((c) => (
          <motion.div key={c.slug} variants={item}>
            <div className="group border border-[#E4E4E7] bg-white rounded-2xl overflow-hidden hover:border-[#D4D4D8] transition-all duration-200">
              {/* Accent bar top */}
              <div className="h-1 w-full" style={{ background: c.accent }} />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-[#A1A1AA]">
                        {lang === "en" ? c.yearEn : c.yearEs}
                      </span>
                      <span className="text-[#E4E4E7]">·</span>
                      <span className="text-[11px] text-[#A1A1AA]">
                        {lang === "en" ? c.categoryEn : c.categoryEs}
                      </span>
                    </div>
                    <h2 className="text-[#0A0A0A] font-semibold text-xl">
                      {lang === "en" ? c.titleEn : c.titleEs}
                    </h2>
                  </div>
                  {c.live && (
                    <a
                      href={c.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                    >
                      {lang === "en" ? "View live ↗" : "Ver en vivo ↗"}
                    </a>
                  )}
                </div>

                {/* Problem */}
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA] mb-1.5">
                    {lang === "en" ? "Problem" : "Problema"}
                  </p>
                  <p className="text-[#52525B] text-sm leading-[1.65]">
                    {lang === "en" ? c.problemEn : c.problemEs}
                  </p>
                </div>

                {/* Result */}
                <div className="mb-5 px-3.5 py-2.5 rounded-lg bg-[#F4F4F5] border border-[#E4E4E7]">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA] mb-1">
                    {lang === "en" ? "Result" : "Resultado"}
                  </p>
                  <p className="text-[#0A0A0A] text-sm font-medium">
                    {lang === "en" ? c.resultEn : c.resultEs}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-[#F4F4F5] text-[#52525B]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
