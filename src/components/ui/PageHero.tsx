import Image from "next/image";
import type { ReactNode } from "react";

/** Encabezado de página interna: imagen a pantalla casi completa y un mensaje centrado. */
export function PageHero({
  eyebrow, title, text, children, image = "/img/ai/bogota-aerea.jpg",
}: { eyebrow?: string; title: ReactNode; text?: ReactNode; crumbs?: { label: string; href?: string }[]; children?: ReactNode; image?: string }) {
  return (
    <section className="relative isolate flex min-h-[78svh] flex-col items-center justify-between overflow-hidden bg-black text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />

      <div className="container-x max-w-4xl pt-[20svh] text-center">
        {eyebrow && <p className="mb-3 text-sm font-medium text-white/80">{eyebrow}</p>}
        <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {text && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{text}</p>}
      </div>

      <div className="container-x w-full pb-12">{children && <div className="flex justify-center">{children}</div>}</div>
    </section>
  );
}
