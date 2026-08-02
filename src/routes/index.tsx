import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Hero } from "@/components/site/Hero";
import { Advantages } from "@/components/site/Advantages";
import { Cars } from "@/components/site/Cars";
import { PowerTypes } from "@/components/site/PowerTypes";
import { Process } from "@/components/site/Process";
import { Geography } from "@/components/site/Geography";
import { Concerns } from "@/components/site/Concerns";
import { LeadForm } from "@/components/site/LeadForm";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

const TITLE = "ЭРА ТОКА — электромобили и гибриды под ключ в РФ";
const DESCRIPTION =
  "Подбор, проверка, покупка и поставка электромобилей и гибридов из Китая, Европы, Америки и Кореи. Полный цикл: логистика, таможня, документы.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Advantages />
        <Cars />
        <PowerTypes />
        <Process />
        <Geography />
        <Concerns />
        <LeadForm />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
