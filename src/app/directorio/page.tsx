import type { Metadata } from "next";
import { Building, Handshake, Search } from "lucide-react";
import { LoginCard } from "@/components/forms/LoginCard";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Directorio de afiliados" };

const perks = [
  { icon: Search, title: "Encuentre proveedores", text: "Busque empresas afiliadas por sector y actividad." },
  { icon: Handshake, title: "Fenalco compra Fenalco", text: "Haga negocios entre miembros del gremio." },
  { icon: Building, title: "Visibilidad", text: "Su empresa aparece ante miles de potenciales clientes." },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Miembros FENALCO" title={<>Directorio de <span className="text-gradient">afiliados</span></>} text="Descubra clientes, proveedores y aliados dentro de la red de empresas del gremio." crumbs={[{ label: "Directorio de afiliados" }]} />
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <ul className="space-y-4">
            {perks.map(({ icon: I, ...p }) => (
              <li key={p.title} className="flex gap-5 rounded-lg bg-surface p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-mint"><I className="size-5" aria-hidden /></span>
                <div><p className="font-semibold text-brand-950">{p.title}</p><p className="mt-1 text-sm text-ink/60">{p.text}</p></div>
              </li>
            ))}
          </ul>
          <LoginCard title="Acceso exclusivo" note="El directorio está disponible para afiliados e inscritos." />
        </div>
      </section>
    </>
  );
}
