"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export type TileProps = {
  title: string;
  subtitle?: ReactNode;
  link?: { label: string; href: string };
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  image: string;
  video?: string;
  videoMobile?: string;
  specs?: { value: string; label: string }[];
  priority?: boolean;
  /** Muestra el logo grande al centro como apertura de marca. */
  brand?: boolean;
  children?: ReactNode;
};

/** Bloque a pantalla completa: un mensaje, una imagen, dos acciones. */
export function Tile({ title, subtitle, link, primary, secondary, image, video, videoMobile, specs, priority, brand, children }: TileProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  // Reproduce el video solo cuando el bloque está en pantalla.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const fade = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: false, amount: 0.6 }, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section data-header={brand ? "hero" : undefined} className="relative isolate flex h-svh snap-start [text-shadow:0_1px_12px_rgb(0_0_0/0.35)] snap-always flex-col items-center justify-between overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        {video ? (
          <video ref={ref} className="h-full w-full object-cover" poster={image} muted loop playsInline preload={priority ? "auto" : "none"} autoPlay={priority} aria-hidden>
            {videoMobile && <source src={videoMobile} type="video/mp4" media="(max-width: 767px)" />}
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <Image src={image} alt="" fill priority={priority} sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 via-40% to-black/60" />
      </div>

      {brand ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-14 text-center">
          <motion.h1
            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)", filter: "blur(18px)", scale: 1.08, opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)", scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], opacity: { duration: 0.4 } }}
            className="w-[min(82vw,44rem)] drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
          >
            <Image src="/img/brand/logo-blanco.svg" alt="FENALCO Bogotá Cundinamarca" width={512} height={133} priority className="h-auto w-full" />
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0em" }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-xl font-medium tracking-tight sm:text-3xl"
          >
            {title}
          </motion.p>
          {subtitle && (
            <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.7 }} className="mt-2 text-sm text-white/80 sm:text-base">
              {subtitle}
            </motion.p>
          )}
        </div>
      ) : (
      <div className="px-6 pt-[18svh] text-center">
        <motion.h2 {...fade(0)} className="text-[2.5rem] font-medium leading-tight tracking-tight sm:text-5xl">
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p {...fade(0.1)} className="mt-2 text-base font-medium text-white/90 sm:text-lg">
            {subtitle}
          </motion.p>
        )}
        {link && (
          <motion.a {...fade(0.15)} href={link.href} className="mt-1 inline-block text-sm text-white/90 underline underline-offset-4 hover:text-white">
            {link.label}
          </motion.a>
        )}
      </div>
      )}

      <div className="w-full px-6 pb-[9svh]">
        {specs && (
          <motion.dl {...fade(0.15)} className="mx-auto mb-10 grid max-w-3xl grid-cols-3 gap-4 text-center">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-medium sm:text-4xl">{s.value}</dd>
                <dd className="mt-1 text-xs text-white/80 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        )}
        <motion.div {...fade(0.2)} className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <Button href={primary.href} variant="primary">{primary.label}</Button>
          {secondary && <Button href={secondary.href} variant="glass">{secondary.label}</Button>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
