import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type Variant = "primary" | "brand" | "ghost" | "light" | "outline" | "glass";

// Botones sobrios: rectángulo con radio pequeño, ancho generoso, sin iconos.
const styles: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand",
  brand: "bg-brand-600 text-white hover:bg-brand",
  glass: "bg-white/75 text-ink backdrop-blur-md hover:bg-white/90",
  ghost: "bg-white/10 text-white ring-1 ring-inset ring-white/40 backdrop-blur-md hover:bg-white/20",
  light: "bg-white text-ink hover:bg-white/85",
  outline: "text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/50",
};

export function Button({
  href, children, variant = "primary", className, external,
}: { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string; external?: boolean }) {
  const cls = cn(
    "inline-flex min-h-10 min-w-[13rem] items-center justify-center rounded-[4px] px-6 py-2.5 text-sm font-medium transition-colors duration-300 sm:min-w-[16.5rem]",
    styles[variant],
    className,
  );
  return external || href.startsWith("http") || href.startsWith("mailto:") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}
