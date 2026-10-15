"use client";

import { animate, AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Pausa en blanco a pantalla completa entre bloques de imagen. */
function Pause({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <section data-header="light" className="relative flex h-svh snap-start snap-always flex-col items-center justify-center bg-white px-6 text-center text-ink">
      {label && <p className="absolute top-[16svh] text-xs font-medium uppercase tracking-[0.3em] text-ink/40">{label}</p>}
      {children}
    </section>
  );
}

/** Frase que se revela palabra por palabra, de desenfocada a nítida. */
export function PhraseReveal({ label, words, accent = [] }: { label?: string; words: string; accent?: number[] }) {
  const reduce = useReducedMotion();
  return (
    <Pause label={label}>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.6 }}
        transition={{ staggerChildren: 0.09 }}
        className="max-w-5xl text-[clamp(2.4rem,6.5vw,6rem)] font-medium leading-[1.02] tracking-[-0.035em]"
      >
        {words.split(" ").map((w, k) => (
          <motion.span
            key={w + k}
            variants={reduce ? {} : { hidden: { opacity: 0, filter: "blur(14px)", y: 24 }, show: { opacity: 1, filter: "blur(0px)", y: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
            className={accent.includes(k) ? "mr-[0.25em] inline-block text-brand-600" : "mr-[0.25em] inline-block"}
          >
            {w}
          </motion.span>
        ))}
      </motion.h2>
    </Pause>
  );
}

/** "Defendemos a ___": la última palabra rota entre oficios. */
export function PhraseRotator({ label, lead, items }: { label?: string; lead: string; items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 1600);
    return () => clearInterval(id);
  }, [inView, items.length]);

  return (
    <Pause label={label}>
      <div ref={ref} className="text-[clamp(2.4rem,6.5vw,6rem)] font-medium leading-[1.05] tracking-[-0.035em]">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.6 }} transition={{ duration: 0.8, ease: EASE }}>
          {lead}
        </motion.p>
        <span className="relative block h-[1.15em] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={items[i]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="absolute inset-x-0 text-brand-600"
            >
              {items[i]}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
      <div className="mt-12 flex gap-1.5" aria-hidden>
        {items.map((x, k) => (
          <span key={x} className={k === i ? "h-1 w-6 rounded-full bg-ink transition-all" : "h-1 w-1.5 rounded-full bg-ink/20 transition-all"} />
        ))}
      </div>
    </Pause>
  );
}

/** Cifra grande que cuenta al entrar en pantalla. */
export function BigNumber({ label, value, suffix = "", caption }: { label?: string; value: number; suffix?: string; caption: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);

  return (
    <Pause label={label}>
      <p ref={ref} className="text-[clamp(5rem,20vw,17rem)] font-medium leading-none tracking-[-0.06em] tabular-nums">
        {n.toLocaleString("es-CO")}
        <span className="text-brand-600">{suffix}</span>
      </p>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.6 }} transition={{ duration: 0.8, delay: 0.6, ease: EASE }} className="mt-6 text-xl font-medium text-ink/60 sm:text-3xl">
        {caption}
      </motion.p>
    </Pause>
  );
}

/** Frases cortas que entran en secuencia, una por línea. */
export function PhraseStack({ label, lines }: { label?: string; lines: string[] }) {
  return (
    <Pause label={label}>
      <motion.div initial="hidden" whileInView="show" viewport={{ amount: 0.6 }} transition={{ staggerChildren: 0.45 }} className="text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[1.02] tracking-[-0.04em]">
        {lines.map((l, k) => (
          <span key={l} className="block overflow-hidden pb-1">
            <motion.span
              className={k === lines.length - 1 ? "block text-brand-600" : "block"}
              variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </Pause>
  );
}
