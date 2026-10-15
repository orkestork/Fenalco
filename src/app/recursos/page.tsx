import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { ResourceSearch } from "@/components/resources/ResourceSearch";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/ui/Reveal";
import { econReports, news } from "@/data/content";
import { report } from "@/data/about";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Centro de recursos",
  description: "Noticias, boletines económicos, trámites, directorio y documentos de FENALCO Bogotá Cundinamarca en un solo lugar.",
};

const doors = [
  { title: "Noticias", text: "La posición del gremio en la agenda pública", image: "/img/ai/calle-comercial.jpg", href: "/noticias", meta: `${news.length} publicaciones recientes` },
  { title: "Información económica", text: "Boletines sectoriales y observatorio jurídico", image: "/img/ai/analista-economia.jpg", href: "/informacion-economica", meta: `${econReports.length} boletines en 2026` },
  { title: "Directorio de afiliados", text: "Encuentre clientes y proveedores del gremio", image: "/img/ai/rueda-negocios.jpg", href: "/directorio", meta: "Exclusivo afiliados" },
  { title: "Comercio Responsable", text: "Empresas con sello vigente 2025 – 2026", image: "/img/ai/tienda-sostenible.jpg", href: "/sello-comercio-responsable", meta: "Sello del gremio" },
];

const tramites = [
  { n: "01", title: "Paz y salvo", text: "Certificado en 5 días hábiles", href: "/servicio-al-cliente#paz-y-salvo" },
  { n: "02", title: "Levantamiento de prenda", text: "Entrega en 10 días hábiles", href: "/servicio-al-cliente#levantamiento-de-prenda" },
  { n: "03", title: "Pagos en línea", text: "PSE o tarjeta de crédito", href: "/pagos-en-linea" },
  { n: "04", title: "Actualización de datos", text: "Para afiliados", href: "/actualizacion-de-datos" },
  { n: "05", title: "Cuenta de cobro", text: "Para proveedores", href: "/servicio-al-cliente#cuenta-de-cobro" },
  { n: "06", title: "PQRS", text: "Peticiones, quejas y sugerencias", href: "/servicio-al-cliente#pqrs" },
];

const descargas = [
  { title: report.title, meta: "PDF · Transparencia", href: report.href },
  { title: "Habeas Data y autorizaciones", meta: "PDF · Protección de datos", href: "https://fenalcobogota.com.co/wp-content/uploads/2023/03/Habeas-Data-y-Autorizacionespara-el-tratamiento-de-datos-FBC-2023.pdf" },
  { title: "Ficha técnica del auditorio", meta: "PDF · Servicios", href: "https://fenalcobogota.com.co/wp-content/uploads/2024/05/Rider_Auditorio_Lorenzo_Botero_Fenalco.pdf" },
  { title: "Autorización de capacitadores", meta: "PDF · Formación", href: "https://fenalcobogota.com.co/wp-content/uploads/2025/12/Autorizacion-Capacitadores-.pdf" },
];

export default function Page() {
  // Lo último: noticias y boletines mezclados por fecha.
  const latest = [
    ...news.map((n) => ({ kind: "Noticia" as const, title: n.title, date: n.date, href: `/noticias/${n.slug}`, image: n.image })),
    ...econReports.slice(0, 4).map((r) => ({ kind: "Boletín" as const, title: r.title, date: r.date, href: "/informacion-economica", image: undefined })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* Encabezado con buscador */}
      <section className="relative isolate flex min-h-[88svh] flex-col items-center justify-center overflow-visible px-6 pb-20 pt-32 text-center text-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image src="/img/ai/bogota-aerea.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
        </div>
        <Reveal>
          <p className="text-sm font-medium text-white/75">Centro de recursos</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-6xl">Todo lo que su empresa necesita saber</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">Noticias, cifras, trámites y documentos del gremio en un solo lugar.</p>
        </Reveal>
        <div className="relative z-10 mt-12 w-full">
          <ResourceSearch />
        </div>
      </section>

      {/* Cuatro accesos */}
      <section className="grid gap-3 bg-white p-3 md:grid-cols-2">
        {doors.map((d, k) => (
          <Link key={d.title} href={d.href} className="group relative isolate flex min-h-[62svh] flex-col justify-between overflow-hidden rounded-md p-8 text-white sm:p-10">
            <Image src={d.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="-z-20 object-cover transition duration-[1.6s] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-black/30" />
            <p className="flex items-center justify-between text-sm font-medium text-white/80">
              <span>{String(k + 1).padStart(2, "0")}</span>
              <span>{d.meta}</span>
            </p>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-medium tracking-tight sm:text-5xl">{d.title}</h2>
                <p className="mt-2 max-w-sm text-white/85">{d.text}</p>
              </div>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-ink">
                <ArrowUpRight className="size-5" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Lo último */}
      <section className="bg-white py-28 lg:py-36">
        <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="text-4xl font-medium tracking-tight text-ink sm:text-6xl">Lo último</h2>
          <p className="max-w-md text-ink/60">Publicaciones y boletines recientes del gremio. Use las flechas o arrastre para ver más.</p>
        </div>
        <Carousel label="Publicaciones recientes" className="mt-14">
          {latest.map((l) => (
            <li key={l.kind + l.title} className="w-[78vw] shrink-0 snap-start sm:w-[22rem]">
              <Link href={l.href} className="group block" draggable={false}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                  {l.image ? (
                    <Image src={l.image} alt="" fill sizes="352px" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full flex-col justify-between bg-brand-950 p-7 text-white transition-colors duration-500 group-hover:bg-brand">
                      <span className="text-sm font-medium text-white/60">Boletín económico</span>
                      <span className="text-7xl font-medium leading-none tracking-tighter">{formatDate(l.date).split(" de ")[0]}</span>
                      <span className="text-sm uppercase tracking-wider text-white/60">{formatDate(l.date).split(" de ").slice(1).join(" ")}</span>
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-[4px] bg-white/85 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur">{l.kind}</span>
                </div>
                <p className="mt-4 text-xs uppercase tracking-wider text-ink/45">{formatDate(l.date)}</p>
                <h3 className="mt-1 line-clamp-3 text-lg font-medium leading-snug text-ink">{l.title}</h3>
              </Link>
            </li>
          ))}
        </Carousel>
      </section>

      {/* Trámites en línea */}
      <section id="tramites" className="bg-black py-28 text-white lg:py-36">
        <div className="container-x max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="text-4xl font-medium tracking-tight sm:text-6xl">Trámites en línea</h2>
            <p className="max-w-md text-white/60">Haga sus gestiones con el gremio sin desplazarse.</p>
          </div>
          <ul className="mt-14 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {tramites.map((t) => (
              <li key={t.n} className="border-b border-white/15 sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
                <Link href={t.href} className="group flex h-full items-start justify-between gap-6 p-7 transition-colors hover:bg-white/5">
                  <div>
                    <span className="text-sm tabular-nums text-white/40">{t.n}</span>
                    <h3 className="mt-6 text-2xl font-medium">{t.title}</h3>
                    <p className="mt-1 text-sm text-white/55">{t.text}</p>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-white/40 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Documentos */}
      <section className="bg-surface py-28 lg:py-36">
        <div className="container-x max-w-6xl">
          <h2 className="text-4xl font-medium tracking-tight text-ink sm:text-6xl">Documentos</h2>
          <ul className="mt-14 border-t border-black/10">
            {descargas.map((d) => (
              <li key={d.title}>
                <a href={d.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 border-b border-black/10 py-6 transition-colors hover:bg-white sm:px-4">
                  <div>
                    <p className="text-xl font-medium text-ink sm:text-2xl">{d.title}</p>
                    <p className="mt-1 text-sm text-ink/50">{d.meta}</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-black/15 transition group-hover:bg-ink group-hover:text-white">
                    <ArrowDownToLine className="size-4" aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
