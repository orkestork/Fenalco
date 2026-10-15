import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { HistoryScroll } from "@/components/about/HistoryScroll";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { about, board, csr, director, report } from "@/data/about";

export const metadata: Metadata = { title: "Conózcanos" };

const specs = [
  { value: "18.000+", label: "Empresas afiliadas en el país" },
  { value: "18", label: "Sectores representados" },
  { value: "1945", label: "Año de fundación" },
];

export default function Page() {
  return (
    <>
      <PageHero image="/img/ai/bogota-aerea.jpg" title="La fuerza que une al comercio" text="El gremio de comerciantes más grande de Colombia, desde Bogotá y Cundinamarca.">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Button href="#historia">Nuestra historia</Button>
          <Button href="#junta-directiva" variant="glass">Junta directiva</Button>
        </div>
      </PageHero>

      {/* Declaración */}
      <section id="quienes-somos" className="bg-white py-28 lg:py-40">
        <div className="container-x max-w-5xl text-center">
          <Reveal>
            <p className="text-3xl font-medium leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Representamos a los empresarios ante el sector público y privado, y defendemos la libre empresa.
              <span className="text-ink/35"> {about.regional}</span>
            </p>
          </Reveal>
          <dl className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-6">
            {specs.map((s, k) => (
              <Reveal key={s.label} delay={k * 0.08}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-medium text-ink sm:text-5xl">{s.value}</dd>
                <dd className="mt-2 text-xs text-ink/55 sm:text-sm">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <HistoryScroll />

      {/* Misión y visión: dos piezas a pantalla completa */}
      <section id="mision-vision" className="grid lg:grid-cols-2">
        {[
          { t: "Misión", d: about.mission, img: "/img/ai/tendero.jpg" },
          { t: "Visión", d: about.vision, img: "/img/ai/calle-comercial.jpg" },
        ].map((x) => (
          <article key={x.t} className="group relative isolate flex min-h-[85svh] items-end overflow-hidden text-white">
            <Image src={x.img} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="-z-20 object-cover transition duration-[1.5s] group-hover:scale-105" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
            <Reveal className="max-w-xl p-8 sm:p-14">
              <h2 className="text-4xl font-medium sm:text-5xl">{x.t}</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/85">{x.d}</p>
            </Reveal>
          </article>
        ))}
      </section>

      {/* Director */}
      <section id="director" className="grid bg-white lg:grid-cols-2">
        <div className="relative min-h-[70svh] lg:min-h-svh">
          <Image src={director.image} alt={director.name} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-top" />
        </div>
        <div className="flex items-center px-6 py-20 sm:px-14 lg:px-20">
          <Reveal className="max-w-xl">
            <p className="text-sm font-medium text-ink/55">Director ejecutivo</p>
            <h2 className="mt-3 text-4xl font-medium tracking-tight text-ink sm:text-5xl">{director.name}</h2>
            <p className="mt-2 text-ink/55">{director.role}</p>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-y border-black/10 py-8">
              {director.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="sr-only">{h.label}</dt>
                  <dd className="text-3xl font-medium text-ink">{h.value}</dd>
                  <dd className="mt-1 text-xs text-ink/55">{h.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 space-y-5 leading-relaxed text-ink/70">
              {director.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Junta directiva como tabla */}
      <section id="junta-directiva" className="bg-surface py-28 lg:py-36">
        <div className="container-x max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl">Junta directiva</h2>
            <p className="max-w-md text-ink/60">Un empresario por sector, elegido por los afiliados, define el rumbo del gremio.</p>
          </div>
          <div className="mt-14 border-t border-black/10">
            <div className="hidden grid-cols-[1.2fr_1.2fr_1fr] gap-6 py-4 text-xs font-medium uppercase tracking-wider text-ink/45 md:grid">
              <span>Nombre</span><span>Empresa</span><span>Sector</span>
            </div>
            <ul>
              {board.map((m) => (
                <li key={m.name} className="grid gap-1 border-t border-black/10 py-5 transition-colors hover:bg-white md:grid-cols-[1.2fr_1.2fr_1fr] md:gap-6 md:px-3">
                  <span className="text-lg font-medium text-ink">{m.name}</span>
                  <span className="text-ink/70">{m.company}</span>
                  <span className="text-sm text-ink/50 md:text-base">{m.sector}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Fundación + informe */}
      <section className="grid gap-3 bg-white p-3 lg:grid-cols-2">
        <article id="responsabilidad-social" className="relative isolate flex min-h-[80svh] flex-col items-center justify-between overflow-hidden rounded-md px-6 py-16 text-center text-white">
          <Image src="/img/ai/tienda-sostenible.jpg" alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/10 to-black/70" />
          <div>
            <h2 className="text-3xl font-medium sm:text-4xl">{csr.title}</h2>
            <p className="mx-auto mt-3 max-w-md text-white/85">{csr.text}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span>{csr.contactName}</span>
              <a href={`tel:+57${csr.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-white"><Phone className="size-4" aria-hidden />{csr.phone}</a>
              <a href={`mailto:${csr.email}`} className="inline-flex items-center gap-1.5 hover:text-white"><Mail className="size-4" aria-hidden />Escribir</a>
            </div>
            <Button href={`mailto:${csr.email}`} variant="glass">Contactar la fundación</Button>
          </div>
        </article>
        <article id="informe" className="relative isolate flex min-h-[80svh] flex-col items-center justify-between overflow-hidden rounded-md px-6 py-16 text-center text-white">
          <Image src={report.image} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/20 to-black/75" />
          <div>
            <h2 className="text-3xl font-medium sm:text-4xl">{report.title}</h2>
            <p className="mx-auto mt-3 max-w-md text-white/85">{report.text}</p>
          </div>
          <Button href={report.href}>Descargar informe</Button>
        </article>
      </section>
    </>
  );
}
