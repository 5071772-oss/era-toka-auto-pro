import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnPrimary, btnSmall, prefillModel } from "./ui";
import { getFeaturedCatalog } from "@/lib/catalog.functions";
import type { Car } from "@/lib/catalog-data";
import { DetailModal } from "./CatalogGrid";

interface CarCardProps {
  name: string;
  brand: string;
  price: string;
  specs: string[];
  text: string;
  img: string;
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
  const [cars, setCars] = React.useState<HomeCar[]>([]);
  const [selectedCar, setSelectedCar] = React.useState<Car | null>(null);
  const fetchFeatured = useServerFn(getFeaturedCatalog);

  React.useEffect(() => {
    let active = true;
    fetchFeatured().then((featured) => {
      if (!active || featured.length === 0) return;
      setCars(featured.map((car) => ({
        name: car.title,
        brand: car.brand,
        price: car.price,
        specs: car.specs.split("|").slice(0, 2).map((spec) => spec.trim()).filter(Boolean),
        text: car.specs.split(" | Информация о покупке")[0],
        img: car.img,
      })));
    }).catch((error) => console.error("[v0] Failed to load featured cars", error));
    return () => { active = false; };
  }, [fetchFeatured]);

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
              images: [car.img],
            })}
          />
        ))}
      </div>

      <Reveal delay={300} className="mt-14 flex justify-center">
        <Link
          to="/catalog"
          className={`${btnPrimary} min-w-[240px] px-10`}
        >
          Смо��реть все 130+ моделей
          <ArrowUpRight className="ml-2 size-5" aria-hidden="true" />
        </Link>
      </Reveal>
      <DetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </Section>
  );
}
