"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";

// ── Types ──────────────────────────────────────────────────
type RoleKey = "hiring-manager" | "founder" | "entrepreneur" | "recruiter" | "designer" | "other";
type PurposeKey = "job-offer" | "freelance" | "speaking" | "mentorship" | "connect";

interface Role {
  id: RoleKey;
  labelEn: string;
  labelEs: string;
  icon: string;
}

interface Purpose {
  id: PurposeKey;
  labelEn: string;
  labelEs: string;
  subjectEn: string;
  subjectEs: string;
  bodyEn: string;
  bodyEs: string;
}

const ROLES: Role[] = [
  { id: "hiring-manager", labelEn: "Hiring Manager",  labelEs: "Hiring Manager",  icon: "💼" },
  { id: "founder",        labelEn: "Founder",          labelEs: "Founder",          icon: "🚀" },
  { id: "entrepreneur",   labelEn: "Entrepreneur",     labelEs: "Emprendedor",      icon: "⚡" },
  { id: "recruiter",      labelEn: "Recruiter",        labelEs: "Reclutador",       icon: "🔍" },
  { id: "designer",       labelEn: "Designer",         labelEs: "Diseñador",        icon: "✏️" },
  { id: "other",          labelEn: "Other",            labelEs: "Otro",             icon: "👋" },
];

const PURPOSES: Purpose[] = [
  {
    id: "job-offer",
    labelEn: "Full-time Role",        labelEs: "Rol Full-time",
    subjectEn: "Full-time opportunity for Javier Mora",
    subjectEs: "Oportunidad full-time para Javier Mora",
    bodyEn: "I'd like to discuss a full-time position with you.",
    bodyEs: "Me gustaría hablar sobre una posición full-time contigo.",
  },
  {
    id: "freelance",
    labelEn: "Freelance / Project",   labelEs: "Freelance / Proyecto",
    subjectEn: "Freelance project for Javier Mora",
    subjectEs: "Proyecto freelance para Javier Mora",
    bodyEn: "I have a project I'd love to collaborate with you on.",
    bodyEs: "Tengo un proyecto en el que me encantaría colaborar contigo.",
  },
  {
    id: "speaking",
    labelEn: "Speaking / Conference", labelEs: "Conferencia / Speaker",
    subjectEn: "Speaking invitation for Javier Mora",
    subjectEs: "Invitación a conferencia para Javier Mora",
    bodyEn: "I'd like to invite you to speak at an event.",
    bodyEs: "Me gustaría invitarte a hablar en un evento.",
  },
  {
    id: "mentorship",
    labelEn: "Mentorship",            labelEs: "Mentoría",
    subjectEn: "Mentorship request — Javier Mora",
    subjectEs: "Solicitud de mentoría — Javier Mora",
    bodyEn: "I'm looking for mentorship guidance from you.",
    bodyEs: "Estoy buscando orientación y mentoría de tu parte.",
  },
  {
    id: "connect",
    labelEn: "Just connecting",       labelEs: "Solo conectar",
    subjectEn: "Hi Javier!",
    subjectEs: "¡Hola Javier!",
    bodyEn: "I came across your portfolio and wanted to say hi.",
    bodyEs: "Vi tu portafolio y quería saludarte.",
  },
];

const SOCIALS = [
  {
    labelEn: "LinkedIn",
    labelEs: "LinkedIn",
    handle: "javiermoradesign",
    href: "https://linkedin.com/in/javiermoradesign",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    labelEn: "Behance",
    labelEs: "Behance",
    handle: "javiermora",
    href: "https://behance.net/javiermora",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.767-.63.17-1.28.254-1.95.254H0V4.503h6.938zm-.34 5.338c.585 0 1.068-.14 1.45-.425.38-.28.57-.73.57-1.36 0-.34-.06-.625-.18-.855-.12-.23-.29-.415-.5-.56-.21-.145-.45-.246-.72-.3-.27-.057-.56-.085-.87-.085H3.6v3.585h2.998zm.157 5.554c.344 0 .67-.037.983-.108.31-.073.585-.19.822-.36.235-.17.423-.397.56-.68.136-.28.205-.635.205-1.05 0-.84-.237-1.44-.71-1.8-.47-.36-1.1-.54-1.89-.54H3.6v4.54h3.155zm9.75-1.037c.38.37.927.554 1.64.554.51 0 .95-.127 1.32-.382.37-.254.595-.527.675-.818h2.55c-.408 1.254-1.034 2.15-1.876 2.69-.84.54-1.856.81-3.047.81-.828 0-1.573-.13-2.237-.4-.665-.27-1.23-.65-1.696-1.145-.464-.493-.82-1.09-1.066-1.783-.248-.69-.372-1.456-.372-2.294 0-.814.127-1.568.382-2.26.255-.694.618-1.29 1.088-1.79.47-.5 1.03-.89 1.685-1.17.655-.28 1.386-.42 2.19-.42.896 0 1.682.172 2.36.517.677.345 1.24.815 1.686 1.41.447.596.77 1.28.967 2.053.196.77.277 1.59.24 2.453h-7.6c.04.85.292 1.472.67 1.842zm2.86-5.06c-.305-.334-.78-.502-1.426-.502-.404 0-.74.068-1.01.206-.27.138-.49.307-.658.512-.17.205-.29.423-.36.657-.07.233-.113.453-.127.657h4.193c-.086-.72-.306-1.196-.61-1.53zm-4.24-5.43h5.184v1.3h-5.185v-1.3z"/>
      </svg>
    ),
  },
  {
    labelEn: "Medium",
    labelEs: "Medium",
    handle: "@javiermora",
    href: "https://medium.com/@javiermora",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const chipVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactView() {
  const { lang } = useLang();
  const [role, setRole] = useState<RoleKey | null>(null);
  const [purpose, setPurpose] = useState<PurposeKey | null>(null);

  const selectedRole    = ROLES.find((r) => r.id === role);
  const selectedPurpose = PURPOSES.find((p) => p.id === purpose);

  const mailtoHref = (() => {
    if (!selectedRole || !selectedPurpose) return "mailto:hello@javiermora.co";
    const subject = encodeURIComponent(
      lang === "en" ? selectedPurpose.subjectEn : selectedPurpose.subjectEs
    );
    const body = encodeURIComponent(
      lang === "en"
        ? `Hi Javier,\n\nI'm a ${selectedRole.labelEn} and ${selectedPurpose.bodyEn}\n\n[Your name & company]`
        : `Hola Javier,\n\nSoy ${selectedRole.labelEs} y ${selectedPurpose.bodyEs}\n\n[Tu nombre y empresa]`
    );
    return `mailto:hello@javiermora.co?subject=${subject}&body=${body}`;
  })();

  const composedMsg = (() => {
    if (!selectedRole) return null;
    if (!selectedPurpose) {
      return lang === "en"
        ? `Hi Javier! I'm a ${selectedRole.labelEn}…`
        : `¡Hola Javier! Soy ${selectedRole.labelEs}…`;
    }
    return lang === "en"
      ? `Hi Javier! I'm a ${selectedRole.labelEn} and ${selectedPurpose.bodyEn}`
      : `¡Hola Javier! Soy ${selectedRole.labelEs} y ${selectedPurpose.bodyEs}`;
  })();

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-full">

      {/* ── Left: Interactive selector ── */}
      <div className="flex-1 min-w-0">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="section-label mb-3"
        >
          {lang === "en" ? "Get in touch" : "Contacto"}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
          className="text-2xl sm:text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] mb-2"
        >
          {lang === "en" ? "Let's make it personal." : "Hagámoslo personal."}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[#71717A] text-[14px] leading-relaxed mb-7"
        >
          {lang === "en"
            ? "Tell me who you are and why you're reaching out — I'll prepare a message for you."
            : "Cuéntame quién eres y por qué escribes — preparo un mensaje para ti."}
        </motion.p>

        {/* Step 1: Role */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA] mb-3">
            {lang === "en" ? "Who are you?" : "¿Quién eres?"}
          </p>
          <motion.div className="flex flex-wrap gap-2" variants={stagger} initial="hidden" animate="show">
            {ROLES.map((r) => (
              <motion.button
                key={r.id}
                variants={chipVariant}
                onClick={() => { setRole(r.id === role ? null : r.id); setPurpose(null); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-150 border
                  ${role === r.id
                    ? "bg-[#0A0A0A] text-white border-transparent shadow-sm"
                    : "bg-white text-[#3F3F46] border-[#E4E4E7] hover:border-[#A1A1AA] hover:bg-[#FAFAFA]"
                  }`}
              >
                <span className="text-[13px] leading-none">{r.icon}</span>
                <span>{lang === "en" ? r.labelEn : r.labelEs}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Step 2: Purpose — only after role selected */}
        <AnimatePresence>
          {role && (
            <motion.div
              key="purposes"
              variants={fadeUp} initial="hidden" animate="show" exit="exit"
              className="mb-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA] mb-3">
                {lang === "en" ? "What brings you here?" : "¿Qué te trae aquí?"}
              </p>
              <motion.div className="flex flex-wrap gap-2" variants={stagger} initial="hidden" animate="show">
                {PURPOSES.map((p) => (
                  <motion.button
                    key={p.id}
                    variants={chipVariant}
                    onClick={() => setPurpose(p.id === purpose ? null : p.id)}
                    className={`flex items-center px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-150 border
                      ${purpose === p.id
                        ? "bg-[#0A0A0A] text-white border-transparent shadow-sm"
                        : "bg-white text-[#3F3F46] border-[#E4E4E7] hover:border-[#A1A1AA] hover:bg-[#FAFAFA]"
                      }`}
                  >
                    {lang === "en" ? p.labelEn : p.labelEs}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Composed message card */}
        <AnimatePresence>
          {composedMsg && (
            <motion.div
              key="message-card"
              variants={fadeUp} initial="hidden" animate="show" exit="exit"
              className="rounded-xl border border-[#E4E4E7] bg-white p-5 mb-2"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#F4F4F5] flex items-center justify-center shrink-0 text-[14px]">
                  {selectedRole?.icon ?? "👋"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#0A0A0A] leading-relaxed">
                    {composedMsg}
                  </p>
                  {!selectedPurpose && (
                    <p className="text-[12px] text-[#A1A1AA] mt-1">
                      {lang === "en" ? "Select a reason above to complete your message." : "Selecciona un motivo para completar tu mensaje."}
                    </p>
                  )}
                </div>
              </div>

              {selectedPurpose && (
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white text-[13px] font-semibold rounded-lg transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
                    <rect x="1.5" y="3.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M1.5 5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  {lang === "en" ? "Send message" : "Enviar mensaje"}
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback email when no selection */}
        {!composedMsg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            <a
              href="mailto:hello@javiermora.co"
              className="inline-flex items-center gap-2 text-[13px] text-[#A1A1AA] hover:text-[#0A0A0A] transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
                <rect x="1.5" y="3.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M1.5 5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              hello@javiermora.co
            </a>
          </motion.div>
        )}
      </div>

      {/* ── Right: Social links + info ── */}
      <div className="lg:w-[280px] shrink-0 flex flex-col gap-5">

        {/* LinkedIn featured */}
        <motion.a
          href="https://linkedin.com/in/javiermoradesign"
          target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-3 p-4 rounded-xl border border-[#E4E4E7] bg-white hover:border-[#0A66C2]/30 hover:bg-[#F0F8FF] transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white shrink-0">
            {SOCIALS[0].icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[#0A0A0A] group-hover:text-[#0A66C2] transition-colors">LinkedIn</p>
            <p className="text-[11px] text-[#A1A1AA] truncate">in/javiermoradesign</p>
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#A1A1AA] group-hover:text-[#0A66C2] shrink-0 transition-colors">
            <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>

        {/* Other socials */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-xl border border-[#E4E4E7] bg-white divide-y divide-[#F4F4F5]"
        >
          {SOCIALS.slice(1).map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors group"
            >
              <span className="text-[#71717A] group-hover:text-[#0A0A0A] transition-colors">{s.icon}</span>
              <span className="text-[13px] text-[#3F3F46] group-hover:text-[#0A0A0A] transition-colors flex-1">{s.labelEn}</span>
              <span className="text-[11px] text-[#A1A1AA] truncate hidden sm:block">{s.handle}</span>
            </a>
          ))}
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-xl border border-[#E4E4E7] bg-white p-4 space-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="text-[12px] font-medium text-[#15803D]">
              {lang === "en" ? "Open to opportunities" : "Disponible"}
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[12px] text-[#71717A]">
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none" className="shrink-0">
                <path d="M7.5 1C5.015 1 3 3.015 3 5.5c0 3.5 4.5 8.5 4.5 8.5S12 9 12 5.5C12 3.015 9.985 1 7.5 1z" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="7.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              {lang === "en" ? "Bogotá, Colombia · Remote" : "Bogotá, Colombia · Remoto"}
            </div>
            <div className="flex items-center gap-2 text-[12px] text-[#71717A]">
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none" className="shrink-0">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7.5 4.5v3.25l2 1.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {lang === "en" ? "Responds within 24h" : "Responde en menos de 24h"}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
