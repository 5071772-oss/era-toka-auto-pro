import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { btnPrimary, btnSmall, prefillModel, SectionHeading } from "./ui";
import { CARS, Car } from "@/lib/catalog-data";
import { carSlug } from "@/lib/car-slug";
import { parseSpecs, priceInYuan } from "@/lib/car-specs";
import { imageFor, srcSetFor } from "@/lib/car-image";
import { pluralModels } from "@/lib/site";
import { Search, X, Info } from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";

/** Сколько карточек показываем сразу и сколько добавляем по кнопке. */
const PAGE_SIZE = 24;

function CarCard({ car, onShowDetails }: { car: Car; onShowDetails: (car: Car) => void }) {
  const [error, setError] = React.useState(false);
  const image = imageFor(car.img);
  const summary = React.useMemo(() => parseSpecs(car.specs).summary, [car.specs]);

  return (
    <div className="group glass overflow-hidden rounded-2xl border border-border transition-all hover:border-primary/40 hover:shadow-[0_0_32px_rgba(180,255,0,0.05)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Link
          to="/catalog/$slug"
          params={{ slug: carSlug(car) }}
          className="block h-full w-full"
          aria-label={`${car.title} — характеристики, цена и сроки поставки`}
        >
          {error ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xl font-bold text-primary">{car.title[0]}</span>
              </div>
              <p className="text-sm font-medium text-muted-foreground">{car.title}</p>
            </div>
          ) : (
            <img
              src={car.img}
              srcSet={srcSetFor(image)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              alt={car.title}
              loading="lazy"
              decoding="async"
              onError={() => setError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
        <button
          type="button"
          onClick={() => onShowDetails(car)}
          aria-label={`Быстрый просмотр: ${car.title}`}
          className="absolute top-4 right-4 rounded-full border border-white/10 bg-black/60 p-2 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Info className="size-5 text-primary" aria-hidden="true" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold tracking-tight leading-tight">
            <Link to="/catalog/$slug" params={{ slug: carSlug(car) }} className="transition-colors hover:text-primary">
              {car.title}
            </Link>
          </h3>
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
            {car.brand}
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{summary}</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Цена в Китае</p>
            <p className="mt-1 text-lg font-bold text-primary">{car.price}</p>
            <p className="mt-1 text-[10px] text-muted-foreground leading-tight">
              *Цена за авто. Доставка и сборы рассчитываются отдельно.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prefillModel(`${car.title} (Узнать стоимость)`);
              }}
              className={btnSmall}
            >
              Узнать стоимость
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prefillModel(`${car.title} (Подобрать аналог)`);
              }}
              className="px-3 py-1.5 rounded-full border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider hover:bg-primary/5 transition-colors text-center"
            >
              Подобрать аналог
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DetailModal({ car, onClose }: { car: Car | null; onClose: () => void }) {
  if (!car) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl glass border border-primary/20 rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-colors"
        >
          <X className="size-6" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto elegant-scrollbar scroll-smooth">
          <div className="relative aspect-video flex items-center justify-center bg-muted">
            <ImageCarousel
              images={car.images && car.images.length > 0 ? car.images : [car.img]}
              alt={car.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]">
                {car.brand}
              </span>
              <div className="h-px flex-1 bg-border/40" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{car.title}</h2>
            <p className="text-2xl font-bold text-primary mb-1">{car.price}</p>
            <p className="text-xs text-muted-foreground mb-8">
              *Цена за авто. Доставка и сборы рассчитываются отдельно.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Характеристики
                </h4>
                <div className="grid gap-3 text-sm leading-relaxed text-foreground/90 bg-white/5 rounded-xl p-5 border border-white/5">
                  {parseSpecs(car.specs).rows.map((row) => (
                    <div key={row.label} className="flex items-start gap-3">
                      <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>
                        {row.label}: {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/catalog/$slug"
                params={{ slug: carSlug(car) }}
                onClick={onClose}
                className="inline-flex text-sm font-medium text-primary hover:underline"
              >
                Открыть полную страницу модели
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  prefillModel(`${car.title} (Узнать стоимость)`);
                  onClose();
                }}
                className={`${btnPrimary} flex-1 py-4 text-base`}
              >
                Узнать стоимость
              </button>
              <button
                onClick={() => {
                  prefillModel(`${car.title} (Подобрать аналог)`);
                  onClose();
                }}
                className="flex-1 py-4 px-8 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-colors text-sm font-bold uppercase tracking-wider"
              >
                Подобрать аналог
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type SortMode = "default" | "price-asc" | "price-desc";
type TypeMode = "all" | "electric" | "hybrid";

export function CatalogGrid() {
  const [search, setSearch] = React.useState("");
  const [activeBrand, setActiveBrand] = React.useState<string | null>(null);
  const [activeType, setActiveType] = React.useState<TypeMode>("all");
  const [sort, setSort] = React.useState<SortMode>("default");
  const [visible, setVisible] = React.useState(PAGE_SIZE);
  const [selectedCar, setSelectedCar] = React.useState<Car | null>(null);
  const cars = CARS;

  const brands = React.useMemo(() => {
    const set = new Set(cars.map((c) => c.brand));
    return Array.from(set).sort();
  }, [cars]);

  // Разбор характеристик считаем один раз на весь список, а не при каждой отрисовке
  const infoByTitle = React.useMemo(() => {
    const map = new Map<string, { hybrid: boolean; price: number | null }>();
    for (const car of cars) {
      const parsed = parseSpecs(car.specs);
      map.set(car.title, {
        hybrid: parsed.vehicleType !== "Электромобиль",
        price: priceInYuan(car.price),
      });
    }
    return map;
  }, [cars]);

  const filteredCars = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = cars.filter((car) => {
      const matchesSearch =
        !query || car.title.toLowerCase().includes(query) || car.brand.toLowerCase().includes(query);
      const matchesBrand = activeBrand ? car.brand === activeBrand : true;
      const info = infoByTitle.get(car.title);
      const matchesType =
        activeType === "all" ? true : activeType === "hybrid" ? Boolean(info?.hybrid) : !info?.hybrid;
      return matchesSearch && matchesBrand && matchesType;
    });
    if (sort === "default") return result;
    return [...result].sort((a, b) => {
      const priceA = infoByTitle.get(a.title)?.price ?? 0;
      const priceB = infoByTitle.get(b.title)?.price ?? 0;
      return sort === "price-asc" ? priceA - priceB : priceB - priceA;
    });
  }, [cars, search, activeBrand, activeType, sort, infoByTitle]);

  // При смене фильтров возвращаемся к первой порции карточек
  React.useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [search, activeBrand, activeType, sort]);

  const shownCars = filteredCars.slice(0, visible);

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Каталог 2026"
            title={`${cars.length} ${pluralModels(cars.length)} электромобилей и гибридов`}
            subtitle="Актуальные электромобили и гибриды. Откройте модель, чтобы посмотреть характеристики, условия и сроки поставки."
          />
        </Reveal>

        {/* Search & Filters */}
        <div className="mt-12 space-y-6">
          <Reveal delay={50}>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Поиск по названию или марке..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Очистить поиск"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </Reveal>

          <Reveal delay={75}>
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: "all", label: "Все типы" },
                  { id: "electric", label: "Электромобили" },
                  { id: "hybrid", label: "Гибриды" },
                ] as const
              ).map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveType(option.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeType === option.id
                      ? "bg-primary text-black"
                      : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
                  }`}
                >
                  {option.label}
                </button>
              ))}
              <span className="mx-2 hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
              <label className="text-sm text-muted-foreground">
                <span className="sr-only">Сортировка</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortMode)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                >
                  <option value="default">Сначала по каталогу</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                </select>
              </label>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveBrand(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeBrand ? 'bg-primary text-black' : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20'}`}
              >
                Все марки
              </button>
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeBrand === brand ? 'bg-primary text-black' : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20'}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <p className="mt-8 text-sm text-muted-foreground" role="status">
          Найдено моделей: {filteredCars.length}
          {filteredCars.length > shownCars.length ? `, показано ${shownCars.length}` : ""}
        </p>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shownCars.map((car, i) => (
            <Reveal key={car.title} delay={(i % 12) * 30}>
              <CarCard car={car} onShowDetails={setSelectedCar} />
            </Reveal>
          ))}
        </div>

        {filteredCars.length > shownCars.length && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisible((count) => count + PAGE_SIZE)}
              className={btnPrimary}
            >
              Показать ещё {Math.min(PAGE_SIZE, filteredCars.length - shownCars.length)} из{" "}
              {filteredCars.length - shownCars.length}
            </button>
          </div>
        )}

        {filteredCars.length === 0 && (
          <div className="mt-20 text-center py-20 glass rounded-3xl border-dashed border-2 border-border/50">
             <p className="text-xl text-muted-foreground">По вашему запросу ничего не найдено</p>
             <button
               onClick={() => { setSearch(""); setActiveBrand(null); setActiveType("all"); }}
               className="mt-4 text-primary hover:underline"
             >
               Сбросить фильтры
             </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <DetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </section>
  );
}
