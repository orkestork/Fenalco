import type { Metadata } from "next";
import { CreditCard, Landmark, Receipt, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { ORIGINAL_URL } from "@/data/site";

export const metadata: Metadata = { title: "Pagos en línea" };

const options = [
  { icon: Landmark, title: "PSE con factura", text: "Afiliados: pague las facturas mensuales de cuota gremial y otros servicios." },
  { icon: CreditCard, title: "Tarjeta de crédito con factura", text: "Pague sus facturas de FENALCO con tarjeta de crédito." },
  { icon: Receipt, title: "Pago sin factura", text: "Para capacitaciones no facturadas, pagos con tarjeta o abonos a una cobranza." },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Pagos en línea" title={<>Pague de forma <span className="text-gradient">rápida y segura</span></>} text="Elija el medio de pago que mejor se ajuste a su necesidad." crumbs={[{ label: "Pagos en línea" }]} />
      <section className="py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {options.map(({ icon: I, ...o }) => (
            <article key={o.title} className="flex flex-col rounded-lg bg-surface p-8">
              <span className="grid size-14 place-items-center rounded-2xl bg-brand text-mint"><I className="size-6" aria-hidden /></span>
              <h2 className="mt-8 text-xl font-medium text-brand-950">{o.title}</h2>
              <p className="mt-2 text-sm text-ink/65">{o.text}</p>
              {/* TODO: reemplazar por la URL de la pasarela oficial al pasar a producción */}
              <Button href={`${ORIGINAL_URL}/pagos-en-linea-3/`} variant="brand" className="mt-8 self-start">Pagar aquí</Button>
            </article>
          ))}
        </div>
      </section>
      <section className="pb-24">
        <div className="container-x">
          <div className="flex flex-col gap-6 rounded-lg bg-amber-50 p-8 ring-1 ring-amber-200 sm:flex-row sm:p-10">
            <ShieldAlert className="size-10 shrink-0 text-amber-600" aria-hidden />
            <div>
              <h2 className="text-xl font-medium text-brand-950">Información importante</h2>
              <p className="mt-2 text-ink/70">
                Solo son válidos los pagos realizados en las cuentas oficiales a nombre de FENALCO Bogotá Cundinamarca. Un pago hecho en otra cuenta se entiende como no realizado.
                Consulte el listado oficial de cuentas en el sitio del gremio o con servicio al cliente antes de pagar.
              </p>
              {/* Las cuentas bancarias se deben cargar desde una fuente oficial verificada, no se copian en este prototipo. */}
              <Button href={`${ORIGINAL_URL}/pagos-en-linea-3/`} variant="outline" className="mt-6">Ver cuentas oficiales</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
