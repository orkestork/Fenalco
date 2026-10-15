import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { news } from "@/data/content";
import { formatDate } from "@/lib/format";
import { NewsList } from "./NewsList";

export const metadata: Metadata = { title: "Noticias" };

const recursos = [
  { title: "Información económica", text: "Boletines y cifras sectoriales", image: "/img/ai/analista-economia.jpg", href: "/informacion-economica" },
  { title: "Directorio de afiliados", text: "Clientes y proveedores del gremio", image: "/img/ai/rueda-negocios.jpg", href: "/directorio" },
  { title: "Comercio Responsable", text: "Empresas con sello vigente", image: "/img/ai/tienda-sostenible.jpg", href: "/sello-comercio-responsable" },
];

export default function Page() {
  const [lead, ...rest] = news;

  return (
    <>
      {/* Portada: noticia principal */}
      <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-[10svh] pt-32 text-white sm:px-10">
        <Image src={lead.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
        <Reveal className="max-w-4xl">
          <p className="text-sm font-medium text-white/75">
            Noticias · {lead.tag} · <time dateTime={lead.date}>{formatDate(lead.date)}</time>
          </p>
          <h1 className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">{lead.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">{lead.summary}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <Button href={`/noticias/${lead.slug}`}>Leer noticia</Button>
            <Button href="#todas" variant="glass">Más noticias</Button>
          </div>
        </Reveal>
      </section>

      <section id="todas" className="bg-white py-28 lg:py-36">
        <div className="container-x max-w-6xl">
          <h2 className="mb-12 text-4xl font-medium tracking-tight text-ink sm:text-6xl">Actualidad del comercio</h2>
          <NewsList items={rest} />
        </div>
      </section>

      <section className="grid gap-3 bg-white p-3 md:grid-cols-3">
        {recursos.map((r) => (
          <a key={r.title} href={r.href} className="group relative isolate flex min-h-[70svh] flex-col justify-between overflow-hidden rounded-md p-8 text-center text-white">
            <Image src={r.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="-z-20 object-cover transition duration-[1.4s] group-hover:scale-105" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/5 to-black/55" />
            <div>
              <h3 className="text-2xl font-medium sm:text-3xl">{r.title}</h3>
              <p className="mt-1 text-white/85">{r.text}</p>
            </div>
            <span className="mx-auto inline-flex min-w-48 justify-center rounded-[4px] bg-white/75 px-6 py-2.5 text-sm font-medium text-ink backdrop-blur-md transition group-hover:bg-white">Explorar</span>
          </a>
        ))}
      </section>
    </>
  );
}
