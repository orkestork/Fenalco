"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/format";

import type { Field } from "./fields";

export type { Field };

export function Form({ fields, submit = "Enviar", consent = true, dark = false }: { fields: Field[]; submit?: string; consent?: boolean; dark?: boolean }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: conectar con el endpoint/CRM oficial del gremio.
    setSent(true);
  };

  if (sent)
    return (
      <div className={cn("flex flex-col items-center gap-3 rounded-md p-10 text-center ring-1", dark ? "bg-white/5 ring-white/10" : "bg-white ring-black/10")}>
        <CheckCircle2 className="size-10 text-mint-600" aria-hidden />
        <p className={cn("text-lg font-medium", dark ? "text-white" : "text-ink")}>¡Gracias! Recibimos su información.</p>
        <p className={cn("text-sm", dark ? "text-white/60" : "text-ink/60")}>Un asesor se comunicará con usted pronto.</p>
      </div>
    );

  const input = cn(
    "w-full rounded-[4px] px-4 py-3 text-[15px] outline-none ring-1 ring-inset transition placeholder:text-current/40",
    dark ? "bg-white/5 text-white ring-white/20 hover:ring-white/40 focus:ring-2 focus:ring-white" : "bg-white text-ink ring-black/15 hover:ring-black/30 focus:ring-2 focus:ring-ink",
  );

  return (
    <form onSubmit={onSubmit} className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
      {fields.map((f) => (
        <label key={f.name} className={cn("flex flex-col gap-1.5 text-[13px] font-medium", f.full || f.type === "textarea" ? "sm:col-span-2" : "", dark ? "text-white/70" : "text-ink/60")}>
          <span>{f.label}{f.required === false && <span className="font-normal opacity-60"> (opcional)</span>}</span>
          {f.type === "textarea" ? (
            <textarea name={f.name} required={f.required !== false} rows={4} className={input} />
          ) : f.type === "select" ? (
            <select name={f.name} required={f.required !== false} className={input} defaultValue={f.value ?? ""}>
              <option value="" disabled>Seleccione…</option>
              {f.options?.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input name={f.name} type={f.type ?? "text"} required={f.required !== false} defaultValue={f.value} className={input} />
          )}
        </label>
      ))}
      {consent && (
        <label className={cn("flex items-start gap-3 text-sm sm:col-span-2", dark ? "text-white/70" : "text-ink/65")}>
          <input type="checkbox" required className="mt-0.5 size-4 shrink-0 accent-[#3b0fa3]" />
          <span>Autorizo el tratamiento de mis datos personales de acuerdo con la <a href="/politica-de-datos" className="font-medium underline underline-offset-2">política de protección de datos</a>.</span>
        </label>
      )}
      <button
        type="submit"
        className={cn(
          "mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-[4px] px-6 py-2.5 text-sm font-medium transition-colors sm:col-span-2 sm:w-auto sm:min-w-[16.5rem] sm:justify-self-start",
          dark ? "bg-white text-ink hover:bg-white/85" : "bg-brand-600 text-white hover:bg-brand",
        )}
      >
        {submit}
      </button>
    </form>
  );
}
