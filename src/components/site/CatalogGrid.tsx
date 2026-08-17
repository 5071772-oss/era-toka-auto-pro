import * as React from "react";
import { Reveal } from "./Reveal";
import { CATALOG_URL } from "@/lib/brand";
import { btnPrimary, btnSmall, prefillModel, SectionHeading } from "./ui";
import l7Asset from "@/assets/l7-ultra.jpg.asset.json";

import avatrAsset from "@/assets/avatr-07.jpg.asset.json";

const CARS = [
  {
    title: "Zeekr 9X Max",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/zeekr-9x-5_400x0.jpg",
    price: "От 5 239 000 ₽",
  },
  {
    title: "Geely Galaxy M9",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-08-26%20%D0%B2%2023.59.43_400x0.png",
    price: "От 5 205 000 ₽",
  },
  {
    title: "Voyah Free+",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/voyah_free_launch-800x450_400x0.jpg",
    price: "От 4 915 000 ₽",
  },
  {
    title: "Lixiang i8",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/hq720_400x0.jpg",
    price: "От 5 085 000 ₽",
  },
  {
    title: "Xiaomi YU7 Max",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/foto-yu7_01_400x0.jpg",
    price: "От 4 999 000 ₽",
  },
  {
    title: "Huawei Aito M8 Ultra",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/AITO-M8_04_400x0.jpg",
    price: "От 5 190 000 ₽",
  },
  {
    title: "Maextro S800",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/1400x1050_autohomecar__ChxoHmd3luWAJxOaABgT1mnJmII850_large_400x0.jpg",
    price: "От 8 800 000 ₽",
  },
  {
    title: "Zeekr 007 GT",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/zeekr-007-gt-7gt_400x0.jpg",
    price: "От 5 007 000 ₽",
  },
  {
    title: "BYD Tang L dm",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/photo_2025-04-13_20-09-39_400x0.jpg",
    price: "От 5 050 000 ₽",
  },
  {
    title: "BYD Tang L EV",
    img: "https://www.gscarbuy.com/images/virtuemart/product/resized/photo_2025-01-15_20-17-19_400x0.jpg",
    price: "От 5 040 000 ₽",
  },
  {
    title: "Li Auto L7 Ultra",
    img: l7Asset.url,
    price: "От 4 850 000 ₽",
  },
  {
    title: "Avatr 07 Ultra",
    img: avatrAsset.url,
    price: "От 5 420 000 ₽",
  },
];

function CarCard({ car }: { car: typeof CARS[0] }) {
  const [error, setError] = import.meta.env.SSR ? [false] : React.useState(false);

  return (
    <div className="group glass overflow-hidden rounded-2xl border border-border transition-all hover:border-primary/40 hover:shadow-[0_0_32px_rgba(180,255,0,0.05)]">
      <div 
        className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-muted flex items-center justify-center"
        onClick={() => prefillModel(car.title)}
      >
        {error ? (
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-xl font-bold">{car.title[0]}</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{car.title}</p>
          </div>
        ) : (
          <img
            src={car.img}
            alt={car.title}
            onError={() => setError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight">{car.title}</h3>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Цена</p>
            <p className="mt-1 text-lg font-bold text-primary">{car.price}</p>
          </div>
          <button
            type="button"
            onClick={() => prefillModel(car.title)}
            className={btnSmall}
          >
            Заказать
          </button>
        </div>
      </div>
    </div>
  );
}

export function CatalogGrid() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Каталог 2026"
            title="Актуальные модели в наличии и под заказ"
            subtitle="Мы подобрали лучшие электромобили и гибриды, которые можно привезти в РФ прямо сейчас. Цены указаны ориентировочно с учетом логистики и таможни."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARS.map((car, i) => (
            <Reveal key={i} delay={i * 50}>
              <CarCard car={car} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-20 flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold tracking-tight">Не нашли подходящий автомобиль?</h3>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              В нашем полном каталоге представлено более 500 моделей. Переходите на наш основной ресурс, чтобы увидеть весь ассортимент.
            </p>
            <a 
              href={CATALOG_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${btnPrimary} mt-8 px-10`}
            >
              Перейти в полный каталог
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
