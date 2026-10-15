import type { Metadata } from "next";
import Image from "next/image";
import { AgendaList } from "@/components/events/AgendaList";
import { Button } from "@/components/ui/Button";
import { Countdown } from "@/components/ui/Countdown";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Split } from "@/components/ui/Split";
import { events, getEvent } from "@/data/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Eventos y capacitaciones" };

const vitrinas = [
  { title: "Agenda de eventos 2026", text: "Ferias, foros y ruedas del año", image: "/img/ai/rueda-negocios.jpg", href: "https://sites.google.com/fenalcobogota.com.co/eventos2026/inicio" },
  { title: "Servicios al comercio", text: "Catálogo de empresas consultoras", image: "/img/sectores/servicios-al-comercio.jpg", href: "https://sites.google.com/fenalcobogota.com.co/empresasdeserviciosalcomercio/inicio" },
  { title: "Empresas del 12 de Octubre", text: "Vitrina de muebles y hogar", image: "/img/sectores/articulos-para-el-hogar.jpg", href: "https://sites.google.com/fenalcobogota.com.co/empresas12deoctubre/inicio" },
];

export default function Page() {
  const next = events.filter((e) => e.date).sort((a, b) => a.date!.localeCompare(b.date!))[0];
  const cert = getEvent("certificacion-y-recertificacion");

  return (
    <>
      <PageHero image="/img/ai/capacitacion.jpg" title="Eventos y capacitaciones" text="Formación práctica, certificaciones y encuentros de negocio para el comercio de la región.">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Button href="#agenda">Ver agenda</Button>
          <Button href="/sea-miembro-fenalco" variant="glass">Acceso para afiliados</Button>
        </div>
      </PageHero>

      {/* Agenda */}
      <section id="agenda" className="bg-white py-28 lg:py-36">
        <div className="container-x max-w-6xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="text-4xl font-medium tracking-tight text-ink sm:text-6xl">Agenda</h2>
            <p className="max-w-md text-ink/60">Sesiones de una hora, pensadas para aplicar de inmediato. Los afiliados acceden a tarifas preferenciales.</p>
          </div>
          <AgendaList items={events} />
        </div>
      </section>

      {/* Próxima sesión */}
      {next && (
        <section className="relative isolate overflow-hidden bg-black py-28 text-center text-white lg:py-40">
          <Image src={next.image} alt="" fill sizes="100vw" className="-z-20 scale-110 object-cover opacity-30 blur-2xl" />
          <div className="container-x max-w-4xl">
            <Reveal>
              <p className="text-sm font-medium text-white/60">Próxima sesión · {formatDate(next.date!)}</p>
              <h2 className="mt-3 text-4xl font-medium tracking-tight sm:text-6xl">{next.title}</h2>
              <p className="mt-3 text-lg text-white/70">{next.subtitle}</p>
            </Reveal>
            <div className="mx-auto mt-14 max-w-2xl">
              <Countdown date={`${next.date}T09:00:00-05:00`} />
            </div>
            <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row sm:gap-6">
              <Button href={`/eventos-y-capacitaciones/${next.slug}`} variant="light">Inscribirme</Button>
              <Button href="/sea-miembro-fenalco" variant="ghost">Aún no soy afiliado</Button>
            </div>
          </div>
        </section>
      )}

      {/* Ruedas de negocio */}
      <section className="relative isolate flex min-h-svh flex-col items-center justify-between overflow-hidden px-6 py-[16svh] text-center text-white">
        <video className="absolute inset-0 -z-20 h-full w-full object-cover" src="/video/rueda-negocios.mp4" poster="/img/ai/rueda-negocios.jpg" autoPlay muted loop playsInline preload="none" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/10 to-black/60" />
        <Reveal>
          <h2 className="text-4xl font-medium tracking-tight sm:text-6xl">Ruedas de negocio</h2>
          <p className="mt-3 text-lg text-white/85">Compradores y vendedores, frente a frente.</p>
        </Reveal>
        <div>
          <dl className="mx-auto mb-10 grid max-w-3xl grid-cols-3 gap-6">
            {[
              { v: "130+", l: "Ruedas realizadas" },
              { v: "25+", l: "Ferias comerciales" },
              { v: "700+", l: "Citas en CONECTA 2026" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-3xl font-medium sm:text-5xl">{s.v}</dd>
                <dd className="mt-1 text-xs text-white/75 sm:text-sm">{s.l}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-6">
            <Button href="/noticias/rueda-de-negocios-conecta">Conocer CONECTA</Button>
            <Button href="/directorio" variant="glass">Directorio de afiliados</Button>
          </div>
        </div>
      </section>

      {/* Certificación */}
      {cert && (
        <Split
          eyebrow="Certificaciones"
          title={cert.title}
          text={cert.about}
          image="/img/sectores/quimicos-agropecuarios.jpg"
          specs={[
            { value: "60 h", label: "Certificación" },
            { value: "20 h", label: "Recertificación" },
            { value: "100%", label: "Virtual" },
          ]}
          primary={{ label: "Inscribirme", href: `/eventos-y-capacitaciones/${cert.slug}` }}
          secondary={{ label: "Sector químico", href: "/sectores-del-comercio/quimicos-agropecuarios" }}
        />
      )}

      {/* Vitrinas */}
      <section className="grid gap-3 bg-white p-3 md:grid-cols-3">
        {vitrinas.map((v) => (
          <a key={v.title} href={v.href} target="_blank" rel="noopener noreferrer" className="group relative isolate flex min-h-[70svh] flex-col justify-between overflow-hidden rounded-md p-8 text-center text-white">
            <Image src={v.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="-z-20 object-cover transition duration-[1.4s] group-hover:scale-105" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/5 to-black/55" />
            <div>
              <h3 className="text-2xl font-medium sm:text-3xl">{v.title}</h3>
              <p className="mt-1 text-white/85">{v.text}</p>
            </div>
            <span className="mx-auto inline-flex min-w-48 justify-center rounded-[4px] bg-white/75 px-6 py-2.5 text-sm font-medium text-ink backdrop-blur-md transition group-hover:bg-white">Visitar</span>
          </a>
        ))}
      </section>
    </>
  );
}
