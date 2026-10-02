
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./ui";
const GEO_IMG = "/images/cars/new-arcfox-2-1200.webp";


const DESCRIPTION =
  "Подбор моделей, проверка доступности, организация покупки, логистика и документальное сопровождение.";

/**
 * Основные направления поставок. Список не закрытый: последняя карточка говорит,
 * что автомобиль можно привезти и из страны, которой здесь нет.
 */
const REGIONS = [
  { name: "Китай", description: DESCRIPTION },
  { name: "Европа", description: DESCRIPTION },
  { name: "Америка", description: DESCRIPTION },
  { name: "Корея", description: DESCRIPTION },
  { name: "ОАЭ", description: DESCRIPTION },
  {
    name: "Другие страны",
    description:
      "Нужной страны нет в списке? Привезём и оттуда: направление подбирается под конкретную модель, комплектацию и задачу.",
  },
];

export function Geography() {
  return (
    <Section className="relative overflow-hidden">
      <img
        src={GEO_IMG}
        alt="Схема международных маршрутов поставки автомобилей"
        width={1408}
        height={912}
        loading="lazy"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-25"
      />

      <Reveal>
        <SectionHeading 
          eyebrow="География" 
          title="Со всего мира, из любого уголка мира" 
        />
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REGIONS.map((region, i) => (
          <Reveal key={region.name} delay={i * 60} className="h-full">
            <article className="glass h-full rounded-xl p-6">
              <h3 className="text-lg font-semibold tracking-tight text-primary">{region.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{region.description}</p>
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
