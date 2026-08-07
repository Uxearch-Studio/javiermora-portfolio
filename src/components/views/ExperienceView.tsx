"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const jobs = [
  {
    company: "Uxearch Studio",
    roleEn: "Co-founder · Lead UX Designer",
    roleEs: "Co-fundador · Lead UX Designer",
    period: "2022 — Present",
    periodEs: "2022 — Presente",
    locationEn: "Miami, FL",
    locationEs: "Miami, FL",
    descEn:
      "Co-founded a UX studio focused on Web3, fintech, and AI products. Led design for 10+ startups from zero to launch. Built client relationships in Miami and LATAM.",
    descEs:
      "Co-fundé un estudio UX enfocado en Web3, fintech e IA. Lideré el diseño de 10+ startups desde cero hasta el lanzamiento. Construí relaciones con clientes en Miami y LATAM.",
    tags: ["UX Strategy", "Design Systems", "Leadership", "Web3", "Fintech"],
  },
  {
    company: "HUGE Inc.",
    roleEn: "Senior UX Designer · Google Team",
    roleEs: "Senior UX Designer · Equipo Google",
    period: "2020 — 2022",
    periodEs: "2020 — 2022",
    locationEn: "New York, NY",
    locationEs: "Nueva York, NY",
    descEn:
      "Embedded on the Google team at HUGE. Built and maintained large-scale design systems, collaborating daily with engineering across multiple Google product lines. Sharpened expertise in component architecture and cross-functional communication.",
    descEs:
      "Integrado en el equipo de Google en HUGE. Construí y mantuve sistemas de diseño a gran escala, colaborando diariamente con ingeniería en múltiples líneas de productos de Google. Afiné la experiencia en arquitectura de componentes y comunicación transversal.",
    tags: ["Design Systems", "Google Products", "Engineering Collaboration", "Figma"],
  },
  {
    company: "Freelance",
    roleEn: "UX/UI Designer",
    roleEs: "Diseñador UX/UI",
    period: "2018 — 2020",
    periodEs: "2018 — 2020",
    locationEn: "Colombia · Remote",
    locationEs: "Colombia · Remoto",
    descEn:
      "Designed mobile apps, dashboards, and brand identities for startups and agencies across LATAM. First exposure to fast-moving product cycles and the realities of limited research budgets.",
    descEs:
      "Diseñé apps móviles, dashboards e identidades de marca para startups y agencias en LATAM. Primera exposición a ciclos de producto acelerados y a la realidad de los presupuestos de investigación limitados.",
    tags: ["Mobile Design", "Branding", "Startups", "LATAM"],
  },
];

const skills = [
  { name: "Figma", levelEn: "Expert", levelEs: "Experto" },
  { name: "Framer", levelEn: "Proficient", levelEs: "Avanzado" },
  { name: "React / Next.js", levelEn: "Proficient", levelEs: "Avanzado" },
  { name: "ProtoPie", levelEn: "Proficient", levelEs: "Avanzado" },
  { name: "User Research", levelEn: "Expert", levelEs: "Experto" },
  { name: "Design Systems", levelEn: "Expert", levelEs: "Experto" },
  { name: "Webflow", levelEn: "Proficient", levelEs: "Avanzado" },
  { name: "Firebase", levelEn: "Working", levelEs: "Funcional" },
];

export default function ExperienceView() {
  const { lang } = useLang();

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
      <motion.p variants={item} className="section-label mb-3">
        {lang === "en" ? "Where I've worked" : "Dónde he trabajado"}
      </motion.p>

      <motion.h1
        variants={item}
        className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-10"
      >
        {lang === "en" ? "8 years, 3 chapters." : "8 años, 3 capítulos."}
      </motion.h1>

      {/* Jobs */}
      <div className="space-y-0 mb-12">
        {jobs.map((job, i) => (
          <motion.div
            key={job.company}
            variants={item}
            className={`py-7 ${i < jobs.length - 1 ? "border-b border-[#E4E4E7]" : ""}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
              <div>
                <h2 className="text-[#0A0A0A] font-semibold text-lg">{job.company}</h2>
                <p className="text-[#2563EB] text-sm font-medium">
                  {lang === "en" ? job.roleEn : job.roleEs}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[#A1A1AA] text-xs font-mono">{lang === "en" ? job.period : job.periodEs}</p>
                <p className="text-[#A1A1AA] text-xs">{lang === "en" ? job.locationEn : job.locationEs}</p>
              </div>
            </div>

            <p className="text-[#52525B] text-sm leading-[1.65] mb-4">
              {lang === "en" ? job.descEn : job.descEs}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {job.tags.map((t) => (
                <span key={t} className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-[#F4F4F5] text-[#52525B]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <hr className="divider" />

      {/* Skills table */}
      <motion.div variants={item}>
        <p className="section-label mb-4">{lang === "en" ? "Skills" : "Habilidades"}</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-0">
          {skills.map((s, i) => (
            <div
              key={s.name}
              className={`flex items-center justify-between py-2.5 ${
                i < skills.length - 2 || (skills.length % 2 === 0 && i < skills.length - 2)
                  ? "border-b border-[#E4E4E7]"
                  : ""
              }`}
            >
              <span className="text-[#0A0A0A] text-sm">{s.name}</span>
              <span className="text-[#A1A1AA] text-xs">{lang === "en" ? s.levelEn : s.levelEs}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
