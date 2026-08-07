"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProcessView() {
  const { lang } = useLang();

  const steps = [
    {
      number: "01",
      titleEn: "Frame the problem",
      titleEs: "Enmarcar el problema",
      descEn:
        "Before any wireframe: write a single sentence that names who has the problem, what they're trying to do, and what's in the way. If the team can't agree on that sentence, no design will fix it.",
      descEs:
        "Antes de cualquier wireframe: escribir una sola frase que nombre quién tiene el problema, qué intenta hacer y qué se lo impide. Si el equipo no puede acordar esa frase, ningún diseño lo va a resolver.",
    },
    {
      number: "02",
      titleEn: "Research with constraints",
      titleEs: "Investigar con restricciones",
      descEn:
        "I don't wait for a full research budget. 5 user interviews beat 500 survey responses. I find the fastest way to talk to real people and turn what I hear into design principles — not personas.",
      descEs:
        "No espero presupuesto completo de investigación. 5 entrevistas de usuario superan a 500 respuestas de encuesta. Encuentro la forma más rápida de hablar con personas reales y convierto lo que escucho en principios de diseño, no en personas.",
    },
    {
      number: "03",
      titleEn: "One guiding idea",
      titleEs: "Una idea rectora",
      descEn:
        "Every project needs a thesis: the single decision that organizes everything else. 'The work is the hero — the interface disappears.' Once it's named, every detail has something to check against.",
      descEs:
        "Cada proyecto necesita una tesis: la única decisión que organiza todo lo demás. 'El trabajo es el héroe — la interfaz desaparece.' Una vez nombrada, cada detalle tiene algo contra qué verificarse.",
    },
    {
      number: "04",
      titleEn: "Hierarchy before style",
      titleEs: "Jerarquía antes que estilo",
      descEn:
        "I design in grayscale first. If the layout doesn't work without color, color won't save it. Once hierarchy is solid, style is fast — it's applying a coat of paint to a structure that already works.",
      descEs:
        "Diseño primero en escala de grises. Si el layout no funciona sin color, el color no lo va a salvar. Una vez que la jerarquía es sólida, el estilo es rápido — es aplicar una capa de pintura a una estructura que ya funciona.",
    },
    {
      number: "05",
      titleEn: "Test early, fail cheap",
      titleEs: "Probar pronto, fallar barato",
      descEn:
        "I show rough work fast. A sketch on paper tested with 3 people is more valuable than a polished Figma prototype tested with nobody. Feedback is the fastest design tool I have.",
      descEs:
        "Muestro trabajo rough rápido. Un boceto en papel probado con 3 personas vale más que un prototipo pulido en Figma probado con nadie. El feedback es la herramienta de diseño más rápida que tengo.",
    },
    {
      number: "06",
      titleEn: "Ship, then sharpen",
      titleEs: "Lanzar, luego afinar",
      descEn:
        "Perfect is the enemy of shipped. I aim for the smallest version that tests the core hypothesis. Then I use real usage data — not opinions — to decide what to improve next.",
      descEs:
        "Lo perfecto es el enemigo de lo lanzado. Apunto a la versión más pequeña que pruebe la hipótesis central. Luego uso datos de uso real — no opiniones — para decidir qué mejorar después.",
    },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
      <motion.p variants={item} className="section-label mb-3">
        {lang === "en" ? "How I work" : "Cómo trabajo"}
      </motion.p>

      <motion.h1
        variants={item}
        className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-4"
      >
        {lang === "en"
          ? "Design is problem solving.\nNot decoration."
          : "El diseño es resolver problemas.\nNo decorar."}
      </motion.h1>

      <motion.p variants={item} className="text-[#52525B] text-base leading-relaxed mb-10">
        {lang === "en"
          ? "My process isn't a checklist — it's how I think. These six moves work for a 2-week sprint or a 12-month product."
          : "Mi proceso no es un checklist — es cómo pienso. Estos seis pasos funcionan tanto para un sprint de 2 semanas como para un producto de 12 meses."}
      </motion.p>

      <div className="space-y-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            variants={item}
            className={`flex gap-6 py-6 ${i < steps.length - 1 ? "border-b border-[#E4E4E7]" : ""}`}
          >
            <div className="flex-shrink-0 w-8">
              <span className="text-[11px] font-semibold text-[#A1A1AA] tabular-nums font-mono">
                {step.number}
              </span>
            </div>
            <div>
              <h3 className="text-[#0A0A0A] font-semibold text-base mb-2">
                {lang === "en" ? step.titleEn : step.titleEs}
              </h3>
              <p className="text-[#52525B] text-sm leading-[1.65]">
                {lang === "en" ? step.descEn : step.descEs}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
