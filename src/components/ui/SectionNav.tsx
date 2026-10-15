"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";

/** Barra fija bajo el menú con anclas a las secciones; resalta la sección visible. */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  // Mantiene visible la pestaña activa en móvil, desplazando solo la barra.
  useEffect(() => {
    const bar = barRef.current;
    const el = bar?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (bar && el) bar.scrollTo({ left: el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Secciones" className="sticky top-14 z-40 border-b border-black/5 bg-white/85 backdrop-blur-xl">
      <div ref={barRef} className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:justify-center">
        {items.map((i) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            data-id={i.id}
            className={cn(
              "relative shrink-0 px-4 py-4 text-sm font-medium transition-colors",
              active === i.id ? "text-ink" : "text-ink/45 hover:text-ink",
            )}
          >
            {i.label}
            <span className={cn("absolute inset-x-4 bottom-0 h-0.5 bg-ink transition-transform duration-300", active === i.id ? "scale-x-100" : "scale-x-0")} />
          </a>
        ))}
      </div>
    </nav>
  );
}
