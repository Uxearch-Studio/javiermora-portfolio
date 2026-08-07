# Design.md — Reglas del Portafolio Javier Mora 2026

> Este archivo define las reglas no negociables de diseño para que el portafolio se vea hecho por una persona real, no por una IA. Antes de escribir cualquier componente nuevo, revisar este documento.

---

## 1. ANTI-AI — Lo que está prohibido

Estas son las señales que delatan un portafolio hecho con IA. Están **prohibidas**.

- ❌ Frases corporativas: "I craft outstanding products", "I excel at", "I'm passionate about"
- ❌ Gradientes violeta → teal sin razón de ser (el gradiente debe tener una intención)
- ❌ Secciones genéricas con nombres obvios: "About Me", "My Skills", "Let's Connect"
- ❌ Cards simétricas en grid de 3 columnas perfectas
- ❌ Animaciones de fade-up en cada sección (es el default de todas las webs IA)
- ❌ Íconos de Font Awesome o Heroicons como decoración vacía
- ❌ Stats inventadas: "150+ clients", "99% satisfaction"
- ❌ Botones con gradiente violeta → azul
- ❌ Background oscuro + blur cards + glow effect (overused en 2024–2025)
- ❌ Textos placeholder que nunca se van a reemplazar

---

## 2. VOZ — Cómo habla Javier

El copy del portafolio suena como Javier, no como un perfil de LinkedIn.

**Sí:**
- Directo, sin adjetivos vacíos
- Primera persona específica: "Pasé 3 semanas en ese onboarding"
- Tiene opiniones: "No creo en los prototipos de alta fidelidad al inicio"
- Menciona fracasos reales o aprendizajes duros
- Usa español cuando el contexto lo permite (LATAM es su mercado también)

**No:**
- "Insight-driven professional with a passion for..."
- "I help companies achieve their digital transformation goals"
- "Results-oriented designer with proven track record"

---

## 3. TIPOGRAFÍA — Reglas de tipo

La tipografía carga el 70% del diseño. Si el tipo es correcto, no necesitas decoración.

- **Fuente principal:** [DEFINIR — ver opciones abajo]
- **Display / Hero:** Tamaños grandes sin miedo. 96px–120px en desktop, no menos de 56px en mobile
- **Body:** Máximo 65 caracteres por línea en desktop
- **NO usar más de 2 familias tipográficas**
- **Espaciado:** Mejor demasiado espacio que poco. Generoso en todos lados.
- **Jerarquía real:** El tamaño del texto comunica importancia, no el color

### Opciones de fuente (elegir una para display):
- [ ] **Neue Montreal** — moderna, europea, muy usada en portafolios de diseño top
- [ ] **Editorial New** — elegante, contraste alto, serif con carácter
- [ ] **Syne** — geométrica, única, buena para headlines
- [ ] **PP Mori** — clean, versátil, profesional
- [ ] **Geist** (actual) — funciona pero es muy "template de Next.js"

---

## 4. COLOR — Sistema honesto

Definir paleta antes de usarla. No agregar colores "porque se ve bien".

### Paleta base (PENDIENTE DE DEFINIR):
```
Background:   #______  — [nombre]
Surface:      #______  — [nombre]
Text:         #______  — [nombre]
Text muted:   #______  — [nombre]
Accent 1:     #______  — [nombre, razón de ser]
Accent 2:     #______  — [nombre, razón de ser - si aplica]
```

### Reglas de color:
- El color de acento refleja la identidad de Javier, no la paleta de Web3 genérica
- Máximo 2 colores de acento en toda la web
- El background puede ser claro u oscuro — pero hay que decidirlo y no cambiar
- Los colores de hover/active son derivados del color base, no colores nuevos

---

## 5. LAYOUT — Estructura que sorprende

- **Mobile-first siempre:** Diseñar en 390px antes de pensar en desktop
- **Asimetría consciente:** No todo en grid de 2 columnas. Romper el patrón al menos una vez por sección
- **Espacio negativo:** Dejar respirar el contenido. Si algo se siente apretado, quitar elementos en lugar de reducir el tamaño
- **Scroll vertical limpio:** Una sección, una idea. No llenar pantalla con 5 cosas distintas
- **Sin sidebar:** Navegación siempre en top bar, nunca lateral

---

## 6. ANIMACIONES — Con intención, no por defecto

- **Solo animar lo que tiene sentido narrativo** — el movimiento debe contar algo
- **Una sola entrada de animación** por tipo de elemento (no cada card con su propio efecto)
- **Respetar prefers-reduced-motion** — si el usuario lo tiene activado, sin animaciones
- **Velocidad:** Más rápido de lo que parece natural. 300–400ms máximo para entradas
- **Prohibido:** parallax en mobile, scroll-jacking, loaders que duran más de 1 segundo

---

## 7. IMÁGENES Y ASSETS

- **Foto de Javier real** — no placeholder, no avatar generado
- **Screenshots de proyectos reales** — no mockups 3D flotantes en MacBook
- **Sin stock photos** de personas (Unsplash, Pexels, etc.)
- **Si hay mockup de dispositivo:** uno solo, plano (flat), sin sombra dramática
- **Formato:** WebP para todas las imágenes, lazy loading por defecto

---

## 8. SECCIONES — Estructura aprobada

Estas son las secciones del portafolio y su propósito exacto:

| Sección | Propósito | Qué NO hacer |
|---------|-----------|--------------|
| **Hero** | Presentar a Javier en 5 segundos | No poner todo el CV aquí |
| **Work** | 2–3 proyectos con historia real | No poner 8 proyectos sin contexto |
| **About** | Quién es, no qué hace | No repetir el CV |
| **Experience** | Dónde ha trabajado | No poner fechas de 1 mes |
| **Now** | Qué está haciendo en este momento | Mantener actualizado — si no, quitarlo |
| **Education + Hobbies** | Humanizar | No poner "I love coffee ☕" |
| **Contact** | Un solo CTA claro | No poner formulario de contacto complejo |

---

## 9. CASE STUDIES — La sección más importante

Cada case study debe responder:
1. **¿Cuál era el problema real?** (no "mejorar la UX")
2. **¿Qué restricciones había?** (tiempo, presupuesto, equipo, tecnología)
3. **¿Qué decisiones de diseño se tomaron y por qué?**
4. **¿Qué no funcionó?**
5. **¿Cuál fue el resultado medible?**

Sin responder estas 5 preguntas, el case study no va al portafolio.

---

## 10. CHECKLIST ANTES DE PUBLICAR

- [ ] ¿Toda la tipografía está en la fuente correcta?
- [ ] ¿Funciona en iPhone SE (375px)?
- [ ] ¿Funciona en Samsung Galaxy (360px)?
- [ ] ¿El copy lo escribió/aprobó Javier, no la IA?
- [ ] ¿Hay fotos reales?
- [ ] ¿Los links de proyectos funcionan?
- [ ] ¿El email de contacto está correcto?
- [ ] ¿La página carga en menos de 2 segundos?
- [ ] ¿Tiene OG image para compartir en redes?
- [ ] ¿El toggle ES/EN funciona en todas las secciones?

---

*Última actualización: 2026-08-07*
*Próxima revisión: cuando se agregue nuevo contenido*
