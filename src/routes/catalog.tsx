import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { CatalogGrid } from "@/components/site/CatalogGrid";
import { LeadForm } from "@/components/site/LeadForm";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";

const TITLE = "Каталог автомобилей — ЭРА ТОКА";
const DESCRIPTION =
  "Актуальный каталог электромобилей и гибридов: Zeekr, Geely Galaxy, Voyah, Lixiang, Xiaomi, Huawei Aito, BYD. Прямые поставки под ключ.";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogPage,
});

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
    </div>
  );
}
