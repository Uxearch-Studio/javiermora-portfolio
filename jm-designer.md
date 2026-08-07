# jm-designer.md
## El manual de diseño de Javier Mora

> Este es el documento rector del portafolio. Combina el sistema visual de Javier con las reglas específicas del portafolio. Antes de tocar cualquier componente, leer esto. Antes de entregar cualquier pantalla, ejecutar el checklist final.

---

## 0. MENTALIDAD — Antes de dibujar cualquier cosa

El diseño de Javier se juzga por su problem solving, no solo por sus píxeles. Cada pieza debe verse como si un diseñador senior la hubiera pulido a mano — no como output genérico de IA.

**El proceso obligatorio antes de escribir código:**

1. **Nombra el problema en una frase.** ¿Quién va a ver esto y qué necesita entender en los primeros 30 segundos? Si el pedido no lo dice, dedúcelo del contexto y decláralo. Un diseño sin problema definido es decoración.

2. **Elige la idea rectora.** Una decisión central que organiza todo lo demás. Ejemplos: *"el trabajo es el héroe, la interfaz desaparece"* o *"una sola columna que se lee como historia"*. Si no puedes nombrar la idea rectora, todavía no estás listo para diseñar.

3. **Diseña la jerarquía antes que el estilo.** Decide qué se ve primero, qué segundo, qué casi no se ve. El estilo visual se aplica después, sobre una jerarquía que ya funciona en blanco y negro.

4. **Autocrítica antes de entregar.** Mira el resultado con ojos de hiring manager exigente: ¿esto demuestra criterio o solo esfuerzo? Corrige lo que un senior señalaría.

**Al entregar:** incluye siempre un rationale de 3-5 frases — problema → idea rectora → decisiones clave y su porqué. Así cada entrega funciona como mini case study.

---

## 1. ANTI-AI — Señales de alerta prohibidas

Estas son las marcas que delatan trabajo genérico. Están **prohibidas** en este portafolio.

**Copy:**
- ❌ "I craft outstanding products using a streamlined process"
- ❌ "I'm passionate about creating seamless experiences"
- ❌ "Results-oriented professional with proven track record"
- ❌ "I excel at..." / "I help companies achieve..."
- ❌ Stats inventadas: "150+ clients", "99% satisfaction rate"

**Visual:**
- ❌ Gradiente violeta → teal decorativo sin razón
- ❌ Background oscuro + blur cards + glow effect (overused 2024–2025)
- ❌ Cards simétricas en grid de 3 columnas perfectas
- ❌ Fade-up en cada sección (es el default de todo template IA)
- ❌ Mockups 3D de MacBook flotante con sombra dramática
- ❌ Íconos de Heroicons/Font Awesome como decoración vacía
- ❌ Botones con gradiente violeta → azul

**Estructura:**
- ❌ Secciones con nombres de LinkedIn: "About Me", "My Skills", "Let's Connect"
- ❌ 8 proyectos en grid sin contexto ni historia
- ❌ Formulario de contacto con 5 campos
- ❌ Textos placeholder que "se reemplazarán después" (si no está el texto real, no va al código)

---

## 2. VOZ — Cómo escribe y habla Javier

El copy suena como Javier, no como un perfil de LinkedIn.

**Sí:**
- Directo, sin adjetivos vacíos: *"Diseñé el checkout de Tactica en 2 semanas"*, no *"Lideré la optimización del flujo de conversión"*
- Tiene opiniones: *"Los prototipos de alta fidelidad en fase de discovery son dinero tirado"*
- Menciona restricciones reales: *"Con presupuesto de $0 para investigación, usé..."*
- Primera persona específica con números concretos: *"Reduje el tiempo de onboarding de 8 pasos a 3"*
- Puede estar en español o inglés — ambos son su idioma
- Menciona fracasos o aprendizajes duros: *"El primer diseño lo rechazamos nosotros mismos antes de mostrarlo"*

**No:**
- Jerga corporativa de cualquier tipo
- Párrafos de más de 4 líneas en el portafolio (nadie los lee)
- "coffee-driven designer" o cualquier cliché de dribbble

---

## 3. SISTEMA VISUAL — La escuela de Linear, Stripe, Vercel

La sensación buscada: **software construido con cuidado obsesivo**. Grids exactos, un acento, detalles finos. Nada decorativo que no trabaje.

### 3.1 Color

Estructura fija: **base neutra + UN solo color de acento**. Nunca más de un acento por pieza.

```
— MODO CLARO (default del portafolio)
Background:    #FAFAFA   — casi blanco, no cansa
Surface:       #FFFFFF   — cards, modales
Border:        #E4E4E7   — 1px siempre, nunca sombras que fingen bordes
Text primario: #0A0A0A   — casi negro
Text secundario: #52525B — gris medio
Text terciario:  #A1A1AA — labels, metadatos

— MODO OSCURO (para secciones tipo galería, hero hero)
Background:    #0A0A0B
Surface:       #141416

— ACENTO ÚNICO
Azul eléctrico: #2563EB  — hover: #1D4ED8
```

**Reglas de color:**
- El acento solo aparece en CTAs, links activos, y 1-2 detalles por sección. Si aparece en todo, no es acento.
- Los colores de hover/active son derivados del mismo acento, no colores nuevos
- Si la pieza necesita otro acento (por ejemplo un project card), proponer y explicar por qué — pero la estructura neutra + uno no se negocia

### 3.2 Tipografía

**Fuente exclusiva: Red Hat Display** (Google Fonts)
- Geometría redondeada: le da calidez a la precisión
- Pesos: 400, 500, 600, 700
- Carga: `display=swap`, fallback: `"Red Hat Display", system-ui, sans-serif`
- Para bloques largos de case study: Red Hat Text (hermana legible)
- **Nunca Geist, nunca Inter genérico, nunca mezclar con otra display**

**Escala tipográfica:**

| Uso | Tamaño | Peso | Tracking |
|-----|--------|------|----------|
| Hero / Display | 56–72px desktop / ~40px mobile | 600 | -0.02em |
| Título sección | 32–40px | 600 | -0.01em |
| Subtítulo | 20–24px | 500 | 0 |
| Cuerpo | 16px | 400 | 0 |
| Line-height body | 1.6 | — | — |
| Label / metadata | 13–14px, uppercase | 500 | +0.06em |
| Números / datos | font-variant-numeric: tabular-nums | — | — |

**Regla de línea:** máximo 65 caracteres por línea en cuerpo desktop.

### 3.3 ACCESIBILIDAD — Reglas duras, sin excepciones

**Tamaños mínimos de texto (WCAG AA):**
- Cuerpo / descripciones: **mínimo 14px**
- Labels, metadata, badges: **mínimo 12px**
- Texto decorativo sin información: mínimo 10px (nunca informativo a ese tamaño)
- **Nunca usar `text-[8px]`, `text-[9px]`, `text-[10px]` para texto que el usuario necesita leer**
- En mobile: los mismos mínimos — el zoom no es una solución de diseño

**Contraste (WCAG AA mínimo — relación 4.5:1 para texto normal):**

Sobre fondos oscuros (`#0A0A0A`, `#050505`):
- Texto primario / títulos: `text-white` o `rgba(255,255,255, ≥0.90)`
- Texto cuerpo: `rgba(255,255,255, ≥0.70)` — nunca menos para texto informativo
- Labels / metadata legibles: `rgba(255,255,255, ≥0.55)`
- **Prohibido para texto informativo**: `text-white/20`, `text-white/25`, `text-white/30`, `text-white/35`, `text-white/40` — son decorativos, no legibles
- Solo se permite baja opacidad (< 0.45) en elementos puramente decorativos que no llevan información

Sobre fondos claros (`#FAFAFA`, `#FFFFFF`):
- Texto cuerpo mínimo: `#52525B` — nunca más claro para párrafos
- Labels mínimo: `#A1A1AA` — solo para metadata no crítica

**Checklist de contraste antes de entregar cualquier sección oscura:**
- [ ] ¿Todos los textos con información tienen opacidad ≥ 0.55 sobre fondo oscuro?
- [ ] ¿Los labels y metadata tienen opacidad ≥ 0.55 (nunca 0.20–0.40)?
- [ ] ¿El tamaño mínimo del texto informativo es 12px?
- [ ] ¿Los datos numéricos (scores, métricas) son legibles sin acercar pantalla?

### 3.3 Espaciado y Grid

- **Todo múltiplo de 4px.** Ritmo base 8px.
- **Contenedor máximo:** 1120–1200px centrado
- **En caso de duda entre dos espaciados, elegir el mayor.** El aire es parte del lujo.
- Padding lateral mobile: 20px mínimo
- Padding lateral desktop: 40–48px dentro del contenedor

### 3.4 Detalles finos (donde se nota el nivel)

- Bordes: **1px reales** — nunca sombras que finjan bordes
- Radios: **8–12px consistentes** en toda la pieza
- Sombras: casi invisibles → `0 1px 3px rgb(0 0 0 / 0.06)`. No sombras dramáticas.
- Estados interactivos: **hover, focus visible, active y disabled — siempre diseñados**, nunca los del navegador por defecto
- Tap targets mobile: mínimo **44×44px**

---

## 4. MOVIMIENTO — Expresivo con propósito

El movimiento es la firma de Javier. Un hiring manager nota la ejecución aquí. Debe ser memorable pero nunca gratuito: cada animación comunica algo.

### Reglas base
- Solo animar `transform` y `opacity` — 60fps garantizado
- **Respetar `prefers-reduced-motion`**: si está activado, sin reveals ni entrada
- Easing de salida suave siempre: `cubic-bezier(0.22, 1, 0.36, 1)` — nunca lineal

### Tipos de movimiento

**Reveals al scroll** (para entrar contenido):
- `translateY(16–24px)` + `opacity: 0 → 1`
- Duración: 400–500ms
- Stagger entre elementos: 60–90ms
- Trigger: cuando el elemento entra al viewport

**Momentos wow** (máximo 2–3 por pieza, bien elegidos):
- Hero con entrada dramática al cargar
- Transición entre case studies
- Un hover sorprendente en un proyecto
- Si todo sorprende, nada sorprende

**Micro-interacciones:**
- Hover: 150–200ms
- Transiciones de estado: 200–300ms
- Nunca `transition: all` — solo las propiedades que cambian

### Lo prohibido en movimiento
- ❌ Parallax en mobile
- ❌ Scroll-jacking
- ❌ Loaders de más de 1 segundo
- ❌ Fade-up genérico en cada sección (sin cascada, sin ritmo)
- ❌ Animaciones que bloquean el contenido

---

## 5. RESPONSIVE — Mobile y desktop, ciudadanos iguales

**Mobile-first siempre.** Diseñar en 390px antes de pensar en desktop.

**Puntos de quiebre clave:**
- 390px — iPhone pequeño (diseño base)
- 640px — transición a layouts más anchos
- 1024px — desktop
- 1280px — desktop amplio

**En mobile:**
- Tipografía display: ~60% del tamaño desktop
- Stagger de animaciones más corto (40–60ms)
- Tap targets: 44px mínimo
- Sin hover states como único indicador

**Antes de entregar:** verificar el recorrido completo mentalmente en 390px y en 1440px.

---

## 6. SECCIONES DEL PORTAFOLIO

Estructura aprobada y propósito de cada sección:

| Sección | Idea rectora | Qué no hacer |
|---------|-------------|--------------|
| **Hero** | Javier en 30 segundos: quién es, qué hace, por qué importa | No meter el CV completo. Solo la promesa. |
| **Work** | 2–3 proyectos con historia real y resultados | No 8 proyectos sin contexto. Menos es más. |
| **About** | Quién es Javier como persona | No repetir el CV. Mostrar la perspectiva, las opiniones. |
| **Experience** | Trayectoria con contexto | No listar fechas sin explicar el impacto |
| **Now** | Qué está pasando en este momento | **Mantener actualizado**. Si está desactualizado, quitar la sección. |
| **Education** | Dónde aprendió a pensar | No lista de certificados sin selección |
| **Hobbies** | Humanizar — hay una persona detrás del diseñador | No "I love coffee ☕" ni clichés creativos |
| **Contact** | Un solo CTA claro | No formulario complejo. Email directo + redes. |

---

## 7. CASE STUDIES — El corazón del portafolio

Cada case study responde estas 5 preguntas. Sin las 5, no va al portafolio.

1. **¿Cuál era el problema real?** (no "mejorar la UX" — ¿qué pasaba concretamente?)
2. **¿Qué restricciones había?** (tiempo, presupuesto, equipo, tecnología, política)
3. **¿Qué decisiones de diseño se tomaron y por qué?** (trade-offs reales)
4. **¿Qué no funcionó?** (honestidad = credibilidad)
5. **¿Cuál fue el resultado medible?** (número, porcentaje, tiempo, feedback concreto)

**Estructura de narrativa:**
```
Problema → Restricciones → Proceso → Decisiones clave → Resultado → Aprendizaje
```

**Formato visual:**
- Screenshots reales del producto (no mockups flotantes)
- Máximo un mockup de dispositivo: plano, sin sombra dramática
- Quotes reales de usuarios si existen
- Números con `tabular-nums` — si son reales, que se vean reales

---

## 8. IMÁGENES Y ASSETS

- **Foto de Javier: real** — no placeholder, no avatar generado por IA
- **Screenshots: del producto real** — no renders de Figma en perspectiva isométrica
- **Sin stock photos de personas** (Unsplash, Pexels, etc.)
- **Formato:** WebP para todas, lazy loading por defecto
- **OG image:** 1200×630px, requerida antes de publicar
- Si no hay imagen real disponible, usar un placeholder tipográfico limpio — nunca un ícono genérico de "imagen no disponible"

---

## 9. CHECKLIST FINAL — Lo que separa "bien" de "nivel Javier"

Ejecutar este checklist antes de cada entrega:

**Diseño:**
- [ ] ¿La jerarquía funciona en blanco y negro, sin depender del color?
- [ ] ¿Hay exactamente UN solo acento y todo espaciado es múltiplo de 4?
- [ ] ¿Todos los estados (hover/focus/active/disabled) están diseñados?
- [ ] ¿Bordes de 1px, radios 8-12px, sombras casi invisibles?
- [ ] ¿Tipografía en Red Hat Display con la escala correcta?

**Accesibilidad (OBLIGATORIO — WCAG AA):**
- [ ] ¿Todo texto informativo mide ≥12px? ¿Cuerpo y descripciones ≥14px?
- [ ] ¿Texto sobre fondo oscuro tiene opacidad ≥0.55? (nada de text-white/20 a text-white/40)
- [ ] ¿Texto sobre fondo claro usa mínimo #52525B para cuerpo, #A1A1AA para labels?
- [ ] ¿Los datos numéricos (scores, métricas, fechas) son legibles sin zoom?
- [ ] ¿Ningún texto decorativo < 10px lleva información útil?

**Movimiento:**
- [ ] ¿Animaciones solo en `transform` y `opacity`?
- [ ] ¿Respeta `prefers-reduced-motion`?
- [ ] ¿Máximo 2-3 momentos wow, sin fade-up genérico en todo?

**Responsive:**
- [ ] ¿Funciona en iPhone SE 375px?
- [ ] ¿Funciona en 1440px?
- [ ] ¿Tap targets ≥44px en mobile?

**Contenido:**
- [ ] ¿El copy lo escribió/aprobó Javier? ¿Sin frases corporativas?
- [ ] ¿Hay fotos reales (no placeholders)?
- [ ] ¿Los links de proyectos funcionan?
- [ ] ¿El email de contacto es correcto?
- [ ] ¿El toggle ES/EN funciona en todas las secciones?

**Performance:**
- [ ] ¿Carga en menos de 2 segundos?
- [ ] ¿Imágenes en WebP con lazy loading?
- [ ] ¿Hay OG image 1200×630?

**Criterio final:**
- [ ] ¿Un hiring manager exigente diría *"esto lo hizo alguien que sabe"*?
- [ ] ¿Hay un rationale entregado con problema → idea rectora → decisiones?

---

## 10. EJEMPLO DE RATIONALE

**Pedido recibido:** "Rediseña la sección Work del portafolio"

**Rationale entregado junto con la pieza:**
> *Problema: un hiring manager decide en 30 segundos si sigue viendo — la sección Work es la más importante y actualmente parece una lista. Idea rectora: cada proyecto tiene que contar una historia en 3 líneas, no mostrar 8 thumbnails. Decisiones: máximo 3 proyectos para que ninguno se diluya; el año y la categoría en label pequeño para que el nombre del proyecto sea el protagonista; el color de acento del proyecto aparece solo en el borde izquierdo de 2px, no en toda la card, para no romper la paleta neutra del portafolio.*

---

*Documento vivo. Actualizar cuando cambien las decisiones de diseño.*
*Versión: 1.0 — Agosto 2026*
