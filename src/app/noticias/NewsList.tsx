"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { NewsItem } from "@/data/content";
import { cn, formatDate } from "@/lib/format";

export function NewsList({ items }: { items: NewsItem[] }) {
  const tags = ["Todas", ...new Set(items.map((n) => n.tag))];
  const [tag, setTag] = useState("Todas");
  const list = items.filter((n) => tag === "Todas" || n.tag === tag);

  return (
    <>
      <div className="no-scrollbar mb-14 flex gap-6 overflow-x-auto border-b border-black/10" role="tablist" aria-label="Tema">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tag === t}
            onClick={() => setTag(t)}
            className={cn("-mb-px shrink-0 border-b-2 pb-3 text-sm font-medium transition-colors", tag === t ? "border-ink text-ink" : "border-transparent text-ink/45 hover:text-ink")}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.ul layout className="grid gap-x-6 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((n, k) => (
            <motion.li
              layout
              key={n.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, delay: k * 0.05 }}
            >
              <Link href={`/noticias/${n.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-surface">
                  <Image src={n.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-105" />
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-ink/45">
                  {n.tag} · <time dateTime={n.date}>{formatDate(n.date)}</time>
                </p>
                <h3 className="mt-2 text-2xl font-medium leading-snug tracking-tight text-ink">{n.title}</h3>
                <p className="mt-2 line-clamp-2 text-ink/60">{n.summary}</p>
                <span className="mt-4 inline-block text-sm font-medium text-ink underline decoration-ink/25 underline-offset-4 group-hover:decoration-ink">Leer</span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
