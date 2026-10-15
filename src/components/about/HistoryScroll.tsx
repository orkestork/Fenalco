"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { history } from "@/data/about";

// Número grande de cada hito (el año exacto va en el texto, para no inventar fechas).
const marks = history.map((_, k) => String(k + 1).padStart(2, "0"));

/** Línea de tiempo fija: cada pantalla de scroll avanza un hito. */
export function HistoryScroll() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setI(Math.min(history.length - 1, Math.max(0, Math.floor(v * history.length))));
  });

  const h = history[i];

  return (
    <section ref={ref} id="historia" className="relative bg-black text-white" style={{ height: `${history.length * 90}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <Image src="/img/ai/bogota-aerea.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />

        <div className="container-x relative flex flex-1 flex-col justify-center">
          <p className="text-sm font-medium text-white/60">Nuestra historia</p>
          <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="relative h-[clamp(7rem,22vw,18rem)] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={marks[i]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 text-[clamp(7rem,22vw,18rem)] font-medium leading-none tracking-tighter tabular-nums"
                >
                  {marks[i]}
                </motion.p>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={h.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }} className="max-w-md pb-4">
                <p className="text-sm font-medium text-mint">{h.year}</p>
                <h3 className="mt-2 text-3xl font-medium sm:text-4xl">{h.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/75">{h.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="container-x relative pb-10">
          <ol className="grid grid-cols-5 gap-2">
            {history.map((x, k) => (
              <li key={x.title}>
                <div className="h-0.5 overflow-hidden bg-white/15">
                  <motion.div className="h-full bg-white" animate={{ width: k <= i ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
                </div>
                <p className={k === i ? "mt-3 truncate text-xs font-medium text-white" : "mt-3 truncate text-xs text-white/40"}>{x.year}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
