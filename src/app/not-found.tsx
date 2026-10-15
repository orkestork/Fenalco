import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center bg-brand-950 px-4 pt-24 text-center text-white">
      <div>
        <p className="text-8xl font-medium text-mint" style={{ fontFamily: "var(--font-display)" }}>404</p>
        <h1 className="mt-4 text-3xl font-medium">Esta página no existe</h1>
        <p className="mt-2 text-white/60">Puede que el enlace haya cambiado.</p>
        <Button href="/" className="mt-8">Volver al inicio</Button>
      </div>
    </section>
  );
}
