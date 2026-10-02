const POWER_IMG = "/images/cars/i-1200.webp";

import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost, scrollToForm } from "./ui";

const TYPES = [
  {
    code: "BEV",
    text: "Чистый электромобиль. Подходит, если есть удобная зарядка и понятный ежедневный маршрут.",
  },
  {
    code: "HEV",
    text: "Гибрид без обязательной зарядки от розетки. Спокойный вариант для города и трассы.",
  },
  {
    code: "PHEV",
    text: "Подключаемый гибрид. Ежедневные поездки можно проходить на электричестве, а двигатель помогает на дальних маршрутах.",
  },
  {
    code: "EREV",
    text: "Автомобиль с электрическим приводом и генератором, который увеличивает автономность.",
  },
];

export function PowerTypes() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Reveal>
            <SectionHeading eyebrow="Электротяга" title="Какая электротяга подходит именно вам?" />
          </Reveal>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {TYPES.map((type, i) => (
              <Reveal key={type.code} delay={i * 60}>
                <div className="flex flex-col gap-2 py-6 sm:flex-row sm:gap-8">
                  <span className="w-20 shrink-0 text-lg font-semibold tracking-tight text-primary">
                    {type.code}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{type.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <button type="button" onClick={scrollToForm} className={`${btnGhost} mt-8`}>
              Не знаю, что выбрать
            </button>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <img
            src={POWER_IMG}
            alt="Зарядный коннектор электромобиля с потоками энергии"
            width={1200}
            height={912}
            loading="lazy"
            className="w-full rounded-xl border border-border object-cover"
          />
        </Reveal>
      </div>
    </Section>
  );
}
