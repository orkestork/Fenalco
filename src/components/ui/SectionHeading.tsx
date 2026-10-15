import type { ReactNode } from "react";
import { cn } from "@/lib/format";

export function SectionHeading({
  eyebrow, title, text, align = "left", dark = false, action,
}: { eyebrow?: string; title: ReactNode; text?: ReactNode; align?: "left" | "center"; dark?: boolean; action?: ReactNode }) {
  return (
    <div className={cn("mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between", align === "center" && "items-center text-center md:flex-col md:items-center")}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className={cn("mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em]", dark ? "text-mint" : "text-mint-700")}>
            <span className="h-px w-6 bg-current" />
            {eyebrow}
          </p>
        )}
        <h2 className={cn("text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl", dark ? "text-white" : "text-brand-950")}>{title}</h2>
        {text && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-ink/65")}>{text}</p>}
      </div>
      {action}
    </div>
  );
}
