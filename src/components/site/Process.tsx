import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnPrimary, scrollToForm } from "./ui";

const SERVICES = [
  {
    title: "Подбор и покупка",
    text: "Индивидуальный поиск автомобиля по вашим критериям и сопровождение сделки купли-продажи.",
  },
  {
    title: "Проверка авто",
    text: "Тщательная инспекция технического состояния, истории обслуживания и юридической чистоты.",
  },
  {
    title: "Финансовая логистика",
    text: "Организация международных расчётов и безопасных финансовых переводов в рамках закона.",
  },
  {
    title: "Таможенное оформление",
    text: "Полный комплекс услуг по растаможиванию автомобиля с соблюдением всех норм и правил.",
  },
  {
    title: "Международная доставка",
    text: "Безопасная транспортировка авто из Китая, Европы, Америки, Кореи, ОАЭ и других стран до границы РФ.",
  },
  {
    title: "Логистика по России",
    text: "Доставка автомобиля в любой регион РФ проверенными автовозами с полным страхованием.",
  },
  {
    title: "Сертификация и ПТС",
    text: "Получение СБКТС, ЭПТС и всех необходимых документов для постановки на учёт в ГИБДД.",
  },
  {
    title: "Сопровождение 360°",
    text: "Контроль каждого этапа до момента передачи ключей и постановки авто под окна вашего дома.",
  },
];

export function Process() {
  return (
    <Section id="postavka">
      <Reveal>
        <SectionHeading 
          eyebrow="Автомобиль под ключ" 
          title="Полный цикл доставки из Китая, Европы, Америки, Кореи и ОАЭ" 
        />
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <Reveal key={service.title} delay={i * 50}>
            <div className="glass group relative h-full rounded-xl p-6 transition-all duration-300 hover:border-primary/50">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-black">
                <span className="text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold tracking-tight">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div id="uslugi" className="mt-16 scroll-mt-28">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-2xl p-8 sm:p-12">
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">Готовы начать?</p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Получите расчет стоимости авто под ключ</h3>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground">
                Мы подберем идеальный вариант, проверим его и доставим прямо к вашему порогу со всеми документами.
              </p>
              <button type="button" onClick={scrollToForm} className={`${btnPrimary} mt-8 px-10 py-4 text-lg`}>
                Рассчитать стоимость доставки
              </button>
            </div>
            {/* Decorative background element */}
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-primary/5 blur-3xl" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
