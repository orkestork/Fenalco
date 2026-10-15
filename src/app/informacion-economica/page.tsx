import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reports } from "./Reports";

export const metadata: Metadata = { title: "Información económica y jurídica" };

export default function Page() {
  return (
    <>
      <PageHero image="/img/ai/analista-economia.jpg" eyebrow="Información económica y jurídica" title={<>Datos para <span className="text-gradient">decidir mejor</span></>} text="Boletines sectoriales, bitácora económica, cifras del mercado automotor y el observatorio jurídico, preparados por el equipo del gremio." crumbs={[{ label: "Información económica" }]} />
      <section className="py-20"><div className="container-x"><Reports /></div></section>
    </>
  );
}
