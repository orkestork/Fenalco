import type { Metadata } from "next";
import { Clock, FileCheck2, FileText, KeyRound, MessageSquareText, Wallet } from "lucide-react";
import { Form } from "@/components/forms/Form";
import { contactFields } from "@/components/forms/fields";
import { PageHero } from "@/components/ui/PageHero";
import { customerService } from "@/data/content";
import { contact } from "@/data/site";

export const metadata: Metadata = { title: "Servicio al cliente" };

const tabs = [
  { id: "paz-y-salvo", label: "Paz y salvo", icon: FileCheck2 },
  { id: "levantamiento-de-prenda", label: "Levantamiento de prenda", icon: KeyRound },
  { id: "cuenta-de-cobro", label: "Cuenta de cobro", icon: FileText },
  { id: "pqrs", label: "PQRS", icon: MessageSquareText },
];

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="mt-6 space-y-3">
      {items.map((s, k) => (
        <li key={s} className="flex gap-4 rounded-2xl bg-surface p-4 text-sm text-ink/80">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-medium text-white">{k + 1}</span>{s}
        </li>
      ))}
    </ol>
  );
}

function Meta({ cost, days }: { cost: string; days: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
      <span className="inline-flex items-center gap-2 rounded-full bg-mint-50 px-4 py-2 text-mint-700"><Wallet className="size-4" aria-hidden />Costo {cost}</span>
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-brand"><Clock className="size-4" aria-hidden />Entrega en {days}</span>
    </div>
  );
}

export default function Page() {
  const { pazYSalvo, prenda, cuentaCobro } = customerService;
  return (
    <>
      <PageHero eyebrow="Servicio al cliente" title={<>Trámites <span className="text-gradient">claros y sin vueltas</span></>} text={`Escríbanos a ${contact.email} o llámenos al ${contact.phone}, ${contact.phoneOption}.`} crumbs={[{ label: "Servicio al cliente" }]}>
        <nav aria-label="Trámites" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {tabs.map(({ icon: I, ...t }) => (
            <a key={t.id} href={`#${t.id}`} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-mint hover:text-brand-950"><I className="size-4" aria-hidden />{t.label}</a>
          ))}
        </nav>
      </PageHero>

      <div className="container-x grid gap-6 py-20 lg:grid-cols-2">
        <section id="paz-y-salvo" className="rounded-lg p-8 ring-1 ring-brand/10 sm:p-10">
          <h2 className="text-2xl font-medium text-brand-950">Solicitud de paz y salvo</h2>
          <Meta cost={pazYSalvo.cost} days={pazYSalvo.days} />
          <Steps items={pazYSalvo.steps} />
          <ul className="mt-6 space-y-2 text-sm text-ink/60">{pazYSalvo.notes.map((n) => <li key={n}>• {n}</li>)}</ul>
        </section>
        <section id="levantamiento-de-prenda" className="rounded-lg p-8 ring-1 ring-brand/10 sm:p-10">
          <h2 className="text-2xl font-medium text-brand-950">Levantamiento de prenda</h2>
          <Meta cost={prenda.cost} days={prenda.days} />
          <Steps items={prenda.steps} />
          <ul className="mt-6 space-y-2 text-sm text-ink/60">{prenda.notes.map((n) => <li key={n}>• {n}</li>)}</ul>
        </section>
        <section id="cuenta-de-cobro" className="rounded-lg bg-brand p-8 text-white sm:p-10 lg:col-span-2">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-medium">Envío de cuenta de cobro (proveedores)</h2>
              <p className="mt-4 text-white/70">Diligencie el formato editable de cuenta de cobro y envíelo a <a href={`mailto:${contact.suppliersEmail}`} className="font-semibold text-mint">{contact.suppliersEmail}</a> con estos documentos:</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/60"><Clock className="size-4" aria-hidden />{cuentaCobro.hours}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {cuentaCobro.docs.map((d) => <li key={d} className="rounded-2xl bg-white/10 p-5 text-sm font-medium ring-1 ring-white/10">{d}</li>)}
            </ul>
          </div>
        </section>
        <section id="pqrs" className="rounded-lg bg-surface p-8 sm:p-10 lg:col-span-2">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-medium text-brand-950">Peticiones, quejas, reclamos, sugerencias y felicitaciones</h2>
              <p className="mt-4 text-ink/65">Su opinión nos ayuda a mejorar. Respondemos cada solicitud por el canal que nos indique.</p>
            </div>
            <Form submit="Enviar solicitud" fields={[{ name: "tipo", label: "Tipo de solicitud", type: "select", options: ["Petición", "Queja", "Reclamo", "Sugerencia", "Felicitación"], full: true }, ...contactFields]} />
          </div>
        </section>
      </div>
    </>
  );
}
