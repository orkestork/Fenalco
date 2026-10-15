import type { Metadata } from "next";
import { LoginCard } from "@/components/forms/LoginCard";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Zona de afiliados" title="Bienvenido de nuevo" text="Acceda a capacitaciones exclusivas, memorias de eventos, informes económicos y el directorio de afiliados." crumbs={[{ label: "Iniciar sesión" }]} />
      <section className="py-20"><div className="container-x max-w-lg"><LoginCard /></div></section>
    </>
  );
}
