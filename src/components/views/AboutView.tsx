"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Iconos: trazo 1.5, un solo color ────────────────────────── */
const I = {
  ship: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 10.5L10.5 3.5M5.5 3.5h5v5" />
    </svg>
  ),
  code: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 4L2 7l2.5 3M9.5 4L12 7l-2.5 3" />
    </svg>
  ),
  target: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="7" r="5" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  globe: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="7" r="5" />
      <path d="M2 7h10M7 2c1.8 1.6 1.8 8.4 0 10M7 2c-1.8 1.6-1.8 8.4 0 10" />
    </svg>
  ),
  bolt: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M7.5 1.5L3 8h3l-.5 4.5L10 6H7l.5-4.5z" />
    </svg>
  ),
  users: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="5" cy="4.5" r="2" />
      <path d="M1.5 12c0-2 1.5-3.5 3.5-3.5S8.5 10 8.5 12" />
      <circle cx="10" cy="5" r="1.5" />
      <path d="M9.5 8.7c1.7.2 3 1.5 3 3.3" />
    </svg>
  ),
  ball: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="7" r="5" />
      <path d="M7 4.2L9.4 6l-.9 2.8H5.5L4.6 6 7 4.2zM7 2v2.2M2.3 5.6L4.6 6M3.4 10.8l2.1-2M10.6 10.8l-2.1-2M11.7 5.6L9.4 6" strokeWidth="1.1" />
    </svg>
  ),
  tennis: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <ellipse cx="8.2" cy="5.2" rx="3.6" ry="4" transform="rotate(35 8.2 5.2)" />
      <path d="M5.4 8.4L2 12M6.2 3.2c1.8 1 3.4 2.8 4 5" strokeWidth="1.1" />
    </svg>
  ),
  chart: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 12.5h11M2.5 9.5L5.5 6l2.5 2 3.5-4.5" />
      <path d="M9 3.5h2.5V6" />
    </svg>
  ),
  dumbbell: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4.5 7h5" />
      <rect x="2" y="4.5" width="2" height="5" rx="0.8" />
      <rect x="10" y="4.5" width="2" height="5" rx="0.8" />
    </svg>
  ),
  spark: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 1.5l1.2 3.3L11.5 6 8.2 7.2 7 10.5 5.8 7.2 2.5 6l3.3-1.2L7 1.5z" />
      <path d="M11.5 10l.5 1.5L13.5 12l-1.5.5-.5 1.5-.5-1.5L9.5 12l1.5-.5.5-1.5z" strokeWidth="1.1" />
    </svg>
  ),
  pan: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="5.5" cy="8.5" r="3.5" />
      <path d="M9 8.5h3.5" />
      <path d="M4.2 2c-.4.7.4 1 0 1.7M6.8 2c-.4.7.4 1 0 1.7" strokeWidth="1.1" />
    </svg>
  ),
  plus: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M7 3v8M3 7h8" />
    </svg>
  ),
  stop: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <rect x="2.5" y="2.5" width="7" height="7" rx="1.5" />
    </svg>
  ),
};

function IconChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-7 h-7 rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] text-[#3F3F46] flex items-center justify-center flex-shrink-0">
      {children}
    </span>
  );
}

/* ── Vinilo: al hover gira Y suena (pausa al salir); clic = toggle para táctil/teclado ── */
function Vinyl({ title, moment, hue, playing, onClick, onEnter, onLeave }: {
  title: string; moment: string; hue: string; playing: boolean;
  onClick: () => void; onEnter: () => void; onLeave: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      aria-pressed={playing}
      className="group flex flex-col items-center gap-2 rounded-xl p-2 -m-2
                 focus-visible:outline-2 focus-visible:outline-[#1E40AF] transition-colors"
    >
      <div
        className="relative w-[80px] h-[80px] rounded-full"
        style={{ boxShadow: playing ? `0 0 0 2px ${hue}` : "0 1px 3px rgb(0 0 0 / 0.12)" }}
      >
        {/* capa que ROTA: grooves + destello asimétrico + etiqueta con marca fuera de centro */}
        <div
          className={`vinyl absolute inset-0 rounded-full ${playing ? "vinyl-playing" : ""}`}
          style={{
            background:
              "conic-gradient(from 40deg, rgba(255,255,255,0.16) 0deg, transparent 60deg, transparent 170deg, rgba(255,255,255,0.10) 215deg, transparent 265deg), repeating-radial-gradient(circle at 50% 50%, #17171A 0px, #17171A 2px, #222226 3px, #17171A 4px)",
          }}
        >
          {/* tick radial: reflejo que delata el giro */}
          <div className="absolute top-[5px] left-1/2 -ml-px w-[2px] h-[18px] rounded-full bg-white/35" />
          <div className="absolute inset-0 m-auto w-8 h-8 rounded-full" style={{ background: hue }}>
            {/* marca fuera de centro en la etiqueta */}
            <div className="absolute top-[3px] left-1/2 -ml-[2.5px] w-[5px] h-[5px] rounded-full bg-[#0A0A0A]/70" />
            <div className="absolute inset-0 m-auto w-1 h-1 rounded-full bg-[#0A0A0A]" />
          </div>
        </div>
        {/* brillo ESTÁTICO encima — contraste que delata el giro de abajo */}
        <div
          className="absolute inset-0 rounded-full opacity-25 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 42%)" }}
        />
      </div>
      <div className="text-center">
        <p className="text-[13px] font-semibold text-[#0A0A0A] leading-tight">{title}</p>
        <p className="text-[12px] text-[#52525B]">{moment}</p>
      </div>
    </button>
  );
}

export default function AboutView() {
  const { lang } = useLang();
  const en = lang === "en";
  const [playing, setPlaying] = useState<number | null>(null); // vinilo sonando ahora
  const [loaded, setLoaded] = useState<number | null>(null);   // video cargado en el iframe
  const [blocked, setBlocked] = useState<Set<number>>(new Set()); // videos con embed deshabilitado (error 101/150)
  const [track, setTrack] = useState<{ title: string; author: string } | null>(null); // metadata real del video sonando
  const playerRef = useRef<HTMLIFrameElement | null>(null);
  const loadedRef = useRef<number | null>(null);
  loadedRef.current = loaded;

  // Escucha al player: metadata del video (título/artista) y errores de embed.
  useEffect(() => {
    // limpia ruido de títulos de YouTube: "(Official Video)", "[Official Audio]", etc.
    const cleanTitle = (t: string) =>
      t.replace(/\s*[([][^)\]]*(official|video|audio|music|lyric|visualizer)[^)\]]*[)\]]/gi, "").trim();
    const cleanAuthor = (a: string) => a.replace(/\s*-\s*Topic$/i, "").replace(/VEVO$/i, "").trim();
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== "https://www.youtube.com" || e.source !== playerRef.current?.contentWindow) return;
      try {
        const d = JSON.parse(e.data);
        const vd = d.info?.videoData;
        if (vd?.title) {
          const title = cleanTitle(vd.title);
          const author = cleanAuthor(vd.author || "");
          // si el título ya trae al artista ("Sech - Toco Mentir"), no lo repetimos
          const redundant = author && title.toLowerCase().includes(author.toLowerCase());
          setTrack({ title, author: redundant ? "" : author });
        }
        if (d.event === "onError" && loadedRef.current !== null) {
          const idx = loadedRef.current;
          setBlocked((prev) => new Set(prev).add(idx));
        }
      } catch {}
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const bio = en
    ? [
        "I started coding interactive experiences before 'UX' was a job title in Colombia. At HUGE, working with the Google team taught me that scale breaks everything you don't document.",
        "Since then I've led design for startups in Web3, fintech and AI — most had more ambition than budget. That constraint made me a better designer.",
        "I'm not precious about tools. I'm precise about outcomes.",
      ]
    : [
        "Empecé a programar experiencias interactivas antes de que 'UX' fuera un cargo en Colombia. En HUGE, trabajar con el equipo de Google me enseñó que la escala rompe todo lo que no documentas.",
        "Desde entonces he liderado diseño para startups de Web3, fintech e IA — la mayoría con más ambición que presupuesto. Esa restricción me hizo mejor diseñador.",
        "No soy precioso con las herramientas. Soy preciso con los resultados.",
      ];

  const opinions = [
    { en: "High-fidelity prototypes in early discovery are wasted money.", es: "Los prototipos hi-fi en descubrimiento temprano son dinero tirado." },
    { en: "Design systems fail when they're built for designers, not engineers.", es: "Los design systems fallan cuando se construyen para diseñadores, no para ingenieros." },
    { en: "AI won't replace designers — just designers who don't use it.", es: "La IA no reemplazará a los diseñadores — solo a los que no la usan." },
  ];

  const benefits = [
    { icon: I.ship, en: ["Ships to production", "22+ products live — design that reaches users, not Dropbox."], es: ["Entrega a producción", "22+ productos vivos — diseño que llega a usuarios, no a Dropbox."] },
    { icon: I.code, en: ["Speaks code", "Real frontend PRs with AI tooling. Zero friction with engineering."], es: ["Habla código", "PRs de frontend reales con IA. Cero fricción con ingeniería."] },
    { icon: I.target, en: ["Research to pixel", "User research, design systems and UI — one person, full loop."], es: ["Del research al pixel", "Investigación, sistemas de diseño y UI — una persona, el ciclo completo."] },
    { icon: I.globe, en: ["Remote-native", "Bilingual EN/ES. Teams across US, EU, LATAM and Asia timezones."], es: ["Remoto nativo", "Bilingüe EN/ES. Equipos en husos de US, EU, LATAM y Asia."] },
    { icon: I.bolt, en: ["Startup speed, agency rigor", "MVPs in weeks with HUGE/Google-grade craft."], es: ["Velocidad startup, rigor de agencia", "MVPs en semanas con oficio nivel HUGE/Google."] },
    { icon: I.users, en: ["Multiplies teams", "10+ designers mentored. I leave systems, not dependencies."], es: ["Multiplica equipos", "10+ diseñadores mentoreados. Dejo sistemas, no dependencias."] },
  ];

  const hobbies = [
    { icon: I.ball, en: "Soccer", es: "Fútbol", sub: en ? "Weekend games" : "Partidos de finde", tint: "#16A34A", bg: "#F0FDF4" },
    { icon: I.tennis, en: "Tennis", es: "Tenis", sub: en ? "Court time" : "Tiempo en cancha", tint: "#65A30D", bg: "#F7FEE7" },
    { icon: I.chart, en: "Crypto / Investing", es: "Crypto / Inversiones", sub: en ? "Long-term thinking" : "Pensamiento a largo plazo", tint: "#D97706", bg: "#FFFBEB" },
    { icon: I.dumbbell, en: "Gym", es: "Gym", sub: en ? "Daily discipline" : "Disciplina diaria", tint: "#DC2626", bg: "#FEF2F2" },
    { icon: I.pan, en: "Cooking", es: "Cocinar", sub: en ? "Kitchen sessions" : "Sesiones de cocina", tint: "#0D9488", bg: "#F0FDFA" },
    { icon: I.spark, en: "Learning AI", es: "Aprendiendo IA", sub: en ? "Always studying" : "Siempre estudiando", tint: "#7C3AED", bg: "#F5F3FF" },
  ];

  // Cada vinilo apunta a un video de YouTube; suena en un iframe oculto (sin salir de la página).
  const vinyls: { title: string; moment: string; hue: string; yt: string }[] = [
    { title: en ? "To start the day" : "Para empezar el día", moment: en ? "Mornings" : "Mañanas", hue: "#EAB308", yt: "k49I5m1J6Is" },
    { title: "Salsa", moment: en ? "Weekends" : "Fines de semana", hue: "#DC2626", yt: "R70wWRqWU_c" },
    { title: en ? "For creativity" : "Para crear", moment: en ? "Flow mode" : "Modo flow", hue: "#7C3AED", yt: "Qr0-7Ds79zo" },
    { title: en ? "Cooking" : "Cocinando", moment: en ? "Kitchen sessions" : "Sesiones de cocina", hue: "#D97706", yt: "ZNzYr4U7Zs8" },
    { title: "Deep work", moment: en ? "Focus" : "Concentración", hue: "#2563EB", yt: "3QwZjhHcLZk" },
    { title: en ? "Dancing" : "Bailando", moment: en ? "Full volume" : "A todo volumen", hue: "#DB2777", yt: "6TI8EeF_Oko" },
  ];

  // Comando al iframe de YouTube vía postMessage (enablejsapi=1) — sin recargar el video.
  const ytCmd = (func: "playVideo" | "pauseVideo") => {
    playerRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "https://www.youtube.com"
    );
  };

  // Hover: si el video ya está cargado solo reanuda; si es otro, cambia el src (autoplay).
  const startVinyl = (i: number) => {
    if (!blocked.has(i)) {
      if (loaded === i) {
        ytCmd("playVideo");
      } else {
        setTrack(null); // video nuevo: la metadata vieja ya no aplica
        setLoaded(i);
      }
    }
    setPlaying(i);
  };

  const pauseVinyl = () => {
    ytCmd("pauseVideo");
    setPlaying(null);
  };

  // Clic (táctil / teclado): toggle; si el embed está bloqueado, abre YouTube.
  const toggleVinyl = (i: number) => {
    if (blocked.has(i)) {
      window.open(`https://www.youtube.com/watch?v=${vinyls[i].yt}`, "_blank", "noopener");
    } else if (playing === i) {
      pauseVinyl();
    } else {
      startVinyl(i);
    }
  };

  const bucketlist = [
    { flag: "🇺🇾", name: "Uruguay", region: en ? "South America" : "Sudamérica" },
    { flag: "🇯🇵", name: en ? "Japan" : "Japón", region: "Asia" },
    { flag: "🇸🇬", name: en ? "Singapore" : "Singapur", region: "Asia" },
    { flag: "🇦🇪", name: "Dubai", region: en ? "Middle East" : "Medio Oriente" },
    { flag: "🇬🇧", name: en ? "United Kingdom" : "Reino Unido", region: en ? "Europe" : "Europa" },
    { flag: "🇵🇹", name: "Portugal", region: en ? "Europe" : "Europa" },
  ];

  const galleryLabels = en
    ? ["Street", "Architecture", "Travel", "Detail"]
    : ["Calle", "Arquitectura", "Viajes", "Detalle"];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="lg:flex lg:items-start lg:gap-6">
      {/* ══ Panel izquierdo — sticky, alto completo ══ */}
      <motion.aside
        variants={item}
        className="lg:w-[320px] lg:flex-shrink-0 lg:sticky lg:top-0 mb-6 lg:mb-0
                   bg-white border border-[#E4E4E7] rounded-2xl p-6
                   lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto no-scrollbar"
      >
        <Image src="/ico.png" alt="Javier Mora" width={64} height={64} className="rounded-2xl mb-4" priority />
        <p className="section-label mb-2">{en ? "Who I am" : "Quién soy"}</p>
        <h1 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] mb-4">
          {en ? "The person behind the pixels." : "La persona detrás de los píxeles."}
        </h1>

        <div className="space-y-3 mb-6">
          {bio.map((p, i) => (
            <p key={i} className="text-[14px] text-[#3F3F46] leading-[1.65]">{p}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            en ? "Colombia · Remote" : "Colombia · Remoto",
            "EN / ES",
            en ? "7 years exp." : "7 años exp.",
          ].map((f, i) => (
            <span key={i} className="text-[12px] font-medium text-[#3F3F46] bg-[#FAFAFA] border border-[#E4E4E7] rounded-full px-2.5 py-1">
              {f}
            </span>
          ))}
        </div>

        <hr className="border-[#E4E4E7] mb-5" />

        <p className="section-label mb-3">{en ? "Opinions I'll defend" : "Opiniones que defiendo"}</p>
        <ul>
          {opinions.map((o, i) => (
            <li key={i} className={`py-3 flex gap-3 items-start ${i < opinions.length - 1 ? "border-b border-[#F4F4F5]" : ""}`}>
              <span className="text-[#1E40AF] font-mono text-[12px] mt-0.5 flex-shrink-0" aria-hidden>—</span>
              <p className="text-[#18181B] text-[13px] leading-[1.6]">{en ? o.en : o.es}</p>
            </li>
          ))}
        </ul>
      </motion.aside>

      {/* ══ Bento derecho ══ */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">

        {/* Beneficios */}
        <motion.section variants={item} className="sm:col-span-2 bg-white border border-[#E4E4E7] rounded-2xl p-6">
          <p className="section-label mb-1">{en ? "Why work with me" : "Por qué trabajar conmigo"}</p>
          <h2 className="text-[18px] font-semibold text-[#0A0A0A] mb-5">
            {en ? "What you get, beyond the portfolio." : "Lo que obtienes, más allá del portafolio."}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            {benefits.map((b, i) => {
              const [title, desc] = en ? b.en : b.es;
              return (
                <div key={i} className="flex gap-3 items-start">
                  <IconChip>{b.icon}</IconChip>
                  <div>
                    <p className="text-[13px] font-semibold text-[#0A0A0A] leading-tight mb-1">{title}</p>
                    <p className="text-[12.5px] text-[#52525B] leading-[1.55]">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Vinilos — clic para reproducir */}
        <motion.section variants={item} className="sm:col-span-2 bg-white border border-[#E4E4E7] rounded-2xl p-6">
          <div className="flex items-baseline justify-between mb-5 gap-2">
            <div>
              <p className="section-label mb-1">{en ? "On rotation" : "En rotación"}</p>
              <h2 className="text-[16px] font-semibold text-[#0A0A0A]">
                {en ? "The soundtrack" : "El soundtrack"}
              </h2>
            </div>
            <span className="text-[12px] text-[#52525B]">
              {en ? "Hover to play" : "Pasa el mouse para reproducir"}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-5">
            {vinyls.map((v, i) => (
              <Vinyl
                key={i}
                title={v.title}
                moment={v.moment}
                hue={v.hue}
                playing={playing === i}
                onClick={() => toggleVinyl(i)}
                onEnter={() => startVinyl(i)}
                onLeave={pauseVinyl}
              />
            ))}
          </div>
          {/* barra de estado — el audio suena en el iframe oculto de abajo */}
          <div className="mt-4 h-[18px]" aria-live="polite">
            {playing !== null && (blocked.has(playing) ? (
              <p className="text-[12px] font-medium text-[#3F3F46]">
                {en
                  ? `${vinyls[playing].title} only plays on YouTube — click the vinyl to open it`
                  : `${vinyls[playing].title} solo suena en YouTube — haz clic en el vinilo para abrirlo`}
              </p>
            ) : (
              <p className="text-[12px] font-medium text-[#3F3F46] flex items-center gap-2">
                <span className="inline-flex items-end gap-[2px] h-[10px]" aria-hidden>
                  <span className="eq-bar" style={{ background: vinyls[playing].hue }} />
                  <span className="eq-bar eq-bar-2" style={{ background: vinyls[playing].hue }} />
                  <span className="eq-bar eq-bar-3" style={{ background: vinyls[playing].hue }} />
                </span>
                {en ? "Now playing" : "Sonando"}:{" "}
                {track
                  ? `${track.title}${track.author ? ` — ${track.author}` : ""}`
                  : `${vinyls[playing].title} — ${vinyls[playing].moment}`}
              </p>
            ))}
          </div>
          {loaded !== null && (
            <iframe
              ref={playerRef}
              key={loaded}
              src={`https://www.youtube.com/embed/${vinyls[loaded].yt}?autoplay=1&enablejsapi=1&origin=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""}`}
              title={`${vinyls[loaded].title} — YouTube audio`}
              onLoad={() =>
                playerRef.current?.contentWindow?.postMessage(
                  JSON.stringify({ event: "listening", id: 1, channel: "widget" }),
                  "https://www.youtube.com"
                )
              }
              allow="autoplay; encrypted-media"
              tabIndex={-1}
              aria-hidden
              className="fixed w-px h-px opacity-0 pointer-events-none -left-full bottom-0"
            />
          )}
        </motion.section>

        {/* Off hours + Bucketlist — listas verticales de cards gráficas */}
        <motion.section variants={item} className="bg-white border border-[#E4E4E7] rounded-2xl p-6">
          <p className="section-label mb-1">{en ? "Off hours" : "Fuera de horario"}</p>
          <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-4">
            {en ? "When I'm not designing" : "Cuando no estoy diseñando"}
          </h2>
          <ul className="space-y-2.5">
            {hobbies.map((h, i) => (
              <li
                key={i}
                className="relative overflow-hidden flex items-center gap-3.5 border border-[#E4E4E7] rounded-xl px-4 py-3
                           hover:border-[#A1A1AA] transition-colors"
              >
                {/* marca de agua del icono */}
                <span
                  className="absolute -right-2 -bottom-3 opacity-[0.07] pointer-events-none"
                  style={{ color: h.tint, transform: "scale(3.6) rotate(-8deg)" }}
                  aria-hidden
                >
                  {h.icon}
                </span>
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: h.bg, color: h.tint }}
                >
                  {h.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-[#0A0A0A] leading-tight">{en ? h.en : h.es}</p>
                  <p className="text-[12px] text-[#52525B] mt-0.5">{h.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Bucketlist — el único lugar con emojis (banderas) */}
        <motion.section variants={item} className="bg-white border border-[#E4E4E7] rounded-2xl p-6">
          <div className="flex items-baseline justify-between mb-4 gap-2">
            <div>
              <p className="section-label mb-1">Bucketlist</p>
              <h2 className="text-[16px] font-semibold text-[#0A0A0A]">
                {en ? "Countries I want to visit and learn from" : "Países que quiero visitar y aprender de su cultura"}
              </h2>
            </div>
            <span className="text-[12px] font-mono text-[#52525B] tabular-nums flex-shrink-0">
              0 / {bucketlist.length}
            </span>
          </div>
          <ul className="space-y-2.5">
            {bucketlist.map((c, i) => (
              <li
                key={i}
                className="flex items-center gap-3.5 border border-[#E4E4E7] rounded-xl px-4 py-3
                           hover:border-[#A1A1AA] transition-colors"
              >
                <span className="w-10 h-10 rounded-xl bg-[#FAFAFA] border border-[#F4F4F5] flex items-center justify-center flex-shrink-0 text-[20px]" aria-hidden>
                  {c.flag}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-[#0A0A0A] leading-tight truncate">{c.name}</p>
                  <p className="text-[12px] text-[#52525B] mt-0.5">{c.region}</p>
                </div>
                <span className="w-[15px] h-[15px] rounded-[5px] border border-[#A1A1AA] flex-shrink-0" aria-hidden />
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Galería */}
        <motion.section variants={item} className="sm:col-span-2 bg-white border border-[#E4E4E7] rounded-2xl p-6">
          <p className="section-label mb-1">{en ? "Through my lens" : "A través de mi lente"}</p>
          <h2 className="text-[16px] font-semibold text-[#0A0A0A] mb-4">
            {en ? "Gallery — in progress" : "Galería — en construcción"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {galleryLabels.map((label, i) => (
              <div
                key={i}
                className={`rounded-xl bg-[#FAFAFA] border border-dashed border-[#A1A1AA] text-[#52525B]
                            flex flex-col items-center justify-center gap-2
                            hover:border-[#52525B] hover:text-[#3F3F46] transition-colors
                            ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
              >
                {I.plus}
                <span className="text-[12px] font-mono uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[#52525B] mt-3">
            {en ? "Photos coming soon." : "Fotos próximamente."}
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
}
