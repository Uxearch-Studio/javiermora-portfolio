"use client";
import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";

const STOP_W = 260;

// ── Física de caminata: el suelo y los pies se mueven a la MISMA velocidad ──
// Loop de 9 frames = 2 pasos ≈ 68px de avance (figura de 93px).
const WALK_SPEED = 76;   // px/s — cadencia ligera (~2.2 pasos/s)
const STRIDE = 68;       // px que avanza un loop completo (9 frames)
const MAX_TRAVEL = 4;    // s — tope de duración en saltos largos

type MType = "education" | "work" | "startup" | "freelance" | "gap" | "current" | "next";

interface MS {
  index: number;
  year: string;
  en: string; es: string;
  place: string;
  org: string;
  roleEn: string; roleEs: string;
  industry: string;
  descEn: string; descEs: string;
  type: MType;
  logoBg: string; logoColor: string; logoText: string;
}

const milestones: MS[] = [
  { index: 0,  year: "2010 – 2017",       en: "ICESI University",    es: "Universidad ICESI",   place: "Cali, Colombia",          org: "ICESI",        roleEn: "Diseño de Medios Interactivos", roleEs: "Diseño de Medios Interactivos", industry: "Education · Design",          descEn: "Interactive Media Design degree. The foundation — from visual theory to first real digital products.", descEs: "Carrera de Diseño de Medios Interactivos. La base — desde teoría visual hasta los primeros productos digitales.", type: "education", logoBg: "#7C3AED", logoColor: "#FFF", logoText: "IC" },
  { index: 1,  year: "2014",              en: "English Course",      es: "Curso de Inglés",     place: "Fort Lauderdale, FL",     org: "",             roleEn: "Language Student",              roleEs: "Estudiante de Idiomas",         industry: "Language · Education",        descEn: "Language immersion in the US. First time living outside Colombia.", descEs: "Inmersión de idiomas en EEUU. Primera vez viviendo fuera de Colombia.", type: "education", logoBg: "#4F46E5", logoColor: "#FFF", logoText: "EN" },
  { index: 2,  year: "2018 · 8 months",  en: "Teazit — Internship", es: "Teazit — Pasantía",   place: "France",                  org: "Teazit",       roleEn: "UX/UI Intern",                  roleEs: "Pasante UX/UI",                industry: "Startup · B2C",               descEn: "8-month internship in France. First UX role in a real product team abroad.", descEs: "Pasantía de 8 meses en Francia. Primer rol UX en equipo de producto real en el exterior.", type: "startup", logoBg: "#0891B2", logoColor: "#FFF", logoText: "TZ" },
  { index: 3,  year: "2018 – 2020",       en: "Cousine POS",         es: "Cousine POS",         place: "Cairo, Egypt (Remote)",   org: "Cousine",      roleEn: "UX/UI Designer",                roleEs: "Diseñador UX/UI",              industry: "POS · Restaurant Tech",       descEn: "First full-time UX job. Remote + 16 months on-site in Cairo. Designed a POS system for restaurants.", descEs: "Primer trabajo UX de tiempo completo. Remoto + 16 meses en El Cairo. Diseñé un POS para restaurantes.", type: "startup", logoBg: "#EA580C", logoColor: "#FFF", logoText: "CO" },
  { index: 4,  year: "2020 – 2022",       en: "Randlabs",            es: "Randlabs",            place: "Remote",                  org: "Randlabs",     roleEn: "UX/UI Designer",                roleEs: "Diseñador UX/UI",              industry: "Blockchain · Algorand",       descEn: "Took four blockchain products from ideation to market: block explorers, digital wallets, and DeFi tooling.", descEs: "Llevé cuatro productos blockchain de la ideación al mercado: exploradores, billeteras digitales y herramientas DeFi.", type: "startup", logoBg: "#1D4ED8", logoColor: "#FFF", logoText: "RL" },
  { index: 5,  year: "2022 · 4 months",  en: "Point Network",       es: "Point Network",       place: "Remote",                  org: "Point Network", roleEn: "Product Designer",              roleEs: "Diseñador de Producto",        industry: "Web3 · Solana · Browser",    descEn: "Designed a Web3 browser — wallet, dApp navigation, decentralized identity in one product. MVP shipped. Company went bankrupt.", descEs: "Diseñé un navegador Web3 — billetera, dApp e identidad descentralizada. MVP entregado. La empresa quebró.", type: "startup", logoBg: "#111827", logoColor: "#FFF", logoText: "PT" },
  { index: 6,  year: "2022 – 2023",       en: "Freelancer",          es: "Freelancer",          place: "Remote",                  org: "Independent",  roleEn: "UX/UI Designer",                roleEs: "Diseñador UX/UI",              industry: "Web3 · Blockchain",           descEn: "Supporting blockchain startups independently. Built my own client network.", descEs: "Apoyando startups blockchain de forma independiente. Construí mi propia red de clientes.", type: "freelance", logoBg: "#0D9488", logoColor: "#FFF", logoText: "FL" },
  { index: 7,  year: "2023 · 8 months",  en: "Career Break",        es: "Pausa profesional",         place: "—",                       org: "—",            roleEn: "Resting · Learning",            roleEs: "Descansando · Aprendiendo",    industry: "Career Break",                descEn: "Eight months off. Studying new tools, AI design, and recharging.", descEs: "Ocho meses fuera. Estudiando nuevas herramientas, diseño IA y recargando energías.", type: "gap", logoBg: "#F3F4F6", logoColor: "#6B7280", logoText: "···" },
  { index: 8,  year: "Nov 2023 – Feb 2025", en: "HUGE Agency",      es: "HUGE Agency",         place: "New York",                org: "HUGE Inc.",    roleEn: "Design Systems UI",             roleEs: "Design Systems UI",            industry: "Google · Design Systems",    descEn: "Built components and design libraries alongside Google designers. Bard (now Gemini) Design System. Shipped patterns at agency scale.", descEs: "Construí componentes y bibliotecas de diseño junto al equipo de Google. Sistema de diseño Bard (Gemini). Patrones a escala de agencia.", type: "work", logoBg: "#EC4899", logoColor: "#FFF", logoText: "Hu" },
  { index: 9,  year: "2024 · 1 month",   en: "Chameleon Wallet",    es: "Chameleon Wallet",    place: "UK (Remote)",             org: "Chameleon",    roleEn: "UI Designer",                   roleEs: "Diseñador UI",                 industry: "Crypto · Wallet · DeFi",     descEn: "Full redesign of a crypto wallet. Fast turnaround, high fidelity.", descEs: "Rediseño completo de una billetera crypto. Entrega rápida, alta fidelidad.", type: "freelance", logoBg: "#0F766E", logoColor: "#FFF", logoText: "CH" },
  { index: 10, year: "2024 · 1 month",   en: "Props Platform",      es: "Props Platform",      place: "Singapore (Remote)",      org: "Props",        roleEn: "Product Designer",              roleEs: "Diseñador de Producto",        industry: "Blockchain · Sports Betting", descEn: "Blockchain sports betting MVP — design and frontend for a Singapore startup.", descEs: "MVP de apuestas deportivas blockchain — diseño y frontend para startup de Singapur.", type: "startup", logoBg: "#15803D", logoColor: "#FFF", logoText: "PR" },
  { index: 11, year: "2025 · 4 months",  en: "Tweet MVP",           es: "Tweet MVP",           place: "Netherlands (Remote)",    org: "Tweet",        roleEn: "Product Designer",              roleEs: "Diseñador de Producto",        industry: "Blockchain · Social",         descEn: "Built a social crypto MVP from scratch for a Dutch startup.", descEs: "Construí un MVP crypto social desde cero para una startup neerlandesa.", type: "startup", logoBg: "#1C1917", logoColor: "#FFF", logoText: "TW" },
  { index: 12, year: "2025 · 2 months",  en: "AI Startup — SF",     es: "AI Startup — SF",     place: "San Francisco (Remote)",  org: "AI MVP",       roleEn: "UX · Design Engineer",          roleEs: "UX · Ingeniero de Diseño",     industry: "AI · SaaS · Startup",         descEn: "Designed and built an AI-powered product MVP from zero for a San Francisco startup.", descEs: "Diseñé y construí un MVP con IA desde cero para una startup de San Francisco.", type: "startup", logoBg: "#2563EB", logoColor: "#FFF", logoText: "AI" },
  { index: 13, year: "Nov 2025 — Now",   en: "KOLO",                es: "KOLO",                place: "Guatemala · LATAM",       org: "KOLO",         roleEn: "Lead Product Designer",         roleEs: "Lead Product Designer",        industry: "B2B · ERP/POS · GT/SV/HN",   descEn: "Leading design at a multi-country ERP/POS platform. I own user research, prototyping and a scalable design system. I work as a design engineer with Claude Code: shipping frontend PRs to the product repo.", descEs: "Liderando el diseño en una plataforma ERP/POS multinacional. Soy responsable de la investigación UX, prototipado y el sistema de diseño escalable. Trabajo como ingeniero de diseño con Claude Code.", type: "current", logoBg: "#141D2C", logoColor: "#FFF", logoText: "KO" },
  { index: 14, year: "2026 → ?",          en: "Your Company",        es: "Tu empresa",          place: "Anywhere",                org: "",             roleEn: "Senior Product Designer",       roleEs: "Senior Product Designer",      industry: "Next chapter",                descEn: "7 years shipping products across fintech, blockchain and AI — design systems, research, and production code. If your team needs a designer who ships, let's talk: hello@javiermora.co", descEs: "7 años lanzando productos en fintech, blockchain e IA — sistemas de diseño, research y código en producción. Si tu equipo necesita un diseñador que entrega, hablemos: hello@javiermora.co", type: "next", logoBg: "#9333EA", logoColor: "#FFF", logoText: "?" },
];

const TC: Record<MType, { color: string; bg: string; icon: string; labelEn: string; labelEs: string }> = {
  education: { color: "#7C3AED", bg: "#F5F3FF", icon: "📚", labelEn: "Education", labelEs: "Educación" },
  work:      { color: "#2563EB", bg: "#EFF6FF", icon: "🏢", labelEn: "Agency",    labelEs: "Agencia"   },
  startup:   { color: "#EA580C", bg: "#FFF7ED", icon: "🚀", labelEn: "Startup",   labelEs: "Startup"   },
  freelance: { color: "#0D9488", bg: "#F0FDFA", icon: "⚡", labelEn: "Freelance", labelEs: "Freelance" },
  gap:       { color: "#6B7280", bg: "#F9FAFB", icon: "☁️", labelEn: "Break",     labelEs: "Pausa"     },
  current:   { color: "#D97706", bg: "#FFFBEB", icon: "⭐", labelEn: "Present",   labelEs: "Presente"  },
  next:      { color: "#9333EA", bg: "#FAF5FF", icon: "✉️", labelEn: "Your team?", labelEs: "¿Tu equipo?" },
};

// ── Background scene per milestone ───────────────────────────
// Style Bible: horizonte ~y150, piso y252, luz desde la izquierda,
// 3 capas (fondo desaturado / midground / detalles de piso)
const SCENES: { sky: [string, string]; art: () => JSX.Element }[] = [
  // 0 — Cali, Colombia: campus universitario + Farallones
  { sky: ["#7DC8E8", "#C9E6B9"], art: () => (
    <g>
      <circle cx="140" cy="66" r="42" fill="rgba(255,240,180,0.35)"/>
      <path d="M0,192 L90,138 L175,176 L265,118 L350,170 L440,136 L530,178 L625,146 L715,180 L800,158 L800,252 L0,252 Z" fill="rgba(95,125,155,0.2)"/>
      <path d="M0,212 C130,192 270,184 410,190 C550,196 690,188 800,200 L800,252 L0,252 Z" fill="rgba(70,130,80,0.24)"/>
      <rect x="495" y="178" width="135" height="74" rx="2" fill="rgba(185,115,75,0.38)"/>
      {[192,207,222,237].map((y,i) => <rect key={i} x="505" y={y} width="115" height="6" rx="1" fill="rgba(255,250,240,0.28)"/>)}
      <rect x="645" y="196" width="82" height="56" rx="2" fill="rgba(165,162,155,0.32)"/>
      {[206,220,234].map((y,i) => <rect key={i} x="654" y={y} width="64" height="5" rx="1" fill="rgba(255,250,240,0.22)"/>)}
      <path d="M148,252 C146,222 144,202 150,186" stroke="rgba(92,62,36,0.5)" strokeWidth="9" fill="none" strokeLinecap="round"/>
      <ellipse cx="152" cy="164" rx="66" ry="32" fill="rgba(45,118,55,0.42)"/>
      <ellipse cx="112" cy="178" rx="40" ry="22" fill="rgba(56,134,66,0.36)"/>
      <ellipse cx="196" cy="176" rx="44" ry="24" fill="rgba(40,108,50,0.38)"/>
      <path d="M332,252 C334,226 338,206 344,193" stroke="rgba(100,70,40,0.45)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M344,193 C332,183 319,181 309,186" stroke="rgba(50,128,60,0.5)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M344,193 C342,179 347,168 356,162" stroke="rgba(50,128,60,0.5)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M344,193 C356,183 369,181 379,187" stroke="rgba(50,128,60,0.5)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M344,193 C354,192 364,196 370,204" stroke="rgba(45,120,56,0.45)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="442" cy="248" rx="30" ry="9" fill="rgba(60,138,70,0.32)"/>
      <ellipse cx="730" cy="249" rx="34" ry="9" fill="rgba(60,138,70,0.28)"/>
    </g>
  )},
  // 1 — Fort Lauderdale: playa + art deco + palmeras
  { sky: ["#57C7F5", "#CFEDDD"], art: () => (
    <g>
      <circle cx="150" cy="60" r="44" fill="rgba(255,246,195,0.45)"/>
      <rect x="0" y="196" width="800" height="34" fill="rgba(25,150,190,0.28)"/>
      <path d="M0,201 C110,198 260,204 405,200 C560,196 705,203 800,199" stroke="rgba(255,255,255,0.32)" strokeWidth="2" fill="none"/>
      <path d="M0,215 C140,212 305,218 465,214 C610,210 725,216 800,213" stroke="rgba(255,255,255,0.22)" strokeWidth="2" fill="none"/>
      <path d="M598,196 L598,176 L612,196 Z" fill="rgba(255,255,255,0.55)"/>
      <rect x="594" y="196" width="22" height="4" rx="2" fill="rgba(240,240,240,0.5)"/>
      <rect x="28" y="148" width="48" height="82" rx="2" fill="rgba(252,250,244,0.42)"/>
      <rect x="40" y="136" width="24" height="12" rx="2" fill="rgba(252,250,244,0.36)"/>
      {[158,172,186,200].map((y,i) => <rect key={i} x="36" y={y} width="32" height="5" rx="1" fill="rgba(120,180,210,0.35)"/>)}
      <rect x="88" y="160" width="54" height="70" rx="2" fill="rgba(255,238,222,0.4)"/>
      {[170,184,198].map((y,i) => <rect key={i} x="96" y={y} width="38" height="5" rx="1" fill="rgba(120,180,210,0.3)"/>)}
      <rect x="678" y="142" width="72" height="88" rx="2" fill="rgba(255,222,216,0.4)"/>
      {[152,166,180,194,208].map((y,i) => <rect key={i} x="688" y={y} width="52" height="5" rx="1" fill="rgba(255,255,255,0.4)"/>)}
      <path d="M248,252 C250,222 254,200 262,186" stroke="rgba(115,80,45,0.5)" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M262,186 C248,176 234,174 223,179" stroke="rgba(45,130,60,0.52)" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M262,186 C259,171 264,159 274,153" stroke="rgba(45,130,60,0.52)" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M262,186 C276,175 291,173 302,180" stroke="rgba(45,130,60,0.52)" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M262,186 C274,186 285,191 291,200" stroke="rgba(40,120,55,0.46)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M330,252 C331,230 334,214 339,204" stroke="rgba(115,80,45,0.42)" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M339,204 C329,196 319,195 311,199 M339,204 C337,193 341,184 348,180 M339,204 C349,196 359,195 367,200" stroke="rgba(50,132,62,0.45)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <rect x="470" y="220" width="28" height="22" rx="2" fill="rgba(255,150,90,0.5)"/>
      <polygon points="464,220 504,220 484,207" fill="rgba(230,90,60,0.5)"/>
      <rect x="480" y="228" width="9" height="14" rx="1" fill="rgba(120,70,40,0.4)"/>
    </g>
  )},
  // 2 — París: Haussmann + Torre Eiffel + farola
  { sky: ["#A9BCCB", "#DEE7EE"], art: () => (
    <g>
      <path d="M0,176 L60,176 L70,164 L130,164 L138,172 L210,172 L218,160 L268,160 L276,170 L340,170 L340,252 L0,252 Z" fill="rgba(120,138,155,0.18)"/>
      <path d="M460,170 L520,170 L528,158 L590,158 L600,168 L668,168 L676,156 L740,156 L748,166 L800,166 L800,252 L460,252 Z" fill="rgba(120,138,155,0.18)"/>
      <path d="M345,252 C350,225 365,205 380,188 L395,155 L397,138" stroke="rgba(75,92,108,0.48)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M455,252 C450,225 435,205 420,188 L405,155 L403,138" stroke="rgba(75,92,108,0.48)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M360,222 Q400,217 440,222" stroke="rgba(75,92,108,0.42)" strokeWidth="2.5" fill="none"/>
      <path d="M372,196 Q400,191 428,196" stroke="rgba(75,92,108,0.38)" strokeWidth="2" fill="none"/>
      <path d="M384,172 Q400,167 416,172" stroke="rgba(75,92,108,0.32)" strokeWidth="1.8" fill="none"/>
      <line x1="400" y1="138" x2="400" y2="108" stroke="rgba(75,92,108,0.42)" strokeWidth="2"/>
      <line x1="400" y1="108" x2="400" y2="93" stroke="rgba(75,92,108,0.36)" strokeWidth="1.5"/>
      <rect x="40" y="186" width="130" height="66" rx="1" fill="rgba(226,215,196,0.5)"/>
      <path d="M40,186 L48,172 L162,172 L170,186 Z" fill="rgba(108,124,140,0.45)"/>
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={52+i*22} y={198} width="11" height="16" rx="1" fill="rgba(90,105,120,0.35)"/>
          <rect x={52+i*22} y={226} width="11" height="16" rx="1" fill="rgba(90,105,120,0.3)"/>
        </g>
      ))}
      <line x1="46" y1="196" x2="164" y2="196" stroke="rgba(70,85,100,0.4)" strokeWidth="1.5"/>
      <line x1="46" y1="224" x2="164" y2="224" stroke="rgba(70,85,100,0.35)" strokeWidth="1.5"/>
      <rect x="612" y="182" width="140" height="70" rx="1" fill="rgba(230,219,200,0.5)"/>
      <path d="M612,182 L620,168 L744,168 L752,182 Z" fill="rgba(108,124,140,0.45)"/>
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={624+i*24} y={194} width="11" height="16" rx="1" fill="rgba(90,105,120,0.35)"/>
          <rect x={624+i*24} y={222} width="11" height="16" rx="1" fill="rgba(90,105,120,0.3)"/>
        </g>
      ))}
      <line x1="618" y1="192" x2="746" y2="192" stroke="rgba(70,85,100,0.4)" strokeWidth="1.5"/>
      <polygon points="612,240 700,240 694,252 618,252" fill="rgba(178,60,55,0.42)"/>
      {[0,1,2,3].map(i => <rect key={i} x={622+i*19} y={241} width="9" height="10" fill="rgba(250,246,238,0.4)"/>)}
      <line x1="300" y1="252" x2="300" y2="200" stroke="rgba(60,72,84,0.5)" strokeWidth="3"/>
      <path d="M300,200 Q300,192 308,192" stroke="rgba(60,72,84,0.5)" strokeWidth="2.5" fill="none"/>
      <circle cx="311" cy="194" r="4.5" fill="rgba(255,238,170,0.55)"/>
    </g>
  )},
  // 3 — El Cairo: minarete + pirámides + Nilo + faluca
  { sky: ["#E8A84A", "#F6D695"], art: () => (
    <g>
      <circle cx="150" cy="76" r="46" fill="rgba(255,175,45,0.4)"/>
      <circle cx="150" cy="76" r="30" fill="rgba(255,195,70,0.35)"/>
      <polygon points="620,206 668,162 716,206" fill="rgba(195,158,88,0.3)"/>
      <polygon points="690,206 728,172 766,206" fill="rgba(185,148,80,0.26)"/>
      <rect x="0" y="206" width="800" height="16" fill="rgba(70,130,160,0.25)"/>
      <path d="M322,206 C322,190 334,180 334,206 Z" fill="rgba(250,248,240,0.55)"/>
      <line x1="316" y1="206" x2="344" y2="206" stroke="rgba(110,80,50,0.5)" strokeWidth="3"/>
      <rect x="30" y="166" width="122" height="86" rx="1" fill="rgba(212,182,138,0.42)"/>
      <rect x="30" y="160" width="122" height="8" rx="1" fill="rgba(190,158,112,0.45)"/>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={42+i*28} y={178} width="14" height="20" rx="5" fill="rgba(120,90,55,0.38)"/>
          <rect x={42+i*28} y={210} width="14" height="20" rx="5" fill="rgba(120,90,55,0.32)"/>
        </g>
      ))}
      <rect x="520" y="122" width="13" height="130" fill="rgba(192,160,114,0.5)"/>
      <rect x="514" y="150" width="25" height="8" rx="3" fill="rgba(178,146,100,0.5)"/>
      <path d="M516,122 Q526,104 537,122 Z" fill="rgba(192,160,114,0.55)"/>
      <rect x="548" y="188" width="88" height="64" rx="1" fill="rgba(202,172,126,0.42)"/>
      <path d="M556,188 Q592,158 628,188 Z" fill="rgba(182,150,104,0.48)"/>
      {[0,1].map(i => <rect key={i} x={566+i*32} y={204} width="14" height="22" rx="5" fill="rgba(120,90,55,0.36)"/>)}
      <path d="M690,252 C691,228 694,212 699,202" stroke="rgba(110,78,44,0.45)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M699,202 C687,193 675,191 665,196 M699,202 C697,188 702,177 711,172 M699,202 C711,192 724,190 734,196" stroke="rgba(70,125,55,0.45)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M0,250 C200,246 420,252 800,248" stroke="rgba(190,150,80,0.28)" strokeWidth="3" fill="none"/>
    </g>
  )},
  // 4 — Miami / Brickell: torres de vidrio + mural + palmeras
  { sky: ["#4FB6E8", "#D6ECF4"], art: () => (
    <g>
      <circle cx="145" cy="62" r="42" fill="rgba(255,244,190,0.4)"/>
      <rect x="0" y="204" width="800" height="20" fill="rgba(20,140,185,0.26)"/>
      <path d="M0,208 C140,205 320,211 500,207 C640,204 730,209 800,206" stroke="rgba(255,255,255,0.28)" strokeWidth="2" fill="none"/>
      <rect x="30" y="118" width="42" height="134" rx="2" fill="rgba(90,160,200,0.38)"/>
      {[0,1,2].map(i => <rect key={i} x={36+i*13} y="124" width="7" height="122" fill="rgba(220,240,250,0.28)"/>)}
      <rect x="80" y="140" width="50" height="112" rx="2" fill="rgba(80,150,190,0.34)"/>
      {[0,1,2].map(i => <rect key={i} x={87+i*15} y="146" width="8" height="100" fill="rgba(220,240,250,0.25)"/>)}
      <rect x="138" y="128" width="38" height="124" rx="2" fill="rgba(100,170,205,0.36)"/>
      {[0,1].map(i => <rect key={i} x={145+i*15} y="134" width="8" height="112" fill="rgba(220,240,250,0.26)"/>)}
      <rect x="184" y="152" width="46" height="100" rx="2" fill="rgba(85,155,195,0.32)"/>
      <path d="M184,152 L230,152 L230,168 L184,160 Z" fill="rgba(120,190,220,0.35)"/>
      <rect x="560" y="198" width="150" height="54" rx="2" fill="rgba(246,242,236,0.42)"/>
      <circle cx="590" cy="218" r="13" fill="rgba(235,80,140,0.45)"/>
      <rect x="612" y="206" width="22" height="34" rx="2" fill="rgba(40,180,190,0.45)"/>
      <circle cx="662" cy="228" r="15" fill="rgba(250,160,60,0.45)"/>
      <path d="M640,206 L656,206 L648,222 Z" fill="rgba(120,90,200,0.42)"/>
      <rect x="684" y="212" width="16" height="28" rx="2" fill="rgba(235,80,140,0.35)"/>
      <path d="M306,252 C308,224 312,204 319,192" stroke="rgba(115,80,45,0.5)" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M319,192 C306,182 292,180 281,185 M319,192 C316,177 321,165 331,159 M319,192 C333,181 348,179 359,186 M319,192 C331,192 342,197 348,206" stroke="rgba(45,130,60,0.5)" strokeWidth="3.8" fill="none" strokeLinecap="round"/>
      <path d="M498,252 C499,230 502,214 507,204" stroke="rgba(115,80,45,0.42)" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M507,204 C497,196 487,195 479,199 M507,204 C505,193 509,184 516,180 M507,204 C517,196 527,195 535,200" stroke="rgba(50,132,62,0.45)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </g>
  )},
  // 5 — Lisboa: azulejos + tranvía + colinas + Tajo
  { sky: ["#8FBBD8", "#F2E2C8"], art: () => (
    <g>
      <circle cx="150" cy="64" r="40" fill="rgba(255,240,185,0.4)"/>
      <path d="M520,252 L520,178 C580,160 650,150 720,146 C760,144 785,148 800,152 L800,252 Z" fill="rgba(160,130,105,0.25)"/>
      {[[556,182],[596,170],[640,160],[686,154],[730,152]].map((p,i) => (
        <g key={i}>
          <rect x={p[0]} y={p[1]} width="20" height="14" rx="1" fill="rgba(240,226,200,0.45)"/>
          <polygon points={`${p[0]-2},${p[1]} ${p[0]+22},${p[1]} ${p[0]+10},${p[1]-8}`} fill="rgba(190,95,60,0.45)"/>
        </g>
      ))}
      <rect x="0" y="228" width="800" height="12" fill="rgba(70,135,165,0.24)"/>
      <rect x="60" y="164" width="160" height="88" rx="1" fill="rgba(240,232,216,0.5)"/>
      <rect x="60" y="164" width="160" height="26" fill="rgba(70,120,180,0.32)"/>
      {[0,1,2,3,4,5,6,7].map(i => <rect key={i} x={66+i*19} y={169} width="9" height="9" rx="1" fill="rgba(255,255,255,0.35)"/>)}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={76+i*46} y={200} width="16" height="22" rx="1" fill="rgba(90,105,120,0.35)"/>
          <rect x={74+i*46} y={196} width="20" height="4" rx="1" fill="rgba(120,140,155,0.4)"/>
        </g>
      ))}
      <line x1="0" y1="146" x2="800" y2="138" stroke="rgba(60,70,80,0.3)" strokeWidth="1.5"/>
      <rect x="252" y="196" width="96" height="48" rx="8" fill="rgba(235,185,45,0.55)"/>
      <rect x="252" y="216" width="96" height="6" fill="rgba(250,246,238,0.45)"/>
      {[0,1,2,3].map(i => <rect key={i} x={262+i*22} y={202} width="16" height="12" rx="2" fill="rgba(210,230,240,0.5)"/>)}
      <line x1="300" y1="196" x2="296" y2="150" stroke="rgba(60,70,80,0.45)" strokeWidth="2"/>
      <circle cx="272" cy="246" r="6" fill="rgba(45,45,50,0.55)"/>
      <circle cx="328" cy="246" r="6" fill="rgba(45,45,50,0.55)"/>
      <line x1="470" y1="252" x2="470" y2="202" stroke="rgba(60,72,84,0.5)" strokeWidth="3"/>
      <circle cx="470" cy="196" r="6" fill="rgba(255,238,170,0.55)"/>
      <path d="M0,250 C200,247 500,252 800,249" stroke="rgba(160,150,135,0.35)" strokeWidth="3" fill="none"/>
    </g>
  )},
  // 6 — Medellín: valle del Aburrá + metrocable + ladrillo
  { sky: ["#7CC8E0", "#C6E7C8"], art: () => (
    <g>
      <path d="M0,252 L0,128 C90,148 170,188 260,224 C330,250 380,252 420,252 Z" fill="rgba(45,105,60,0.3)"/>
      <path d="M800,252 L800,118 C700,140 610,182 520,222 C460,248 430,252 410,252 Z" fill="rgba(45,105,60,0.3)"/>
      {[[40,170],[70,190],[105,205],[140,220],[690,180],[725,165],[660,200],[625,215]].map((p,i) => (
        <rect key={i} x={p[0]} y={p[1]} width="14" height="10" rx="1" fill="rgba(190,110,70,0.4)"/>
      ))}
      <line x1="0" y1="120" x2="800" y2="88" stroke="rgba(60,70,80,0.35)" strokeWidth="2"/>
      {[[210,112],[540,99]].map((p,i) => (
        <g key={i}>
          <line x1={p[0]} y1={p[1]} x2={p[0]} y2={p[1]+10} stroke="rgba(60,70,80,0.4)" strokeWidth="2"/>
          <rect x={p[0]-11} y={p[1]+10} width="22" height="16" rx="4" fill="rgba(30,120,60,0.5)"/>
          <rect x={p[0]-7} y={p[1]+14} width="14" height="7" rx="1" fill="rgba(220,240,250,0.5)"/>
        </g>
      ))}
      <rect x="268" y="168" width="54" height="84" rx="1" fill="rgba(165,85,55,0.45)"/>
      {[178,194,210,226].map((y,i) => <rect key={i} x="276" y={y} width="38" height="8" rx="1" fill="rgba(255,240,220,0.28)"/>)}
      <rect x="330" y="150" width="40" height="102" rx="1" fill="rgba(130,180,200,0.4)"/>
      {[160,176,192,208,224].map((y,i) => <rect key={i} x="335" y={y} width="30" height="9" rx="1" fill="rgba(230,245,252,0.35)"/>)}
      <rect x="470" y="182" width="48" height="70" rx="1" fill="rgba(150,78,52,0.42)"/>
      {[192,208,224].map((y,i) => <rect key={i} x="478" y={y} width="32" height="8" rx="1" fill="rgba(255,240,220,0.26)"/>)}
      <line x1="240" y1="252" x2="240" y2="222" stroke="rgba(85,58,35,0.45)" strokeWidth="4"/>
      <ellipse cx="240" cy="212" rx="24" ry="16" fill="rgba(50,125,60,0.42)"/>
      <line x1="560" y1="252" x2="560" y2="226" stroke="rgba(85,58,35,0.42)" strokeWidth="3.5"/>
      <ellipse cx="560" cy="216" rx="20" ry="14" fill="rgba(55,132,64,0.4)"/>
    </g>
  )},
  // 7 — Bogotá: Andes + Monserrate + ladrillo + parque
  { sky: ["#93AABF", "#DCE4EA"], art: () => (
    <g>
      <path d="M0,178 L110,132 L200,168 L300,122 L390,164 L500,134 L610,172 L710,144 L800,170 L800,252 L0,252 Z" fill="rgba(70,95,110,0.28)"/>
      <rect x="296" y="112" width="9" height="12" fill="rgba(240,245,250,0.55)"/>
      <polygon points="294,112 307,112 300,104" fill="rgba(240,245,250,0.5)"/>
      <rect x="60" y="172" width="90" height="80" rx="1" fill="rgba(155,80,55,0.45)"/>
      {[182,198,214,230].map((y,i) => (
        <g key={i}>
          {[70,92,114].map((x,j) => <rect key={j} x={x} y={y} width="14" height="10" rx="1" fill="rgba(255,240,220,0.3)"/>)}
        </g>
      ))}
      <rect x="160" y="188" width="70" height="64" rx="1" fill="rgba(140,72,50,0.4)"/>
      {[196,212,228].map((y,i) => (
        <g key={i}>
          {[168,190,212].map((x,j) => <rect key={j} x={x} y={y} width="12" height="9" rx="1" fill="rgba(255,240,220,0.28)"/>)}
        </g>
      ))}
      <line x1="590" y1="252" x2="590" y2="216" stroke="rgba(85,58,35,0.48)" strokeWidth="5"/>
      <ellipse cx="590" cy="204" rx="30" ry="19" fill="rgba(48,115,58,0.42)"/>
      <line x1="712" y1="252" x2="712" y2="222" stroke="rgba(85,58,35,0.45)" strokeWidth="4"/>
      <ellipse cx="712" cy="212" rx="24" ry="15" fill="rgba(55,125,62,0.4)"/>
      <rect x="622" y="224" width="60" height="6" rx="2" fill="rgba(95,62,40,0.45)"/>
      <rect x="622" y="232" width="60" height="7" rx="2" fill="rgba(95,62,40,0.52)"/>
      <rect x="624" y="232" width="5" height="16" fill="rgba(72,48,30,0.52)"/>
      <rect x="675" y="232" width="5" height="16" fill="rgba(72,48,30,0.52)"/>
      <rect x="0" y="246" width="800" height="6" fill="rgba(180,60,50,0.16)"/>
    </g>
  )},
  // 8 — Nueva York: skyline + taxi + vapor + farola
  { sky: ["#6B87A0", "#CBD8E2"], art: () => (
    <g>
      <g fill="rgba(52,73,94,0.38)">
        <rect x="20" y="195" width="40" height="57"/>
        <rect x="65" y="182" width="30" height="70"/>
        <rect x="100" y="188" width="45" height="64"/>
        <rect x="150" y="170" width="35" height="82"/>
        <rect x="195" y="148" width="28" height="104"/>
        <rect x="201" y="136" width="16" height="16"/>
        <rect x="205" y="122" width="8" height="18"/>
        <rect x="230" y="172" width="38" height="80"/>
        <rect x="273" y="180" width="50" height="72"/>
        <rect x="330" y="140" width="24" height="112"/>
        <rect x="360" y="150" width="22" height="102"/>
        <rect x="388" y="175" width="40" height="77"/>
        <rect x="432" y="185" width="55" height="67" fill="rgba(52,73,94,0.32)"/>
        <rect x="492" y="192" width="65" height="60" fill="rgba(52,73,94,0.3)"/>
        <rect x="562" y="200" width="70" height="52" fill="rgba(52,73,94,0.28)"/>
        <rect x="637" y="205" width="80" height="47" fill="rgba(52,73,94,0.26)"/>
        <rect x="720" y="195" width="80" height="57" fill="rgba(52,73,94,0.26)"/>
      </g>
      <line x1="209" y1="122" x2="209" y2="106" stroke="rgba(52,73,94,0.4)" strokeWidth="3"/>
      {[200,240,335,362].map((x,i) => (
        <g key={i} fill="rgba(255,240,130,0.3)">
          <rect x={x+4} y={([155,180,148,158])[i]} width="4" height="3"/>
          <rect x={x+12} y={([155,180,148,158])[i]} width="4" height="3"/>
          <rect x={x+4} y={([163,188,158,168])[i]} width="4" height="3"/>
        </g>
      ))}
      <rect x="80" y="226" width="76" height="17" rx="4" fill="rgba(240,180,20,0.58)"/>
      <path d="M96,226 L104,214 L136,214 L144,226 Z" fill="rgba(240,180,20,0.58)"/>
      <rect x="106" y="216" width="13" height="9" rx="1" fill="rgba(200,225,240,0.5)"/>
      <rect x="122" y="216" width="13" height="9" rx="1" fill="rgba(200,225,240,0.5)"/>
      <rect x="112" y="208" width="16" height="6" rx="1" fill="rgba(240,180,20,0.5)"/>
      <circle cx="96" cy="244" r="6" fill="rgba(40,40,45,0.55)"/>
      <circle cx="140" cy="244" r="6" fill="rgba(40,40,45,0.55)"/>
      <ellipse cx="565" cy="242" rx="10" ry="6" fill="rgba(220,228,235,0.4)"/>
      <ellipse cx="570" cy="230" rx="8" ry="5" fill="rgba(225,232,238,0.32)"/>
      <ellipse cx="576" cy="219" rx="6" ry="4" fill="rgba(230,236,242,0.24)"/>
      <line x1="640" y1="252" x2="640" y2="198" stroke="rgba(45,55,65,0.5)" strokeWidth="3"/>
      <path d="M640,198 Q640,190 649,190" stroke="rgba(45,55,65,0.5)" strokeWidth="2.5" fill="none"/>
      <circle cx="652" cy="192" r="4.5" fill="rgba(255,238,170,0.55)"/>
    </g>
  )},
  // 9 — Londres: Big Ben + London Eye + bus de dos pisos
  { sky: ["#607D8B", "#B0C4CF"], art: () => (
    <g>
      <rect x="80" y="208" width="160" height="44" rx="1" fill="rgba(80,105,120,0.28)"/>
      <rect x="130" y="148" width="32" height="104" rx="1" fill="rgba(80,105,120,0.36)"/>
      <rect x="126" y="144" width="40" height="8" fill="rgba(80,105,120,0.36)"/>
      <circle cx="146" cy="165" r="13" fill="rgba(100,130,145,0.28)"/>
      <circle cx="146" cy="165" r="10" fill="rgba(220,235,245,0.38)"/>
      <polygon points="130,144 162,144 146,110" fill="rgba(80,105,120,0.4)"/>
      <path d="M0,244 C150,240 350,247 800,243" stroke="rgba(70,100,150,0.28)" strokeWidth="4" fill="none"/>
      <circle cx="560" cy="172" r="58" fill="none" stroke="rgba(90,120,140,0.38)" strokeWidth="2.5"/>
      <circle cx="560" cy="172" r="5" fill="rgba(90,120,140,0.5)"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => (
        <line key={i}
          x1={560} y1={172}
          x2={Math.round(560 + Math.cos(a*Math.PI/180)*58)}
          y2={Math.round(172 + Math.sin(a*Math.PI/180)*58)}
          stroke="rgba(90,120,140,0.28)" strokeWidth="1"/>
      ))}
      <line x1="542" y1="230" x2="525" y2="252" stroke="rgba(80,105,120,0.38)" strokeWidth="3"/>
      <line x1="578" y1="230" x2="595" y2="252" stroke="rgba(80,105,120,0.38)" strokeWidth="3"/>
      <rect x="270" y="198" width="96" height="46" rx="6" fill="rgba(198,42,48,0.55)"/>
      {[0,1,2,3].map(i => <rect key={i} x={280+i*22} y={204} width="15" height="11" rx="2" fill="rgba(225,238,246,0.5)"/>)}
      {[0,1,2,3].map(i => <rect key={i} x={280+i*22} y={224} width="15" height="11" rx="2" fill="rgba(225,238,246,0.45)"/>)}
      <circle cx="292" cy="246" r="6" fill="rgba(40,40,45,0.55)"/>
      <circle cx="344" cy="246" r="6" fill="rgba(40,40,45,0.55)"/>
      <line x1="700" y1="252" x2="700" y2="202" stroke="rgba(60,72,84,0.5)" strokeWidth="3"/>
      <circle cx="700" cy="196" r="6" fill="rgba(255,238,170,0.5)"/>
    </g>
  )},
  // 10 — Singapur: Marina Bay Sands + supertrees + CBD
  { sky: ["#3FB0C0", "#CFE9E4"], art: () => (
    <g>
      <rect x="60" y="150" width="30" height="102" fill="rgba(0,105,120,0.32)"/>
      <rect x="100" y="132" width="26" height="120" fill="rgba(0,105,120,0.36)"/>
      <rect x="134" y="158" width="34" height="94" fill="rgba(0,105,120,0.3)"/>
      {[66,106,140].map((x,i) => <rect key={i} x={x} y={([156,138,164])[i]} width="6" height={([90,108,82])[i]} fill="rgba(200,240,245,0.22)"/>)}
      <path d="M0,242 C200,238 500,244 800,240" stroke="rgba(0,188,212,0.28)" strokeWidth="4" fill="none"/>
      <rect x="0" y="244" width="800" height="8" fill="rgba(0,150,200,0.15)"/>
      <path d="M690,238 L740,238 L732,246 L698,246 Z" fill="rgba(250,248,242,0.45)"/>
      <rect x="290" y="172" width="26" height="80" rx="1" fill="rgba(0,131,143,0.45)"/>
      <rect x="327" y="165" width="26" height="87" rx="1" fill="rgba(0,131,143,0.5)"/>
      <rect x="364" y="172" width="26" height="80" rx="1" fill="rgba(0,131,143,0.45)"/>
      <path d="M285,172 Q330,152 395,168 L395,182 L285,182 Z" fill="rgba(0,151,167,0.5)"/>
      <rect x="288" y="172" width="105" height="5" rx="2" fill="rgba(77,208,225,0.4)"/>
      <line x1="540" y1="252" x2="540" y2="168" stroke="rgba(46,125,50,0.5)" strokeWidth="5"/>
      <ellipse cx="540" cy="158" rx="24" ry="15" fill="rgba(56,142,60,0.45)"/>
      <line x1="600" y1="252" x2="600" y2="178" stroke="rgba(46,125,50,0.48)" strokeWidth="4"/>
      <ellipse cx="600" cy="168" rx="20" ry="13" fill="rgba(67,160,71,0.45)"/>
      <line x1="650" y1="252" x2="650" y2="185" stroke="rgba(46,125,50,0.45)" strokeWidth="3.5"/>
      <ellipse cx="650" cy="175" rx="17" ry="11" fill="rgba(56,142,60,0.42)"/>
      <line x1="540" y1="158" x2="600" y2="168" stroke="rgba(255,245,150,0.28)" strokeWidth="1"/>
      <line x1="600" y1="168" x2="650" y2="175" stroke="rgba(255,245,150,0.28)" strokeWidth="1"/>
    </g>
  )},
  // 11 — Ámsterdam: casas del canal + puente + bicis + molino
  { sky: ["#9FB6C6", "#E4EAEE"], art: () => (
    <g>
      <polygon points="82,252 106,252 102,196 86,196" fill="rgba(90,70,50,0.3)"/>
      <line x1="94" y1="196" x2="94" y2="162" stroke="rgba(90,70,50,0.32)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="76" y1="179" x2="112" y2="179" stroke="rgba(90,70,50,0.32)" strokeWidth="3" strokeLinecap="round"/>
      <line x1="81" y1="166" x2="107" y2="192" stroke="rgba(90,70,50,0.28)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="107" y1="166" x2="81" y2="192" stroke="rgba(90,70,50,0.28)" strokeWidth="2.5" strokeLinecap="round"/>
      {[
        {x:430,w:54,top:158,c:"rgba(150,75,50,0.5)"},
        {x:486,w:48,top:170,c:"rgba(228,212,182,0.5)"},
        {x:536,w:54,top:150,c:"rgba(62,88,72,0.5)"},
        {x:592,w:48,top:166,c:"rgba(112,82,56,0.5)"},
        {x:642,w:56,top:156,c:"rgba(158,70,46,0.5)"},
      ].map((h,i) => (
        <g key={i}>
          <rect x={h.x} y={h.top+18} width={h.w} height={234-h.top-18} fill={h.c}/>
          <polygon points={`${h.x},${h.top+18} ${h.x+8},${h.top+18} ${h.x+8},${h.top+10} ${h.x+16},${h.top+10} ${h.x+16},${h.top+2} ${h.x+h.w-16},${h.top+2} ${h.x+h.w-16},${h.top+10} ${h.x+h.w-8},${h.top+10} ${h.x+h.w-8},${h.top+18} ${h.x+h.w},${h.top+18} ${h.x+h.w},${h.top+20} ${h.x},${h.top+20}`} fill={h.c}/>
          <rect x={h.x+16} y={h.top+2} width={h.w-32} height="10" fill={h.c}/>
          {[0,1,2,3].map(k => (
            <rect key={k} x={h.x+10+(k%2)*(h.w-32)} y={h.top+30+Math.floor(k/2)*28} width="12" height="18" rx="1" fill="rgba(245,242,235,0.42)"/>
          ))}
        </g>
      ))}
      <rect x="0" y="234" width="800" height="14" fill="rgba(70,110,120,0.28)"/>
      <path d="M0,238 C160,236 400,240 800,237" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none"/>
      <rect x="286" y="236" width="60" height="8" rx="3" fill="rgba(80,60,45,0.45)"/>
      <rect x="298" y="230" width="14" height="8" rx="2" fill="rgba(80,60,45,0.4)"/>
      <path d="M150,250 Q205,216 260,250" stroke="rgba(140,80,55,0.45)" strokeWidth="9" fill="none"/>
      <line x1="152" y1="238" x2="258" y2="238" stroke="rgba(140,80,55,0.35)" strokeWidth="2.5"/>
      <g stroke="rgba(50,55,60,0.5)" strokeWidth="2" fill="none">
        <circle cx="352" cy="244" r="6.5"/>
        <circle cx="372" cy="244" r="6.5"/>
        <path d="M352,244 L360,232 L372,244 M360,232 L366,232"/>
      </g>
      <line x1="740" y1="252" x2="740" y2="204" stroke="rgba(60,72,84,0.5)" strokeWidth="3"/>
      <circle cx="740" cy="198" r="6" fill="rgba(255,238,170,0.5)"/>
    </g>
  )},
  // 12 — San Francisco: Golden Gate + niebla + victorianas
  { sky: ["#CD7830", "#F2CE96"], art: () => (
    <g>
      <circle cx="150" cy="72" r="46" fill="rgba(255,200,80,0.4)"/>
      <circle cx="150" cy="72" r="30" fill="rgba(255,215,110,0.32)"/>
      <path d="M0,248 C150,244 350,250 800,246" stroke="rgba(30,80,150,0.28)" strokeWidth="4" fill="none"/>
      <ellipse cx="300" cy="152" rx="220" ry="16" fill="rgba(250,245,238,0.3)"/>
      <ellipse cx="560" cy="144" rx="180" ry="13" fill="rgba(250,245,238,0.24)"/>
      <rect x="195" y="148" width="16" height="104" rx="1" fill="rgba(190,60,20,0.5)"/>
      <rect x="191" y="144" width="24" height="8" rx="1" fill="rgba(180,55,18,0.5)"/>
      <rect x="385" y="152" width="16" height="100" rx="1" fill="rgba(190,60,20,0.5)"/>
      <rect x="381" y="148" width="24" height="8" rx="1" fill="rgba(180,55,18,0.5)"/>
      <path d="M203,152 Q295,205 393,156" fill="none" stroke="rgba(190,60,20,0.5)" strokeWidth="3.5"/>
      {[215,235,255,275,295,315,335,355,373].map((x,i) => {
        const t = (x-203)/(393-203);
        const cy = Math.round(152 + 53*4*t*(1-t));
        return <line key={i} x1={x} y1={cy} x2={x} y2="252" stroke="rgba(190,60,20,0.32)" strokeWidth="1"/>;
      })}
      <line x1="180" y1="210" x2="410" y2="210" stroke="rgba(160,50,15,0.45)" strokeWidth="4"/>
      <path d="M480,252 C560,228 660,208 800,200 L800,252 Z" fill="rgba(60,110,55,0.3)"/>
      {[
        {x:560,y:216,c:"rgba(245,190,200,0.55)"},
        {x:618,y:209,c:"rgba(190,225,210,0.55)"},
        {x:676,y:203,c:"rgba(248,236,210,0.55)"},
        {x:734,y:198,c:"rgba(215,205,235,0.55)"},
      ].map((h,i) => (
        <g key={i}>
          <rect x={h.x} y={h.y} width="30" height="24" rx="1" fill={h.c}/>
          <polygon points={`${h.x-3},${h.y} ${h.x+33},${h.y} ${h.x+15},${h.y-12}`} fill="rgba(120,90,80,0.5)"/>
          <rect x={h.x+11} y={h.y+10} width="8" height="14" rx="1" fill="rgba(90,70,60,0.4)"/>
        </g>
      ))}
    </g>
  )},
  // 13 — Antigua Guatemala: volcanes + Arco de Santa Catalina
  { sky: ["#6FC4DC", "#BEE0A8"], art: () => (
    <g>
      <polygon points="120,252 300,108 480,252" fill="rgba(58,78,92,0.42)"/>
      <polygon points="282,122 300,108 318,122 310,134 290,134" fill="rgba(238,246,252,0.7)"/>
      <polygon points="480,252 596,148 712,252" fill="rgba(66,88,100,0.3)"/>
      <ellipse cx="602" cy="136" rx="10" ry="7" fill="rgba(205,210,216,0.5)"/>
      <ellipse cx="613" cy="125" rx="8" ry="6" fill="rgba(214,219,224,0.4)"/>
      <path d="M0,252 C110,236 260,226 400,222 C560,218 690,228 800,238 L800,252 Z" fill="rgba(55,135,65,0.26)"/>
      <rect x="80" y="186" width="84" height="66" rx="1" fill="rgba(226,168,64,0.55)"/>
      <rect x="240" y="186" width="84" height="66" rx="1" fill="rgba(226,168,64,0.55)"/>
      <path d="M164,186 L240,186 L240,212 Q202,194 164,212 Z" fill="rgba(226,168,64,0.55)"/>
      <rect x="80" y="182" width="244" height="6" rx="1" fill="rgba(250,244,232,0.5)"/>
      <rect x="188" y="164" width="28" height="20" rx="2" fill="rgba(232,178,76,0.55)"/>
      <path d="M186,164 Q202,148 218,164 Z" fill="rgba(200,140,50,0.55)"/>
      <circle cx="202" cy="174" r="6" fill="rgba(250,248,240,0.6)"/>
      <line x1="202" y1="174" x2="202" y2="170" stroke="rgba(90,70,40,0.6)" strokeWidth="1.5"/>
      {[0,1].map(i => <rect key={i} x={94+i*30} y={202} width="16" height="24" rx="6" fill="rgba(130,90,45,0.4)"/>)}
      {[0,1].map(i => <rect key={i} x={256+i*30} y={202} width="16" height="24" rx="6" fill="rgba(130,90,45,0.4)"/>)}
      <ellipse cx="122" cy="210" rx="17" ry="10" fill="rgba(215,60,130,0.45)"/>
      <ellipse cx="308" cy="228" rx="14" ry="9" fill="rgba(215,60,130,0.4)"/>
      <rect x="560" y="212" width="110" height="40" rx="1" fill="rgba(238,240,235,0.45)"/>
      <rect x="560" y="206" width="110" height="8" rx="1" fill="rgba(190,95,60,0.5)"/>
      {[0,1,2].map(i => <rect key={i} x={572+i*36} y={222} width="16" height="20" rx="5" fill="rgba(120,85,50,0.4)"/>)}
      {[180,320,470,620,730].map((x,i) => <ellipse key={i} cx={x} cy={249} rx="9" ry="2.5" fill="rgba(120,110,95,0.3)"/>)}
    </g>
  )},
  // 14 — El siguiente capítulo: amanecer y camino abierto
  { sky: ["#FCA96B", "#FDEBD2"], art: () => (
    <g>
      <circle cx="480" cy="150" r="52" fill="rgba(255,214,130,0.55)"/>
      <circle cx="480" cy="150" r="34" fill="rgba(255,235,180,0.65)"/>
      <path d="M0,196 L140,168 L280,190 L420,160 L560,186 L700,158 L800,178 L800,252 L0,252 Z" fill="rgba(180,120,90,0.18)"/>
      <path d="M0,214 C140,202 300,196 460,200 C620,204 720,198 800,206 L800,252 L0,252 Z" fill="rgba(200,140,95,0.16)"/>
      {/* camino en perspectiva hacia el sol */}
      <path d="M330,252 L470,168 L490,168 L630,252 Z" fill="rgba(255,240,210,0.32)"/>
      <path d="M470,252 L479,175 L481,175 L490,252 Z" fill="rgba(255,250,235,0.4)"/>
      {/* aves */}
      <path d="M300,96 q6,-6 12,0 M312,96 q6,-6 12,0" stroke="rgba(120,80,60,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M560,76 q5,-5 10,0 M570,76 q5,-5 10,0" stroke="rgba(120,80,60,0.42)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M650,110 q4,-4 8,0 M658,110 q4,-4 8,0" stroke="rgba(120,80,60,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </g>
  )},
];

function BgScene({ cur }: { cur: number }) {
  const scene = SCENES[Math.min(cur, SCENES.length - 1)];
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={cur}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(180deg, ${scene.sky[0]} 0%, ${scene.sky[1]} 100%)`,
          }} />
          <svg
            viewBox="0 0 800 280"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {scene.art()}
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Character: sprite sheet /sprite-final.png 1980×99 (30 celdas × 66px)
// Sistema de 3 eras — hoja definitiva (ChatGPT 16:23) verificada con datos:
// patrón de anchos 123→148→130→78(PASO)→149→145→91(paso)→86→138 = ciclo real
// de 2 pasos con pie elevado, mochila consistente en todos los frames.
//   era 0 (celdas 0-9)   = estudiante con mochila  → paradas 1-3
//   era 1 (celdas 10-19) = polo y chinos (junior)  → paradas 4-7
//   era 2 (celdas 20-29) = camisa blanca (senior)  → paradas 8-14
// Por era: celda base = reposo (pies juntos), base+1..base+9 = loop.
// NO interpolar frames por blend: en arte de alto contraste produce
// fantasmas de piernas dobles (probado y revertido).
function cellAt(t: number, era: number): number {
  const base = era * 10;
  if (t <= 0) return base;
  return base + 1 + ((t - 1) % 9);
}

function Char({ walking, facingRight, frameMs, era }: { walking: boolean; facingRight: boolean; frameMs: number; era: number }) {
  const [cell, setCell] = useState(0);
  const iv = useRef<ReturnType<typeof setInterval>>();
  const ms = useRef(frameMs);
  ms.current = frameMs; // ref: mantiene deps estables ante HMR
  const eraRef = useRef(era);
  eraRef.current = era;

  useEffect(() => {
    if (iv.current) clearInterval(iv.current);
    if (walking) {
      // anclado al reloj: sin deriva del setInterval en caminatas largas
      const t0 = performance.now();
      iv.current = setInterval(() => {
        const t = Math.round((performance.now() - t0) / ms.current);
        setCell(cellAt(Math.max(1, t), eraRef.current));
      }, ms.current);
    } else {
      setCell(cellAt(0, eraRef.current)); // reposo de la era actual
    }
    return () => { if (iv.current) clearInterval(iv.current); };
  }, [walking, era]);

  return (
    <div style={{
      width: 66,
      height: 99,
      backgroundImage: "url('/sprite-final.png')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "1980px 99px",
      backgroundPositionX: `${-cell * 66}px`,
      backgroundPositionY: 0,
      transform: facingRight ? "none" : "scaleX(-1)",
      transition: "transform 0.18s",
    }} />
  );
}

// ── Experience card (horizontal strip) ──────────────────────
function ExperienceCard({ ms, isActive, future = false, lang, onClick }: {
  ms: MS; isActive: boolean; future?: boolean; lang: string; onClick: () => void;
}) {
  const tc = TC[ms.type];
  return (
    <button
      data-active={isActive ? "true" : undefined}
      onClick={onClick}
      className="flex-shrink-0 rounded-xl border text-left snap-start transition-all duration-300"
      style={{
        width: 182,
        height: 186,          // fixed — no layout shift when active changes
        padding: "12px",
        overflow: "hidden",
        borderColor: isActive ? tc.color : "#E4E4E7",
        background: isActive ? tc.bg : "#FFFFFF",
        boxShadow: isActive ? `0 0 0 1px ${tc.color}` : "none",
        // futuras: visibles como índice, atenuadas hasta visitarlas
        opacity: future ? 0.45 : 1,
        filter: future ? "grayscale(1)" : "none",
      }}
    >
      {/* Logo + badge row */}
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[11px] tracking-tight flex-shrink-0"
          style={{ background: ms.logoBg, color: ms.logoColor, fontFamily: "var(--font-red-hat-mono), monospace" }}
        >
          {ms.logoText}
        </div>
        <span
          className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider leading-none"
          style={{
            background: isActive ? "rgba(255,255,255,0.55)" : tc.bg,
            color: tc.color,
          }}
        >
          {tc.icon} {lang === "en" ? tc.labelEn : tc.labelEs}
        </span>
      </div>

      {/* Company */}
      <p className="text-[12px] font-bold text-[#0A0A0A] leading-tight line-clamp-1 mb-0.5">
        {ms.org && ms.org !== "—" ? ms.org : (lang === "en" ? ms.en : ms.es)}
      </p>
      {/* Role */}
      <p className="text-[11px] leading-snug line-clamp-1 mb-1.5"
        style={{ color: isActive ? tc.color : "#52525B" }}>
        {lang === "en" ? ms.roleEn : ms.roleEs}
      </p>
      {/* Year */}
      <p className="text-[10px] font-mono text-[#A1A1AA] mb-0">{ms.year}</p>

      {/* Description — always rendered, invisible when inactive (preserves fixed height) */}
      <p
        className="text-[11px] text-[#3F3F46] leading-[1.55] mt-2.5 line-clamp-3 transition-opacity duration-200"
        style={{ opacity: isActive ? 1 : 0 }}
      >
        {lang === "en" ? ms.descEn : ms.descEs}
      </p>
    </button>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function ExperienceView() {
  const { lang } = useLang();
  const [cur, setCur] = useState(0);
  const [facingRight, setFacingRight] = useState(true);
  const [walking, setWalking] = useState(false);
  const [frameMs, setFrameMs] = useState(64);
  const [walkDur, setWalkDur] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [canScrollL, setCanScrollL] = useState(false);
  const [canScrollR, setCanScrollR] = useState(true);

  const updateScrollFades = useCallback(() => {
    const el = cardsRef.current;
    if (!el) return;
    setCanScrollL(el.scrollLeft > 4);
    setCanScrollR(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);
  const walkingRef = useRef(false);
  const curRef = useRef(0);
  const viewRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(800);
  const vwRef = useRef(800);
  const touchStartX = useRef(0);
  const walkTimer = useRef<ReturnType<typeof setTimeout>>();
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>();
  // Mundo: tween manual por rAF — determinista, sin depender de Framer
  const worldRef = useRef<HTMLDivElement>(null);
  const worldXRef = useRef(0);
  const rafRef = useRef<number>();

  const worldTarget = useCallback((stop: number) => {
    return vwRef.current / 2 - (stop * STOP_W + STOP_W / 2);
  }, []);

  const setWorldX = useCallback((x: number) => {
    worldXRef.current = x;
    if (worldRef.current) worldRef.current.style.transform = `translateX(${x}px)`;
  }, []);

  const tweenWorld = useCallback((to: number, durS: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    // pestaña oculta: sin rAF — aterrizar directo al destino
    if (durS <= 0 || document.hidden) { setWorldX(to); return; }
    const from = worldXRef.current;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / (durS * 1000), 1);
      setWorldX(from + (to - from) * p); // lineal: velocidad constante
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [setWorldX]);

  useEffect(() => {
    const measure = () => {
      const cw = viewRef.current?.clientWidth ?? 0;
      if (cw > 0) { setVw(cw); vwRef.current = cw; } // nunca medir 0 (tab oculto)
      // re-centrar sin animación al medir/redimensionar/volver a la pestaña
      tweenWorld(worldTarget(curRef.current), 0);
    };
    measure();
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tweenWorld, worldTarget]);

  // Arranca el viaje: duración = distancia / velocidad → suelo y pies en sync.
  // En saltos largos acelera (tope MAX_TRAVEL s) y los frames aceleran igual.
  // Efectos FUERA de updaters de estado (puros) — clave para StrictMode/React 19.
  const startWalk = useCallback((from: number, to: number) => {
    const dist = Math.abs(to - from) * STOP_W;
    const speed = Math.max(WALK_SPEED, dist / MAX_TRAVEL);
    const dur = dist / speed;
    // Cuantizar: terminar en la última celda del loop exige N ≡ 0 (mod 9)
    // ticks; el reposo es la pose siguiente natural (pies juntos).
    const idealFrameMs = Math.max((1000 * STRIDE) / speed / 9, 16);
    const nFrames = Math.max(9, Math.round((dur * 1000) / idealFrameMs / 9) * 9);
    setFrameMs((dur * 1000) / nFrames);
    setFacingRight(to > from);
    setWalking(true);
    setWalkDur(dur);
    setInteracted(true);
    walkingRef.current = true;
    tweenWorld(worldTarget(to), dur);
    if (walkTimer.current) clearTimeout(walkTimer.current);
    walkTimer.current = setTimeout(() => {
      setWalking(false);
      walkingRef.current = false;
      setFacingRight(true); // en reposo, siempre mirando a la derecha
    }, dur * 1000);
  }, [tweenWorld, worldTarget]);

  // Navegación bloqueada mientras camina: la animación se completa siempre
  const go = useCallback((delta: 1 | -1) => {
    if (walkingRef.current) return;
    const prev = curRef.current;
    const next = prev + delta;
    if (next < 0 || next >= milestones.length) return;
    curRef.current = next;
    setCur(next);
    startWalk(prev, next);
  }, [startWalk]);

  const jump = useCallback((target: number) => {
    if (walkingRef.current) return;
    const prev = curRef.current;
    if (target === prev || target < 0 || target >= milestones.length) return;
    curRef.current = target;
    setCur(target);
    startWalk(prev, target);
  }, [startWalk]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Auto-scroll: debounce so rapid navigation settles before scrolling
  useEffect(() => {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const el = cardsRef.current?.querySelector<HTMLElement>("[data-active]");
      if (el) el.scrollIntoView({ block: "nearest", inline: "center" });
      setTimeout(updateScrollFades, 350);
    }, 80);
  }, [cur, updateScrollFades]);

  const m = milestones[cur];
  const tc = TC[m.type];

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="section-label mb-3"
        >
          {lang === "en" ? "Career Journey" : "Trayectoria"}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A] mb-3"
        >
          {lang === "en" ? "15 stops. One journey." : "15 paradas. Un camino."}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="text-[13px] text-[#52525B] flex items-center gap-2 flex-wrap"
        >
          <span className="flex gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-[#E4E4E7] text-[11px] font-mono bg-[#FAFAFA]">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-[#E4E4E7] text-[11px] font-mono bg-[#FAFAFA]">→</kbd>
          </span>
          {lang === "en"
            ? "Arrows, swipe, or buttons to walk through my story"
            : "Flechas, desliza o botones para recorrer mi historia"}
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:ml-auto">
            {(Object.entries(TC) as [MType, (typeof TC)[MType]][]).map(([key, val]) => (
              <span key={key} className="flex items-center gap-1">
                <span className="text-[11px]">{val.icon}</span>
                <span className="text-[10.5px] text-[#71717A]">{lang === "en" ? val.labelEn : val.labelEs}</span>
              </span>
            ))}
          </span>
        </motion.p>
      </div>

      {/* ── Game — full width ── */}
      <motion.div
        ref={viewRef}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-[#E4E4E7] overflow-hidden relative select-none"
        style={{ height: 240 }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        <BgScene cur={cur} />

        {/* Scrolling world — tween rAF lineal: velocidad constante = pies en sync */}
        <div
          ref={worldRef}
          style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: STOP_W * milestones.length + vw, willChange: "transform" }}
        >
          {/* Ground fill */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 30, background: "#E4E4E7" }} />
          {/* Ground top edge */}
          <div style={{ position: "absolute", bottom: 30, left: 0, right: 0, height: 2, background: "#D1D5DB" }} />

          {/* Milestone posts */}
          {milestones.map((ms, i) => {
            const isPast = i < cur;
            const isActive = i === cur;
            const c = TC[ms.type];
            const px = i * STOP_W + STOP_W / 2;
            const postH = isActive ? 52 : 28;
            return (
              <Fragment key={i}>
                {/* Post stem */}
                <div style={{
                  position: "absolute", bottom: 32, left: px - 1, width: 2, height: postH,
                  background: isActive ? c.color : isPast ? "#A1A1AA" : "#D1D5DB",
                  transition: "all 0.35s ease",
                }} />
                {/* Post cap */}
                <div style={{
                  position: "absolute", bottom: 32 + postH,
                  left: px - (isActive ? 6 : 4),
                  width: isActive ? 12 : 8, height: isActive ? 12 : 8,
                  borderRadius: "50%",
                  background: isActive ? c.color : isPast ? "#A1A1AA" : "#D1D5DB",
                  transition: "all 0.35s ease",
                  boxShadow: isActive ? `0 0 0 3px ${c.bg}, 0 0 0 5px ${c.color}40` : "none",
                }} />
                {/* Active icon */}
                {isActive && (
                  <div style={{
                    position: "absolute", bottom: 32 + postH + 14,
                    left: px - 9, fontSize: 14, lineHeight: 1,
                  }}>{c.icon}</div>
                )}
                {/* Post number */}
                <div style={{
                  position: "absolute", bottom: 10, left: px,
                  transform: "translateX(-50%)",
                  fontSize: 10, color: isActive ? c.color : "#52525B",
                  fontWeight: 700, fontFamily: "var(--font-red-hat-mono), monospace",
                  whiteSpace: "nowrap", transition: "color 0.35s ease", userSelect: "none",
                }}>
                  {i + 1}
                </div>
              </Fragment>
            );
          })}

          {/* Placa de mundo: letrero compacto sobre el poste activo — viaja con el mundo */}
          {!walking && (
            <motion.div
              key={`plaque-${cur}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              style={{
                position: "absolute",
                bottom: 144,
                left: cur * STOP_W + STOP_W / 2,
                transform: "translateX(-50%)",
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.94)",
                border: `1px solid ${tc.color}40`,
                borderLeft: `3px solid ${tc.color}`,
                borderRadius: 8,
                padding: "5px 9px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              <span style={{ fontSize: 11 }}>{tc.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#18181B" }}>
                {m.org && m.org !== "—" ? m.org : (lang === "en" ? m.en : m.es)}
              </span>
              <span style={{ fontSize: 9.5, fontFamily: "var(--font-red-hat-mono), monospace", color: "#71717A" }}>{m.year}</span>
            </motion.div>
          )}
        </div>

        {/* Character — fixed at viewport center (el sprite ya trae el bob natural) */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
          <Char walking={walking} facingRight={facingRight} frameMs={frameMs} era={cur < 3 ? 0 : cur < 7 ? 1 : 2} />
        </div>

        {/* Hint contextual — solo antes de la primera interacción */}
        {!interacted && (
          <div style={{
            position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
            background: "rgba(24,24,27,0.72)", color: "#FAFAFA",
            fontSize: 10.5, borderRadius: 999, padding: "4px 12px",
            pointerEvents: "none", letterSpacing: "0.02em",
          }}>
            {lang === "en" ? "← →  walk through my story" : "← →  recorre mi historia"}
          </div>
        )}

        {/* Announcer para lectores de pantalla */}
        <div aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          {!walking && `${lang === "en" ? "Stop" : "Parada"} ${cur + 1} / ${milestones.length}: ${m.org && m.org !== "—" ? m.org : (lang === "en" ? m.en : m.es)} — ${lang === "en" ? m.roleEn : m.roleEs}, ${m.year}`}
        </div>
      </motion.div>

      {/* ── Progress + Nav controls ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="flex items-center gap-2 mt-3"
      >
        <button
          onClick={() => go(-1)} disabled={cur === 0 || walking}
          className="relative overflow-hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E4E4E7] text-[12px] font-medium text-[#3F3F46] hover:bg-[#FAFAFA] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 2L3.5 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {lang === "en" ? "Prev" : "Ant."}
          {walking && <span key={cur} className="walk-progress" style={{ animationDuration: `${walkDur}s` }} />}
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-[3px] flex-1 justify-center">
          {milestones.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => jump(i)}
              animate={{
                width: i === cur ? 18 : 6,
                background: i === cur ? tc.color : i < cur ? "#9CA3AF" : "#E4E4E7",
              }}
              transition={{ duration: 0.3 }}
              aria-label={`${lang === "en" ? "Go to stop" : "Ir a parada"} ${i + 1}`}
              style={{ height: 6, borderRadius: 999, flexShrink: 0, cursor: "pointer" }}
            />
          ))}
        </div>

        <span className="text-[11px] font-mono text-[#A1A1AA] tabular-nums">
          {cur + 1}/{milestones.length}
        </span>

        <button
          onClick={() => go(1)} disabled={cur === milestones.length - 1 || walking}
          className="relative overflow-hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E4E4E7] text-[12px] font-medium text-[#3F3F46] hover:bg-[#FAFAFA] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {lang === "en" ? "Next" : "Sig."}
          {walking && <span key={cur} className="walk-progress" style={{ animationDuration: `${walkDur}s` }} />}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>

      {/* ── Experience cards strip ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
        className="mt-5"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="section-label">
            {lang === "en" ? "Experience Log" : "Registro de Experiencia"}
          </p>
          <p className="text-[11px] text-[#A1A1AA]">
            {lang === "en" ? "Tap a card to jump" : "Toca para saltar"}
          </p>
        </div>

        <div className="relative">
          {/* fades laterales: solo cuando hay contenido oculto de ese lado */}
          {canScrollL && <div className="pointer-events-none absolute left-0 top-0 bottom-3 w-8 z-10"
            style={{ background: "linear-gradient(90deg, #FAFAFA 0%, transparent 100%)" }} />}
          {canScrollR && <div className="pointer-events-none absolute right-0 top-0 bottom-3 w-8 z-10"
            style={{ background: "linear-gradient(270deg, #FAFAFA 0%, transparent 100%)" }} />}
        <div
          ref={cardsRef}
          onScroll={updateScrollFades}
          className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory no-scrollbar cursor-grab"
        >
          {milestones.map((ms) => (
            <ExperienceCard
              key={ms.index}
              ms={ms}
              isActive={ms.index === cur}
              future={ms.index > cur}
              lang={lang}
              onClick={() => jump(ms.index)}
            />
          ))}
        </div>
        </div>
      </motion.div>


    </div>
  );
}
