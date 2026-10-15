"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { sectorImage, sectors } from "@/data/sectors";
import { cn } from "@/lib/format";

const EASE = [0.76, 0, 0.24, 1] as const;

/** Selector de sectores: la foto a pantalla completa cambia según el sector elegido. */
export function SectorExplorer({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);
  const s = sectors[i];

  // Recorre los sectores solo mientras nadie interactúa.
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setI((v) => (v + 1) % sectors.length), 5500);
    return () => clearInterval(id);
  }, [auto]);

  // Mantiene visible en la lista el sector activo.
  // (Se desplaza solo la lista: scrollIntoView movería también la sección.)
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-i="${i}"]`);
    if (!list || !el) return;
    if (list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
    } else {
      list.scrollTo({ top: el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2, behavior: "smooth" });
    }
  }, [i]);

  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pick = (k: number) => {
    clearTimeout(hoverTimer.current);
    setAuto(false);
    setI(k);
  };
  const hoverPick = (k: number) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => pick(k), 140);
  };

  return (
    <section className={cn("relative isolate flex h-svh flex-col overflow-hidden bg-black text-white [text-shadow:0_1px_16px_rgb(0_0_0/0.35)]", className)} onMouseLeave={() => setAuto(true)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={s.slug}
          initial={{ clipPath: "inset(0 0 0 100%)", scale: 1.18 }}
          animate={{ clipPath: "inset(0 0 0 0%)", scale: 1 }}
          exit={{ scale: 0.94, opacity: 0.4 }}
          transition={{ clipPath: { duration: 1.1, ease: EASE }, scale: { duration: 1.6, ease: EASE }, opacity: { duration: 1.1 } }}
          className="absolute inset-0 -z-20 will-change-transform"
        >
          <Image src={sectorImage(s.slug)} alt="" fill sizes="100vw" className="object-cover" priority={i === 0} />
          {/* Destello en el borde de la cortina */}
          <motion.span
            aria-hidden
            initial={{ left: "100%", opacity: 1 }}
            animate={{ left: "0%", opacity: 0 }}
            transition={{ left: { duration: 1.1, ease: EASE }, opacity: { duration: 0.3, delay: 0.9 } }}
            className="absolute inset-y-0 w-px bg-white shadow-[0_0_40px_12px_rgba(255,255,255,0.45)]"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-transparent via-45% to-black/25" />

      <div className="flex flex-1 flex-col justify-end px-6 pb-10 pt-24 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-white/70">
            Sector {String(i + 1).padStart(2, "0")} de {sectors.length}
          </p>
          <AnimatePresence mode="wait">
            <motion.div key={s.slug} exit={{ opacity: 0, y: -14, transition: { duration: 0.25 } }}>
              <h2 className="mt-3 text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
                {s.name.split(" ").map((w, k) => (
                  <span key={w + k} className="inline-block overflow-hidden pb-1 pr-[0.22em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, delay: 0.25 + k * 0.06, ease: EASE }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </h2>
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: EASE }}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{s.summary}</p>
                <p className="mt-4 text-sm text-white/75">
                  Representante en junta: <span className="text-white">{s.representative.name}</span> · {s.representative.company}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href={`/sectores-del-comercio/${s.slug}`}>Ver sector</Button>
            <Button href="/sea-miembro-fenalco" variant="glass">Afiliarme a este sector</Button>
          </div>
        </div>

        {/* Lista: vertical en escritorio, carrusel en móvil */}
        <ul
          ref={listRef}
          onMouseEnter={() => setAuto(false)}
          className="no-scrollbar -mx-6 mt-10 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:mt-0 lg:max-h-[62svh] lg:w-80 lg:flex-col lg:gap-0 lg:overflow-y-auto lg:overflow-x-visible lg:rounded-md lg:bg-black/35 lg:p-2 lg:backdrop-blur-xl"
        >
          {sectors.map((x, k) => (
            <li key={x.slug} className="shrink-0">
              <button
                type="button"
                data-i={k}
                onMouseEnter={() => hoverPick(k)}
                onFocus={() => pick(k)}
                onClick={() => pick(k)}
                aria-pressed={k === i}
                className={cn(
                  "w-full whitespace-nowrap rounded-[4px] px-3 py-2 text-left text-sm transition-colors lg:whitespace-normal",
                  k === i ? "bg-white text-ink" : "bg-white/10 text-white/80 hover:bg-white/20 lg:bg-transparent",
                )}
              >
                {x.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Barra de progreso */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
        <motion.div key={`${s.slug}-${auto}`} className="h-full bg-white" initial={{ width: "0%" }} animate={{ width: auto ? "100%" : "0%" }} transition={{ duration: auto ? 5.5 : 0, ease: "linear" }} />
      </div>
      <Link href="/sectores-del-comercio" className="sr-only">Ver todos los sectores</Link>
    </section>
  );
}
