"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";

export function LoginCard({ title = "Iniciar sesión", note }: { title?: string; note?: string }) {
  const [msg, setMsg] = useState("");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: conectar con el sistema de autenticación de afiliados.
    setMsg("El acceso de afiliados se habilitará al conectar el sistema de autenticación oficial.");
  };
  return (
    <div className="rounded-lg bg-white p-8 shadow-[0_40px_80px_-40px_rgba(23,0,63,0.4)] ring-1 ring-brand/8 sm:p-10">
      <span className="grid size-12 place-items-center rounded-2xl bg-brand text-mint"><Lock className="size-5" aria-hidden /></span>
      <h2 className="mt-6 text-2xl font-medium text-brand-950">{title}</h2>
      {note && <p className="mt-2 text-sm text-ink/60">{note}</p>}
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-ink/75">Usuario o correo
          <input type="text" required autoComplete="username" className="mt-2 w-full rounded-2xl bg-surface px-4 py-3.5 outline-none focus:bg-white focus:ring-1 focus:ring-brand/30" />
        </label>
        <label className="block text-sm font-medium text-ink/75">Contraseña
          <input type="password" required autoComplete="current-password" className="mt-2 w-full rounded-2xl bg-surface px-4 py-3.5 outline-none focus:bg-white focus:ring-1 focus:ring-brand/30" />
        </label>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink/65"><input type="checkbox" className="size-4 accent-[#280071]" />Mantenerme conectado</label>
          <a href="#" className="font-semibold text-brand hover:text-mint-700">¿Olvidó su contraseña?</a>
        </div>
        <button type="submit" className="w-full rounded-full bg-brand py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700">Ingresar</button>
        {msg && <p role="status" className="rounded-2xl bg-brand-50 p-4 text-sm text-brand">{msg}</p>}
      </form>
      <p className="mt-8 text-center text-sm text-ink/60">¿Aún no es parte del gremio? <Link href="/sea-miembro-fenalco" className="font-semibold text-brand hover:text-mint-700">Vincúlese aquí</Link></p>
    </div>
  );
}
