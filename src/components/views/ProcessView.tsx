"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

/* ─────────────────────────────────────────────────────────
   Design Process — el proceso como documento de trabajo real:
   spine vertical de pasos con bifurcación punteada (la ruta
   no lineal), y cada paso muestra su ENTREGABLE como artefacto
   dibujado en SVG de trazo fino. Cero emojis, un solo acento.
───────────────────────────────────────────────────────── */

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const ACCENT = "#2563EB";

/* convierte los marcadores **frase** del copy en negrilla con tinta oscura */
function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-[#0A0A0A]">{part}</strong>
        ) : (
          part
        )
      )}
    </>
  );
}

type StepId = "context" | "users" | "flowcharts" | "wireframes" | "visual" | "code" | "market" | "nonlinear";

type Step = {
  id: StepId;
  num: string;
  label: { en: string; es: string };
  title: { en: string; es: string };
  body: { en: string; es: string };
  deliverable: { en: string; es: string };
  evidence: string[];
};

const STEPS: Step[] = [
  {
    id: "context",
    num: "01",
    label: { en: "Context", es: "Contexto" },
    title: { en: "Business before pixels", es: "El negocio antes que el pixel" },
    body: {
      en: "Every product starts with a call — usually a founder or a startup with an idea. Before touching any tool I need two answers: **what are we really building, and who is it for.** Most bad products die of a wrong answer here, not of bad UI.",
      es: "Todo producto empieza con una llamada — normalmente un founder o una startup con una idea. Antes de tocar cualquier herramienta necesito dos respuestas: **qué estamos construyendo realmente y para quién.** La mayoría de los productos malos mueren por una respuesta equivocada aquí, no por mala UI.",
    },
    deliverable: { en: "Kickoff notes", es: "Notas de kickoff" },
    evidence: ["Tweet", "AI Startup — SF", "Props Platform"],
  },
  {
    id: "users",
    num: "02",
    label: { en: "Users", es: "Usuarios" },
    title: { en: "Know the user before they ask", es: "Conocer al usuario antes de que pida" },
    body: {
      en: "I map who the product serves, then tear down every competitor I can find — how their flows work, where they leak. **My edge is anticipation:** in Tactica, before anyone asked, I knew a player booking a match would want to see who already reserved. Putting the right information at the right point is what keeps users from getting lost.",
      es: "Mapeo a quién sirve el producto y luego desarmo cada competidor que encuentro — cómo funcionan sus flujos, dónde se caen. **Mi ventaja es la anticipación:** en Tactica, antes de que alguien lo pidiera, sabía que un jugador al reservar querría ver quiénes ya reservaron. Poner la información correcta en el punto correcto es lo que evita que el usuario se pierda.",
    },
    deliverable: { en: "User & competitor map", es: "Mapa de usuarios y competencia" },
    evidence: ["Tactica"],
  },
  {
    id: "flowcharts",
    num: "03",
    label: { en: "Flowcharts", es: "Flowcharts" },
    title: { en: "The flowchart is the contract", es: "El flowchart es el contrato" },
    body: {
      en: "On large platforms I chart every module before designing a single screen. The flowchart aligns the team on what exists and what we're building — and the most robust flow becomes the seed for components and patterns. **Cheap to change on paper, expensive to change in code.**",
      es: "En plataformas grandes diagramo todos los módulos antes de diseñar una sola pantalla. El flowchart alinea al equipo sobre qué existe y qué vamos a construir — y el flujo más robusto se convierte en la semilla de componentes y patrones. **Barato de cambiar en papel, caro de cambiar en código.**",
    },
    deliverable: { en: "Module flowchart", es: "Flowchart de módulos" },
    evidence: ["KOLO Manager App", "Cousine POS"],
  },
  {
    id: "wireframes",
    num: "04",
    label: { en: "Wireframes", es: "Wireframes" },
    title: { en: "Architecture is approved in gray", es: "La arquitectura se aprueba en gris" },
    body: {
      en: "Products born from zero get designed twice. First in hi-fi wireframes — no color, no brand — so **every piece of feedback is about interaction and architecture, not taste.** Only when the structure is approved does visual design begin. It kills weeks of “can we try it in blue?”",
      es: "Los productos que nacen de cero se diseñan dos veces. Primero en wireframes hi-fi — sin color, sin marca — para que **todo el feedback sea sobre interacción y arquitectura, no sobre gustos.** Solo cuando la estructura está aprobada empieza el diseño visual. Mata semanas de “¿y si lo probamos en azul?”.",
    },
    deliverable: { en: "Hi-fi wireframes", es: "Wireframes hi-fi" },
    evidence: ["Tweet", "AI Startup — SF"],
  },
  {
    id: "visual",
    num: "05",
    label: { en: "Visual", es: "Visual" },
    title: { en: "Style lands last — and lands hard", es: "El estilo llega de último — y llega fuerte" },
    body: {
      en: "With the architecture locked, visual design moves fast: the design system grows from the most robust flow's components and every new screen inherits it. As the only designer on most teams, **that system is what lets one person keep an entire product coherent.**",
      es: "Con la arquitectura cerrada, el diseño visual avanza rápido: el design system crece desde los componentes del flujo más robusto y cada pantalla nueva lo hereda. Como único diseñador en la mayoría de los equipos, **ese sistema es lo que le permite a una sola persona mantener coherente un producto completo.**",
    },
    deliverable: { en: "Design system", es: "Design system" },
    evidence: ["My Algo Wallet", "Chameleon Wallet"],
  },
  {
    id: "code",
    num: "06",
    label: { en: "Code · PRs", es: "Código · PRs" },
    title: { en: "Design that merges", es: "Diseño que se mergea" },
    body: {
      en: "Programming used to be my ceiling. With AI it isn't — today I define the stack, build the components and **open frontend PRs that engineers review and merge.** Design stops being a handoff and becomes working code. That changed what I can promise.",
      es: "Programar era mi techo. Con IA ya no — hoy defino el stack, construyo los componentes y **abro PRs de frontend que ingeniería revisa y mergea.** El diseño deja de ser un handoff y se convierte en código funcionando. Eso cambió lo que puedo prometer.",
    },
    deliverable: { en: "Merged PR", es: "PR mergeado" },
    evidence: ["KOLO Manager App", "Tactica"],
  },
  {
    id: "market",
    num: "07",
    label: { en: "Market", es: "Mercado" },
    title: { en: "What I promise: the product ships", es: "Lo que prometo: el producto llega al mercado" },
    body: {
      en: "Not a prototype, not a deck — **a product users can touch.** We iterate and scale until launch, and then we watch it work. Tactica is live in the app stores; KOLO runs in three countries. That's the standard I sign for.",
      es: "No un prototipo, no una presentación — **un producto que los usuarios pueden tocar.** Iteramos y escalamos hasta el lanzamiento, y luego lo vemos funcionar. Tactica está viva en las tiendas; KOLO opera en tres países. Ese es el estándar que firmo.",
    },
    deliverable: { en: "Product in production", es: "Producto en producción" },
    evidence: ["Tactica", "KOLO Manager App"],
  },
];

const NONLINEAR: Step = {
  id: "nonlinear",
  num: "—",
  label: { en: "The non-linear route", es: "La ruta no lineal" },
  title: { en: "The honest part: it's not always linear", es: "La parte honesta: no siempre es lineal" },
  body: {
    en: "Some products skip research entirely — a Japanese startup once asked me to replicate a protocol with a few strategic changes; wallets and trading platforms are born inspired by what already works. And as a product grows, new modules aren't rediscovered from zero — they're built from need. **Knowing when process adds value and when it's theater is also a design decision.**",
    es: "Algunos productos se saltan el research por completo — una startup japonesa me pidió replicar un protocolo con unos cambios estratégicos; las wallets y plataformas de trading nacen inspiradas en lo que ya funciona. Y cuando el producto crece, los módulos nuevos no se redescubren desde cero — se construyen según la necesidad. **Saber cuándo el proceso agrega valor y cuándo es teatro también es una decisión de diseño.**",
  },
  deliverable: { en: "Judgment", es: "Criterio" },
  evidence: ["Point Network", "Chameleon Wallet", "Props Platform"],
};

const ALL: Record<StepId, Step> = {
  context: STEPS[0], users: STEPS[1], flowcharts: STEPS[2], wireframes: STEPS[3],
  visual: STEPS[4], code: STEPS[5], market: STEPS[6], nonlinear: NONLINEAR,
};

const ORDER: StepId[] = ["context", "users", "flowcharts", "wireframes", "visual", "code", "market"];

/* ── icono bolt de trazo (sin emojis) ── */
const BoltIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
    <path d="M7.5 1.5L3 8h3l-.5 4.5L10 6H7l.5-4.5z" />
  </svg>
);

/* ─────────────────────────────────────────────────────────
   Artefactos por paso — el entregable dibujado, trazo 1px,
   neutros + un solo acento. Sin texto dependiente de idioma.
───────────────────────────────────────────────────────── */
const ART: Partial<Record<StepId, React.ReactNode>> = {
  context: (
    <svg viewBox="0 0 240 150" fill="none" className="w-full h-auto" aria-hidden>
      <rect x="18" y="16" width="100" height="40" rx="10" fill="#F4F4F5" stroke="#E4E4E7" />
      <path d="M34 56l-4 8 12-8" fill="#F4F4F5" stroke="#E4E4E7" strokeLinejoin="round" />
      <rect x="30" y="28" width="60" height="4" rx="2" fill="#D4D4D8" />
      <rect x="30" y="38" width="40" height="4" rx="2" fill="#E4E4E7" />
      <rect x="122" y="52" width="100" height="40" rx="10" fill="#EFF6FF" stroke={ACCENT} strokeOpacity="0.35" />
      <path d="M206 92l4 8-12-8" fill="#EFF6FF" stroke={ACCENT} strokeOpacity="0.35" strokeLinejoin="round" />
      <rect x="134" y="64" width="56" height="4" rx="2" fill={ACCENT} fillOpacity="0.45" />
      <rect x="134" y="74" width="36" height="4" rx="2" fill={ACCENT} fillOpacity="0.25" />
      <rect x="18" y="108" width="8" height="8" rx="2" stroke="#A1A1AA" />
      <rect x="34" y="110" width="74" height="4" rx="2" fill="#D4D4D8" />
      <rect x="18" y="126" width="8" height="8" rx="2" stroke="#A1A1AA" />
      <path d="M20 130l2.5 2.5L27 128" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="34" y="128" width="58" height="4" rx="2" fill="#D4D4D8" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 240 150" fill="none" className="w-full h-auto" aria-hidden>
      <circle cx="120" cy="78" r="22" stroke="#E4E4E7" />
      <circle cx="120" cy="78" r="44" stroke="#E4E4E7" />
      <circle cx="120" cy="78" r="64" stroke="#F4F4F5" />
      <circle cx="120" cy="78" r="2.5" fill="#A1A1AA" />
      <circle cx="96" cy="60" r="4" fill="#D4D4D8" />
      <circle cx="152" cy="96" r="4" fill="#D4D4D8" />
      <circle cx="88" cy="106" r="4" fill="#D4D4D8" />
      <circle cx="150" cy="44" r="5" fill={ACCENT} />
      <circle cx="150" cy="44" r="10" stroke={ACCENT} strokeOpacity="0.3" />
      <path d="M158 38h44" stroke={ACCENT} strokeOpacity="0.5" strokeDasharray="3 3" />
      <rect x="176" y="24" width="46" height="4" rx="2" fill={ACCENT} fillOpacity="0.4" />
      <rect x="176" y="44" width="30" height="3" rx="1.5" fill="#D4D4D8" />
    </svg>
  ),
  flowcharts: (
    <svg viewBox="0 0 240 150" fill="none" className="w-full h-auto" aria-hidden>
      <rect x="96" y="12" width="48" height="22" rx="6" fill="#F4F4F5" stroke="#E4E4E7" />
      <path d="M120 34v14M120 48H60v12M120 48h60v12M120 48v12" stroke="#D4D4D8" />
      <rect x="36" y="60" width="48" height="22" rx="6" fill="#FFF" stroke="#E4E4E7" />
      <rect x="96" y="60" width="48" height="22" rx="6" fill="#EFF6FF" stroke={ACCENT} />
      <rect x="156" y="60" width="48" height="22" rx="6" fill="#FFF" stroke="#E4E4E7" />
      <path d="M60 82v12M120 82v12M180 82v12" stroke="#D4D4D8" />
      <path d="M120 94v0" stroke={ACCENT} />
      <rect x="36" y="106" width="48" height="22" rx="6" fill="#FFF" stroke="#E4E4E7" />
      <rect x="96" y="106" width="48" height="22" rx="6" fill="#EFF6FF" stroke={ACCENT} />
      <rect x="156" y="106" width="48" height="22" rx="6" fill="#FFF" stroke="#E4E4E7" />
      <path d="M120 82v24" stroke={ACCENT} />
      <rect x="104" y="66" width="32" height="4" rx="2" fill={ACCENT} fillOpacity="0.45" />
      <rect x="104" y="74" width="20" height="3" rx="1.5" fill={ACCENT} fillOpacity="0.25" />
      <rect x="44" y="66" width="32" height="4" rx="2" fill="#D4D4D8" />
      <rect x="164" y="66" width="32" height="4" rx="2" fill="#D4D4D8" />
      <rect x="104" y="112" width="32" height="4" rx="2" fill={ACCENT} fillOpacity="0.45" />
      <rect x="44" y="112" width="32" height="4" rx="2" fill="#D4D4D8" />
      <rect x="164" y="112" width="32" height="4" rx="2" fill="#D4D4D8" />
    </svg>
  ),
  visual: (
    <svg viewBox="0 0 240 150" fill="none" className="w-full h-auto" aria-hidden>
      <circle cx="34" cy="30" r="12" fill="#0A0A0A" />
      <circle cx="64" cy="30" r="12" fill="#D4D4D8" />
      <circle cx="94" cy="30" r="12" fill={ACCENT} />
      <circle cx="94" cy="30" r="16" stroke={ACCENT} strokeOpacity="0.3" />
      <rect x="130" y="16" width="50" height="10" rx="2" fill="#0A0A0A" fillOpacity="0.85" />
      <rect x="130" y="32" width="34" height="6" rx="2" fill="#A1A1AA" />
      <rect x="22" y="62" width="86" height="26" rx="8" fill={ACCENT} />
      <rect x="40" y="72" width="50" height="5" rx="2.5" fill="#FFF" fillOpacity="0.9" />
      <rect x="120" y="62" width="86" height="26" rx="8" fill="#FFF" stroke={ACCENT} />
      <rect x="138" y="72" width="50" height="5" rx="2.5" fill={ACCENT} />
      <rect x="22" y="98" width="86" height="26" rx="8" fill="#F4F4F5" stroke="#E4E4E7" />
      <rect x="40" y="108" width="50" height="5" rx="2.5" fill="#D4D4D8" />
      <rect x="120" y="98" width="86" height="26" rx="8" fill="#FFF" stroke="#E4E4E7" strokeDasharray="4 3" />
      <rect x="138" y="108" width="50" height="5" rx="2.5" fill="#E4E4E7" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 240 150" fill="none" className="w-full h-auto" aria-hidden>
      <rect x="16" y="14" width="208" height="122" rx="10" fill="#FFF" stroke="#E4E4E7" />
      <path d="M16 40h208" stroke="#F4F4F5" />
      <circle cx="30" cy="27" r="3" fill="#E4E4E7" />
      <circle cx="42" cy="27" r="3" fill="#E4E4E7" />
      <rect x="54" y="23" width="70" height="7" rx="3.5" fill="#D4D4D8" />
      <rect x="160" y="20" width="52" height="14" rx="7" fill={ACCENT} />
      <rect x="170" y="25" width="32" height="4" rx="2" fill="#FFF" fillOpacity="0.9" />
      <rect x="30" y="52" width="10" height="4" rx="2" fill="#E4E4E7" />
      <rect x="48" y="52" width="90" height="4" rx="2" fill="#E4E4E7" />
      <rect x="30" y="66" width="10" height="4" rx="2" fill="#E4E4E7" />
      <rect x="48" y="66" width="120" height="4" rx="2" fill="#E4E4E7" />
      <rect x="30" y="80" width="10" height="4" rx="2" fill={ACCENT} fillOpacity="0.6" />
      <rect x="48" y="80" width="140" height="4" rx="2" fill={ACCENT} fillOpacity="0.35" />
      <rect x="30" y="94" width="10" height="4" rx="2" fill={ACCENT} fillOpacity="0.6" />
      <rect x="48" y="94" width="104" height="4" rx="2" fill={ACCENT} fillOpacity="0.35" />
      <rect x="30" y="108" width="10" height="4" rx="2" fill={ACCENT} fillOpacity="0.6" />
      <rect x="48" y="108" width="126" height="4" rx="2" fill={ACCENT} fillOpacity="0.35" />
      <path d="M30 124h60" stroke="#F4F4F5" />
    </svg>
  ),
  market: (
    <svg viewBox="0 0 240 150" fill="none" className="w-full h-auto" aria-hidden>
      <path d="M28 126h186" stroke="#E4E4E7" />
      <path d="M28 126V22" stroke="#E4E4E7" />
      <path d="M28 112 L74 96 L112 102 L150 66 L192 36" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 112 L74 96 L112 102 L150 66 L192 36 L192 126 L28 126 Z" fill={ACCENT} fillOpacity="0.06" />
      <circle cx="192" cy="36" r="4" fill={ACCENT} />
      <circle cx="192" cy="36" r="9" stroke={ACCENT} strokeOpacity="0.3" />
      <rect x="150" y="18" width="30" height="12" rx="6" fill="#EFF6FF" stroke={ACCENT} strokeOpacity="0.4" />
      <circle cx="158" cy="24" r="2" fill={ACCENT} />
      <rect x="164" y="22" width="10" height="4" rx="2" fill={ACCENT} fillOpacity="0.5" />
      <path d="M74 126v-6M112 126v-6M150 126v-6" stroke="#E4E4E7" />
    </svg>
  ),
  nonlinear: (
    <svg viewBox="0 0 240 150" fill="none" className="w-full h-auto" aria-hidden>
      <path d="M24 104h192" stroke="#E4E4E7" />
      <circle cx="44" cy="104" r="13" fill="#FFF" stroke="#D4D4D8" />
      <circle cx="120" cy="104" r="13" fill="#FAFAFA" stroke="#E4E4E7" strokeDasharray="3 3" />
      <circle cx="196" cy="104" r="13" fill="#FFF" stroke="#D4D4D8" />
      <path d="M52 94 C 80 40, 160 40, 189 94" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" />
      <path d="M186 88l4 7-8 .5" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="38" y="100" width="12" height="4" rx="2" fill="#A1A1AA" />
      <rect x="114" y="100" width="12" height="4" rx="2" fill="#E4E4E7" />
      <rect x="190" y="100" width="12" height="4" rx="2" fill="#A1A1AA" />
      <rect x="88" y="126" width="64" height="4" rx="2" fill="#E4E4E7" />
    </svg>
  ),
};

/* ── demo interactivo compacto: es el artefacto del paso 04 ── */
function WireframeDemo({ en }: { en: boolean }) {
  const [visual, setVisual] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-3 gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3F3F46]">
          {en ? "Try it" : "Pruébalo"}
        </p>
        <div className="flex rounded-lg border border-[#E4E4E7] bg-white p-0.5">
          {[false, true].map((v) => (
            <button
              key={String(v)}
              onClick={() => setVisual(v)}
              aria-pressed={visual === v}
              className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold transition-colors
                ${visual === v ? "bg-[#0A0A0A] text-white" : "text-[#52525B] hover:text-[#0A0A0A]"}`}
            >
              {v ? "Visual" : "Wireframe"}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`rounded-xl p-3.5 transition-all duration-300
          ${visual ? "bg-white border border-[#E4E4E7] shadow-sm" : "bg-white border border-dashed border-[#A1A1AA]"}`}
      >
        {visual ? (
          <p className="text-[13px] font-semibold text-[#0A0A0A] mb-0.5">{en ? "Court 3 — Soccer 5v5" : "Cancha 3 — Fútbol 5"}</p>
        ) : (
          <div className="h-3 w-3/4 rounded bg-[#D4D4D8] mb-1.5" />
        )}
        {visual ? (
          <p className="text-[11.5px] text-[#52525B] mb-2.5">{en ? "Sat · 6:00 PM · 60 min" : "Sáb · 6:00 PM · 60 min"}</p>
        ) : (
          <div className="h-2 w-1/2 rounded bg-[#E4E4E7] mb-3" />
        )}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex -space-x-1.5">
            {(visual ? ["#2563EB", "#1E40AF", "#93C5FD"] : ["#D4D4D8", "#D4D4D8", "#D4D4D8"]).map((c, i) => (
              <span key={i} className="w-5 h-5 rounded-full border-2 border-white transition-colors duration-300" style={{ background: c }} />
            ))}
          </div>
          {visual ? (
            <p className="text-[10.5px] font-medium text-[#3F3F46]">{en ? "3 already booked" : "3 ya reservaron"}</p>
          ) : (
            <div className="h-2 w-16 rounded bg-[#E4E4E7]" />
          )}
        </div>
        <div
          className={`h-8 rounded-lg flex items-center justify-center transition-all duration-300
            ${visual ? "bg-[#2563EB]" : "bg-[#E4E4E7] border border-dashed border-[#A1A1AA]"}`}
        >
          {visual && <span className="text-[11.5px] font-semibold text-white">{en ? "Book my spot" : "Reservar mi cupo"}</span>}
        </div>
      </div>

      <p className="mt-2.5 text-[10.5px] text-[#52525B] leading-[1.5]">
        {en
          ? "The gray version gets approved; the visual one ships."
          : "La versión gris se aprueba; la visual sale al mercado."}
      </p>
    </div>
  );
}

export default function ProcessView() {
  const { lang } = useLang();
  const en = lang === "en";

  const reveal = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  /* una card de paso del timeline */
  const StepCard = ({ s, isMarket = false }: { s: Step; isMarket?: boolean }) => (
    <div className={`rounded-2xl border bg-white p-6 sm:p-7 ${isMarket ? "border-[#BFDBFE]" : "border-[#E4E4E7]"}`}>
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#52525B]">
              {en ? s.label.en : s.label.es}
            </span>
            <span className="text-[#E4E4E7]">·</span>
            <span className="text-[11px] text-[#52525B]">
              {en ? "Deliverable" : "Entregable"}: {en ? s.deliverable.en : s.deliverable.es}
            </span>
          </div>
          <h2 className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.01em] text-[#0A0A0A] mb-3">
            {en ? s.title.en : s.title.es}
          </h2>
          <p className="text-[14.5px] text-[#52525B] leading-[1.7]">
            <Highlight text={en ? s.body.en : s.body.es} />
          </p>
          <div className="mt-5 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3F3F46]">
              {en ? "Evidence" : "Evidencia"}
            </span>
            {s.evidence.map((name) => (
              <span key={name} className="px-2.5 py-1 rounded-md bg-[#F4F4F5] text-[12px] font-medium text-[#3F3F46]">
                {name}
              </span>
            ))}
          </div>
          {isMarket && (
            <a
              href="mailto:hello@javiermora.co"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0A0A0A] text-white text-[13px] font-semibold hover:bg-[#2563EB] transition-colors"
            >
              {en ? "Let's ship yours" : "Lancemos el tuyo"}
              <span aria-hidden>→</span>
            </a>
          )}
        </div>
        {(ART[s.id] || s.id === "wireframes") && (
          <div className="w-full md:w-[260px] shrink-0">
            <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-4">
              {s.id === "wireframes" ? <WireframeDemo en={en} /> : ART[s.id]}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* ── Header — mismo patrón que Work ── */}
      <motion.p variants={item} className="section-label mb-3">
        {en ? "Design process" : "Proceso de diseño"}
      </motion.p>
      <motion.h1
        variants={item}
        className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-4"
      >
        {en ? "From first call to shipped product." : "De la primera llamada al producto en el mercado."}
      </motion.h1>
      <motion.p variants={item} className="text-[#52525B] text-base leading-relaxed mb-10 max-w-2xl">
        {en
          ? "This is how I actually work — not a textbook diagram. Each step produces a real deliverable, every claim is backed by a shipped project, and there's a dotted route because real products don't always follow the arrows."
          : "Así trabajo de verdad — no es un diagrama de libro. Cada paso produce un entregable real, cada afirmación está respaldada por un proyecto embarcado, y hay una ruta punteada porque los productos reales no siempre siguen las flechas."}
      </motion.p>

      {/* ── Timeline vertical: la línea es el proceso ── */}
      <div className="relative">
        {/* línea continua */}
        <div className="absolute left-[17px] sm:left-[21px] top-2 bottom-8 w-px bg-[#E4E4E7]" aria-hidden />

        {ORDER.map((id) => {
          const s = ALL[id];
          const isMarket = id === "market";
          return (
            <div key={id}>
              <motion.section
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="relative pl-[52px] sm:pl-[64px] pb-8"
              >
                {/* nodo sobre la línea */}
                <span
                  className={`absolute left-0 sm:left-[2px] top-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-[11px] font-bold font-mono z-10
                    ${isMarket
                      ? "bg-[#0A0A0A] border-[#0A0A0A] text-white"
                      : "bg-white border-[#E4E4E7] text-[#3F3F46]"}`}
                  aria-hidden
                >
                  {s.num}
                </span>
                <StepCard s={s} isMarket={isMarket} />
              </motion.section>

              {/* bifurcación punteada después del paso 02 */}
              {id === "users" && (
                <motion.section
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="relative pl-[52px] sm:pl-[64px] pb-8"
                >
                  {/* codo punteado que sale de la línea principal */}
                  <svg
                    className="absolute left-[17px] sm:left-[21px] top-0 w-[36px] sm:w-[44px] h-[44px]"
                    viewBox="0 0 44 44" fill="none" aria-hidden
                  >
                    <path d="M0.5 0 v14 a10 10 0 0 0 10 10 H44" stroke="#2563EB" strokeOpacity="0.55" strokeDasharray="4 4" />
                  </svg>
                  <div className="ml-4 sm:ml-6 rounded-2xl border border-dashed border-[#93C5FD] bg-[#2563EB]/5 p-6 sm:p-7">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 text-[#1E40AF]">
                          <BoltIcon size={11} />
                          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                            {en ? NONLINEAR.label.en : NONLINEAR.label.es}
                          </span>
                        </div>
                        <h2 className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.01em] text-[#0A0A0A] mb-3">
                          {en ? NONLINEAR.title.en : NONLINEAR.title.es}
                        </h2>
                        <p className="text-[14.5px] text-[#52525B] leading-[1.7]">
                          <Highlight text={en ? NONLINEAR.body.en : NONLINEAR.body.es} />
                        </p>
                        <div className="mt-5 flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3F3F46]">
                            {en ? "Evidence" : "Evidencia"}
                          </span>
                          {NONLINEAR.evidence.map((name) => (
                            <span key={name} className="px-2.5 py-1 rounded-md bg-white border border-[#DBEAFE] text-[12px] font-medium text-[#3F3F46]">
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="w-full md:w-[260px] shrink-0">
                        <div className="rounded-xl border border-dashed border-[#BFDBFE] bg-white/70 p-4">
                          {ART.nonlinear}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </div>
          );
        })}
      </div>

      {/* nota al pie */}
      <motion.p
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-2 pl-[52px] sm:pl-[64px] text-[12.5px] text-[#52525B] leading-[1.6]"
      >
        {en
          ? "Where AI fits in all of this — the stack, the skills, the products designed and coded end to end — lives in "
          : "Dónde entra la IA en todo esto — el stack, los skills, los productos diseñados y programados de punta a punta — vive en "}
        <span className="font-semibold text-[#0A0A0A]">AI Native Design</span>.
      </motion.p>
    </motion.div>
  );
}
