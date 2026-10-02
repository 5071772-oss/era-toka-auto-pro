import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnPrimary, btnSmall, prefillModel } from "./ui";
import type { CarListItem } from "@/lib/chatium-catalog";
import { HOME_CARS } from "@/lib/home-cars";

interface CarCardProps {
  name: string;
  brand: string;
  price: string;
  img: string;
  index: number;
  onShowDetails: () => void;
}

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

export function Cars({ catalog }: { catalog: CarListItem[] }) {
  const navigate = useNavigate();
  const homeCarMedia: Record<string, string[]> = {
    "huawei-m9-6mest-gibrid-ultra-vse-dopy-r22-52kwh": [
      "/images/cars/huawei-m9-6mest-gibrid-ultra-vse-dopy-r22-aito-1200.webp",
      "/images/cars/huawei-m9-6mest-gibrid-ultra-vse-dopy-r22-aito-2-1200.webp",
      "/images/cars/huawei-m9-6mest-gibrid-ultra-vse-dopy-r22-7888-1200.webp",
      "/images/cars/huawei-m9-6mest-gibrid-ultra-vse-dopy-r22-aito-3-1200.webp",
    ],
    "lixiang-l9-ultra-2025": [
      "/images/cars/lixiang-l9-ultra-2025-li-auto-l6-1-1200.webp",
      "/images/cars/lixiang-l9-ultra-2025-li-auto-l6-2-1200.webp",
      "/images/cars/lixiang-l9-ultra-2025-li-auto-l9-19-1200.webp",
      "/images/cars/lixiang-l9-ultra-2025-kartinki24-ru-various-ca-1200.webp",
    ],
    "xiaomi-su7-ultra": [
      "/images/cars/9-12-1200.webp",
      "/images/cars/xiaomi-su7-ultra-f41087207afb4934abf1faeae0cea-1200.webp",
      "/images/cars/wvfrtffgyu-1200.webp",
      "/images/cars/xiaomi-su7-ultra-123-1200.webp",
    ],
    "xiaomi-yu7-max-bez-dopov": [
      "/images/cars/xiaomi-yu7-max-bez-dopov-1200x900-1200.webp",
      "/images/cars/xiaomi-yu7-max-bez-dopov-1200x900-3-1200.webp",
      "/images/cars/xiaomi-yu7-max-bez-dopov-1200x900-1-1200.webp",
      "/images/cars/xiaomi-yu7-max-bez-dopov-1200x900-2-1200.webp",
    ],
    "denza-z9gt-i-z9-gibrid-v-tope-dopy": [
      "/images/cars/denza-z9gt-i-z9-gibrid-v-tope-dopy-hdf45a0cc14-1200.webp",
      "/images/cars/denza-z9gt-i-z9-gibrid-v-tope-dopy-3afae8ac0b-1200.webp",
      "/images/cars/denza-z9gt-i-z9-gibrid-v-tope-dopy-09b6c89723c-1200.webp",
      "/images/cars/denza-z9gt-i-z9-gibrid-v-tope-dopy-67611178-1200.webp",
    ],
    "lotus-eletre-900": [
      "/images/cars/lotus-eletre-900-i-1-1200.webp",
      "/images/cars/lotus-eletre-900-1780526528-1667-high-1200.webp",
      "/images/cars/lotus-eletre-900-0-0-1200.webp",
      "/images/cars/lotus-eletre-900-i-1200.webp",
    ],
  };
  const cars = HOME_CARS.map(({ slug, title }) => {
    const fromCatalog = catalog.find((item) => item.slug === slug);
    const images = homeCarMedia[slug] ?? [];
    return {
      slug,
      name: fromCatalog?.title ?? title,
      brand: fromCatalog?.brand ?? "",
      price: fromCatalog?.price ?? "",
      img: images[0] ?? "",
    };
  }).filter((car) => car.img !== "");

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
            onShowDetails={() => navigate({ to: "/catalog/$slug", params: { slug: car.slug } })}
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
    </Section>
  );
}
