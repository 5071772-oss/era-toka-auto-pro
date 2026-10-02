import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./ui";

const ITEMS = [
  {
    title: "Подбор под ваш сценарий",
    text: "Учитываем пробег, маршруты, климат, количество пассажиров и бюджет.",
  },
  {
    title: "Проверка автомобиля",
    text: "Проверяем историю, комплектацию, состояние, батарею и ключевые риски.",
  },
  {
    title: "Полный расчёт стоимости",
    text: "Учитываем стоимость автомобиля, доставку, таможенные платежи, документы и сопутствующие расходы.",
  },
  {
    title: "Международная география",
    text: "Организуем поставки из Китая, Европы, Америки, Кореи и ОАЭ — и из любой другой страны по запросу.",
  },
  {
    title: "Один ответственный эксперт",
    text: "Николаев Алексей сопровождает клиента на всех основных этапах.",
  },
  {
    title: "Полный цикл",
    text: "Подбор, покупка, логистика, таможня, документы и передача автомобиля.",
  },
];

export function Advantages() {
  return (
    <Section id="podbor">
      <Reveal>
        <SectionHeading
          eyebrow="Подбор"
          title="Автомобиль подбирается под жизнь, а не только под каталог"
        />
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <article className="group h-full bg-background p-7 transition-colors hover:bg-graphite">
              <span className="text-xs tracking-[0.2em] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
