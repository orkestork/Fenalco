"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Search } from "lucide-react";
import { econReports, events, news, services } from "@/data/content";
import { sectors } from "@/data/sectors";
import { cn } from "@/lib/format";

type Hit = { type: string; title: string; href: string };

const tramites: Hit[] = [
  { type: "Trámite", title: "Solicitud de paz y salvo", href: "/servicio-al-cliente#paz-y-salvo" },
  { type: "Trámite", title: "Levantamiento de prenda", href: "/servicio-al-cliente#levantamiento-de-prenda" },
  { type: "Trámite", title: "PQRS", href: "/servicio-al-cliente#pqrs" },
  { type: "Trámite", title: "Envío de cuenta de cobro", href: "/servicio-al-cliente#cuenta-de-cobro" },
  { type: "Trámite", title: "Pagos en línea", href: "/pagos-en-linea" },
  { type: "Trámite", title: "Actualización de datos", href: "/actualizacion-de-datos" },
  { type: "Trámite", title: "Afiliarme a FENALCO", href: "/sea-miembro-fenalco" },
];

// Índice de todo lo que se puede encontrar en el sitio.
const INDEX: Hit[] = [
  ...news.map((n) => ({ type: "Noticia", title: n.title, href: `/noticias/${n.slug}` })),
  ...econReports.map((r) => ({ type: "Boletín", title: r.title, href: "/informacion-economica" })),
  ...events.map((e) => ({ type: "Evento", title: `${e.title} — ${e.subtitle}`, href: `/eventos-y-capacitaciones/${e.slug}` })),
  ...sectors.map((s) => ({ type: "Sector", title: s.name, href: `/sectores-del-comercio/${s.slug}` })),
  ...services.map((s) => ({ type: "Servicio", title: s.title, href: `/servicios-productos-y-alianzas#${s.id}` })),
  ...tramites,
];

const norm = (t: string) => t.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const suggestions = ["boletín", "paz y salvo", "auditorio", "capacitación", "salud", "vehículos"];

/** Buscador en vivo sobre noticias, boletines, eventos, sectores, servicios y trámites. */
export function ResourceSearch() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const hits = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return INDEX.filter((h) => terms.every((t) => norm(`${h.type} ${h.title}`).includes(t))).slice(0, 8);
  }, [q]);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!hits.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((v) => (v + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((v) => (v - 1 + hits.length) % hits.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      listRef.current?.querySelectorAll<HTMLAnchorElement>("a")[sel]?.click();
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl text-left">
      <label className="flex items-center gap-3 rounded-md bg-white/90 px-5 py-4 text-ink shadow-2xl ring-1 ring-white/40 backdrop-blur-xl focus-within:bg-white">
        <Search className="size-5 shrink-0 text-ink/40" aria-hidden />
        <span className="sr-only">Buscar en FENALCO</span>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          onKeyDown={onKey}
          placeholder="Busque boletines, trámites, eventos, sectores…"
          className="w-full bg-transparent text-base outline-none placeholder:text-ink/40 sm:text-lg"
          role="combobox"
          aria-expanded={hits.length > 0}
          aria-controls="resultados"
          autoComplete="off"
        />
      </label>

      {!q && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button key={s} type="button" onClick={() => setQ(s)} className="rounded-[4px] bg-white/15 px-3 py-1.5 text-sm text-white backdrop-blur-md transition hover:bg-white/25">
              {s}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {q && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-md bg-white text-ink shadow-2xl ring-1 ring-black/5"
          >
            {hits.length ? (
              <ul id="resultados" ref={listRef} role="listbox">
                {hits.map((h, k) => (
                  <li key={h.href + h.title} role="option" aria-selected={k === sel}>
                    <Link
                      href={h.href}
                      onMouseEnter={() => setSel(k)}
                      className={cn("flex items-center gap-4 px-5 py-3.5 transition-colors", k === sel ? "bg-surface" : "bg-white")}
                    >
                      <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wider text-ink/45">{h.type}</span>
                      <span className="line-clamp-1 flex-1 text-[15px]">{h.title}</span>
                      <ArrowUpRight className={cn("size-4 shrink-0 transition", k === sel ? "text-ink" : "text-ink/20")} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-5 py-6 text-sm text-ink/55">Sin resultados para “{q}”. Pruebe con otra palabra o escríbanos a servicio al cliente.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
