"use client";

import { motion, type Variants } from "framer-motion";
import type { Work } from "@/data/work";

/* ─────────────────────────────────────────────────────────
   WorkCard — la card de proyecto usada en Home (Latest Work)
   y en Work (catálogo). Un solo componente, cero duplicados.
   Strip de 3 métricas de valor bajo la descripción.
───────────────────────────────────────────────────────── */

export default function WorkCard({
  p,
  lang,
  onClick,
  ctaEn = "View Case Study",
  ctaEs = "Ver Caso de Estudio",
  variants,
}: {
  p: Work;
  lang: "en" | "es";
  onClick?: () => void;
  ctaEn?: string;
  ctaEs?: string;
  variants?: Variants;
}) {
  const en = lang === "en";
  return (
    <motion.button
      variants={variants}
      onClick={onClick}
      className="group text-left bg-white border border-[#E4E4E7] rounded-xl overflow-hidden hover:border-[#2563EB] hover:shadow-md transition-all duration-200 flex flex-col md:h-full cursor-pointer"
    >
      {/* Área de imagen — mockup abstracto con el color del proyecto */}
      <div
        className={`relative w-full overflow-hidden shrink-0 ${p.img ? "aspect-[43/17]" : "h-[170px]"}`}
        style={{ background: p.img ? "#0A0A0A" : `linear-gradient(145deg, ${p.color}28 0%, ${p.color}10 100%)` }}
      >
        {p.img ? (
          /* imagen diseñada 860x340 — recorte centrado en anchos angostos */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.img}
            alt={`${p.name} — preview`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <>
            <div className="absolute inset-0 p-4 flex flex-col gap-2 justify-center">
              <div className="h-2 rounded-full w-3/4 opacity-20" style={{ background: p.color }} />
              <div className="h-1.5 rounded-full w-1/2 opacity-12" style={{ background: p.color }} />
              <div className="flex gap-1.5 mt-1">
                <div className="h-6 rounded w-1/3 opacity-15" style={{ background: p.color }} />
                <div className="h-6 rounded w-1/4 opacity-10" style={{ background: p.color }} />
              </div>
              <div className="h-1 rounded-full w-2/3 opacity-08" style={{ background: p.color }} />
            </div>
            {/* Grid sutil */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, ${p.color} 0px, ${p.color} 1px, transparent 1px, transparent 24px),
                                  repeating-linear-gradient(90deg, ${p.color} 0px, ${p.color} 1px, transparent 1px, transparent 24px)`,
              }}
            />
          </>
        )}
        {/* Badges + fade: solo sobre el mockup generado — la imagen diseñada va limpia */}
        {!p.img && (
          <>
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span
                className="text-[9px] font-mono px-1.5 py-[2px] rounded"
                style={{ background: `${p.color}30`, color: p.color }}
              >
                {en ? p.type.en : p.type.es}
              </span>
            </div>
            <span
              className="absolute top-3 right-3 text-[10px] font-mono px-1.5 py-[2px] rounded"
              style={{ background: `${p.color}25`, color: p.color }}
            >
              {p.yearLabel}
            </span>
            <div
              className="absolute inset-x-0 bottom-0 h-8"
              style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }}
            />
          </>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-[#0A0A0A] font-semibold text-[14px] leading-tight group-hover:text-[#2563EB] transition-colors mb-1">
          {p.name}
        </p>
        <p className="text-[#52525B] text-[13px] leading-relaxed flex-1">
          {en ? p.en : p.es}
        </p>

        {/* Strip de 3 métricas de valor — solo si el proyecto tiene métricas reales */}
        {p.metrics.length > 0 && (
          <div className="mt-2 pt-2 border-t border-[#F4F4F5] grid grid-cols-3 gap-1.5">
            {p.metrics.slice(0, 3).map((m, i) => (
              <div key={i} className="min-w-0">
                <p className="text-[12px] font-bold tabular-nums leading-tight" style={{ color: p.color }}>
                  {m.v}
                </p>
                <p className="text-[10px] text-[#52525B] leading-[1.3]">{en ? m.en : m.es}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-2 flex items-center justify-between px-3 py-[10px] rounded-lg border border-[#0A0A0A] bg-[#0A0A0A] group-hover:border-[#2563EB] group-hover:bg-[#2563EB] transition-all duration-200">
          <span className="text-[12px] font-semibold text-white transition-colors duration-200">
            {en ? ctaEn : ctaEs}
          </span>
          <span className="text-[14px] font-medium text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 inline-block">
            →
          </span>
        </div>
      </div>
    </motion.button>
  );
}
