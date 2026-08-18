import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnPrimary, btnSmall, prefillModel } from "./ui";
import avatrAsset from "@/assets/avatr-07.jpg.asset.json";
import xiaomiAsset from "@/assets/xiaomi-su7-ultra.jpg.asset.json";
import aitoAsset from "@/assets/aito-m9.jpg.asset.json";
import l9Asset from "@/assets/l9-ultra.jpg.asset.json";
import zeekrAsset from "@/assets/zeekr-001-fr.jpg.asset.json";
import energyAsset from "@/assets/energy-detail.jpg.asset.json";

interface CarCardProps {
  name: string;
  brand: string;
  price: string;
  specs: string[];
  text: string;
  img: string;
  index: number;
}

function CarCard({ name, brand, price, specs, text, img, index }: CarCardProps) {
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
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              {brand}
            </span>
            {specs.map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {spec}
              </span>
            ))}
          </div>
          <h3 className="mt-5 text-xl font-semibold tracking-tight leading-tight">{name}</h3>
          <div className="mt-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Цена в Китае</p>
            <p className="mt-1 text-lg font-bold text-primary">{price}</p>
          </div>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
          <p className="mt-5 text-[10px] leading-relaxed text-muted-foreground">
            *Цена за авто. Доставка и сборы рассчитываются отдельно.
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
    brand: "Audi",
    price: "От 301 000 ¥",
    specs: ["Электро", "4WD"],
    text: "Премиальный кроссовер. Идеальное сочетание немецкого качества и современных технологий.",
    img: "/assets/energy-detail.jpg",
  },
  {
    name: "Avatr 07 Ultra Электро",
    brand: "Avatr",
    price: "От 315 000 ¥",
    specs: ["Электро", "Пневма"],
    text: "Технологичный кроссовер с футуристичным дизайном и максимальным уровнем комфорта.",
    img: "/assets/geo-grid.jpg",
  },
  {
    name: "Xiaomi SU7 Ultra",
    brand: "Xiaomi",
    price: "От 814 000 ¥",
    specs: ["Электро", "1548 л.с."],
    text: "Ультра-скоростной седан. Рекордная динамика и передовая экосистема Xiaomi.",
    img: "/assets/xiaomi-su7-ultra.jpg",
  },
  {
    name: "Huawei Aito M9 Ultra",
    brand: "Huawei Aito",
    price: "От 469 000 ¥",
    specs: ["Гибрид", "6 мест"],
    text: "Флагманский семейный кроссовер с интеллектуальной системой автопилота от Huawei.",
    img: "/assets/aito-m9.jpg",
  },
  {
    name: "Li Auto L9 Ultra",
    brand: "Li Auto",
    price: "От 459 000 ¥",
    specs: ["Гибрид", "Пневма"],
    text: "Максимальный комфорт для всей семьи. Пожалуй, лучший гибридный кроссовер в своем классе.",
    img: "/assets/l9-ultra.jpg",
  },
  {
    name: "Zeekr 001 FR",
    brand: "Zeekr",
    price: "От 769 000 ¥",
    specs: ["Электро", "1265 л.с."],
    text: "Бескомпромиссная мощность. Четыре мотора и управляемость спорткара в кузове хэтчбек.",
    img: "/assets/zeekr-001-fr.jpg",
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