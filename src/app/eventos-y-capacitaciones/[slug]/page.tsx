import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, CheckCircle2, Clock, Lock, MonitorPlay, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/ui/Cards";
import { Countdown } from "@/components/ui/Countdown";
import { PageHero } from "@/components/ui/PageHero";
import { events, getEvent } from "@/data/content";
import { formatDate } from "@/lib/format";

export const instant = false;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/eventos-y-capacitaciones/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  return { title: e?.title ?? "Evento", description: e?.subtitle };
}

export default async function Page({ params }: PageProps<"/eventos-y-capacitaciones/[slug]">) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();
  const related = events.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={e.category} title={e.title} text={e.subtitle} crumbs={[{ label: "Eventos", href: "/eventos-y-capacitaciones" }, { label: e.title }]}>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">
            {e.mode === "Virtual" ? <MonitorPlay className="size-4 text-mint" aria-hidden /> : <Users className="size-4 text-mint" aria-hidden />} {e.mode}
          </span>
          {e.date && <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15"><CalendarDays className="size-4 text-mint" aria-hidden />{formatDate(e.date)}</span>}
          {e.start && <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15"><Clock className="size-4 text-mint" aria-hidden />{e.start} – {e.end}</span>}
          {e.exclusive && <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 font-semibold text-brand-950"><Lock className="size-4" aria-hidden />Exclusivo afiliados</span>}
        </div>
      </PageHero>

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg shadow-2xl lg:sticky lg:top-32 lg:self-start">
            <Image src={e.image} alt={e.title} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" priority />
          </div>
          <div>
            {e.date && <Countdown date={`${e.date}T09:00:00-05:00`} />}
            <h2 className="mt-10 text-2xl font-medium text-brand-950">Acerca de esta capacitación</h2>
            {e.about && <p className="mt-4 text-lg leading-relaxed text-ink/70">{e.about}</p>}
            <p className="mt-4 text-ink/70">Hace parte del plan de Formación Empresarial de FENALCO Bogotá Cundinamarca.</p>
            <h3 className="mt-10 text-lg font-medium text-brand-950">Temas</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {e.topics.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-2xl bg-surface p-4 text-sm font-medium text-ink/80">
                  <CheckCircle2 className="size-5 shrink-0 text-mint-600" aria-hidden />{t}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-lg bg-brand-50 p-8">
              <h3 className="text-lg font-medium text-brand-950">{e.exclusive ? "Inscripción para afiliados e inscritos" : "Inscripción abierta"}</h3>
              <p className="mt-2 text-sm text-ink/65">
                {e.exclusive ? "Inicie sesión para acceder al formulario de inscripción. Si aún no hace parte del gremio, vincúlese en minutos." : "Los afiliados al gremio obtienen un precio especial."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/iniciar-sesion" variant="brand">{e.exclusive ? "Iniciar sesión e inscribirme" : "Inscribirme"}</Button>
                <Button href="/sea-miembro-fenalco" variant="outline" arrow={false}>Quiero ser miembro</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-x">
          <h2 className="mb-8 text-2xl font-medium text-brand-950">También le puede interesar</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <EventCard key={r.slug} item={r} />)}
          </div>
        </div>
      </section>
    </>
  );
}
