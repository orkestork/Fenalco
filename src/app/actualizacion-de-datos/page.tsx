import type { Metadata } from "next";
import { Form } from "@/components/forms/Form";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Actualización de datos" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Afiliados" title="Actualización de datos" text="Si es afiliado, mantenga al día la información de su empresa cada vez que cambie. Así le llegan a tiempo facturas, invitaciones e informes." crumbs={[{ label: "Actualización de datos" }]} />
      <section className="py-20">
        <div className="container-x max-w-3xl rounded-lg bg-white p-8 ring-1 ring-brand/8 sm:p-10">
          <Form submit="Actualizar datos" fields={[
            { name: "nit", label: "NIT" },
            { name: "razon", label: "Razón social" },
            { name: "direccion", label: "Dirección domicilio principal", full: true },
            { name: "ciudad", label: "Ciudad" },
            { name: "departamento", label: "Departamento" },
            { name: "telefono", label: "Teléfono o celular corporativo", type: "tel" },
            { name: "email", label: "Email corporativo principal", type: "email" },
            { name: "email_fe", label: "Email factura electrónica", type: "email" },
            { name: "rep", label: "Nombres y apellidos del representante legal" },
            { name: "rep_email", label: "Email del representante legal", type: "email", full: true },
          ]} />
        </div>
      </section>
    </>
  );
}
