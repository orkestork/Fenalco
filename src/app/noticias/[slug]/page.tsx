import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NewsCard } from "@/components/ui/Cards";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { getNews, news } from "@/data/content";
import { ORIGINAL_URL } from "@/data/site";
import { formatDate } from "@/lib/format";

export const instant = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/noticias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const n = getNews(slug);
  return { title: n?.title ?? "Noticia", description: n?.summary };
}

export default async function Page({ params }: PageProps<"/noticias/[slug]">) {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) notFound();
  const more = news.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={`${n.tag} · ${formatDate(n.date)}`} title={n.title} crumbs={[{ label: "Noticias", href: "/noticias" }, { label: n.tag }]} />
      <article className="py-16">
        <div className="container-x max-w-4xl">
          <div className="relative -mt-28 aspect-[16/10] overflow-hidden rounded-lg shadow-2xl ring-1 ring-brand/10">
            <Image src={n.image} alt="" fill priority sizes="(min-width:1024px) 896px, 100vw" className="object-cover" />
          </div>
          <p className="mt-12 text-xl leading-relaxed text-ink/80 sm:text-2xl">{n.summary}</p>
          <div className="mt-10 rounded-lg bg-surface p-8">
            <p className="text-sm text-ink/60">
              El texto completo de esta noticia se cargará desde el gestor de contenidos del gremio. Mientras tanto, puede leerla en el sitio oficial.
            </p>
            <Button href={`${ORIGINAL_URL}/noticias/`} variant="brand" className="mt-6">Leer en el sitio oficial</Button>
          </div>
        </div>
      </article>
      <section className="bg-surface py-20">
        <div className="container-x">
          <h2 className="mb-8 text-2xl font-medium text-brand-950">Más noticias</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{more.map((m) => <NewsCard key={m.slug} item={m} />)}</div>
        </div>
      </section>
    </>
  );
}
