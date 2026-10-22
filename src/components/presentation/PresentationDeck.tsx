"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode, type WheelEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Calculator,
  CalendarDays,
  Coins,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  RotateCcw,
  Scale,
  X,
} from "lucide-react";
import { cn } from "@/lib/format";

type EventRow = { day: string; month: string; name: string; note?: string; pic: string; hot?: boolean };
type Tone = "dark" | "light" | "mint" | "brand" | "lilac";
type Ctx = { goTo: (i: number) => void; onClose: () => void; openEvent: (pic: string) => void };

const img = (name: string) => `/img/oferta/${name}`;
const d = (n: number) => ({ "--d": n }) as CSSProperties;
const display = "font-extrabold uppercase leading-[0.84] tracking-[-0.035em]";
const kicker = "text-[10px] font-bold uppercase tracking-[0.2em]";

// Contenido tomado de la "Oferta de valor FBC" (PDF entregado por Fenalco Bogotá).
const agenda: { title: string; rows: EventRow[] }[] = [
  {
    title: "Primer semestre",
    rows: [
      { day: "02", month: "Mar", name: "Primer Encuentro de Afiliados", note: "Conexiones de valor para los afiliados.", pic: "afiliados-1" },
      { day: "04", month: "Mar", name: "Encuentro Empresarial de Seguridad", note: "Gestión del riesgo y protección empresarial.", pic: "seguridad" },
      { day: "26", month: "Mar", name: "Evento de Empresas de Familia", note: "Gobierno corporativo y permanencia.", pic: "familia" },
      { day: "16–17", month: "Abr", name: "Retail Farma", note: "Barranquilla.", pic: "farma" },
      { day: "07", month: "May", name: "Líderes de Gestión Humana", note: "Rueda de empleo, formación y contactos.", pic: "gestion-humana" },
      { day: "27–28", month: "May", name: "Feria de Movilidad Liviana", note: "C. C. Los Héroes.", pic: "movilidad" },
      { day: "—", month: "Fecha por definir", name: "Jornada 1 Sello Comercio Responsable", note: "Formación para el distintivo del gremio.", pic: "sello-1" },
    ],
  },
  {
    title: "Segundo semestre",
    rows: [
      { day: "08", month: "Jul", name: "Innova Market", note: "Tendencias en retail.", pic: "innova-2" },
      { day: "16", month: "Jul", name: "Jornada Sello Comercio Responsable", note: "Formación para el distintivo del gremio.", pic: "sello-2" },
      { day: "20", month: "Ago", name: "Encuentro de Líderes Comerciales", note: "Impulso para la fuerza de ventas.", pic: "lideres" },
      { day: "03", month: "Sep", name: "START · Sector Automotor", note: "Evento especializado del sector.", pic: "start" },
      { day: "14–16", month: "Oct", name: "Congreso Nacional de Comerciantes", note: "Bogotá.", pic: "congreso", hot: true },
      { day: "15", month: "Oct", name: "Estrellas a 2600M", note: "La Noche de los Mejores.", pic: "estrellas", hot: true },
      { day: "28–30", month: "Oct", name: "Góndola", note: "Hotel Las Américas, Cartagena.", pic: "gondola" },
      { day: "12", month: "Nov", name: "Segundo Encuentro de Afiliados", note: "Y entrega del Sello Comercio Responsable.", pic: "afiliados-2" },
    ],
  },
];
// Todos los eventos en orden, para navegar entre ellos desde la ventana de detalle.
const events = agenda.flatMap((a) => a.rows.map((r) => ({ ...r, semester: a.title })));

const mentions: [string, number][] = [
  ["Fenalco", 2833],
  ["ANDI", 2215],
  ["Fedesarrollo", 654],
  ["Fedegán", 616],
  ["Fedecafé", 599],
  ["ANIF", 596],
  ["Cotelco", 551],
  ["Camacol", 534],
  ["Colfecar", 483],
  ["Confecámaras", 474],
];

const lines = [
  { pic: "linea-voceria", title: "Vocería", text: "En temas normativos y regulatorios, ante entidades públicas y privadas." },
  { pic: "linea-relacionamiento", title: "Relacionamiento", text: "Acompañamiento cercano a cada empresa afiliada." },
  { pic: "linea-gestion", title: "Gestión gremial", text: "Comités sectoriales y una agenda común por sector." },
  { pic: "linea-capacitacion", title: "Capacitaciones", text: "Formación y certificaciones para los equipos." },
];

const norms = [
  { kind: "Resolución", num: "1491", year: "2025", by: "Ministerio de Ambiente", title: "Áreas de vida", text: "Siembra de 2 árboles por cada empleado en medianas y grandes empresas." },
  { kind: "Resolución", num: "610", year: "2026", title: "Salas de lactancia", text: "Parámetros para las Salas Amigas de la Familia Lactante. Aplica a empresas con capital ≥ 1.500 SMMLV o más de 50 trabajadoras, y a entidades públicas." },
  { kind: "Resolución", num: "185", year: "2026", by: "IDU", title: "Antejardines", text: "Uso temporal de antejardines en zonas comerciales y gastronómicas a cambio de una retribución económica." },
  { kind: "Decreto", num: "117", year: "2026", title: "Espacio público", text: "Prohíbe bloquear ciclorrutas y puentes peatonales, y usar pipas de gas o elementos de alto riesgo sin autorización." },
];

const sectors = [
  "Artículos para el hogar",
  "Automotores",
  "Calzado, cuero y manufacturas",
  "Centros comerciales e inmobiliarias",
  "Comercio exterior",
  "Educación, cultura y deporte",
  "Ferreterías y materiales de construcción",
  "Grandes superficies",
  "Joyerías y accesorios de lujo",
  "Llantas, talleres y servicios al automotor",
  "Químicos e insumos agropecuarios",
  "Restaurantes, hoteles y turismo",
  "Salud",
  "Repuestos para automotores y maquinaria",
  "Servicios al comercio",
  "Tecnología y telecomunicaciones",
  "Vestuario, textiles y confecciones",
  "Víveres y abarrotes",
];

const allies = [
  { pic: "aliado-taitra.png", name: "Taitra", text: "Relación con Taiwán y conexiones empresariales internacionales." },
  { pic: "aliado-colsubsidio.png", name: "Colsubsidio", text: "Alianza para empleabilidad y selección de talento." },
  { pic: "aliado-smart.png", name: "Smart", text: "Capacitación e idiomas para equipos empresariales." },
  { pic: "aliado-legis.png", name: "Legis", text: "Herramientas legales y contenido especializado." },
  { pic: "aliado-indexco.png", name: "Indexco", text: "Páginas, apps y programas a la medida." },
  { pic: "aliado-andes.png", name: "Andes Plaza", text: "Hospedaje, catering y eventos especiales." },
];

const campaigns = [
  { pic: "campana-navidad.jpg", name: "Bogotá Despierta", tag: "Temporada navideña", text: "La ciudad se activa en diciembre para que el comercio venda más en su mejor temporada." },
  { pic: "campana-primaton.jpg", name: "Primatón", tag: "Campaña digital nacional", text: "Una campaña digital en todo el país para mover las ventas alrededor de la prima." },
  { pic: "campana-padre.jpg", name: "Fechas comerciales", tag: "Modificación y apoyo de fechas", text: "Gestionamos y respaldamos fechas como el Día del Padre para que lleguen más clientes." },
  { pic: "campana-feria.jpg", name: "Ferias comerciales", tag: "Muévete Eléctrico", text: "Ferias para mostrar su marca y su producto: conecte, exhiba y venda." },
];

const services = [
  { pic: "serv-medida.jpg", name: "Capacitaciones a la medida" },
  { pic: "serv-virtual.jpg", name: "Capacitación virtual con certificación" },
  { pic: "serv-boletin-eco.jpg", name: "Boletines económicos por sector" },
  { pic: "serv-boletin-jur.jpg", name: "Boletines jurídicos periódicos" },
  { pic: "serv-info.jpg", name: "Información comercial" },
  { pic: "serv-conciliacion.png", name: "Centro de conciliación · tarifa preferencial" },
  { pic: "serv-sello.png", name: "Sello de comercio responsable" },
];

const companies = Array.from({ length: 18 }, (_, k) => img(`empresa-${String(k + 1).padStart(2, "0")}.png`));

/** Cifra que cuenta desde cero cada vez que entra en pantalla. */
function CountUp({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([en]) => {
        cancelAnimationFrame(raf);
        if (!en.isIntersecting) return setV(0);
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1500);
          setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {v.toLocaleString("es-CO")}
      {suffix}
    </span>
  );
}

/** Cinta que se desplaza sin fin; el contenido se duplica para que el bucle no se note. */
function Marquee({ children, reverse, seconds = 40, className }: { children: ReactNode; reverse?: boolean; seconds?: number; className?: string }) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div className={cn("flex w-max shrink-0", reverse ? "marquee-rev" : "animate-marquee")} style={{ animationDuration: `${seconds}s` }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Campañas: un escenario con el afiche activo y la lista para elegir; rota sola mientras nadie interactúa. */
function Campaigns() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % campaigns.length), 4200);
    return () => window.clearInterval(t);
  }, [paused]);
  const c = campaigns[active];
  return (
    <div className="grid min-h-full lg:grid-cols-[1fr_1fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <figure className="relative isolate flex min-h-[52vh] items-center justify-center overflow-hidden bg-brand-950 p-10">
        {campaigns.map((x, k) => (
          <Image
            key={x.pic}
            src={img(x.pic)}
            alt=""
            fill
            sizes="300px"
            aria-hidden
            className={cn("-z-10 scale-125 object-cover blur-3xl transition-opacity duration-700", k === active ? "opacity-50" : "opacity-0")}
          />
        ))}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(13,0,38,.85)_80%)]" />
        <span className="absolute left-6 top-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
          <b className="text-mint">{String(active + 1).padStart(2, "0")}</b> / {String(campaigns.length).padStart(2, "0")}
        </span>
        <div className="relative h-[min(56vh,520px)] w-full max-w-[460px]">
          {campaigns.map((x, k) => (
            <Image
              key={x.pic}
              src={img(x.pic)}
              alt={x.name}
              fill
              sizes="(max-width: 1024px) 80vw, 460px"
              className={cn(
                "object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,.55)] transition duration-700 ease-[cubic-bezier(.16,.8,.2,1)]",
                k === active ? "scale-100 opacity-100" : "scale-90 opacity-0",
              )}
            />
          ))}
        </div>
        <figcaption key={c.pic} className="deck-in absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
          <span className="text-2xl font-extrabold uppercase leading-none tracking-tight">{c.name}</span>
          <span className="bg-mint px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-950">{c.tag}</span>
        </figcaption>
        {/* Progreso de la rotación automática. */}
        <i key={`bar-${active}-${paused}`} className={cn("absolute inset-x-0 bottom-0 h-1 origin-left bg-mint", !paused && "animate-[campaign-bar_4.2s_linear]")} />
      </figure>
      <div className="flex flex-col justify-center px-[6vw] py-14 lg:px-[5vw]">
        <p className={cn(kicker, "rv text-brand-600")}>Campañas comerciales</p>
        <h2 className={cn(display, "rv mt-5 text-[11vw] sm:text-[clamp(2.6rem,4.4vw,4.6rem)]")} style={d(1)}>
          Más ventas <em className="block not-italic text-brand-600">en cada temporada.</em>
        </h2>
        <p className="rv mt-5 max-w-lg text-lg text-ink/70" style={d(2)}>
          Campañas que mueven al consumidor hacia el comercio formal.
        </p>
        <ol className="mt-8 border-t border-ink">
          {campaigns.map((x, k) => (
            <li key={x.pic} className="rv" style={d(3 + k)}>
              <button
                type="button"
                onMouseEnter={() => setActive(k)}
                onFocus={() => setActive(k)}
                onClick={() => setActive(k)}
                aria-pressed={k === active}
                className={cn("group relative grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-3 border-b border-ink/15 py-4 text-left transition", k === active ? "pl-4" : "pl-0")}
              >
                <i className={cn("absolute inset-y-0 left-0 w-1 bg-mint transition-opacity", k === active ? "opacity-100" : "opacity-0")} />
                <span className={cn("pt-0.5 text-sm font-extrabold", k === active ? "text-brand-600" : "text-ink/35")}>{String(k + 1).padStart(2, "0")}</span>
                <span>
                  <b className={cn("block text-xl font-extrabold uppercase leading-none tracking-tight transition sm:text-2xl", k === active ? "text-ink" : "text-ink/45 group-hover:text-ink")}>{x.name}</b>
                  <span className={cn("grid transition-all duration-500", k === active ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <span className="overflow-hidden text-sm text-ink/65">{x.text}</span>
                  </span>
                </span>
                <ArrowUpRight className={cn("mt-0.5 size-5 transition", k === active ? "rotate-45 text-brand-600" : "text-ink/25")} aria-hidden />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const tones: Record<Tone, string> = {
  dark: "bg-ink text-white",
  light: "bg-[#f5f3f9] text-ink",
  lilac: "bg-[#ebe8f3] text-ink",
  mint: "bg-mint text-brand-950",
  brand: "bg-brand text-white",
};

// Guion: una escena por pantalla, cada una con su propia composición.
const scenes: { label: string; tone: Tone; render: (c: Ctx) => ReactNode }[] = [
  {
    label: "Bienvenida",
    tone: "dark",
    render: ({ goTo }) => (
      <>
        <video muted loop playsInline preload="metadata" poster="/img/ai/bogota-aerea.jpg" className="kb absolute inset-0 -z-20 size-full object-cover" aria-hidden>
          <source src="/video/hero-bogota-720.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,0,38,.97)_0%,rgba(13,0,38,.82)_45%,rgba(13,0,38,.25)_85%),linear-gradient(0deg,rgba(13,0,38,.85),transparent_55%)]" />
        <div className="mx-auto flex min-h-full w-[min(1280px,90vw)] flex-col justify-center pb-24 pt-12">
          <p className={cn(kicker, "rv text-mint")}>Oferta de valor · FENALCO Bogotá Cundinamarca</p>
          <h2 className={cn(display, "mt-6 text-[13vw] sm:text-[clamp(3.6rem,8.2vw,8.8rem)]")}>
            <span className="rv block text-outline" style={d(1)}>
              ¡Bienvenidos
            </span>
            <span className="rv block" style={d(2)}>
              al gremio más
            </span>
            <span className="rv block text-mint" style={d(3)}>
              grande del país!
            </span>
          </h2>
          <div className="rv mt-10 grid max-w-3xl grid-cols-3 border-t border-white/30" style={d(4)}>
            {[
              [80, "+", "años"],
              [18000, "+", "afiliados"],
              [28, "", "departamentos"],
            ].map(([n, s, l], k) => (
              <div key={l} className={cn("pt-4", k > 0 && "border-l border-white/20 pl-4 sm:pl-6")}>
                <CountUp to={n as number} suffix={s as string} className="block text-3xl font-extrabold tracking-tight sm:text-5xl" />
                <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-white/60">{l}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(1)}
            className="rv mt-10 inline-flex h-14 w-fit items-center gap-10 bg-mint px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-950 transition hover:bg-mint-300"
            style={d(5)}
          >
            Empezar el recorrido
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
        <Marquee seconds={28} className="absolute inset-x-0 bottom-0 h-12 items-center bg-mint text-brand-950">
          {["Representar", "Formar", "Conectar", "La fuerza que une al comercio"].map((w) => (
            <span key={w} className="flex items-center gap-6 pr-6 text-sm font-extrabold uppercase tracking-[0.08em]">
              {w} <span aria-hidden>✦</span>
            </span>
          ))}
        </Marquee>
      </>
    ),
  },
  {
    label: "Quiénes somos",
    tone: "light",
    render: () => (
      <div className="grid min-h-full lg:grid-cols-[42%_1fr]">
        <figure className="relative min-h-[48vh] overflow-hidden bg-brand-950 lg:min-h-full">
          <Image src={img("director-foto.jpg")} alt="Juan Esteban Orrego Calle, Director Ejecutivo de Fenalco Bogotá Cundinamarca" fill sizes="(max-width: 1024px) 100vw, 42vw" className="kb object-cover object-top" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,0,38,.9),transparent_45%)]" />
          <i className="absolute inset-y-0 right-0 w-2 bg-mint" aria-hidden />
          <figcaption className="rv absolute inset-x-0 bottom-0 p-6 text-white sm:p-8" style={d(3)}>
            <span className={cn(kicker, "text-mint")}>Director Ejecutivo</span>
            <b className="mt-2 block text-2xl font-extrabold uppercase leading-none tracking-tight">Juan Esteban Orrego Calle</b>
          </figcaption>
        </figure>
        <div className="flex flex-col justify-center px-[6vw] py-14 lg:px-[5vw]">
          <p className={cn(kicker, "rv text-brand-600")}>Quiénes somos</p>
          <h2 className={cn(display, "rv mt-5 text-[11vw] sm:text-[clamp(2.8rem,4.8vw,5.2rem)]")} style={d(1)}>
            El gremio por elección <em className="block not-italic text-brand-600">más grande del país.</em>
          </h2>
          <p className="rv mt-6 max-w-2xl text-lg leading-snug text-ink/75 sm:text-xl" style={d(2)}>
            Promovemos el crecimiento del comercio con representación ante entidades públicas y privadas, información estratégica y espacios que fortalecen las relaciones comerciales.
          </p>
          <div className="mt-10 grid grid-cols-3 border-t border-ink">
            {[
              [80, "+", "años acompañando a las empresas"],
              [18000, "+", "afiliados en el país"],
              [28, "", "departamentos con presencia"],
            ].map(([n, s, l], k) => (
              <div key={l} className={cn("rv pt-5", k > 0 && "border-l border-ink/15 pl-4 sm:pl-6")} style={d(3 + k)}>
                <CountUp to={n as number} suffix={s as string} className="block text-[clamp(1.8rem,4vw,4rem)] font-extrabold leading-none tracking-tight text-brand-600" />
                <span className="mt-2 block text-xs text-ink/60 sm:text-sm">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Vocería",
    tone: "dark",
    render: () => (
      <div className="mx-auto grid min-h-full w-[min(1280px,90vw)] items-center gap-12 py-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className={cn(kicker, "rv text-mint")}>Vocería</p>
          <h2 className={cn(display, "rv mt-5 text-[11vw] sm:text-[clamp(2.6rem,4.4vw,4.6rem)]")} style={d(1)}>
            Somos voceros <em className="block not-italic text-mint">de los empresarios.</em>
          </h2>
          <div className="rv mt-8" style={d(2)}>
            <CountUp to={2833} className="block text-[clamp(5rem,11vw,10.5rem)] font-extrabold leading-[0.8] tracking-[-0.05em] text-mint" />
            <p className="mt-4 max-w-sm text-lg leading-snug text-white/80">menciones en medios. Fenalco es la agremiación con más presencia a nivel nacional.</p>
          </div>
          <p className="rv mt-6 text-[10px] uppercase tracking-[0.16em] text-white/40" style={d(3)}>
            Fuente: SigloData · datos al 5 de agosto de 2024
          </p>
        </div>
        <figure className="rv relative" style={d(2)}>
          <figcaption className={cn(kicker, "mb-4 text-white/50")}>Agremiaciones con más menciones a nivel nacional</figcaption>
          <div className="flex h-[min(52vh,440px)] items-end gap-1.5 border-b border-white/30 sm:gap-2.5">
            {mentions.map(([name, v], k) => (
              <div key={name} className="flex h-full flex-1 flex-col justify-end">
                <span className={cn("mb-1.5 text-center text-[10px] font-bold tabular-nums sm:text-xs", k === 0 ? "text-mint" : "text-white/60")}>{v.toLocaleString("es-CO")}</span>
                <i className={cn("grow-y block", k === 0 ? "bg-mint" : "bg-white/15")} style={{ ...d(k), height: `${(v / mentions[0][1]) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-1.5 sm:gap-2.5">
            {mentions.map(([name], k) => (
              <span key={name} className={cn("h-24 flex-1 rotate-180 text-right text-[9px] font-semibold uppercase tracking-[0.1em] [writing-mode:vertical-rl] sm:text-[10px]", k === 0 ? "text-mint" : "text-white/50")}>
                {name}
              </span>
            ))}
          </div>
        </figure>
      </div>
    ),
  },
  {
    label: "Líneas de trabajo",
    tone: "dark",
    render: () => (
      <div className="flex min-h-full flex-col px-[5vw] pb-20 pt-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={cn(kicker, "rv text-mint")}>Cómo trabajamos</p>
            <h2 className={cn(display, "rv mt-4 text-[11vw] sm:text-[clamp(2.6rem,4.6vw,4.8rem)]")} style={d(1)}>
              Líneas <em className="not-italic text-mint">de trabajo.</em>
            </h2>
          </div>
          <p className="rv max-w-sm text-white/70" style={d(2)}>
            Cuatro frentes para acompañar a cada empresa afiliada. Pase el cursor sobre cada uno.
          </p>
        </div>
        <div className="mt-8 flex flex-1 flex-col gap-2 lg:min-h-[54vh] lg:flex-row">
          {lines.map((l, k) => (
            <article key={l.title} className="rv group relative min-h-48 grow basis-0 overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(.16,.8,.2,1)] lg:hover:grow-[2.4]" style={d(3 + k)}>
              <Image src={img(`${l.pic}.jpg`)} alt="" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover grayscale-[.6] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,0,38,.95)_10%,rgba(13,0,38,.2)_70%)]" />
              <span className="text-outline absolute left-5 top-4 text-5xl font-extrabold tracking-tight text-mint">{String(k + 1).padStart(2, "0")}</span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-2xl font-extrabold uppercase leading-none tracking-tight sm:text-3xl">{l.title}</h3>
                <p className="mt-2 max-w-sm text-sm text-white/75 transition duration-500 lg:max-h-0 lg:translate-y-3 lg:opacity-0 lg:group-hover:max-h-20 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">{l.text}</p>
                <i className="mt-4 block h-1 w-10 bg-mint transition-all duration-700 group-hover:w-24" aria-hidden />
              </div>
            </article>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Normatividad",
    tone: "light",
    render: () => (
      <div className="mx-auto flex min-h-full w-[min(1280px,90vw)] flex-col justify-center py-14">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className={cn(kicker, "rv text-brand-600")}>Vocería · Normatividad</p>
            <h2 className={cn(display, "rv mt-4 text-[11vw] sm:text-[clamp(2.6rem,4.6vw,4.8rem)]")} style={d(1)}>
              Normas en las que <em className="block not-italic text-brand-600">estamos trabajando.</em>
            </h2>
          </div>
          <p className="rv max-w-xs text-ink/70" style={d(2)}>
            Seguimos de cerca las decisiones que cambian la operación de su negocio.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {norms.map((n, k) => (
            <article key={n.num} className="rv group relative flex flex-col bg-white p-6 shadow-[0_1px_0_rgba(18,10,42,.08)] ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(40,0,113,.35)]" style={d(3 + k)}>
              <span
                className="absolute right-4 top-4 grid size-[4.5rem] -rotate-12 place-items-center rounded-full border-2 border-mint-600 text-center text-[8px] font-extrabold uppercase leading-tight tracking-[0.12em] text-mint-700 transition group-hover:rotate-0"
                aria-hidden
              >
                En
                <br />
                segui-
                <br />
                miento
              </span>
              <span className={cn(kicker, "text-ink/50")}>{n.kind}</span>
              <p className="mt-3 leading-none">
                <b className="text-6xl font-extrabold tracking-[-0.04em] text-brand-600">{n.num}</b>
                <span className="ml-1 text-lg font-bold text-ink/40">/{n.year}</span>
              </p>
              {n.by && <span className="mt-2 text-xs font-semibold text-ink/50">{n.by}</span>}
              <h3 className="mt-5 border-t border-ink pt-4 text-xl font-extrabold uppercase leading-none">{n.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{n.text}</p>
            </article>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Networking",
    tone: "dark",
    render: () => (
      <>
        <video muted loop playsInline preload="metadata" className="absolute inset-0 -z-20 size-full object-cover opacity-40" aria-hidden>
          <source src="/video/rueda-negocios.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(13,0,38,.97)_30%,rgba(13,0,38,.7))]" />
        <div className="mx-auto grid min-h-full w-[min(1280px,90vw)] items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className={cn(kicker, "rv text-mint")}>Relacionamiento estratégico y networking</p>
            <h2 className={cn(display, "rv mt-5 text-[11vw] sm:text-[clamp(2.6rem,4.6vw,4.8rem)]")} style={d(1)}>
              Conectamos empresas <em className="block not-italic text-mint">con oportunidades.</em>
            </h2>
            <p className="rv mt-5 text-xl text-white/75" style={d(2)}>
              La agremiación acelera conexiones de alto valor.
            </p>
            <ol className="mt-8 border-t border-white">
              {[
                ["Comités sectoriales", "y encuentros empresariales."],
                ["Ruedas de negocio", "compradores y vendedores frente a frente."],
                ["Espacios patrocinados", "y eventos de gestión comercial."],
              ].map(([t, x], k) => (
                <li key={t} className="rv flex items-baseline gap-5 border-b border-white/20 py-4" style={d(3 + k)}>
                  <span className="text-outline text-3xl font-extrabold text-mint">{String(k + 1).padStart(2, "0")}</span>
                  <p>
                    <b className="text-xl font-extrabold uppercase sm:text-2xl">{t}</b> <span className="text-white/60">{x}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="rv relative mx-auto w-full max-w-md" style={d(3)}>
            <div className="animate-float rotate-2 bg-white p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
              <div className="relative aspect-[653/553]">
                <Image src={img("networking.jpg")} alt="Encuentros empresariales de Fenalco" fill sizes="(max-width: 1024px) 90vw, 30vw" className="object-cover" />
              </div>
            </div>
            <p className="absolute -bottom-10 -left-6 grid size-40 -rotate-12 place-items-center rounded-full bg-mint p-5 text-center text-sm font-extrabold uppercase leading-tight text-brand-950 shadow-xl sm:-left-12">
              Cada conexión puede convertirse en un negocio
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    label: "Seguridad",
    tone: "light",
    render: () => (
      <div className="grid min-h-full lg:grid-cols-[1fr_38%]">
        <div className="flex flex-col justify-center px-[6vw] py-14 lg:pl-[max(5vw,calc((100vw-1280px)/2))] lg:pr-[4vw]">
          <p className={cn(kicker, "rv text-brand-600")}>Seguridad y territorio</p>
          <h2 className={cn(display, "rv mt-5 text-[11vw] sm:text-[clamp(2.6rem,4.6vw,4.8rem)]")} style={d(1)}>
            Entornos más seguros <em className="block not-italic text-brand-600">para su empresa.</em>
          </h2>
          <p className="rv mt-8 flex flex-wrap items-center gap-x-4 text-[clamp(1.4rem,2.8vw,2.6rem)] font-extrabold uppercase leading-none tracking-tight" style={d(2)}>
            Seguridad <span className="grid size-[1.3em] place-items-center bg-mint text-brand-950">=</span> Competitividad
          </p>
          <p className="rv mt-3 text-ink/65" style={d(2)}>
            Entornos protegidos atraen más inversión y clientes.
          </p>
          <div className="mt-8 grid border-t border-ink sm:grid-cols-2">
            {[
              ["Estrategia de zonas seguras", "Articulación entre empresarios, Policía y alcaldías locales para proteger las zonas comerciales."],
              ["Gestión territorial", "Seguridad, espacio público, inspección, vigilancia y control con diálogos empresariales territoriales."],
            ].map(([t, x], k) => (
              <article key={t} className={cn("rv border-b border-ink/15 py-5 sm:pr-6", k > 0 && "sm:border-l sm:pl-6")} style={d(3 + k)}>
                <h3 className="text-xl font-extrabold uppercase leading-none">{t}</h3>
                <p className="mt-2 text-sm text-ink/65">{x}</p>
              </article>
            ))}
          </div>
        </div>
        <figure className="relative min-h-[45vh] overflow-hidden max-lg:order-first">
          <Image src={img("seguridad.jpg")} alt="Mesas de seguridad con Policía y alcaldías locales" fill sizes="(max-width: 1024px) 100vw, 38vw" className="kb object-cover" />
          <i className="absolute inset-y-0 left-0 w-2 bg-brand-600" aria-hidden />
        </figure>
      </div>
    ),
  },
  {
    label: "Eventos",
    tone: "dark",
    render: ({ openEvent }) => (
      <div className="mx-auto flex min-h-full w-[min(1280px,90vw)] flex-col justify-center py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={cn(kicker, "rv text-mint")}>Agenda del año</p>
            <h2 className={cn(display, "rv mt-4 text-[11vw] sm:text-[clamp(2.6rem,4.4vw,4.6rem)]")} style={d(1)}>
              Eventos <em className="block not-italic text-mint">comerciales.</em>
            </h2>
          </div>
          <p className="rv max-w-xs text-white/70" style={d(2)}>
            Un calendario para hacer negocios, aprender y ser reconocido. Toque un evento para ver el detalle.
          </p>
        </div>
        <div className="mt-8 grid gap-7">
          {agenda.map((a, ai) => (
            <div key={a.title} className="rv" style={d(3 + ai)}>
              <div className="mb-3 flex items-center gap-4">
                <p className={cn(kicker, "text-mint")}>{a.title}</p>
                <i className="h-px flex-1 bg-white/25" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">{a.rows.length} eventos</span>
              </div>
              <ol className="no-scrollbar -mx-[5vw] flex snap-x gap-3 overflow-x-auto px-[5vw] sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-8">
                {a.rows.map((r) => (
                  <li key={r.pic} className="w-44 shrink-0 snap-start sm:w-auto">
                    <button
                      type="button"
                      onClick={() => openEvent(r.pic)}
                      aria-label={`Ver detalle: ${r.name}`}
                      className={cn(
                        "group relative flex h-full w-full flex-col overflow-hidden bg-white/[0.06] text-left ring-1 ring-inset transition hover:-translate-y-1 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-mint",
                        r.hot ? "ring-mint" : "ring-white/10",
                      )}
                    >
                      <div className="relative aspect-[16/8] overflow-hidden">
                        <Image src={img(`eventos/${r.pic}.jpg`)} alt="" fill sizes="(max-width: 640px) 11rem, 13vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        {r.hot && <span className="absolute left-0 top-0 bg-mint px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-950">Destacado</span>}
                      </div>
                      <div className="flex flex-1 flex-col p-3">
                        <p className="flex items-baseline gap-1.5 leading-none">
                          <b className={cn("text-2xl font-extrabold tracking-tight", r.hot ? "text-mint" : "text-white")}>{r.day}</b>
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-mint">{r.month}</span>
                        </p>
                        <strong className="mt-2 block text-[13px] font-semibold leading-tight">{r.name}</strong>
                        {r.note && <span className="mt-1 block text-[11px] leading-snug text-white/50">{r.note}</span>}
                        <span className="mt-auto flex items-center gap-1 pt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-mint opacity-60 transition group-hover:opacity-100">
                          Ver detalle <ArrowUpRight className="size-3" aria-hidden />
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
                {a.rows.length < 8 && (
                  <li className="flex w-44 shrink-0 snap-start flex-col justify-between bg-mint p-4 text-brand-950 sm:w-auto">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em]">En el año</p>
                    <p>
                      <b className="block text-5xl font-extrabold leading-none tracking-tight">{events.length}</b>
                      <span className="mt-1 block text-sm font-semibold leading-tight">eventos en Bogotá, Barranquilla y Cartagena.</span>
                    </p>
                  </li>
                )}
              </ol>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Sectores",
    tone: "mint",
    render: () => (
      <div className="grid min-h-full items-center gap-10 py-14 lg:grid-cols-[auto_1fr]">
        <div className="px-[6vw] lg:pl-[max(5vw,calc((100vw-1280px)/2))] lg:pr-0">
          <p className={cn(kicker, "rv text-brand-700")}>Sectores económicos</p>
          <div className="mt-4 flex items-end gap-8 lg:block">
            <p className="rv" style={d(1)}>
              <CountUp to={18} className="block text-[clamp(6rem,15vw,14rem)] font-extrabold leading-[0.78] tracking-[-0.06em]" />
              <span className="mt-2 block text-xl font-extrabold uppercase">sectores</span>
            </p>
            <p className="rv lg:mt-8" style={d(2)}>
              <CountUp to={90} className="text-outline block text-[clamp(6rem,15vw,14rem)] font-extrabold leading-[0.78] tracking-[-0.06em]" />
              <span className="mt-2 block text-xl font-extrabold uppercase">subsectores</span>
            </p>
          </div>
        </div>
        <div className="rv grid gap-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" style={d(3)}>
          {[0, 1, 2].map((row) => (
            <Marquee key={row} reverse={row === 1} seconds={46 + row * 8}>
              {sectors
                .filter((_, k) => k % 3 === row)
                .map((s) => (
                  <span
                    key={s}
                    className={cn(
                      "mr-3 whitespace-nowrap px-6 py-4 text-[clamp(1rem,1.8vw,1.6rem)] font-extrabold uppercase tracking-tight",
                      row === 1 ? "bg-white text-brand-950" : "bg-brand-950 text-white",
                    )}
                  >
                    {s}
                  </span>
                ))}
            </Marquee>
          ))}
          <p className="px-[6vw] pt-4 text-lg font-semibold lg:pl-[8%]">Cada sector tiene su comité y su agenda dentro del gremio.</p>
        </div>
      </div>
    ),
  },
  {
    label: "Beneficios",
    tone: "light",
    render: () => (
      <div className="mx-auto grid min-h-full w-[min(1280px,90vw)] items-center gap-12 py-14 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className={cn(kicker, "rv text-brand-600")}>Plan de beneficios</p>
          <h2 className={cn(display, "rv mt-5 text-[11vw] sm:text-[clamp(2.6rem,4.4vw,4.6rem)]")} style={d(1)}>
            Una red de aliados <em className="block not-italic text-brand-600">para su empresa.</em>
          </h2>
          <p className="rv mt-6 text-lg text-ink/70" style={d(2)}>
            Aliados para fortalecer cada dimensión de su negocio.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allies.map((a, k) => (
            <article key={a.name} className="rv group flex flex-col bg-white p-5 ring-1 ring-ink/10 transition hover:-translate-y-1 hover:ring-2 hover:ring-mint" style={d(2 + k)}>
              <span className="text-[10px] font-bold tracking-[0.16em] text-ink/35">{String(k + 1).padStart(2, "0")}</span>
              <div className="relative mt-2 h-20">
                <Image src={img(a.pic)} alt={a.name} fill sizes="14rem" className="object-contain transition duration-500 group-hover:scale-105" />
              </div>
              <p className="mt-4 border-t border-ink/10 pt-3 text-sm text-ink/65">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Directorio",
    tone: "brand",
    render: () => (
      <div className="mx-auto grid min-h-full w-[min(1280px,90vw)] items-center gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className={cn(kicker, "rv text-mint")}>Directorio Fenalco Bogotá</p>
          <h2 className={cn(display, "rv mt-5 text-[11vw] sm:text-[clamp(2.6rem,4.6vw,4.8rem)]")} style={d(1)}>
            Dé visibilidad <em className="block not-italic text-mint">a su marca.</em>
          </h2>
          <p className="rv mt-6 max-w-xl text-lg text-white/75" style={d(2)}>
            Un espacio para que las empresas afiliadas muestren sus productos y servicios, y encuentren clientes y aliados dentro del gremio.
          </p>
          <p className={cn(kicker, "rv mt-8 text-white/50")} style={d(3)}>
            Entre los afiliados encontrará asesorías
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(
              [
                [Scale, "Legales"],
                [Megaphone, "Marketing"],
                [Calculator, "Contables"],
                [Coins, "Financieras"],
              ] as const
            ).map(([Icon, t], k) => (
              <span key={t} className="rv flex items-center gap-3 bg-white/10 px-4 py-3 font-bold uppercase tracking-wide ring-1 ring-inset ring-white/15 transition hover:bg-mint hover:text-brand-950" style={d(4 + k)}>
                <Icon className="size-5 shrink-0" aria-hidden /> {t}
              </span>
            ))}
          </div>
        </div>
        <div className="rv [perspective:1400px]" style={d(3)}>
          <div className="overflow-hidden bg-white shadow-[0_50px_100px_-30px_rgba(0,0,0,.7)] transition duration-700 [transform:rotateY(-10deg)_rotateX(4deg)] hover:[transform:none]">
            <div className="flex items-center gap-2 bg-[#ebe8f3] px-4 py-2.5">
              <i className="size-2.5 rounded-full bg-[#ff5f57]" />
              <i className="size-2.5 rounded-full bg-[#febc2e]" />
              <i className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 truncate bg-white px-3 py-1 text-[11px] text-ink/50">fenalcobogota.com.co/directorio</span>
            </div>
            <div className="relative aspect-[677/574]">
              <Image src={img("directorio.jpg")} alt="Directorio de afiliados Fenalco compra Fenalco" fill sizes="(max-width: 1024px) 90vw, 46vw" className="object-cover object-top" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Campañas",
    tone: "light",
    render: () => <Campaigns />,
  },
  {
    label: "Servicios",
    tone: "dark",
    render: () => (
      <div className="mx-auto flex min-h-full w-[min(1280px,90vw)] flex-col justify-center py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={cn(kicker, "rv text-mint")}>Servicios adicionales</p>
            <h2 className={cn(display, "rv mt-4 text-[11vw] sm:text-[clamp(2.6rem,4.6vw,4.8rem)]")} style={d(1)}>
              Todo lo que <em className="block not-italic text-mint">su empresa necesita.</em>
            </h2>
          </div>
          <p className="rv max-w-xs text-white/70" style={d(2)}>
            Formación, información y respaldo para el día a día.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 lg:grid-cols-7 lg:pb-8">
          {services.map((s, k) => (
            <figure key={s.name} className={cn("rv group", k % 2 === 1 && "lg:translate-y-8")} style={d(3 + k)}>
              <div className="relative aspect-[3/4] bg-white p-2 transition duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_0_3px_var(--color-mint)]">
                <div className="relative size-full">
                  <Image src={img(s.pic)} alt={s.name} fill sizes="(max-width: 640px) 45vw, 13vw" className="object-contain" />
                </div>
              </div>
              <figcaption className="mt-3 flex gap-2 text-xs font-bold uppercase leading-tight">
                <span className="text-mint">{String(k + 1).padStart(2, "0")}</span>
                {s.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Comunidad",
    tone: "light",
    render: () => (
      <div className="flex min-h-full flex-col justify-center py-14">
        <div className="mx-auto w-[min(1280px,90vw)] text-center">
          <p className={cn(kicker, "rv text-brand-600")}>Nuestros afiliados</p>
          <h2 className={cn(display, "rv mt-4 text-[11vw] sm:text-[clamp(2.8rem,5.4vw,5.8rem)]")} style={d(1)}>
            Una comunidad <em className="block not-italic text-brand-600">multisectorial.</em>
          </h2>
          <p className="rv mx-auto mt-5 max-w-xl text-lg text-ink/70" style={d(2)}>
            Empresas de todos los tamaños y sectores ya hacen parte del gremio.
          </p>
        </div>
        <div className="rv mt-10 grid gap-3 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" style={d(3)}>
          {[0, 1].map((row) => (
            <Marquee key={row} reverse={row === 1} seconds={38}>
              {companies.slice(row * 9, row * 9 + 9).map((src, k) => (
                <span key={src} className="relative mr-3 size-32 shrink-0 overflow-hidden bg-white ring-1 ring-ink/10 sm:size-36">
                  <Image src={src} alt={`Empresa afiliada ${row * 9 + k + 1}`} fill sizes="9rem" className="object-contain" />
                </span>
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Afíliese",
    tone: "mint",
    render: ({ onClose }) => (
      <div className="mx-auto grid min-h-full w-[min(1280px,90vw)] items-center gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className={cn(kicker, "rv text-brand-700")}>No solo somos un gremio, somos su aliado</p>
          <h2 className={cn(display, "rv mt-5 text-[13vw] sm:text-[clamp(3.2rem,6.4vw,6.8rem)]")} style={d(1)}>
            Es momento <em className="block not-italic text-white [-webkit-text-stroke:2px_var(--color-brand-950)]">de unirse.</em>
          </h2>
          <div className="rv mt-8 max-w-2xl bg-brand-950 p-6 text-white" style={d(2)}>
            <p className={cn(kicker, "text-mint")}>Recuerde que…</p>
            <p className="mt-2 text-xl font-bold leading-snug sm:text-2xl">Las cuotas de afiliación pagadas a los gremios son deducibles del impuesto de renta.</p>
            <p className="mt-2 text-xs text-white/55">Estatuto Tributario, art. 116, parágrafo 1.</p>
          </div>
          <div className="rv mt-6 grid gap-1 text-lg font-extrabold sm:text-2xl" style={d(3)}>
            <a href="mailto:marrieta@fenalcobogota.com.co" className="flex items-center gap-3 break-all hover:underline">
              <Mail className="size-5 shrink-0" aria-hidden /> marrieta@fenalcobogota.com.co
            </a>
            <a href="tel:+573006058727" className="flex items-center gap-3 hover:underline">
              <Phone className="size-5 shrink-0" aria-hidden /> 300 605 8727
            </a>
          </div>
        </div>
        <div className="rv mx-auto w-full max-w-xs" style={d(3)}>
          <figure className="rotate-3 bg-white p-5 shadow-[0_40px_80px_-30px_rgba(13,0,38,.6)] transition duration-500 hover:rotate-0">
            <Image src={img("qr-afiliacion.png")} alt="Código QR para afiliarse a Fenalco" width={300} height={300} className="h-auto w-full" />
            <figcaption className={cn(kicker, "mt-3 text-center text-ink/60")}>Escanee y afíliese</figcaption>
          </figure>
          <Link href="/sea-miembro-fenalco" onClick={onClose} className="mt-8 flex h-14 items-center justify-between bg-brand-950 px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-brand">
            Afíliese aquí
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    ),
  },
  {
    label: "Gracias",
    tone: "dark",
    render: ({ goTo }) => (
      <div className="flex min-h-full flex-col justify-center overflow-hidden py-14">
        <p className={cn(kicker, "rv mx-auto w-[min(1280px,90vw)] text-mint")}>FENALCO Bogotá Cundinamarca</p>
        <h2 className="rv mt-2 whitespace-nowrap text-center text-[17.5vw] font-extrabold uppercase leading-[0.8] tracking-[-0.06em]" style={d(1)}>
          Gracias<span className="text-mint">.</span>
        </h2>
        <div className="mx-auto mt-10 grid w-[min(1280px,90vw)] border-y border-white/20 sm:grid-cols-3">
          {(
            [
              [MapPin, "Carrera 4 # 19-85, Edificio FENALCO, Bogotá D.C."],
              [Phone, "PBX 601 350 0699"],
              [AtSign, "@fenalcobogota · fenalcobogota.com.co"],
            ] as const
          ).map(([Icon, t], k) => (
            <p key={t} className={cn("rv flex items-center gap-3 py-5 text-sm sm:text-base", k > 0 && "sm:border-l sm:border-white/20 sm:pl-6")} style={d(2 + k)}>
              <Icon className="size-5 shrink-0 text-mint" aria-hidden /> {t}
            </p>
          ))}
        </div>
        <div className="rv mx-auto mt-8 flex w-[min(1280px,90vw)] flex-wrap items-center justify-between gap-4" style={d(5)}>
          <p className="text-lg font-extrabold uppercase tracking-tight">
            Representar <span className="text-mint">→</span> Formar <span className="text-mint">→</span> Conectar
          </p>
          <button type="button" onClick={() => goTo(0)} className="flex h-12 items-center gap-3 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-inset ring-white/30 transition hover:bg-white hover:text-ink">
            <RotateCcw className="size-4" aria-hidden /> Volver al inicio
          </button>
        </div>
      </div>
    ),
  },
];

const TOTAL = scenes.length;

/** Presentación a pantalla completa con desplazamiento lateral, una escena por pantalla. */
export function PresentationDeck({ onClose }: { onClose: () => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const locked = useRef(false);
  const [scene, setScene] = useState(0);
  const [eventIdx, setEventIdx] = useState<number | null>(null);
  const eventOpen = useRef<number | null>(null);
  useEffect(() => {
    eventOpen.current = eventIdx;
  }, [eventIdx]);
  const stepEvent = (n: number) => setEventIdx((i) => (i === null ? i : (i + n + events.length) % events.length));

  // Escena destino: se recuerda aparte para que varias pulsaciones seguidas no se pierdan a mitad de animación.
  const target = useRef(0);
  const lastJump = useRef(0);
  const goTo = useCallback((i: number) => {
    const el = rail.current;
    if (!el) return;
    target.current = Math.max(0, Math.min(TOTAL - 1, i));
    lastJump.current = Date.now();
    el.scrollTo({ left: target.current * el.clientWidth, behavior: "smooth" });
  }, []);
  const current = () => target.current;

  // Bloquea el scroll de la página, cierra con Escape y navega con flechas.
  useEffect(() => {
    const html = document.documentElement.style.overflow;
    const body = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      // Con un evento abierto, el teclado controla la ventana de detalle y no la presentación.
      if (eventOpen.current !== null) {
        if (["ArrowRight", "ArrowLeft", "PageUp", "PageDown", " "].includes(e.key)) e.preventDefault();
        if (e.key === "Escape") setEventIdx(null);
        if (e.key === "ArrowRight") setEventIdx((i) => (i === null ? i : (i + 1) % events.length));
        if (e.key === "ArrowLeft") setEventIdx((i) => (i === null ? i : (i - 1 + events.length) % events.length));
        return;
      }
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "PageDown") goTo(current() + 1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") goTo(current() - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = html;
      document.body.style.overflow = body;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goTo]);

  // Reproduce solo los videos de la escena visible y marca la escena activa (para animar su contenido).
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          en.target.toggleAttribute("data-active", en.isIntersecting);
          const v = en.target.querySelector("video");
          if (!v) return;
          if (en.isIntersecting) void v.play().catch(() => {});
          else {
            v.pause();
            v.currentTime = 0;
          }
        }),
      { root: el, threshold: 0.55 },
    );
    el.querySelectorAll("section").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // La rueda vertical avanza una escena a la vez (en escritorio).
  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 8 || locked.current) return;
    locked.current = true;
    goTo(current() + (delta > 0 ? 1 : -1));
    window.setTimeout(() => (locked.current = false), 700);
  };

  const ctx: Ctx = { goTo, onClose, openEvent: (pic) => setEventIdx(events.findIndex((e) => e.pic === pic)) };
  const nn = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div role="dialog" aria-modal="true" aria-label="Presentación de FENALCO Bogotá Cundinamarca" className="deck-in fixed inset-0 z-[200] bg-ink text-white">
      <header className="absolute inset-x-0 top-0 z-20 flex h-16 items-center gap-5 border-b border-white/15 bg-ink/85 px-5 backdrop-blur-md sm:px-[3vw]">
        <Image src="/img/brand/logo-blanco.svg" alt="FENALCO Bogotá Cundinamarca" width={130} height={34} className="h-7 w-auto" />
        <i className="hidden h-6 w-px bg-white/20 md:block" />
        <span key={scene} className="deck-in hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 md:block">
          <b className="mr-2 text-mint">{nn(scene)}</b>
          {scenes[scene].label}
        </span>
        <button type="button" onClick={onClose} className="ml-auto flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/80 hover:text-white">
          Cerrar
          <span className="grid size-9 place-items-center ring-1 ring-white/30">
            <X className="size-4" aria-hidden />
          </span>
        </button>
      </header>

      {/* Índice: un segmento por escena, con su nombre al pasar el cursor. */}
      <nav aria-label="Escenas" className="absolute inset-x-0 top-16 z-20 flex h-3 gap-0.5">
        {scenes.map((s, i) => (
          <button key={s.label} type="button" onClick={() => goTo(i)} aria-label={`Ir a ${s.label}`} aria-current={i === scene ? "step" : undefined} className="group relative flex-1">
            <i className={cn("absolute inset-x-0 top-0 h-1 transition-colors duration-500", i <= scene ? "bg-mint" : "bg-white/20 group-hover:bg-white/50")} />
            <span className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink opacity-0 shadow-lg transition group-hover:opacity-100">
              {nn(i)} · {s.label}
            </span>
          </button>
        ))}
      </nav>

      <div
        ref={rail}
        onWheel={onWheel}
        onScroll={(e) => {
          const el = e.currentTarget;
          setScene(Math.round(el.scrollLeft / el.clientWidth));
          // Si el usuario desliza a mano (trackpad o dedo), la escena actual sigue al scroll.
          if (Date.now() - lastJump.current > 900) target.current = Math.round(el.scrollLeft / el.clientWidth);
        }}
        className="no-scrollbar absolute inset-x-0 bottom-0 top-16 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-contain"
      >
        {scenes.map((s, i) => (
          <section key={s.label} aria-label={s.label} className={cn("deck-panel deck-grain relative isolate h-full w-screen shrink-0 snap-start overflow-y-auto overflow-x-hidden", tones[s.tone])}>
            {/* Número gigante de fondo; su caja recorta el desborde para no generar scroll. */}
            <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <span className="text-outline absolute -bottom-[0.12em] -right-[0.04em] select-none text-[clamp(10rem,34vh,22rem)] font-extrabold leading-none tracking-[-0.06em] opacity-[0.09]">{nn(i)}</span>
            </span>
            <s.render {...ctx} />
          </section>
        ))}
      </div>

      <div className="absolute bottom-0 right-0 z-20 flex">
        <button type="button" onClick={() => goTo(scene - 1)} disabled={scene === 0} aria-label="Escena anterior" className="grid size-14 place-items-center bg-ink/80 text-white backdrop-blur transition hover:bg-ink disabled:opacity-30">
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => goTo(scene === TOTAL - 1 ? 0 : scene + 1)}
          aria-label={scene === TOTAL - 1 ? "Volver al inicio" : "Siguiente escena"}
          className="grid size-14 place-items-center bg-mint text-brand-950 transition hover:bg-mint-300"
        >
          {scene === TOTAL - 1 ? <RotateCcw className="size-5" aria-hidden /> : <ArrowRight className="size-5" aria-hidden />}
        </button>
      </div>

      {eventIdx !== null &&
        (() => {
          const ev = events[eventIdx];
          const when = ev.day === "—" ? ev.month : `${ev.day} de ${ev.month.toLowerCase()}`;
          return (
            <div className="deck-in fixed inset-0 z-[210] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={ev.name}>
              <button type="button" aria-label="Cerrar detalle" onClick={() => setEventIdx(null)} className="absolute inset-0 bg-[rgba(8,0,24,.78)] backdrop-blur-sm" />
              <article key={ev.pic} className="relative grid max-h-[92vh] w-[min(980px,100%)] overflow-y-auto bg-[#f5f3f9] text-ink shadow-2xl md:grid-cols-[1.15fr_1fr]">
                {/* El banner original es pequeño: se muestra a su tamaño sobre un fondo difuminado del mismo banner. */}
                <div className="relative isolate flex min-h-72 flex-col overflow-hidden bg-brand-950 p-6 text-white">
                  <Image src={img(`eventos/${ev.pic}.jpg`)} alt="" fill sizes="200px" className="-z-10 scale-125 object-cover opacity-60 blur-2xl" aria-hidden />
                  <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(13,0,38,.95),rgba(13,0,38,.35))]" />
                  <div className="relative my-auto aspect-[16/8] w-full max-w-[380px] self-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,.5)] ring-1 ring-white/20">
                    <Image src={img(`eventos/${ev.pic}.jpg`)} alt={ev.name} fill sizes="380px" className="object-cover" />
                  </div>
                  <div className="mt-6">
                    {ev.hot && <span className="mb-3 inline-block bg-mint px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-950">Destacado</span>}
                    <p className="flex items-baseline gap-2 leading-none">
                      <b className="text-6xl font-extrabold tracking-tight text-mint">{ev.day}</b>
                      <span className="text-sm font-bold uppercase tracking-[0.16em]">{ev.month}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">
                      {ev.semester} · {String(eventIdx + 1).padStart(2, "0")} / {events.length}
                    </span>
                    <button type="button" autoFocus onClick={() => setEventIdx(null)} aria-label="Cerrar" className="grid size-9 place-items-center ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
                      <X className="size-4" aria-hidden />
                    </button>
                  </div>
                  <h3 className="mt-5 text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] sm:text-4xl">{ev.name}</h3>
                  {ev.note && <p className="mt-4 text-lg leading-snug text-ink/75">{ev.note}</p>}
                  <dl className="mt-6 grid gap-0 border-t border-ink text-sm">
                    <div className="grid grid-cols-[6rem_1fr] gap-3 border-b border-ink/15 py-3">
                      <dt className="flex items-center gap-1.5 font-semibold text-ink/55">
                        <CalendarDays className="size-4" aria-hidden /> Fecha
                      </dt>
                      <dd className="font-semibold">{when}</dd>
                    </div>
                    <div className="grid grid-cols-[6rem_1fr] gap-3 border-b border-ink/15 py-3">
                      <dt className="font-semibold text-ink/55">Organiza</dt>
                      <dd className="font-semibold">Fenalco Bogotá Cundinamarca</dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <a
                      href={`mailto:marrieta@fenalcobogota.com.co?subject=${encodeURIComponent(`Información: ${ev.name}`)}`}
                      className="inline-flex h-12 items-center gap-3 bg-brand-600 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-brand"
                    >
                      <Mail className="size-4" aria-hidden /> Quiero participar
                    </a>
                    <Link href="/sea-miembro-fenalco" onClick={onClose} className="inline-flex h-12 items-center gap-3 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-inset ring-ink/25 transition hover:bg-ink hover:text-white">
                      Afíliese <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/15 pt-4 max-md:mt-8">
                    <button type="button" onClick={() => stepEvent(-1)} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/60 hover:text-ink">
                      <ArrowLeft className="size-4" aria-hidden /> Anterior
                    </button>
                    <button type="button" onClick={() => stepEvent(1)} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/60 hover:text-ink">
                      Siguiente <ArrowRight className="size-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          );
        })()}
    </div>
  );
}
