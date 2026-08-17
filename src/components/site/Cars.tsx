import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnPrimary, btnSmall, prefillModel } from "./ui";

const CARS = [
  {
    name: "Audi Q4 e-tron 50 quattro",
    specs: ["Электромобиль", "Полный привод"],
    text: "Премиальный электрический кроссовер для города и трассы. Подходит клиентам, которым важны европейская марка, полный привод и привычная эргономика.",
  },
  {
    name: "Avatr 07, топовая электрическая версия",
    specs: ["Электромобиль"],
    text: "Современный технологичный кроссовер с богатым оснащением, выразительным дизайном и электрической силовой установкой.",
  },
  {
    name: "Xiaomi YU7 Max",
    specs: ["Электромобиль"],
    text: "Производительный электрический кроссовер в максимальной комплектации для клиентов, которым важны динамика, технологии и современная мультимедийная система.",
  },
  {
    name: "Huawei Aito M8, 3 ряда",
    specs: ["Гибрид", "3 ряда сидений"],
    text: "Большой семейный гибрид с тремя рядами сидений для города, путешествий и ежедневных поездок всей семьёй.",
  },
  {
    name: "Li Auto L8 Ultra",
    specs: ["Гибрид"],
    text: "Премиальный семейный гибридный кроссовер с просторным салоном, высоким уровнем оснащения и комфортом на дальних маршрутах.",
  },
];

export function Cars() {
  return (
    <Section id="avtomobili">
      <Reveal>
        <SectionHeading
          eyebrow="Автомобили"
          title="Модели, которые стоит рассмотреть"
          subtitle="Подбираем автомобиль не по популярности, а по соответствию вашим задачам."
        />
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CARS.map((car, i) => (
          <Reveal key={car.name} delay={i * 60} className="h-full">
            <article className="glass group flex h-full flex-col overflow-hidden rounded-xl">
              <div className="aspect-video w-full overflow-hidden bg-white/5">
                <img
                  src={car.img}
                  alt={car.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex flex-wrap gap-2">
                {car.specs.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full border border-primary/30 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-primary"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{car.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{car.text}</p>
              <p className="mt-5 text-xs leading-relaxed text-steel">
                Рассчитаем актуальную стоимость под вашу конфигурацию.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => prefillModel(car.name)}
                  className={`${btnPrimary} py-2.5`}
                >
                  Узнать стоимость
                </button>
                <button
                  type="button"
                  onClick={() => prefillModel(`Аналог: ${car.name}`)}
                  className={`${btnSmall} py-2.5`}
                >
                  Подобрать аналог
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300} className="mt-14 flex justify-center">
        <Link
          to="/catalog"
          className={`${btnPrimary} min-w-[240px] px-10`}
        >
          Смотреть все 130+ моделей
          <ArrowUpRight className="ml-2 size-5" aria-hidden="true" />
        </Link>
      </Reveal>
    </Section>
  );
}
