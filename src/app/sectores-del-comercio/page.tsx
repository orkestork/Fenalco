import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectorExplorer } from "@/components/sectors/SectorExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { sectorImage, sectors, sectorsIntro } from "@/data/sectors";

export const metadata: Metadata = { title: "Sectores del comercio" };

export default function Page() {
  return (
    <>
      <SectorExplorer />

      <section className="bg-white py-28 lg:py-36">
        <div className="container-x max-w-4xl text-center">
          <h1 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl">18 sectores, una sola voz</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/60">{sectorsIntro}</p>
        </div>

        <ul className="container-x mt-20 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, k) => (
            <Reveal key={s.slug} delay={(k % 3) * 0.06}>
              <li>
                <Link href={`/sectores-del-comercio/${s.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-surface">
                    <Image src={sectorImage(s.slug)} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h2 className="text-lg font-medium text-ink">{s.name}</h2>
                    <span className="text-xs tabular-nums text-ink/40">{String(k + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-ink/55">{s.summary}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-ink underline decoration-ink/25 underline-offset-4 transition group-hover:decoration-ink">
                    Ver sector
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
