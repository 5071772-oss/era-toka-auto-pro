import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnPrimary, btnSmall, prefillModel } from "./ui";
import zeekr001frAsset from "@/assets/zeekr-001-fr.jpg.asset.json";
import l9UltraAsset from "@/assets/l9-ultra.jpg.asset.json";
import aitoM9Asset from "@/assets/aito-m9.jpg.asset.json";
import xiaomiSu7Asset from "@/assets/xiaomi-su7-ultra.jpg.asset.json";

interface CarCardProps {
  name: string;
  specs: string[];
  text: string;
  img: string;
  index: number;
}

function CarCard({ name, specs, text, img, index }: CarCardProps) {
  const [error, setError] = React.useState(false);

  return (
    <Reveal delay={index * 60} className="h-full">
      <article className="glass group flex h-full flex-col overflow-hidden rounded-xl">
        <div className="aspect-[16/10] w-full overflow-hidden bg-white/5 flex items-center justify-center">
          {error ? (
            <div className="flex flex-col items-center gap-2 p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xl font-bold">{name[0]}</span>
              </div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{name}</p>
            </div>
          ) : (
            <img
              src={img}
              alt={name}
              loading="lazy"
              onError={() => setError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-7">
          <div className="flex flex-wrap gap-2">
            {specs.map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-primary/30 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-primary"
              >
                {spec}
              </span>
            ))}
          </div>
          <h3 className="mt-5 text-xl font-semibold tracking-tight">{name}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
          <p className="mt-5 text-xs leading-relaxed text-steel">
            Рассчитаем актуальную стоимость под вашу конфигурацию.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => prefillModel(name)}
              className={`${btnPrimary} flex-1`}
            >
              Узнать стоимость
            </button>
            <button
              type="button"
              onClick={() => prefillModel(`Аналог: ${name}`)}
              className={`${btnSmall} flex-1`}
            >
              Подобрать аналог
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

const CARS = [
  {
    name: "Audi Q4 e-tron 50 quattro",
    specs: ["Электромобиль", "Полный привод"],
    text: "Премиальный электрический кроссовер для города и трассы. Подходит клиентам, которым важны европейская марка, полный привод и привычная эргономика.",
    img: "https://gscarbuy.com/images/virtuemart/product/resized/402807-2022-audi-q4-e-tron_400x0.jpg",
  },
  {
    name: "Avatr 07, топовая электрическая версия",
    specs: ["Электромобиль"],
    text: "Современный технологичный кроссовер с богатым оснащением, выразительным дизайном и электрической силовой установкой.",
    img: "https://gscarbuy.com/images/virtuemart/product/resized/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-09-28%20%D0%B2%2010.05.113_400x0.png",
  },
  {
    name: "Xiaomi SU7 Ultra",
    specs: ["Электромобиль"],
    text: "Ультра-скоростной электрический седан с рекордными характеристиками. Для тех, кто ценит максимальный драйв и передовые технологии Xiaomi.",
    img: xiaomiSu7Asset.url,
  },
  {
    name: "Huawei Aito M9, 6 мест",
    specs: ["Гибрид", "3 ряда сидений"],
    text: "Флагманский семейный кроссовер с интеллектуальной системой Huawei. Максимальный комфорт, безопасность и передовые функции автопилота.",
    img: aitoM9Asset.url,
  },
  {
    name: "Li Auto L9 Ultra",
    specs: ["Гибрид"],
    text: "Вершина комфорта от Li Auto. Семейный особняк на колесах с пневмоподвеской, холодильником, экранами и невероятной плавностью хода.",
    img: l9UltraAsset.url,
  },
  {
    name: "Zeekr 001 FR",
    specs: ["Электромобиль", "1265 л.с."],
    text: "Гипер-хэтчбек с четырьмя электромоторами. Бескомпромиссная мощность и управляемость в сочетании с премиальным интерьером.",
    img: zeekr001frAsset.url,
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
          <CarCard key={car.name} {...car} index={i} />
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