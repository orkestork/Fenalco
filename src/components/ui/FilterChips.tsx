"use client";

import { cn } from "@/lib/format";

export function FilterChips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="group" aria-label={label} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
      {["Todos", ...options].map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
            value === o ? "bg-brand text-white" : "bg-surface text-ink/70 hover:bg-brand-50 hover:text-brand",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
