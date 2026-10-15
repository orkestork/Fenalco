import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/format";

export type SplitProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  text: ReactNode;
  image: string;
  specs?: { value: string; label: string }[];
  bullets?: readonly string[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  reverse?: boolean;
  dark?: boolean;
  children?: ReactNode;
};

/** Bloque de producto: imagen a sangre en una mitad, mensaje y ficha en la otra. */
export function Split({ id, eyebrow, title, text, image, specs, bullets, primary, secondary, reverse, dark, children }: SplitProps) {
  return (
    <section id={id} className={cn("grid lg:min-h-svh lg:grid-cols-2", dark ? "bg-black text-white" : "bg-white text-ink")}>
      <div className={cn("group relative min-h-[60svh] overflow-hidden lg:min-h-full", reverse && "lg:order-2")}>
        <Image src={image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="flex items-center px-6 py-20 sm:px-14 lg:px-20">
        <Reveal className="w-full max-w-xl">
          {eyebrow && <p className={cn("text-sm font-medium", dark ? "text-white/55" : "text-ink/50")}>{eyebrow}</p>}
          <h2 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">{title}</h2>
          <div className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/75" : "text-ink/65")}>{text}</div>

          {specs && (
            <dl className={cn("mt-10 grid grid-cols-3 gap-6 border-y py-8", dark ? "border-white/15" : "border-black/10")}>
              {specs.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl font-medium sm:text-4xl">{s.value}</dd>
                  <dd className={cn("mt-1 text-xs sm:text-sm", dark ? "text-white/55" : "text-ink/50")}>{s.label}</dd>
                </div>
              ))}
            </dl>
          )}

          {bullets && (
            <ul className={cn("mt-8 divide-y border-y", dark ? "divide-white/10 border-white/10" : "divide-black/5 border-black/5")}>
              {bullets.map((b) => (
                <li key={b} className="flex items-center justify-between py-3.5 text-[15px]">
                  {b}
                  <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />
                </li>
              ))}
            </ul>
          )}

          {children}

          {(primary || secondary) && (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {primary && <Button href={primary.href}>{primary.label}</Button>}
              {secondary && <Button href={secondary.href} variant={dark ? "ghost" : "outline"}>{secondary.label}</Button>}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
