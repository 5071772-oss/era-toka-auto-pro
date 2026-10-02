import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { CatalogGrid } from "@/components/site/CatalogGrid";
import { LeadForm } from "@/components/site/LeadForm";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { getCatalogList } from "@/lib/chatium-catalog";
import { absoluteUrl, pluralModels } from "@/lib/site";

export const Route = createFileRoute("/catalog")({
  loader: async () => {
    const { cars, source } = await getCatalogList();
    return { cars, source };
  },
  head: ({ loaderData }) => {
    const count = loaderData?.cars.length ?? 0;
    const title = `Каталог электромобилей и гибридов — ${count} ${pluralModels(count)} | ЭРА ТОКА`;
    const description = `Каталог из ${count} ${pluralModels(count)} электромобилей и гибридов из Китая: Zeekr, Geely, Voyah, Lixiang, Xiaomi, Huawei Aito, BYD, Avatr. Характеристики, цены и сроки поставки под ключ.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: absoluteUrl("/catalog") },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: absoluteUrl("/catalog") }],
    };
  },
  component: CatalogPage,
});

function CatalogPage() {
  const { cars } = Route.useLoaderData();

  /** Список моделей для поисковиков: помогает понять структуру каталога. */
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Каталог электромобилей и гибридов ЭРА ТОКА",
    numberOfItems: cars.length,
    itemListElement: cars.map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: car.title,
      url: absoluteUrl(`/catalog/${car.slug}`),
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Header />
      <main className="pt-24 sm:pt-32">
        <CatalogGrid cars={cars} />
        <LeadForm />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
    </div>
  );
}
