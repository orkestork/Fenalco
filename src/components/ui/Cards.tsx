import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, Lock, MonitorPlay, Users } from "lucide-react";
import type { EventItem, NewsItem } from "@/data/content";
import { dayMonth, formatDate } from "@/lib/format";

export function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <Link
      href={`/noticias/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-brand/8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(40,0,113,0.45)]"
    >
      <div className={featured ? "relative aspect-[4/3] overflow-hidden lg:aspect-[16/11]" : "relative aspect-[4/3] overflow-hidden"}>
        <Image src={item.image} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand backdrop-blur">{item.tag}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <time dateTime={item.date} className="text-xs font-medium uppercase tracking-wider text-ink/50">{formatDate(item.date)}</time>
        <h3 className={featured ? "mt-3 text-xl font-medium leading-snug text-brand-950 lg:text-2xl" : "mt-3 text-lg font-medium leading-snug text-brand-950"}>{item.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/65">{item.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-brand">
          Leer noticia <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export function EventCard({ item }: { item: EventItem }) {
  const d = item.date ? dayMonth(item.date) : null;
  return (
    <Link
      href={`/eventos-y-capacitaciones/${item.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-white ring-1 ring-brand/8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(40,0,113,0.45)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-50">
        <Image src={item.image} alt="" fill sizes="(min-width:1024px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        {d && (
          <div className="absolute left-4 top-4 flex flex-col items-center rounded-2xl bg-white px-3 py-2 text-center shadow-lg">
            <span className="text-2xl font-medium leading-none text-brand">{d.day}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-mint-700">{d.month}</span>
          </div>
        )}
        {item.exclusive && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">
            <Lock className="size-3" aria-hidden /> Afiliados
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-mint-700">{item.category}</p>
        <h3 className="mt-2 text-lg font-medium text-brand-950">{item.title}</h3>
        <p className="mt-1 text-sm text-ink/65">{item.subtitle}</p>
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-5 text-xs font-medium text-ink/60">
          <span className="inline-flex items-center gap-1.5">
            {item.mode === "Virtual" ? <MonitorPlay className="size-4 text-brand" aria-hidden /> : <Users className="size-4 text-brand" aria-hidden />}
            {item.mode}
          </span>
          {item.start && <span className="inline-flex items-center gap-1.5"><Clock className="size-4 text-brand" aria-hidden />{item.start}</span>}
          {!item.date && <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4 text-brand" aria-hidden />Inscripción abierta</span>}
        </div>
      </div>
    </Link>
  );
}
