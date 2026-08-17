import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnPrimary, btnSmall, prefillModel } from "./ui";

const CARS = [
  {
    name: "Audi Q4 e-tron 50 quattro",
    specs: ["Электромобиль", "Полный привод"],
    text: "Премиальный электрический кроссовер для города и трассы. Подходит клиентам, которым важны европейская марка, полный привод и привычная эргономика.",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/402807-2022-audi-q4-e-tron_400x0.jpg",
  },
  {
    name: "Avatr 07, топовая электрическая версия",
    specs: ["Электромобиль"],
    text: "Современный технологичный кроссовер с богатым оснащением, выразительным дизайном и электрической силовой установкой.",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-09-28%20%D0%B2%2010.05.113_400x0.png",
  },
  {
    name: "Xiaomi SU7 Ultra",
    specs: ["Электромобиль"],
    text: "Ультра-скоростной электрический седан с рекордными характеристиками. Для тех, кто ценит максимальный драйв и передовые технологии Xiaomi.",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/Снимок экрана 2024-10-31 в 09.06.33_400x0.png",
  },
  {
    name: "Huawei Aito M9, 6 мест",
    specs: ["Гибрид", "3 ряда сидений"],
    text: "Флагманский семейный кроссовер с интеллектуальной системой Huawei. Максимальный комфорт, безопасность и передовые функции автопилота.",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/huawei-aito-m9-ev-specs-features-price-1_400x0.jpg",
  },
  {
    name: "Li Auto L9 Ultra",
    specs: ["Гибрид"],
    text: "Вершина комфорта от Li Auto. Семейный особняк на колесах с пневмоподвеской, холодильником, экранами и невероятной плавностью хода.",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/li-auto-l9-ultra-hybrid-specs-features-price-1_400x0.jpg",
  },
  {
    name: "Zeekr 001 FR",
    specs: ["Электромобиль", "1265 л.с."],
    text: "Гипер-хэтчбек с четырьмя электромоторами. Бескомпромиссная мощность и управляемость в сочетании с премиальным интерьером.",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/zeekr-001-fr-ev-specs-features-price-1_400x0.jpg",
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