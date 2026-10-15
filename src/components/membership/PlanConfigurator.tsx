"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { Form } from "@/components/forms/Form";
import { contactFields } from "@/components/forms/fields";
import { membershipPlans } from "@/data/content";
import { cn } from "@/lib/format";

const SIZES = ["1 a 5", "6 a 50", "51 a 200", "Más de 200"] as const;
type Size = (typeof SIZES)[number];
type PlanName = (typeof membershipPlans)[number]["name"];

// Foto y tres cifras clave por plan (se muestran sobre la imagen, como una ficha técnica).
const LOOK: Record<string, { image: string; specs: { value: string; label: string }[] }> = {
  Inscrito: {
    image: "/img/ai/tendero.jpg",
    specs: [
      { value: "$0", label: "Costo de vinculación" },
      { value: "1", label: "Capacitación al mes" },
      { value: "2 meses", label: "Servicio empresarial" },
    ],
  },
  Afiliado: {
    image: "/img/ai/rueda-negocios.jpg",
    specs: [
      { value: "4", label: "Capacitaciones al mes" },
      { value: "4 meses", label: "Servicio empresarial" },
      { value: "30 %", label: "Desc. en eventos" },
    ],
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Configurador de vinculación estilo "arme su plan": tamaño de empresa → plan → resumen → formulario. */
export function PlanConfigurator() {
  const [size, setSize] = useState<Size>("6 a 50");
  const [chosen, setChosen] = useState<PlanName>("Afiliado");
  // El plan Inscrito solo aplica a empresas de 1 a 5 empleados.
  const canInscribe = size === "1 a 5";
  const planName: PlanName = !canInscribe && chosen === "Inscrito" ? "Afiliado" : chosen;
  const plan = membershipPlans.find((p) => p.name === planName)!;
  const look = LOOK[plan.name];

  return (
    <>
      <section className="bg-white lg:grid lg:grid-cols-[1fr_30rem]">
        {/* Imagen fija con ficha del plan */}
        <div className="relative h-[60svh] overflow-hidden bg-black lg:sticky lg:top-0 lg:h-svh">
          <AnimatePresence initial={false}>
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease }}
              className="absolute inset-0"
            >
              <Image src={look.image} alt="" fill sizes="(min-width:1024px) 70vw, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.dl
                key={plan.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease }}
                className="mx-auto grid max-w-2xl grid-cols-3 text-center"
              >
                {look.specs.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-2xl font-medium tracking-tight sm:text-4xl">{s.value}</dd>
                    <dd className="mt-1 text-xs text-white/75 sm:text-sm">{s.label}</dd>
                  </div>
                ))}
              </motion.dl>
            </AnimatePresence>
          </div>
        </div>

        {/* Panel de configuración */}
        <div className="px-6 pb-20 pt-14 sm:px-10 lg:pt-28">
          <h2 className="text-center text-4xl font-medium tracking-tight text-ink">Arme su vinculación</h2>
          <p className="mt-2 text-center text-sm text-ink/55">Dos pasos y le decimos qué plan le conviene.</p>

          <fieldset className="mt-12">
            <legend className="text-sm font-medium text-ink">1. ¿Cuántos empleados tiene su empresa?</legend>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "rounded-[4px] py-3 text-sm transition",
                    size === s ? "font-medium text-ink ring-2 ring-ink" : "text-ink/70 ring-1 ring-black/15 hover:ring-black/40",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-10">
            <legend className="text-sm font-medium text-ink">2. Elija su plan</legend>
            <div className="mt-4 space-y-2">
              {membershipPlans.map((p) => {
                const disabled = p.name === "Inscrito" && !canInscribe;
                const on = p.name === plan.name;
                return (
                  <button
                    key={p.name}
                    type="button"
                    disabled={disabled}
                    aria-pressed={on}
                    onClick={() => setChosen(p.name)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-[4px] px-5 py-4 text-left transition",
                      on ? "ring-2 ring-ink" : "ring-1 ring-black/15 hover:ring-black/40",
                      disabled && "cursor-not-allowed opacity-40 hover:ring-black/15",
                    )}
                  >
                    <span>
                      <span className="block font-medium text-ink">{p.name}</span>
                      <span className="mt-0.5 block text-xs text-ink/50">{disabled ? "Solo para empresas de 1 a 5 empleados" : p.note}</span>
                    </span>
                    <span className="shrink-0 text-right text-sm font-medium text-ink">
                      {p.price}
                      {"period" in p && <span className="font-normal text-ink/50">{p.period}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-12">
            <h3 className="text-sm font-medium text-ink">Incluye</h3>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={plan.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <ul className="mt-3 divide-y divide-black/8 border-y border-black/8">
                  {plan.includes.map((i) => (
                    <li key={i} className="flex items-start gap-3 py-3 text-sm text-ink/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-8 text-sm font-medium text-ink">Tarifas en servicios del gremio</h3>
                <ul className="mt-3 space-y-2">
                  {plan.extras.map((x) => (
                    <li key={x} className="text-sm text-ink/60">{x}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Resumen */}
          <div className="mt-12 border-t border-black/10 pt-6">
            <div className="flex items-end justify-between">
              <span className="text-sm text-ink/55">Su plan · {plan.name}</span>
              <span className="text-2xl font-medium tracking-tight text-ink">
                {plan.price}
                {"period" in plan && <span className="text-base font-normal text-ink/50">{plan.period}</span>}
              </span>
            </div>
            <a href="#vincularme" className="mt-6 flex h-11 items-center justify-center rounded-[4px] bg-brand-600 text-sm font-medium text-white transition hover:bg-brand">
              {plan.cta}
            </a>
            <p className="mt-4 text-center text-xs text-ink/45">Tarifas sujetas a las condiciones vigentes del gremio.</p>
          </div>
        </div>
      </section>

      <section id="vincularme" className="scroll-mt-16 bg-surface py-28 lg:py-36">
        <div className="container-x grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl">Empecemos</h2>
            <p className="mt-4 max-w-sm text-ink/60">Ya dejamos su plan y el tamaño de su empresa. Complete sus datos y un asesor le acompaña en la vinculación.</p>
          </div>
          <Form
            key={`${plan.name}-${size}`}
            submit="Quiero vincularme"
            fields={[
              { name: "plan", label: "Plan de interés", type: "select", options: membershipPlans.map((p) => p.name), value: plan.name },
              { name: "empleados", label: "Número de empleados", type: "select", options: [...SIZES], value: size },
              { name: "empresa", label: "Razón social" },
              { name: "nit", label: "NIT" },
              ...contactFields,
            ]}
          />
        </div>
      </section>
    </>
  );
}
