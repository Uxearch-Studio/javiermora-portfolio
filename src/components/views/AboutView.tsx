"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutView() {
  const { lang } = useLang();

  const bio = lang === "en"
    ? [
        "I'm a product designer who started coding interactive experiences before 'UX' was a job title in Colombia. At ICESI University I studied interaction design and graduated convinced that the best interface is the one that gets out of the way.",
        "Three years at HUGE Inc. on the Google team taught me that scale breaks everything you don't document. I built design systems that served hundreds of engineers — and learned that the hardest design problem isn't the button, it's the decision behind the button.",
        "Since co-founding Uxearch Studio I've led UX for startups in Web3, fintech, and AI. Most of them had more ambition than budget. That constraint made me a better designer.",
        "I'm not precious about tools. I'm precise about outcomes.",
      ]
    : [
        "Soy un diseñador de producto que empezó a programar experiencias interactivas antes de que 'UX' fuera un título de trabajo en Colombia. En la Universidad ICESI estudié diseño de interacción y me gradué convencido de que la mejor interfaz es la que se quita del camino.",
        "Tres años en HUGE Inc. en el equipo de Google me enseñaron que la escala rompe todo lo que no documentas. Construí sistemas de diseño que servían a cientos de ingenieros — y aprendí que el problema de diseño más difícil no es el botón, sino la decisión detrás del botón.",
        "Desde que cofundé Uxearch Studio he liderado UX para startups de Web3, fintech e IA. La mayoría tenía más ambición que presupuesto. Esa restricción me hizo mejor diseñador.",
        "No soy precioso con las herramientas. Soy preciso con los resultados.",
      ];

  const opinions = [
    {
      en: "High-fidelity prototypes in early discovery are wasted money.",
      es: "Los prototipos de alta fidelidad en descubrimiento temprano son dinero tirado.",
    },
    {
      en: "Most design systems fail because they're built for designers, not engineers.",
      es: "La mayoría de design systems fallan porque se construyen para diseñadores, no para ingenieros.",
    },
    {
      en: "The best UX research insight I've ever gotten came from a 20-minute hallway conversation.",
      es: "El mejor insight de investigación UX que he tenido vino de una conversación de 20 minutos en el pasillo.",
    },
    {
      en: "AI won't replace product designers. It will replace product designers who don't know how to use AI.",
      es: "La IA no va a reemplazar a los diseñadores de producto. Va a reemplazar a los que no saben cómo usarla.",
    },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
      <motion.p variants={item} className="section-label mb-3">
        {lang === "en" ? "Who I am" : "Quién soy"}
      </motion.p>

      <motion.h1
        variants={item}
        className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-8"
      >
        {lang === "en" ? "Javier Mora." : "Javier Mora."}
      </motion.h1>

      {/* Photo placeholder */}
      <motion.div
        variants={item}
        className="w-full aspect-[16/7] rounded-2xl bg-[#F4F4F5] border border-[#E4E4E7] mb-8 flex items-center justify-center overflow-hidden"
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#0A0A0A] mx-auto mb-2 flex items-center justify-center text-white text-xl font-bold">
            JM
          </div>
          <p className="text-[#A1A1AA] text-sm">
            {lang === "en" ? "Photo coming soon" : "Foto próximamente"}
          </p>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.div variants={item} className="space-y-4 mb-10">
        {bio.map((p, i) => (
          <p key={i} className="text-[#52525B] text-base leading-[1.7]">{p}</p>
        ))}
      </motion.div>

      <hr className="divider" />

      {/* Opinions */}
      <motion.div variants={item}>
        <p className="section-label mb-4">
          {lang === "en" ? "Opinions I'll defend" : "Opiniones que defiendo"}
        </p>
        <ul className="space-y-0">
          {opinions.map((o, i) => (
            <li
              key={i}
              className={`py-4 flex gap-4 items-start ${i < opinions.length - 1 ? "border-b border-[#E4E4E7]" : ""}`}
            >
              <span className="text-[#2563EB] font-mono text-xs mt-1 flex-shrink-0">—</span>
              <p className="text-[#0A0A0A] text-sm leading-[1.65]">
                {lang === "en" ? o.en : o.es}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
