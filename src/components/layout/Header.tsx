"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, X } from "lucide-react";
import { megaNav, type MegaGroup } from "@/data/nav";
import { cn } from "@/lib/format";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState<MegaGroup | null>(null);
  const [mobile, setMobile] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setPanel(null);
    setMobile(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  // Detecta si justo debajo del menú hay una sección clara (data-header="light").
  // Escucha el scroll en fase de captura para incluir contenedores con scroll propio (inicio).
  const [onLight, setOnLight] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const under = document.elementsFromPoint(window.innerWidth / 2, 28).find((el) => !el.closest("header"));
        setOnLight(!!under?.closest('[data-header="light"]'));
      });
    };
    check();
    document.addEventListener("scroll", check, { capture: true, passive: true });
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("scroll", check, { capture: true });
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  const solid = scrolled || !!panel;
  const dark = !solid && !onLight; // texto blanco solo sobre imágenes oscuras

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setPanel(null)}>
      <div className={cn("relative z-10 transition-colors duration-300", solid ? "bg-white" : "bg-transparent")}>
        <div className="flex h-14 items-center justify-between px-4 sm:px-8">
          <Link
            href="/"
            aria-label="FENALCO Bogotá Cundinamarca – Inicio"
            className="shrink-0"
            onMouseEnter={() => setPanel(null)}
          >
            <Image src={dark ? "/img/brand/logo-blanco.svg" : "/img/brand/logo-color.svg"} alt="FENALCO Bogotá Cundinamarca" width={140} height={36} priority className="h-8 w-auto" />
          </Link>

          <nav aria-label="Principal" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-1">
              {megaNav.map((g) => (
                <li key={g.label}>
                  <Link
                    href={g.href}
                    onMouseEnter={() => setPanel(g)}
                    onFocus={() => setPanel(g)}
                    aria-expanded={panel?.label === g.label}
                    className={cn(
                      "block rounded-[4px] px-4 py-1.5 text-sm font-medium transition-colors",
                      dark ? "text-white hover:bg-white/15" : "text-ink hover:bg-black/5",
                      panel?.label === g.label && "bg-black/5",
                    )}
                  >
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1" onMouseEnter={() => setPanel(null)}>
            <Link href="/sea-miembro-fenalco" className={cn("hidden rounded-[4px] px-4 py-1.5 text-sm font-medium transition-colors sm:block", dark ? "text-white hover:bg-white/15" : "text-ink hover:bg-black/5")}>
              Sea miembro
            </Link>
            <Link href="/iniciar-sesion" className={cn("hidden rounded-[4px] px-4 py-1.5 text-sm font-medium transition-colors sm:block", dark ? "text-white hover:bg-white/15" : "text-ink hover:bg-black/5")}>
              Afiliados
            </Link>
            <button
              type="button"
              onClick={() => setMobile(true)}
              className={cn("rounded-[4px] px-4 py-1.5 text-sm font-medium lg:hidden", dark ? "bg-white/15 text-white backdrop-blur" : "bg-black/5 text-ink")}
            >
              Menú
            </button>
          </div>
        </div>
      </div>

      {/* Panel desplegable */}
      <AnimatePresence>
        {panel && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-14 hidden bg-white pb-12 pt-6 lg:block"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-[1fr_14rem] gap-12 px-8">
              <ul className="grid grid-cols-4 gap-x-6 gap-y-2">
                {panel.tiles.map((t) => (
                  <li key={t.label}>
                    <Link href={t.href} className="group block text-center">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-surface">
                        <Image src={t.image} alt="" fill sizes="20vw" className="object-cover transition duration-500 group-hover:scale-105" />
                      </div>
                      <p className="mt-3 text-sm font-medium text-ink">{t.label}</p>
                      {t.caption && <p className="text-xs text-ink/50 underline-offset-4 group-hover:underline">{t.caption}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 border-l border-black/10 pl-10 text-sm">
                {panel.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="font-medium text-ink/75 hover:text-ink hover:underline hover:underline-offset-4">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {panel && <div aria-hidden onMouseEnter={() => setPanel(null)} onClick={() => setPanel(null)} className="fixed inset-0 top-14 -z-10 hidden bg-black/20 backdrop-blur-sm lg:block" />}

      {/* Menú móvil */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-20 overflow-y-auto bg-white px-6 pb-10 pt-4 lg:hidden"
          >
            <div className="flex justify-end">
              <button type="button" onClick={() => setMobile(false)} aria-label="Cerrar menú" className="grid size-10 place-items-center rounded-[4px] hover:bg-black/5">
                <X className="size-5" />
              </button>
            </div>
            <ul className="mt-4">
              {megaNav.map((g) => (
                <li key={g.label}>
                  <Link href={g.href} className="flex items-center justify-between rounded-[4px] px-3 py-4 text-lg font-medium text-ink hover:bg-black/5">
                    {g.label} <ChevronRight className="size-5 text-ink/40" />
                  </Link>
                </li>
              ))}
              {[{ label: "Sea miembro", href: "/sea-miembro-fenalco" }, { label: "Afiliados", href: "/iniciar-sesion" }, { label: "Pagos en línea", href: "/pagos-en-linea" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center justify-between rounded-[4px] px-3 py-4 text-lg font-medium text-ink hover:bg-black/5">
                    {l.label} <ChevronRight className="size-5 text-ink/40" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
