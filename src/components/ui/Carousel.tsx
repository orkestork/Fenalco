"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/format";

/** Carrusel horizontal: flechas, arrastre con el mouse, trackpad, teclado y barra de progreso. */
export function Carousel({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  // Avanza de a una "página" (el ancho visible menos un poco para dar contexto).
  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (drag.current?.moved) {
      // Evita que soltar el arrastre abra el enlace bajo el cursor.
      const stop = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      window.addEventListener("click", stop, { capture: true, once: true });
      setTimeout(() => window.removeEventListener("click", stop, { capture: true }), 50);
    }
    drag.current = null;
    setDragging(false);
  };

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={ref}
        role="list"
        aria-label={label}
        tabIndex={0}
        onScroll={update}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={cn(
          "no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2 outline-none sm:px-[max(1.5rem,calc((100vw-80rem)/2+2rem))]",
          "scroll-px-6 sm:scroll-px-[max(1.5rem,calc((100vw-80rem)/2+2rem))]",
          dragging ? "cursor-grabbing select-none snap-none [&_*]:pointer-events-none" : "cursor-grab snap-x snap-mandatory",
        )}
      >
        {children}
      </ul>

      <div className="mt-10 flex items-center gap-6 px-6 sm:px-[max(1.5rem,calc((100vw-80rem)/2+2rem))]">
        <div className="h-0.5 flex-1 overflow-hidden bg-black/10">
          <div className="h-full bg-ink transition-[width] duration-200" style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label="Anterior" className="grid size-11 place-items-center rounded-full ring-1 ring-black/15 transition hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30">
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label="Siguiente" className="grid size-11 place-items-center rounded-full ring-1 ring-black/15 transition hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
