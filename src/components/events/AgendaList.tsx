"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { EventItem } from "@/data/content";
import { cn, dayMonth, formatDate } from "@/lib/format";

const FILTERS = ["Todos", "Virtual", "Presencial"] as const;

/** Agenda: lista a la izquierda y vista previa fija a la derecha que cambia con la fila activa. */
export function AgendaList({ items }: { items: EventItem[] }) {
  const [mode, setMode] = useState<(typeof FILTERS)[number]>("Todos");
  const list = items.filter((e) => mode === "Todos" || e.mode === mode);
  const [activeSlug, setActiveSlug] = useState(list[0]?.slug);
  const active = list.find((e) => e.slug === activeSlug) ?? list[0];

  return (
    <div>
      <div className="mb-8 flex gap-6 border-b border-black/10" role="tablist" aria-label="Modalidad">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={mode === f}
            onClick={() => setMode(f)}
            className={cn("-mb-px border-b-2 pb-3 text-sm font-medium transition-colors", mode === f ? "border-ink text-ink" : "border-transparent text-ink/45 hover:text-ink")}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <ul className="border-t border-black/10">
          {list.map((e) => {
            const d = e.date ? dayMonth(e.date) : null;
            const on = e.slug === active?.slug;
            return (
              <li key={e.slug} onMouseEnter={() => setActiveSlug(e.slug)} onFocus={() => setActiveSlug(e.slug)}>
                <Link
                  href={`/eventos-y-capacitaciones/${e.slug}`}
                  className="group relative grid grid-cols-[4.5rem_1fr_auto] items-center gap-5 border-b border-black/10 py-7 sm:grid-cols-[6rem_1fr_auto] sm:gap-6"
                >
                  {/* Indicador de fila activa */}
                  <span className={cn("absolute inset-y-0 left-0 w-0.5 origin-top bg-brand-600 transition-transform duration-500 max-lg:hidden", on ? "scale-y-100" : "scale-y-0")} aria-hidden />
                  <div className={cn("leading-none transition-[padding,color] duration-500 lg:pl-5", on ? "text-ink" : "text-ink/35")}>
                    {d ? (
                      <>
                        <span className="block text-5xl font-medium tracking-tighter">{d.day}</span>
                        <span className="mt-1.5 block text-xs uppercase tracking-[0.14em]">{d.month}</span>
                      </>
                    ) : (
                      <span className="block text-xs font-medium uppercase tracking-[0.14em] text-brand-600">Abierta</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-ink/45">
                      {e.mode}
                      {e.start ? ` · ${e.start}` : ""}
                      {e.exclusive ? " · Afiliados" : ""}
                    </p>
                    <h3 className="mt-1 text-2xl font-medium tracking-tight text-ink sm:text-3xl">{e.title}</h3>
                    <p className="mt-1 line-clamp-1 text-ink/55">{e.subtitle}</p>
                  </div>
                  {/* Miniatura solo en móvil/tablet */}
                  <div className="relative aspect-[4/5] w-16 overflow-hidden rounded-[4px] ring-1 ring-black/10 lg:hidden">
                    <Image src={e.image} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <ArrowUpRight className={cn("size-5 transition duration-300 max-lg:hidden", on ? "translate-x-0 text-ink opacity-100" : "-translate-x-2 opacity-0")} aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Vista previa fija (escritorio) */}
        {active && (
          <aside className="hidden lg:block" aria-live="polite">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface ring-1 ring-black/5">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={active.slug}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={active.image} alt={`Afiche de ${active.title}`} fill sizes="320px" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-black/10 pb-3">
                  <dt className="text-ink/50">Fecha</dt>
                  <dd className="text-right font-medium text-ink">{active.date ? formatDate(active.date) : "Inscripción abierta"}</dd>
                </div>
                {active.start && (
                  <div className="flex justify-between gap-4 border-b border-black/10 pb-3">
                    <dt className="text-ink/50">Horario</dt>
                    <dd className="font-medium text-ink">
                      {active.start}
                      {active.end ? ` – ${active.end}` : ""}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 border-b border-black/10 pb-3">
                  <dt className="text-ink/50">Modalidad</dt>
                  <dd className="font-medium text-ink">{active.mode}</dd>
                </div>
              </dl>
              <Link
                href={`/eventos-y-capacitaciones/${active.slug}`}
                className="mt-6 flex h-11 items-center justify-center rounded-[4px] bg-brand-600 text-sm font-medium text-white transition hover:bg-brand"
              >
                Inscribirme
              </Link>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
