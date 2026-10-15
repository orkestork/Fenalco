"use client";

import { useState } from "react";
import { FileText, Lock, Search } from "lucide-react";
import { FilterChips } from "@/components/ui/FilterChips";
import { econReports } from "@/data/content";
import { formatDate } from "@/lib/format";

const cats = [...new Set(econReports.map((r) => r.category))];

export function Reports() {
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");
  const list = econReports.filter(
    (r) => (cat === "Todos" || r.category === cat) && r.title.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips label="Categoría" options={cats} value={cat} onChange={setCat} />
        <label className="relative block lg:w-80">
          <span className="sr-only">Buscar informe</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar informe…" className="w-full rounded-full bg-surface py-3 pl-11 pr-4 text-sm outline-none ring-1 ring-transparent focus:ring-brand/30" />
        </label>
      </div>
      <ul className="divide-y divide-brand/8 overflow-hidden rounded-lg ring-1 ring-brand/8">
        {list.map((r) => (
          <li key={r.title} className="group flex flex-col gap-3 bg-white p-6 transition hover:bg-brand-50 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand group-hover:bg-brand group-hover:text-mint">
                <FileText className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-brand-950">{r.title}</p>
                <p className="mt-1 text-sm text-ink/55">{r.category} · {formatDate(r.date)}</p>
              </div>
            </div>
            <a href="/iniciar-sesion" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white sm:self-auto">
              <Lock className="size-3.5" aria-hidden /> Ver informe
            </a>
          </li>
        ))}
        {!list.length && <li className="p-10 text-center text-ink/60">No encontramos informes con ese criterio.</li>}
      </ul>
    </>
  );
}
