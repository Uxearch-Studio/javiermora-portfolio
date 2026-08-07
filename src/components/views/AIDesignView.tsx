"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function AIDesignView() {
  const { lang } = useLang();

  const principles = [
    {
      number: "01",
      titleEn: "AI changes the interface layer, not the problem layer",
      titleEs: "La IA cambia la capa de interfaz, no la capa de problemas",
      descEn:
        "Users still have jobs to do. The question isn't 'how do we add AI to this?' — it's 'where does AI remove friction from the real job?' Most AI features I've seen answer the first question, not the second.",
      descEs:
        "Los usuarios todavía tienen trabajos que hacer. La pregunta no es '¿cómo le añadimos IA a esto?' — es '¿dónde elimina la IA la fricción del trabajo real?' La mayoría de las funciones de IA que he visto responden la primera pregunta, no la segunda.",
    },
    {
      number: "02",
      titleEn: "Confidence calibration is the new microcopy",
      titleEs: "La calibración de confianza es el nuevo microcopy",
      descEn:
        "When a model is uncertain, the UI must communicate that. A hallucinated answer with a confident UI is a design failure — not an AI failure. The designer owns how uncertainty gets surfaced.",
      descEs:
        "Cuando un modelo está inseguro, la UI debe comunicarlo. Una respuesta alucinada con una UI confiada es un fallo de diseño, no de IA. El diseñador es responsable de cómo se muestra la incertidumbre.",
    },
    {
      number: "03",
      titleEn: "Human override is not optional",
      titleEs: "La intervención humana no es opcional",
      descEn:
        "Every AI-generated action needs a fast, obvious path back to human control. Not buried in settings. Not a three-click flow. One clear action, always visible. This isn't just UX best practice — it's ethical design.",
      descEs:
        "Toda acción generada por IA necesita un camino rápido y obvio de regreso al control humano. No enterrado en configuración. No un flujo de tres clics. Una acción clara, siempre visible. No es solo buena práctica de UX — es diseño ético.",
    },
    {
      number: "04",
      titleEn: "Latency is a design material",
      titleEs: "La latencia es un material de diseño",
      descEn:
        "AI is slow. That's not a bug to hide — it's a constraint to design around. Streaming, optimistic UI, skeleton states, progressive disclosure — these aren't loading tricks, they're how you make 2 seconds feel like 0.5.",
      descEs:
        "La IA es lenta. No es un bug que esconder — es una restricción para diseñar. Streaming, UI optimista, skeleton states, divulgación progresiva — no son trucos de carga, son cómo hacer que 2 segundos se sientan como 0.5.",
    },
    {
      number: "05",
      titleEn: "The prompt is the new form",
      titleEs: "El prompt es el nuevo formulario",
      descEn:
        "Natural language inputs have worse discoverability than forms. Users don't know what's possible if there's just a blinking cursor. Designing the prompt surface — examples, suggestions, constraints — is now core UX work.",
      descEs:
        "Los inputs de lenguaje natural tienen peor descubribilidad que los formularios. Los usuarios no saben qué es posible si solo hay un cursor parpadeante. Diseñar la superficie del prompt — ejemplos, sugerencias, restricciones — es ahora trabajo central de UX.",
    },
  ];

  const projects = [
    {
      titleEn: "AI-assisted design critique",
      titleEs: "Crítica de diseño asistida por IA",
      descEn: "Internal tool at Uxearch that runs a structured heuristic review on Figma frames before client reviews. Cuts review prep time by ~70%.",
      descEs: "Herramienta interna en Uxearch que ejecuta una revisión heurística estructurada en frames de Figma antes de las revisiones con clientes. Reduce el tiempo de preparación ~70%.",
      status: "Internal tool",
    },
    {
      titleEn: "Conversational onboarding for KOLO",
      titleEs: "Onboarding conversacional para KOLO",
      descEn: "Replaced a 14-step setup wizard with a conversational flow powered by a fine-tuned model. Drop-off at onboarding: −58%.",
      descEs: "Reemplazamos un wizard de 14 pasos con un flujo conversacional impulsado por un modelo fine-tuned. Abandono en onboarding: −58%.",
      status: "Shipped",
    },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
      <motion.div variants={item} className="flex items-center gap-2 mb-3">
        <p className="section-label">
          {lang === "en" ? "My perspective" : "Mi perspectiva"}
        </p>
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB]">NEW</span>
      </motion.div>

      <motion.h1
        variants={item}
        className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-4"
      >
        {lang === "en"
          ? "AI doesn't design.\nIt changes what designers must know."
          : "La IA no diseña.\nCambia lo que los diseñadores deben saber."}
      </motion.h1>

      <motion.p variants={item} className="text-[#52525B] text-base leading-relaxed mb-10">
        {lang === "en"
          ? "I've been building and designing AI-powered products since 2022. These are the design principles I've developed — some from wins, most from failures."
          : "Llevo construyendo y diseñando productos con IA desde 2022. Estos son los principios de diseño que he desarrollado — algunos de victorias, la mayoría de fracasos."}
      </motion.p>

      {/* Principles */}
      <div className="space-y-0 mb-12">
        {principles.map((p, i) => (
          <motion.div
            key={p.number}
            variants={item}
            className={`flex gap-5 py-6 ${i < principles.length - 1 ? "border-b border-[#E4E4E7]" : ""}`}
          >
            <span className="text-[11px] font-mono text-[#A1A1AA] flex-shrink-0 mt-0.5 tabular-nums">
              {p.number}
            </span>
            <div>
              <h3 className="text-[#0A0A0A] font-semibold text-sm mb-2">
                {lang === "en" ? p.titleEn : p.titleEs}
              </h3>
              <p className="text-[#52525B] text-sm leading-[1.65]">
                {lang === "en" ? p.descEn : p.descEs}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <hr className="divider" />

      {/* Projects */}
      <motion.div variants={item}>
        <p className="section-label mb-4">
          {lang === "en" ? "AI projects I've shipped" : "Proyectos de IA que he lanzado"}
        </p>
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.titleEn} className="p-4 rounded-xl border border-[#E4E4E7] bg-white">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-[#0A0A0A] font-medium text-sm">
                  {lang === "en" ? p.titleEn : p.titleEs}
                </h3>
                <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#15803D]">
                  {p.status}
                </span>
              </div>
              <p className="text-[#52525B] text-sm leading-[1.6]">
                {lang === "en" ? p.descEn : p.descEs}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
