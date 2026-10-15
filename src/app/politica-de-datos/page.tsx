import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { contact } from "@/data/site";

export const metadata: Metadata = { title: "Política de protección de datos" };

const points = [
  { t: "Responsable", d: `FENALCO Bogotá Cundinamarca, NIT ${contact.nit}, es responsable del tratamiento de sus datos personales, en cumplimiento de la Ley 1581 de 2012.` },
  { t: "Finalidades", d: "Gestión de clientes, proveedores y afiliados; tareas administrativas; prospección y fidelización; encuestas de opinión; y envío de comunicaciones sobre productos y servicios del gremio." },
  { t: "Datos sensibles", d: "Entregar datos sensibles o de menores de edad es opcional." },
  { t: "Sus derechos", d: `Puede conocer, corregir, suprimir o revocar la autorización sobre sus datos, o presentar reclamos, escribiendo a ${contact.privacyEmail} con el derecho que desea ejercer en el asunto, o por correo postal a ${contact.address}.` },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Política de protección de datos personales" text="Aviso de privacidad resumido. El documento completo de Habeas Data está disponible para descarga." crumbs={[{ label: "Protección de datos" }]} />
      <section className="py-20">
        <div className="container-x max-w-3xl space-y-4">
          {points.map((p) => (
            <article key={p.t} className="rounded-lg bg-surface p-8">
              <h2 className="text-lg font-medium text-brand-950">{p.t}</h2>
              <p className="mt-2 leading-relaxed text-ink/70">{p.d}</p>
            </article>
          ))}
          <a href="https://fenalcobogota.com.co/wp-content/uploads/2023/03/Habeas-Data-y-Autorizacionespara-el-tratamiento-de-datos-FBC-2023.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
            Descargar documento Habeas Data (PDF)
          </a>
        </div>
      </section>
    </>
  );
}
