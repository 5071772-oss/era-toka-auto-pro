import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { CatalogGrid } from "@/components/site/CatalogGrid";
import { LeadForm } from "@/components/site/LeadForm";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { CARS } from "@/lib/catalog-data";
import { carSlug } from "@/lib/car-slug";
import { absoluteUrl, pluralModels } from "@/lib/site";

const TITLE = `Каталог электромобилей и гибридов — ${CARS.length} ${pluralModels(CARS.length)} | ЭРА ТОКА`;
const DESCRIPTION = `Каталог из ${CARS.length} электромобилей и гибридов из Китая: Zeekr, Geely, Voyah, Lixiang, Xiaomi, Huawei Aito, BYD, Avatr. Характеристики, цены и сроки поставки под ключ.`;

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/catalog") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/catalog") }],
  }),
  component: CatalogPage,
});

/** Список моделей для поисковиков: помогает понять структуру каталога и связи страниц. */
const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Каталог электромобилей и гибридов ЭРА ТОКА",
  numberOfItems: CARS.length,
  itemListElement: CARS.map((car, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: car.title,
    url: absoluteUrl(`/catalog/${carSlug(car)}`),
  })),
};

function CatalogPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Header />
      <main className="pt-24 sm:pt-32">
        <CatalogGrid />
        <LeadForm />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
    </div>
  );
}
