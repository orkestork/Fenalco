import Link from "next/link";
import { Tile } from "@/components/home/Tile";
import { SectorExplorer } from "@/components/sectors/SectorExplorer";
import { BigNumber, PhraseReveal, PhraseRotator, PhraseStack } from "@/components/home/Interludes";
import { BogotaLine } from "@/components/home/BogotaLine";

const legal = [
  { label: "FENALCO Bogotá Cundinamarca © 2026", href: "/" },
  { label: "Privacidad y datos", href: "/politica-de-datos" },
  { label: "Servicio al cliente", href: "/servicio-al-cliente" },
  { label: "PQRS", href: "/servicio-al-cliente#pqrs" },
  { label: "Pagos en línea", href: "/pagos-en-linea" },
  { label: "Noticias", href: "/noticias" },
  { label: "FENALCO Nacional", href: "https://www.fenalco.com.co" },
];

export default function Home() {
  return (
    <div className="h-svh snap-y snap-mandatory overflow-y-auto overscroll-none bg-black">
      <Tile
        priority
        brand
        title="La fuerza que une al comercio"
        subtitle="Bogotá y Cundinamarca, desde 1945"
        video="/video/hero-bogota.mp4"
        videoMobile="/video/hero-bogota-720.mp4"
        image="/img/ai/bogota-aerea.jpg"
        specs={[
          { value: "18.000+", label: "Empresas afiliadas en el país" },
          { value: "18", label: "Sectores del comercio" },
          { value: "81", label: "Años de gestión gremial" },
        ]}
        primary={{ label: "Afiliar mi empresa", href: "/sea-miembro-fenalco" }}
        secondary={{ label: "Conocer el gremio", href: "/conozcanos" }}
      />
      <PhraseReveal label="Nuestra convicción" words="Cuando el comercio se une, la ciudad avanza." accent={[3, 4]} />
      <Tile
        title="Representación gremial"
        subtitle="Su voz ante el Concejo, la Alcaldía y la DIAN"
        image="/img/ai/tendero.jpg"
        primary={{ label: "Cómo trabajamos", href: "/conozcanos" }}
        secondary={{ label: "Últimas noticias", href: "/noticias" }}
      />
      <PhraseRotator label="Representación" lead="Defendemos a" items={["tenderos.", "joyeros.", "restauranteros.", "farmacias.", "concesionarios.", "importadores.", "papelerías.", "todo el comercio."]} />
      <Tile
        title="Formación empresarial"
        subtitle="Finanzas para cerrar el año · Capacitaciones de octubre"
        link={{ label: "Exclusivo para afiliados", href: "/sea-miembro-fenalco" }}
        image="/img/ai/capacitacion.jpg"
        primary={{ label: "Ver agenda", href: "/eventos-y-capacitaciones" }}
        secondary={{ label: "Formación a la medida", href: "/servicios-productos-y-alianzas#formacion" }}
      />
      <Tile
        title="Ruedas de negocio"
        subtitle="Más de 130 encuentros entre compradores y vendedores"
        video="/video/rueda-negocios.mp4"
        image="/img/ai/rueda-negocios.jpg"
        primary={{ label: "Próximos eventos", href: "/eventos-y-capacitaciones" }}
        secondary={{ label: "Directorio de afiliados", href: "/directorio" }}
      />
      <BigNumber label="La red" value={18000} suffix="+" caption="empresas. Una sola voz." />
      <SectorExplorer className="snap-start snap-always" />
      <Tile
        title="Información económica"
        subtitle="Boletines sectoriales, cifras y observatorio jurídico"
        image="/img/ai/analista-economia.jpg"
        primary={{ label: "Ver boletines", href: "/informacion-economica" }}
        secondary={{ label: "Asesoría jurídica", href: "/servicios-productos-y-alianzas#asesoria-juridica" }}
      />
      <BogotaLine />
      <Tile
        title="Comercio Responsable"
        subtitle="Un sello para las empresas que hacen las cosas bien"
        image="/img/ai/tienda-sostenible.jpg"
        primary={{ label: "Conocer el sello", href: "/sello-comercio-responsable" }}
        secondary={{ label: "Empresas certificadas", href: "/sello-comercio-responsable#empresas" }}
      />
      <PhraseStack label="Desde 1945" lines={["81 años.", "Una sola voz.", "La suya."]} />
      <Tile
        title="Sea parte del gremio"
        subtitle="Inscrito sin costo · Afiliado desde $175.000 al mes"
        video="/video/calle-comercial.mp4"
        image="/img/ai/calle-comercial.jpg"
        primary={{ label: "Afiliarme ahora", href: "/sea-miembro-fenalco" }}
        secondary={{ label: "Pagos en línea", href: "/pagos-en-linea" }}
      >
        <nav aria-label="Enlaces legales" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/75">
            {legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Tile>
    </div>
  );
}
