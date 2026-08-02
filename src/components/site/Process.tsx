import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnPrimary, scrollToForm } from "./ui";

const STEPS = [
  {
    n: "01",
    title: "Консультация",
    text: "Разбираем ваши задачи, бюджет, маршруты, семейный состав и требования к автомобилю.",
  },
  {
    n: "02",
    title: "Подбор",
    text: "Предлагаем подходящие модели и сравниваем электромобили, гибриды и альтернативные варианты.",
  },
  {
    n: "03",
    title: "Проверка",
    text: "Проверяем автомобиль, историю, комплектацию, состояние и доступные данные о батарее.",
  },
  {
    n: "04",
    title: "Расчёт",
    text: "Формируем прозрачный расчёт полной стоимости поставки.",
  },
  {
    n: "05",
    title: "Покупка",
    text: "Организуем приобретение выбранного автомобиля и необходимые договорные процедуры.",
  },
  {
    n: "06",
    title: "Логистика и таможня",
    text: "Сопровождаем доставку, таможенное оформление и подготовку документов.",
  },
  {
    n: "07",
    title: "Передача клиенту",
    text: "Передаём автомобиль и помогаем разобраться с первыми эксплуатационными вопросами.",
  },
];

export function Process() {
  return (
    <Section id="postavka">
      <Reveal>
        <SectionHeading eyebrow="Полный цикл поставки" title="От первой консультации до передачи ключей" />
      </Reveal>

      <ol className="mt-14 border-l border-border">
        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 50}>
            <li className="relative grid gap-2 py-6 pl-8 sm:grid-cols-[auto_1fr] sm:gap-8">
              <span
                className="absolute -left-[3px] top-9 size-1.5 rounded-full bg-primary"
                style={{ boxShadow: "0 0 12px var(--neon)" }}
                aria-hidden="true"
              />
              <div className="sm:w-56">
                <span className="text-xs tracking-[0.2em] text-primary">{step.n}</span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{step.title}</h3>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:pt-7">
                {step.text}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>

      <div id="uslugi" className="mt-16 scroll-mt-28">
        <Reveal>
          <div className="glass rounded-xl p-7 sm:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">Услуги</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">Финансовая логистика</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Организация и сопровождение расчётов по этапам сделки в рамках действующего
              законодательства.
            </p>
            <button type="button" onClick={scrollToForm} className={`${btnPrimary} mt-7`}>
              Рассчитать поставку
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
