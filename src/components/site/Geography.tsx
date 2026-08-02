import geoImage from "@/assets/geo-grid.jpg";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./ui";

const REGIONS = ["Китай", "Европа", "Америка", "Корея"];
const DESCRIPTION =
  "Подбор моделей, проверка доступности, организация покупки, логистика и документальное сопровождение.";

export function Geography() {
  return (
    <Section className="relative overflow-hidden">
      <img
        src={geoImage}
        alt="Схема международных маршрутов поставки автомобилей"
        width={1408}
        height={912}
        loading="lazy"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-25"
      />

      <Reveal>
        <SectionHeading eyebrow="География" title="Поставляем из ключевых автомобильных рынков" />
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {REGIONS.map((region, i) => (
          <Reveal key={region} delay={i * 60} className="h-full">
            <article className="glass h-full rounded-xl p-6">
              <h3 className="text-lg font-semibold tracking-tight text-primary">{region}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{DESCRIPTION}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-10 max-w-3xl border-l-2 border-primary/60 pl-5 text-sm leading-relaxed text-muted-foreground">
          Возможность поставки уточняется по конкретной модели, комплектации, стране и действующим
          требованиям.
        </p>
      </Reveal>
    </Section>
  );
}
