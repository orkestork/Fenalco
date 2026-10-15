import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/data/site";
import { getSector, sectorImage, sectors } from "@/data/sectors";

export const instant = false;

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sectores-del-comercio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSector(slug);
  return { title: s ? s.name : "Sector", description: s?.summary };
}

export default async function Page({ params }: PageProps<"/sectores-del-comercio/[slug]">) {
  const { slug } = await params;
  const s = getSector(slug);
  if (!s) notFound();
  const idx = sectors.findIndex((x) => x.slug === slug);
  const prev = sectors[(idx - 1 + sectors.length) % sectors.length];
  const next = sectors[(idx + 1) % sectors.length];

  return (
    <>
      <PageHero image={sectorImage(s.slug)} eyebrow={`Sector ${String(idx + 1).padStart(2, "0")} de ${sectors.length}`} title={s.name} text={s.summary} crumbs={[{ label: "Sectores", href: "/sectores-del-comercio" }, { label: s.name }]}>
        <ul className="flex flex-wrap gap-2">
          {s.members.map((m) => (
            <li key={m} className="rounded-full bg-white/10 px-4 py-1.5 text-sm ring-1 ring-white/15">{m}</li>
          ))}
        </ul>
      </PageHero>

      <section className="py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-medium text-brand-950">Comités y frentes de trabajo</h2>
            {s.committees.length ? (
              <ul className="mt-6 space-y-4">
                {s.committees.map((c, k) => (
                  <Reveal key={c.title} delay={k * 0.05}>
                    <li className="flex gap-4 rounded-lg bg-surface p-6">
                      <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-mint-600" aria-hidden />
                      <div>
                        <h3 className="font-semibold text-brand-950">{c.title}</h3>
                        {c.text && <p className="mt-1 text-sm leading-relaxed text-ink/65">{c.text}</p>}
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            ) : (
              <p className="mt-6 rounded-lg bg-surface p-6 text-ink/65">El gerente gremial acompaña directamente los temas regulatorios y comerciales del sector.</p>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg bg-brand p-8 text-white">
              <Award className="size-8 text-mint" aria-hidden />
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-mint">Representante en junta directiva</p>
              <p className="mt-2 text-xl font-medium">{s.representative.name}</p>
              <p className="text-white/70">{s.representative.company}</p>
            </div>
            <div className="rounded-lg p-8 ring-1 ring-brand/10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-mint-700">Equipo del sector</p>
              {s.managers.length ? (
                <ul className="mt-6 space-y-4">
                  {s.managers.map((m) => (
                    <li key={m.name} className="flex items-center gap-4">
                      {m.image ? (
                        <Image src={m.image} alt="" width={56} height={56} className="size-14 rounded-2xl bg-brand-50 object-cover" />
                      ) : (
                        <span className="grid size-14 place-items-center rounded-2xl bg-brand-50"><Icon name={s.icon} className="size-6 text-brand" /></span>
                      )}
                      <div>
                        <p className="font-semibold text-brand-950">{m.name}</p>
                        <p className="text-sm text-ink/55">Gerencia gremial</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-ink/65">Escríbanos y lo conectamos con el gerente gremial del sector.</p>
              )}
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`Sector ${s.name}`)}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-mint-700">
                <Mail className="size-4" aria-hidden /> Contactar al sector
              </a>
            </div>
            <Button href="/sea-miembro-fenalco" className="w-full">Afilie su empresa a este sector</Button>
          </aside>
        </div>
      </section>

      <nav aria-label="Otros sectores" className="border-t border-brand/10">
        <div className="container-x grid sm:grid-cols-2">
          <Link href={`/sectores-del-comercio/${prev.slug}`} className="group flex items-center gap-4 py-10 pr-6">
            <ArrowLeft className="size-5 text-brand transition group-hover:-translate-x-1" aria-hidden />
            <span><span className="block text-xs uppercase tracking-wider text-ink/50">Anterior</span><span className="font-semibold text-brand-950">{prev.name}</span></span>
          </Link>
          <Link href={`/sectores-del-comercio/${next.slug}`} className="group flex items-center justify-end gap-4 border-t border-brand/10 py-10 pl-6 text-right sm:border-l sm:border-t-0">
            <span><span className="block text-xs uppercase tracking-wider text-ink/50">Siguiente</span><span className="font-semibold text-brand-950">{next.name}</span></span>
            <ArrowRight className="size-5 text-brand transition group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </nav>
    </>
  );
}
