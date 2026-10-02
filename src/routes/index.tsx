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
import { Faq, FAQ_ITEMS } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { EXPERT, PHONE_FORMATTED, TELEGRAM_URL } from "@/lib/brand";
import { SITE_URL, absoluteUrl } from "@/lib/site";

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
      { property: "og:url", content: absoluteUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: Index,
});

/**
 * Разметка для поисковиков: организация и вопросы-ответы.
 * Вопросы берём из того же списка, что показан на странице, — расхождений не будет.
 */
function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ЭРА ТОКА",
    url: SITE_URL,
    description: DESCRIPTION,
    founder: { "@type": "Person", name: EXPERT },
    telephone: PHONE_FORMATTED,
    sameAs: [TELEGRAM_URL],
    areaServed: { "@type": "Country", name: "Россия" },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

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
      <StructuredData />
    </div>
  );
}
