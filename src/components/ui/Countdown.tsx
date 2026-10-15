"use client";

import { useEffect, useState } from "react";

const units = [
  ["Días", 86400000],
  ["Horas", 3600000],
  ["Minutos", 60000],
  ["Segundos", 1000],
] as const;

export function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  const diff = now === null ? null : Math.max(0, target - now);
  if (diff === 0) return <p className="text-sm font-medium opacity-70">Este evento ya se realizó.</p>;

  const d = diff ?? 0;
  const values = [Math.floor(d / 86400000), Math.floor((d % 86400000) / 3600000), Math.floor((d % 3600000) / 60000), Math.floor((d % 60000) / 1000)];
  return (
    <div className="grid grid-cols-4 divide-x divide-current/15" aria-label="Cuenta regresiva">
      {units.map(([label], k) => (
        <div key={label} className="px-2 text-center">
          <p className="text-5xl font-medium tracking-tighter tabular-nums sm:text-7xl">{diff === null ? "––" : String(values[k]).padStart(2, "0")}</p>
          <p className="mt-2 text-xs uppercase tracking-wider opacity-55">{label}</p>
        </div>
      ))}
    </div>
  );
}
