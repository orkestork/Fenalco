import type { Metadata } from "next";
import { LoginCard } from "@/components/forms/LoginCard";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Memorias de eventos" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Memorias de eventos" title={<>Lo que pasó en nuestros <span className="text-gradient">eventos</span></>} text="Presentaciones, grabaciones y material de apoyo de foros, capacitaciones y encuentros del gremio, organizados por año, mes y categoría." crumbs={[{ label: "Memorias de eventos" }]} />
      <section className="py-20"><div className="container-x max-w-lg"><LoginCard title="Contenido exclusivo para afiliados" /></div></section>
    </>
  );
}
