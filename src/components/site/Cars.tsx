import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnPrimary, btnSmall, prefillModel } from "./ui";
import { CARS, type Car } from "@/lib/catalog-data";
import { DetailModal } from "./CatalogGrid";

interface CarCardProps {
  name: string;
  brand: string;
  price: string;
  specs: string[];
  text: string;
  img: string;
  images: string[];
  index: number;
  onShowDetails: () => void;
}

type HomeCar = Omit<CarCardProps, "index" | "onShowDetails">;

function CarCard({ name, brand, price, img, index, onShowDetails }: CarCardProps) {
  const [error, setError] = React.useState(false);

  return (
    <Reveal delay={index * 60} className="h-full">
      <article className="glass group flex h-full flex-col overflow-hidden rounded-xl">
        <button type="button" className="aspect-[16/10] w-full overflow-hidden bg-white/5 flex items-center justify-center cursor-pointer" onClick={onShowDetails} aria-label={`Открыть детали: ${name}`}>
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
        </button>
        <div className="flex flex-1 flex-col p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              {brand}
            </span>
          </div>
          <h3 className="mt-5 text-xl font-semibold tracking-tight leading-tight">{name}</h3>
          <div className="mt-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Цена в Китае</p>
            <p className="mt-1 text-lg font-bold text-primary">{price}</p>
          </div>
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

export function Cars() {
  const [selectedCar, setSelectedCar] = React.useState<Car | null>(null);
  const homeCarTitles = [
    "Huawei M9 (6мест) гибрид Ultra + все допы (R22 / 52kwh)",
    "Lixiang L9 Ultra (2025)",
    "Xiaomi SU7 Ultra",
    "Xiaomi YU7 max (без допов)",
    "Denza Z9GT и Z9 (ГИБРИД) в топе + допы",
    "Lotus Eletre 900",
  ];
  const homeCarMedia: Record<string, string[]> = {
    "Huawei M9 (6мест) гибрид Ultra + все допы (R22 / 52kwh)": [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Huawei%20M9%20(6%D0%BC%D0%B5%D1%81%D1%82)%20%D0%B3%D0%B8%D0%B1%D1%80%D0%B8%D0%B4%20Ultra%20+%20%D0%B2%D1%81%D0%B5%20%D0%B4%D0%BE%D0%BF%D1%8B%20(R22%20/aito-m9-concept.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Huawei%20M9%20(6%D0%BC%D0%B5%D1%81%D1%82)%20%D0%B3%D0%B8%D0%B1%D1%80%D0%B8%D0%B4%20Ultra%20+%20%D0%B2%D1%81%D0%B5%20%D0%B4%D0%BE%D0%BF%D1%8B%20(R22%20/aito-m9-maneuverability.jpg",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Huawei%20M9%20(6%D0%BC%D0%B5%D1%81%D1%82)%20%D0%B3%D0%B8%D0%B1%D1%80%D0%B8%D0%B4%20Ultra%20+%20%D0%B2%D1%81%D0%B5%20%D0%B4%D0%BE%D0%BF%D1%8B%20(R22%20/788814a139594c15985e186fb920c129.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Huawei%20M9%20(6%D0%BC%D0%B5%D1%81%D1%82)%20%D0%B3%D0%B8%D0%B1%D1%80%D0%B8%D0%B4%20Ultra%20+%20%D0%B2%D1%81%D0%B5%20%D0%B4%D0%BE%D0%BF%D1%8B%20(R22%20/aito_m9_2025-1.webp",
    ],
    "Lixiang L9 Ultra (2025)": [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Lixiang%20L9%20Ultra%20(2025)/li-auto-l6-1.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Lixiang%20L9%20Ultra%20(2025)/li-auto-l6-2.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Lixiang%20L9%20Ultra%20(2025)/li-auto-l9-19.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Lixiang%20L9%20Ultra%20(2025)/kartinki24_ru_various_cars_160.jpg",
    ],
    "Xiaomi SU7 Ultra": [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/9-12.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Xiaomi%20SU7%20Ultra/f41087207afb4934abf1faeae0ceab2a.jpg",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/wvfrtffgyu.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Xiaomi%20SU7%20Ultra/123.jpg",
    ],
    "Xiaomi YU7 max (без допов)": [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Xiaomi%20YU7%20max%20(%D0%B1%D0%B5%D0%B7%20%D0%B4%D0%BE%D0%BF%D0%BE%D0%B2)/1200x900.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Xiaomi%20YU7%20max%20(%D0%B1%D0%B5%D0%B7%20%D0%B4%D0%BE%D0%BF%D0%BE%D0%B2)/1200x900-3-.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Xiaomi%20YU7%20max%20(%D0%B1%D0%B5%D0%B7%20%D0%B4%D0%BE%D0%BF%D0%BE%D0%B2)/1200x900-1-.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Xiaomi%20YU7%20max%20(%D0%B1%D0%B5%D0%B7%20%D0%B4%D0%BE%D0%BF%D0%BE%D0%B2)/1200x900-2-.webp",
    ],
    "Denza Z9GT и Z9 (ГИБРИД) в топе + допы": [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Denza%20Z9GT%20%D0%B8%20Z9%20(%D0%93%D0%98%D0%91%D0%A0%D0%98%D0%94)%20%D0%B2%20%D1%82%D0%BE%D0%BF%D0%B5%20+%20%D0%B4%D0%BE%D0%BF%D1%8B/Hdf45a0cc1423459ab7857c31a6464f63p.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Denza%20Z9GT%20%D0%B8%20Z9%20(%D0%93%D0%98%D0%91%D0%A0%D0%98%D0%94)%20%D0%B2%20%D1%82%D0%BE%D0%BF%D0%B5%20+%20%D0%B4%D0%BE%D0%BF%D1%8B/3afae8ac0b.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Denza%20Z9GT%20%D0%B8%20Z9%20(%D0%93%D0%98%D0%91%D0%A0%D0%98%D0%94)%20%D0%B2%20%D1%82%D0%BE%D0%BF%D0%B5%20+%20%D0%B4%D0%BE%D0%BF%D1%8B/09b6c89723c77167e0caf6f35e81d407.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Denza%20Z9GT%20%D0%B8%20Z9%20(%D0%93%D0%98%D0%91%D0%A0%D0%98%D0%94)%20%D0%B2%20%D1%82%D0%BE%D0%BF%D0%B5%20+%20%D0%B4%D0%BE%D0%BF%D1%8B/67611178.webp",
    ],
    "Lotus Eletre 900": [
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Lotus%20Eletre%20900/i-1-.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Lotus%20Eletre%20900/1780526528.1667.high.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Lotus%20Eletre%20900/0-0.webp",
      "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/Lotus%20Eletre%20900/i.webp",
    ],
  };
  const cars: HomeCar[] = homeCarTitles
    .map((title) => CARS.find((car) => car.title === title))
    .filter((car): car is Car => Boolean(car))
    .map((car) => {
      const images = homeCarMedia[car.title] ?? car.images ?? [car.img];
      return {
        name: car.title,
        brand: car.brand,
        price: car.price,
        specs: car.specs.split("|")[0].split(". ").slice(0, 2).filter(Boolean),
        text: car.specs,
        img: images[0],
        images,
      };
    });

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
        {cars.map((car, i) => (
          <CarCard
            key={car.name}
            {...car}
            index={i}
            onShowDetails={() => setSelectedCar({
              title: car.name,
              brand: car.brand,
              price: car.price,
              specs: `${car.specs.join(". ")}. | ${car.text}`,
              img: car.img,
              images: car.images,
            })}
          />
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
      <DetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </Section>
  );
}
