export type Lang = "en" | "es";

export const translations = {
  en: {
    nav: {
      work: "Work",
      about: "About",
      experience: "Experience",
      now: "Now",
      contact: "Contact",
      langToggle: "ES",
    },
    hero: {
      greeting: "Hey, I'm",
      name: "Javier Mora",
      roles: ["Product Designer", "Information Architect", "Insight Driven"],
      tagline:
        "I craft outstanding digital products at the intersection of UX, Web3, and AI — turning complex systems into intuitive experiences.",
      cta: "View my work",
      contact: "Say hello",
      location: "Based in Miami · Available worldwide",
    },
    about: {
      label: "About me",
      title: "Designing with empathy.\nBuilding with precision.",
      bio1:
        "I'm an Interactive Media Designer from ICESI University (Colombia, 2018) with 8+ years crafting digital experiences across fintech, Web3, and AI-driven products.",
      bio2:
        "My time at HUGE Inc. on the Google team sharpened my expertise in design systems and developer collaboration — I've since led UX for startups transforming ideas into market-ready solutions.",
      bio3:
        "I believe great design is invisible: it solves real problems so seamlessly that users never think about it.",
      stats: [
        { value: "8+", label: "Years of experience" },
        { value: "20+", label: "Products shipped" },
        { value: "3", label: "Continents reached" },
      ],
      email: "hello@javiermora.co",
      downloadCV: "Download CV",
    },
    work: {
      label: "Selected work",
      title: "Projects that move\nthe needle.",
      viewCase: "View case study",
      viewLive: "View live",
      comingSoon: "Coming soon",
      projects: [
        {
          slug: "tactica",
          title: "Tactica",
          category: "Mobile App · UX/UI Design",
          description:
            "End-to-end UX design for a sports facility booking platform with real-time payments, push notifications, and event management.",
          tags: ["React Native", "Firebase", "UX Research", "Design Systems"],
          color: "#7C3AED",
          year: "2025",
          live: "https://tactica.javiermora.co",
        },
        {
          slug: "kolo",
          title: "KOLO",
          category: "SaaS · ERP/POS Design",
          description:
            "Product design for a B2B ERP/POS SaaS platform targeting SMEs in Guatemala, El Salvador, and Honduras.",
          tags: ["SaaS", "ERP", "POS", "Mobile First"],
          color: "#14B8A6",
          year: "2024–2025",
          live: null,
        },
        {
          slug: "defi-platform",
          title: "DeFi Platform",
          category: "Web3 · Product Design",
          description:
            "Redesigned core flows for a decentralized finance platform — staking, governance, and portfolio dashboards.",
          tags: ["Web3", "DeFi", "Dashboard", "Blockchain"],
          color: "#F59E0B",
          year: "2023",
          live: null,
        },
      ],
    },
    experience: {
      label: "Experience",
      title: "Where I've been.",
      items: [
        {
          company: "Uxearch Studio",
          role: "Co-founder · Lead UX Designer",
          period: "2022 — Present",
          location: "Miami, FL",
          description:
            "Co-founded a UX studio focused on Web3, fintech, and AI products. Led design for 10+ startups from zero to launch.",
          highlights: ["UX Strategy", "Design Systems", "Team Leadership"],
        },
        {
          company: "HUGE Inc.",
          role: "Senior UX Designer · Google Team",
          period: "2020 — 2022",
          location: "New York, NY",
          description:
            "Embedded on the Google team at HUGE. Built and maintained large-scale design systems, collaborating daily with engineering across multiple product lines.",
          highlights: ["Design Systems", "Google Products", "Dev Collaboration"],
        },
        {
          company: "Freelance",
          role: "UX/UI Designer",
          period: "2018 — 2020",
          location: "Colombia · Remote",
          description:
            "Worked with startups and agencies across LATAM on mobile apps, dashboards, and brand identity projects.",
          highlights: ["Mobile Design", "Branding", "Startups"],
        },
      ],
    },
    skills: {
      label: "Skills",
      title: "My toolkit.",
      categories: [
        {
          name: "Design",
          items: ["Figma", "Framer", "Principle", "ProtoPie", "Adobe XD", "Illustrator"],
        },
        {
          name: "Research",
          items: ["User Interviews", "Usability Testing", "Journey Mapping", "A/B Testing", "Analytics"],
        },
        {
          name: "Systems",
          items: ["Design Systems", "Component Libraries", "Tokens", "Atomic Design", "Storybook"],
        },
        {
          name: "Tech",
          items: ["Tailwind CSS", "React", "HTML/CSS", "Firebase", "Webflow", "Framer Sites"],
        },
      ],
    },
    education: {
      label: "Education",
      title: "Where I learned\nto think.",
      items: [
        {
          institution: "ICESI University",
          degree: "B.S. Interactive Media Design",
          period: "2014 — 2018",
          location: "Cali, Colombia",
          description: "Studied interaction design, information architecture, user research, and digital media production.",
        },
        {
          institution: "Interaction Design Foundation",
          degree: "UX Design · Human-Computer Interaction",
          period: "2019 — 2021",
          location: "Online",
          description: "Advanced courses in UX methodology, accessibility, and cognitive psychology applied to design.",
        },
      ],
    },
    now: {
      label: "Now",
      title: "What I'm up to\nright now.",
      subtitle: "A living section — updated whenever something changes.",
      building: {
        label: "Building",
        items: [
          "KOLO — ERP/POS SaaS for SMEs in Central America",
          "Uxearch Studio internal design system",
          "A personal toolkit for async UX research",
        ],
      },
      learning: {
        label: "Learning",
        items: [
          "AI-native product design patterns",
          "Motion design with Framer Motion",
          "Spanish → English dual-market positioning",
        ],
      },
      reading: {
        label: "Reading",
        items: [
          "Shape Up — Basecamp",
          "The Design of Everyday Things — Don Norman",
          "Zero to One — Peter Thiel",
        ],
      },
      location: "Miami, FL · Aug 2026",
    },
    hobbies: {
      label: "Outside work",
      title: "More than\na designer.",
      items: [
        {
          emoji: "⚽",
          title: "Soccer",
          description: "Weekend pickup games keep me grounded and remind me that great systems need great teamwork.",
        },
        {
          emoji: "📸",
          title: "Photography",
          description: "Street and architecture photography — training my eye for composition, light, and detail.",
        },
        {
          emoji: "✈️",
          title: "Travel",
          description: "Colombia, Mexico, Brazil, Spain, USA. Each city teaches me something new about how people live and interact.",
        },
        {
          emoji: "🎵",
          title: "Music",
          description: "Deep house and lo-fi while I work. Cumbia and salsa when the weekend hits.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's build\nsomething great.",
      subtitle:
        "I'm available for senior product design roles, consulting, and long-term partnerships. Fluent in English and Spanish.",
      cta: "Send me an email",
      orConnect: "Or connect on",
      availability: "Open to opportunities · Miami · Remote",
    },
    footer: {
      copy: "Designed & built by Javier Mora",
      year: "2026",
    },
  },

  es: {
    nav: {
      work: "Proyectos",
      about: "Sobre mí",
      experience: "Experiencia",
      now: "Ahora",
      contact: "Contacto",
      langToggle: "EN",
    },
    hero: {
      greeting: "Hola, soy",
      name: "Javier Mora",
      roles: ["Product Designer", "Information Architect", "Insight Driven"],
      tagline:
        "Diseño productos digitales excepcionales en la intersección de UX, Web3 e IA — convirtiendo sistemas complejos en experiencias intuitivas.",
      cta: "Ver mi trabajo",
      contact: "Escribeme",
      location: "Miami · Disponible a nivel mundial",
    },
    about: {
      label: "Sobre mí",
      title: "Diseño con empatía.\nConstruyo con precisión.",
      bio1:
        "Soy Diseñador de Medios Interactivos de la Universidad ICESI (Colombia, 2018) con más de 8 años creando experiencias digitales en fintech, Web3 y productos de IA.",
      bio2:
        "Mi paso por HUGE Inc. en el equipo de Google perfeccionó mi experiencia en sistemas de diseño y colaboración con desarrolladores — desde entonces he liderado UX para startups que llevan ideas al mercado.",
      bio3:
        "Creo que el gran diseño es invisible: resuelve problemas reales tan fluidamente que los usuarios nunca piensan en él.",
      stats: [
        { value: "8+", label: "Años de experiencia" },
        { value: "20+", label: "Productos lanzados" },
        { value: "3", label: "Continentes alcanzados" },
      ],
      email: "hello@javiermora.co",
      downloadCV: "Descargar CV",
    },
    work: {
      label: "Trabajo selecto",
      title: "Proyectos que\nmueven la aguja.",
      viewCase: "Ver caso de estudio",
      viewLive: "Ver en vivo",
      comingSoon: "Próximamente",
      projects: [
        {
          slug: "tactica",
          title: "Tactica",
          category: "App Móvil · Diseño UX/UI",
          description:
            "Diseño UX end-to-end para una plataforma de reservas de instalaciones deportivas con pagos en tiempo real, notificaciones push y gestión de eventos.",
          tags: ["React Native", "Firebase", "UX Research", "Design Systems"],
          color: "#7C3AED",
          year: "2025",
          live: "https://tactica.javiermora.co",
        },
        {
          slug: "kolo",
          title: "KOLO",
          category: "SaaS · Diseño ERP/POS",
          description:
            "Diseño de producto para una plataforma B2B ERP/POS SaaS dirigida a PyMEs en Guatemala, El Salvador y Honduras.",
          tags: ["SaaS", "ERP", "POS", "Mobile First"],
          color: "#14B8A6",
          year: "2024–2025",
          live: null,
        },
        {
          slug: "defi-platform",
          title: "Plataforma DeFi",
          category: "Web3 · Diseño de Producto",
          description:
            "Rediseño de flujos clave para una plataforma de finanzas descentralizadas — staking, gobernanza y dashboards de portafolio.",
          tags: ["Web3", "DeFi", "Dashboard", "Blockchain"],
          color: "#F59E0B",
          year: "2023",
          live: null,
        },
      ],
    },
    experience: {
      label: "Experiencia",
      title: "Mi trayectoria.",
      items: [
        {
          company: "Uxearch Studio",
          role: "Co-fundador · Lead UX Designer",
          period: "2022 — Presente",
          location: "Miami, FL",
          description:
            "Co-fundé un estudio UX enfocado en productos Web3, fintech e IA. Lideré el diseño de más de 10 startups desde cero hasta el lanzamiento.",
          highlights: ["Estrategia UX", "Design Systems", "Liderazgo de equipo"],
        },
        {
          company: "HUGE Inc.",
          role: "Senior UX Designer · Equipo Google",
          period: "2020 — 2022",
          location: "New York, NY",
          description:
            "Integrado en el equipo de Google en HUGE. Construí y mantuve sistemas de diseño a gran escala, colaborando diariamente con ingeniería en múltiples líneas de producto.",
          highlights: ["Design Systems", "Productos Google", "Colaboración Dev"],
        },
        {
          company: "Freelance",
          role: "Diseñador UX/UI",
          period: "2018 — 2020",
          location: "Colombia · Remoto",
          description:
            "Trabajé con startups y agencias en LATAM en apps móviles, dashboards y proyectos de identidad de marca.",
          highlights: ["Diseño Móvil", "Branding", "Startups"],
        },
      ],
    },
    skills: {
      label: "Habilidades",
      title: "Mi caja de herramientas.",
      categories: [
        {
          name: "Diseño",
          items: ["Figma", "Framer", "Principle", "ProtoPie", "Adobe XD", "Illustrator"],
        },
        {
          name: "Investigación",
          items: ["Entrevistas", "Pruebas de Usabilidad", "Journey Mapping", "A/B Testing", "Analytics"],
        },
        {
          name: "Sistemas",
          items: ["Design Systems", "Librerías", "Tokens", "Diseño Atómico", "Storybook"],
        },
        {
          name: "Tech",
          items: ["Tailwind CSS", "React", "HTML/CSS", "Firebase", "Webflow", "Framer Sites"],
        },
      ],
    },
    education: {
      label: "Educación",
      title: "Donde aprendí\na pensar.",
      items: [
        {
          institution: "Universidad ICESI",
          degree: "Diseño de Medios Interactivos",
          period: "2014 — 2018",
          location: "Cali, Colombia",
          description: "Estudié diseño de interacción, arquitectura de información, investigación con usuarios y producción de medios digitales.",
        },
        {
          institution: "Interaction Design Foundation",
          degree: "Diseño UX · HCI",
          period: "2019 — 2021",
          location: "Online",
          description: "Cursos avanzados de metodología UX, accesibilidad y psicología cognitiva aplicada al diseño.",
        },
      ],
    },
    now: {
      label: "Ahora",
      title: "En qué estoy\ntrabajando.",
      subtitle: "Una sección viva — se actualiza cuando algo cambia.",
      building: {
        label: "Construyendo",
        items: [
          "KOLO — SaaS ERP/POS para PyMEs en Centroamérica",
          "Sistema de diseño interno de Uxearch Studio",
          "Un toolkit personal para investigación UX asíncrona",
        ],
      },
      learning: {
        label: "Aprendiendo",
        items: [
          "Patrones de diseño para productos nativos de IA",
          "Motion design con Framer Motion",
          "Posicionamiento dual español-inglés",
        ],
      },
      reading: {
        label: "Leyendo",
        items: [
          "Shape Up — Basecamp",
          "The Design of Everyday Things — Don Norman",
          "Zero to One — Peter Thiel",
        ],
      },
      location: "Miami, FL · Ago 2026",
    },
    hobbies: {
      label: "Fuera del trabajo",
      title: "Más que\nun diseñador.",
      items: [
        {
          emoji: "⚽",
          title: "Fútbol",
          description: "Partidos de fin de semana que me recuerdan que los grandes sistemas necesitan gran trabajo en equipo.",
        },
        {
          emoji: "📸",
          title: "Fotografía",
          description: "Fotografía callejera y de arquitectura — entrenando el ojo para la composición, la luz y el detalle.",
        },
        {
          emoji: "✈️",
          title: "Viajes",
          description: "Colombia, México, Brasil, España, EEUU. Cada ciudad me enseña algo nuevo sobre cómo las personas viven e interactúan.",
        },
        {
          emoji: "🎵",
          title: "Música",
          description: "Deep house y lo-fi mientras trabajo. Cumbia y salsa cuando llega el fin de semana.",
        },
      ],
    },
    contact: {
      label: "Contacto",
      title: "Construyamos\nalgo grande.",
      subtitle:
        "Disponible para roles senior de diseño de producto, consultoría y partnerships de largo plazo. Fluido en español e inglés.",
      cta: "Envíame un email",
      orConnect: "O conéctate en",
      availability: "Abierto a oportunidades · Miami · Remoto",
    },
    footer: {
      copy: "Diseñado y construido por Javier Mora",
      year: "2026",
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;
