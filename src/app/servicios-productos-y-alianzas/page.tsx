import type { Metadata } from "next";
import Image from "next/image";
import { Form } from "@/components/forms/Form";
import { contactFields } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionNav } from "@/components/ui/SectionNav";
import { Split, type SplitProps } from "@/components/ui/Split";
import { services } from "@/data/content";

export const metadata: Metadata = { title: "Servicios, productos y alianzas" };

type ServiceId = (typeof services)[number]["id"];

// Presentación de cada servicio: imagen, cifras y acciones.
const view: Record<ServiceId, Pick<SplitProps, "image" | "specs" | "primary" | "secondary">> = {
  auditorio: {
    image: "/img/services/auditorio-1.png",
    specs: [
      { value: "400", label: "Asistentes" },
      { value: "2", label: "Camerinos" },
      { value: "1", label: "Escenario con sonido y video" },
    ],
    primary: { label: "Reservar el auditorio", href: "#contacto" },
    secondary: { label: "Requerimientos técnicos", href: "https://fenalcobogota.com.co/wp-content/uploads/2024/05/Rider_Auditorio_Lorenzo_Botero_Fenalco.pdf" },
  },
  "asesoria-juridica": {
    image: "/img/ai/asesoria-juridica.jpg",
    primary: { label: "Hacer una consulta", href: "#contacto" },
  },
  "centro-empresarial": {
    image: "/img/services/centro-empresarial.png",
    specs: [
      { value: "6", label: "Salas" },
      { value: "100", label: "Personas en total" },
      { value: "1", label: "Recepción independiente" },
    ],
    primary: { label: "Reservar salas", href: "#contacto" },
  },
  conciliacion: {
    image: "/img/ai/conciliacion.jpg",
    primary: { label: "Solicitar una conciliación", href: "#contacto" },
  },
  formacion: {
    image: "/img/ai/capacitacion.jpg",
    primary: { label: "Diseñar mi programa", href: "#contacto" },
    secondary: { label: "Ver agenda abierta", href: "/eventos-y-capacitaciones" },
  },
  "informacion-comercial": {
    image: "/img/ai/analista-economia.jpg",
    specs: [
      { value: "2", label: "Bureaus de consulta" },
      { value: "1", label: "Cupo sugerido" },
      { value: "100%", label: "Referencias validadas" },
    ],
    primary: { label: "Consultar un cliente", href: "#contacto" },
  },
};

export default function Page() {
  return (
    <>
      <PageHero image="/img/services/auditorio-2.png" title="Servicios para el comercio" text="Espacios, asesoría y herramientas para que su empresa crezca con respaldo.">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Button href="#auditorio">Ver servicios</Button>
          <Button href="#contacto" variant="glass">Hablar con un asesor</Button>
        </div>
      </PageHero>

      <SectionNav items={services.map((s) => ({ id: s.id, label: s.title.replace(" Lorenzo Botero Jaramillo", "").replace(" FENALCO", "") }))} />

      {services.map((s, k) => (
        <Split
          key={s.id}
          id={s.id}
          eyebrow={`${String(k + 1).padStart(2, "0")} / ${String(services.length).padStart(2, "0")}`}
          title={s.title}
          text={s.text}
          bullets={"specs" in view[s.id] && view[s.id].specs ? undefined : s.features}
          reverse={k % 2 === 1}
          dark={k % 2 === 1}
          {...view[s.id]}
        >
          {s.id === "auditorio" && "images" in s && (
            <div className="no-scrollbar -mx-6 mt-8 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:px-0">
              {s.images.slice(1).map((src, i) => (
                <div key={src} className="relative aspect-[4/3] w-36 shrink-0 overflow-hidden rounded-[4px]">
                  <Image src={src} alt={`Auditorio, foto ${i + 2}`} fill sizes="144px" className="object-cover transition duration-500 hover:scale-110" />
                </div>
              ))}
            </div>
          )}
          {"contact" in s && <p className="mt-6 text-sm text-ink/55">Reservas: {s.contact}</p>}
        </Split>
      ))}

      <section id="contacto" className="bg-surface py-28 lg:py-36">
        <div className="container-x grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl">Hablemos</h2>
            <p className="mt-5 text-lg text-ink/60">Cuéntenos qué necesita y un asesor le responde con una propuesta a la medida.</p>
          </div>
          <Form fields={[{ name: "servicio", label: "Servicio de interés", type: "select", options: services.map((s) => s.title), full: true }, ...contactFields]} />
        </div>
      </section>
    </>
  );
}
