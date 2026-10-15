import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sealCompanies, sealPillars } from "@/data/content";

export const metadata: Metadata = { title: "Sello Comercio Responsable" };

export default function Page() {
  return (
    <>
      <PageHero image="/img/ai/tienda-sostenible.jpg"
        eyebrow="Sello Comercio Responsable"
        title={<>Las empresas responsables <span className="text-gradient">construyen mejor ciudad</span></>}
        text="Un reconocimiento del gremio a los afiliados que van más allá del cumplimiento legal, con buenas prácticas que generan impacto positivo en clientes, colaboradores, comunidad y ambiente."
        crumbs={[{ label: "Sello Comercio Responsable" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#empresas">Empresas con sello 2025 – 2026</Button>
          <Button href="/eventos-y-capacitaciones" variant="ghost" arrow={false}>Proceso para obtener el sello 2027 – 2028</Button>
        </div>
      </PageHero>
      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Ejes del programa" title="Seis compromisos que lo hacen visible" text="El programa de capacitación del sello se enfoca en mostrar al comercio como responsable:" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sealPillars.map((p, k) => (
              <Reveal key={p.title} delay={k * 0.06}>
                <div className="flex h-full items-center gap-5 rounded-lg bg-surface p-6">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mint/15 text-mint-700"><Icon name={p.icon} className="size-6" aria-hidden /></span>
                  <p className="text-lg font-semibold text-brand-950">Responsable {p.title.toLowerCase()}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="relative mt-12 aspect-[1536/720] overflow-hidden rounded-lg">
            <Image src="/img/banners/sello.png" alt="Empresas con Sello Comercio Responsable" fill sizes="100vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section id="empresas" className="bg-surface py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Vigencia 2025 – 2026" title="Empresas certificadas" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sealCompanies.map((c) => (
              <li key={c.name} className="flex flex-col rounded-lg bg-white p-6 ring-1 ring-brand/8">
                <BadgeCheck className="size-7 text-mint-600" aria-hidden />
                <p className="mt-6 text-lg font-medium text-brand-950">{c.name}</p>
                <p className="mt-1 text-sm text-ink/55">{c.sector}</p>
                <p className="mt-4 self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand">{c.category}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink/50">Listado parcial: el directorio completo se carga desde el sistema de afiliados.</p>
        </div>
      </section>
    </>
  );
}
