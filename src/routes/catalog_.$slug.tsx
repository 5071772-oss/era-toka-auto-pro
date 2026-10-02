import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { ImageCarousel } from "@/components/site/ImageCarousel";
import { Reveal } from "@/components/site/Reveal";
import { btnPrimary, prefillModel } from "@/components/site/ui";
import { carBySlug, carSlug, carsByBrand } from "@/lib/car-slug";
import { parseSpecs } from "@/lib/car-specs";
import { imageFor, srcSetFor } from "@/lib/car-image";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { TELEGRAM_URL, EXPERT } from "@/lib/brand";

export const Route = createFileRoute("/catalog_/$slug")({
  loader: ({ params }) => {
    const car = carBySlug(params.slug);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ params }) => {
    const car = carBySlug(params.slug);
    if (!car) return {};
    const specs = parseSpecs(car.specs);
    const url = absoluteUrl(`/catalog/${params.slug}`);
    const title = `${car.title} — купить под ключ из Китая | ЭРА ТОКА`;
    const description = `${car.title}: ${specs.summary}. Цена в Китае ${car.price.replace(/^От\s*/, "от ")} — доставка, таможня и документы под ключ.`;
    const image = `${SITE_URL}${car.img}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CarPage,
});

function CarPage() {
  const { car } = Route.useLoaderData();
  const specs = parseSpecs(car.specs);
  const gallery = car.images && car.images.length > 0 ? car.images : [car.img];
  const sameBrand = carsByBrand(car.brand)
    .filter((other) => other.title !== car.title)
    .slice(0, 8);
  const priceYuan = /([\d\s]{3,})/.exec(car.price)?.[1]?.replace(/\s/g, "") ?? null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: car.title,
    brand: { "@type": "Brand", name: car.brand },
    description: `${car.title}: ${specs.summary}.`,
    image: `${SITE_URL}${car.img}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "CNY",
      ...(priceYuan ? { price: priceYuan } : {}),
      availability: "https://schema.org/PreOrder",
      url: absoluteUrl(`/catalog/${carSlug(car)}`),
      seller: { "@type": "Organization", name: "ЭРА ТОКА" },
    },
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Каталог", item: absoluteUrl("/catalog") },
      { "@type": "ListItem", position: 3, name: car.title, item: absoluteUrl(`/catalog/${carSlug(car)}`) },
    ],
  };

  const mainImage = imageFor(car.img);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Header />
      <main className="pt-24 sm:pt-32">
        <section className="pb-6">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-primary">
                Главная
              </Link>
              <span aria-hidden="true">/</span>
              <Link to="/catalog" className="transition-colors hover:text-primary">
                Каталог
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground/80">{car.title}</span>
            </nav>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
              <div>
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted">
                  {gallery.length > 1 ? (
                    <ImageCarousel images={gallery} alt={car.title} priority />
                  ) : (
                    <img
                      src={car.img}
                      srcSet={srcSetFor(mainImage)}
                      sizes="(max-width: 1024px) 100vw, 640px"
                      alt={car.title}
                      width={mainImage?.fullWidth ?? 1200}
                      height={800}
                      fetchPriority="high"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div>
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {car.brand}
                </span>
                <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {car.title}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{specs.summary}</p>

                <div className="mt-6 rounded-2xl border border-border bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Цена в Китае</p>
                  <p className="mt-1 text-2xl font-bold text-primary">{car.price}</p>
                  <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                    *Цена за автомобиль. Доставка, таможенные платежи и оформление рассчитываются отдельно.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => prefillModel(`${car.title} (Узнать стоимость)`)}
                    className={`${btnPrimary} flex-1 py-3.5`}
                  >
                    Узнать стоимость
                  </button>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-md border border-primary/20 px-6 py-3.5 text-center text-[13px] font-semibold text-primary transition-colors hover:bg-primary/5"
                  >
                    Спросить в Telegram
                  </a>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {EXPERT} — подбор, проверка и поставка под ключ.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 py-14">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Характеристики</h2>
                <dl className="mt-6 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-white/5">
                  <div className="flex items-baseline justify-between gap-4 px-5 py-3 text-sm">
                    <dt className="text-muted-foreground">Тип</dt>
                    <dd className="text-right font-medium">{specs.vehicleType}</dd>
                  </div>
                  {specs.rows.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4 px-5 py-3 text-sm">
                      <dt className="text-muted-foreground">{row.label}</dt>
                      <dd className="text-right font-medium">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                {specs.reviewUrl ? (
                  <a
                    href={specs.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Обзор и тест-драйв этой модели
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                ) : null}
              </div>

              <div className="space-y-8">
                {specs.blocks.map((block) => (
                  <div key={block.title}>
                    <h2 className="text-xl font-semibold tracking-tight">{block.title}</h2>
                    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {sameBrand.length > 0 ? (
          <section className="border-t border-border/60 py-14">
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
              <h2 className="text-xl font-semibold tracking-tight">Другие модели {car.brand}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {sameBrand.map((other) => {
                  const otherImage = imageFor(other.img);
                  return (
                    <Link
                      key={other.title}
                      to="/catalog/$slug"
                      params={{ slug: carSlug(other) }}
                      className="group overflow-hidden rounded-xl border border-border bg-white/5 transition-colors hover:border-primary/40"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={other.img}
                          srcSet={srcSetFor(otherImage)}
                          sizes="(max-width: 640px) 100vw, 280px"
                          alt={other.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium leading-tight">{other.title}</p>
                        <p className="mt-1 text-sm font-bold text-primary">{other.price}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link
                to="/catalog"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Весь каталог
              </Link>
            </div>
          </section>
        ) : null}

        <section className="border-t border-border/60 py-14">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal>
              <h2 className="text-xl font-semibold tracking-tight">Что входит в поставку</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Подбор и проверка конкретного автомобиля",
                  "Расчёт стоимости под ключ: авто, доставка, таможня, документы",
                  "Договор и сопровождение международного платежа",
                  "Доставка до вашего города и передача документов",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-white/5 p-4 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <LeadForm />
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }} />
    </div>
  );
}
