"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

// Skyline original de Bogotá trazado como UNA sola línea continua (sin levantar el lápiz).
// Se construye como lista de puntos para poder incluir curvas muestreadas.
type P = [number, number];
const G = 330; // nivel del suelo

const arc = (cx: number, cy: number, r: number, from: number, to: number, steps = 24): P[] =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const a = ((from + ((to - from) * i) / steps) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });

const bezier = (p0: P, p1: P, p2: P, p3: P, steps = 28): P[] =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const u = 1 - t;
    return [
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ];
  });

// Torre con cúpula y cruz (para la Catedral Primada).
const bellTower = (x: number): P[] => [
  [x, 220], [x, 152],
  ...arc(x + 20, 152, 20, 180, 255, 8),
  [x + 18, 128], [x + 18, 112], [x + 12, 112], [x + 20, 112], [x + 20, 100], [x + 20, 112], [x + 28, 112], [x + 22, 112], [x + 22, 128],
  ...arc(x + 20, 152, 20, 285, 360, 8),
  [x + 40, 220],
];

function buildSkyline(): P[] {
  const pts: P[] = [[0, G], [40, G]];

  // Cerros orientales y Monserrate con su santuario
  pts.push(...bezier([40, G], [120, 322], [160, 232], [220, 177]));
  pts.push(...bezier([220, 177], [248, 152], [268, 138], [286, 133], 10));
  pts.push([286, 114], [294, 114], [294, 100], [300, 88], [300, 76], [300, 82], [294, 82], [306, 82], [300, 82], [300, 88], [306, 100], [306, 114], [314, 114], [314, 133]);
  pts.push(...bezier([314, 133], [336, 136], [356, 160], [386, 192], 14));
  pts.push(...bezier([386, 192], [432, 240], [472, 302], [560, G]));

  // Bloques bajos
  pts.push([580, G], [580, 252], [620, 252], [620, G], [630, G], [630, 222], [662, 222], [662, 234], [684, 234], [684, G]);

  // Torre Colpatria (con antena)
  pts.push([700, G], [700, 92], [712, 80], [712, 60], [728, 60], [728, 28], [732, 28], [732, 60], [748, 60], [748, 80], [760, 92], [760, G]);

  // BD Bacatá (dos torres inclinadas)
  pts.push([800, G], [800, 72], [832, 50], [832, G], [848, G], [848, 62], [884, 40], [884, G]);

  // Bloques medios
  pts.push([910, G], [910, 272], [960, 272], [960, G], [970, G], [970, 242], [1020, 242], [1020, 256], [1062, 256], [1062, G]);

  // Catedral Primada: torre, frontón con rosetón, torre
  pts.push([1120, G], [1120, 220], ...bellTower(1120).slice(1));
  pts.push([1170, 220], [1210, 186], [1250, 220], [1260, 220], ...bellTower(1260).slice(1));
  pts.push([1300, G]);

  // Capitolio Nacional: cornisa, frontón y columnata en una sola pasada
  pts.push([1350, G], [1350, 258], [1342, 258], [1342, 250], [1450, 250], [1500, 224], [1550, 250], [1658, 250], [1658, 258], [1650, 258]);
  for (let x = 1650, up = false; x > 1350; x -= 24, up = !up) {
    const nx = Math.max(1350, x - 24);
    pts.push(up ? [x, 258] : [x, G], up ? [nx, 258] : [nx, G]);
  }
  pts.push([1350, G], [1680, G]);

  // Casas de La Candelaria y un árbol
  pts.push([1680, 282], [1710, 262], [1740, 282], [1740, G], [1750, G], [1750, 292], [1785, 270], [1820, 292], [1820, G], [1830, G], [1830, 286], [1855, 272], [1880, 286], [1880, G]);
  pts.push([1906, G], [1906, 302], ...arc(1906, 288, 14, 90, 450, 28), [1906, G]);

  // Torres Atrio
  pts.push([1950, G], [1950, 112], [1990, 92], [1990, G], [2010, G], [2010, 72], [2060, 98], [2060, G]);

  // Remate contemporáneo
  pts.push([2100, G], [2100, 212], [2150, 212], [2150, G], [2160, G], [2160, 262], [2230, 262], [2230, G], [2240, G], [2240, 182], [2270, 166], [2300, 182], [2300, G], [2310, G], [2310, 272], [2380, 272], [2380, G], [2400, G]);

  return pts;
}

const D = (() => {
  const pts = buildSkyline();
  return pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
})();

// Nombre de cada monumento: aparece encima cuando la línea llega a él.
// `at` = x donde la línea empieza a dibujarlo; (x, y) = posición del texto.
const LABELS = [
  { name: "Monserrate", at: 220, x: 300, y: 52, anchor: "middle" },
  { name: "Torre Colpatria", at: 700, x: 718, y: 8, anchor: "end" },
  { name: "BD Bacatá", at: 800, x: 816, y: 24, anchor: "start" },
  { name: "Catedral Primada", at: 1120, x: 1210, y: 76, anchor: "middle" },
  { name: "Capitolio Nacional", at: 1350, x: 1500, y: 200, anchor: "middle" },
  { name: "La Candelaria", at: 1680, x: 1780, y: 238, anchor: "middle" },
  { name: "Torres Atrio", at: 1950, x: 2005, y: 48, anchor: "middle" },
] as const;

const DURATION = 4.2;

export function BogotaLine() {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const labels = useRef<(SVGTextElement | null)[]>([]);
  const inView = useInView(section, { amount: 0.5 });
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = path.current;
    const c = dot.current;
    if (!p || !c) return;
    const total = p.getTotalLength();
    p.style.strokeDasharray = `${total}`;

    // Longitud del trazo en la que la línea alcanza cada monumento.
    const marks = LABELS.map((l) => {
      let lo = 0;
      let hi = total;
      for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        if (p.getPointAtLength(mid).x < l.at) lo = mid;
        else hi = mid;
      }
      return hi / total;
    });

    const draw = (v: number) => {
      p.style.strokeDashoffset = `${total * (1 - v)}`;
      const pt = p.getPointAtLength(total * v);
      c.setAttribute("cx", `${pt.x}`);
      c.setAttribute("cy", `${pt.y}`);
      c.style.opacity = v > 0 && v < 1 ? "1" : "0";
      labels.current.forEach((t, i) => t?.toggleAttribute("data-on", v >= marks[i]));
      // El copy entra cuando la línea está por terminar.
      copy.current?.toggleAttribute("data-on", v >= 0.85);
    };

    if (reduce) {
      draw(1);
      return;
    }
    if (!inView) {
      draw(0);
      return;
    }
    const ctrl = animate(0, 1, { duration: DURATION, ease: [0.3, 0.1, 0.3, 1], onUpdate: draw });
    return () => ctrl.stop();
  }, [inView, reduce]);

  return (
    <section
      ref={section}
      data-header="light"
      aria-label="Bogotá dibujada en una sola línea"
      className="relative flex h-svh snap-start snap-always flex-col justify-center overflow-hidden bg-white text-ink"
    >
      <svg viewBox="-20 -30 2440 390" className="mx-auto h-auto w-full px-4 sm:px-10" fill="none" aria-hidden>
        <path ref={path} d={D} stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" style={{ strokeDashoffset: 99999, strokeDasharray: 99999 }} />
        <circle ref={dot} r={6} className="fill-brand-600" style={{ opacity: 0 }} />
        {LABELS.map((l, i) => (
          <text
            key={l.name}
            ref={(el) => {
              labels.current[i] = el;
            }}
            x={l.x}
            y={l.y}
            textAnchor={l.anchor}
            className="hidden translate-y-2 fill-current text-[19px] font-medium uppercase tracking-[0.14em] opacity-0 transition duration-700 ease-out md:block data-[on]:translate-y-0 data-[on]:opacity-60"
          >
            {l.name}
          </text>
        ))}
      </svg>
      <div ref={copy} className="group mx-auto mt-14 max-w-4xl px-6 text-center sm:mt-20">
        <h2 className="translate-y-6 text-3xl font-medium tracking-tight opacity-0 transition duration-1000 ease-out group-data-[on]:translate-y-0 group-data-[on]:opacity-100 sm:text-5xl">
          Bogotá se construye en cada vitrina.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl translate-y-6 text-balance text-lg text-ink/55 opacity-0 transition delay-200 duration-1000 ease-out group-data-[on]:translate-y-0 group-data-[on]:opacity-100">
          Desde 1945 acompañamos al comercio que le da vida a la ciudad, del centro histórico a las nuevas torres.
        </p>
      </div>
    </section>
  );
}
