import * as React from "react";
import { Reveal } from "./Reveal";
import { btnPrimary, btnSmall, prefillModel, SectionHeading } from "./ui";
import { CARS, Car } from "@/lib/catalog-data";
import { Search, X, Info } from "lucide-react";

function CarCard({ car, onShowDetails }: { car: Car; onShowDetails: (car: Car) => void }) {
  const [error, setError] = React.useState(false);

  return (
    <div className="group glass overflow-hidden rounded-2xl border border-border transition-all hover:border-primary/40 hover:shadow-[0_0_32px_rgba(180,255,0,0.05)]">
      <div 
        className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-muted flex items-center justify-center"
        onClick={() => onShowDetails(car)}
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
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10">
            <Info className="size-5 text-primary" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold tracking-tight leading-tight">{car.title}</h3>
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
            {car.brand}
          </span>
        </div>
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

function DetailModal({ car, onClose }: { car: Car | null; onClose: () => void }) {
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
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-colors"
        >
          <X className="size-6" />
        </button>
        
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="relative aspect-video">
             <img src={car.img} alt={car.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
               <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]">
                 {car.brand}
               </span>
               <div className="h-px flex-1 bg-border/40" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{car.title}</h2>
            <p className="text-2xl font-bold text-primary mb-8">{car.price}</p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Характеристики</h4>
            <div className="grid gap-3 text-sm leading-relaxed text-foreground/90 bg-white/5 rounded-xl p-5 border border-white/5">
                  {(car.specs.split('|')[0] || '').replace('Характеристики:', '').trim().split('. ').map((spec, i) => (
                    spec && <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {car.specs && car.specs.includes('|') && (
                <div>
                   <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Условия покупки</h4>
                   <div className="text-sm leading-relaxed text-muted-foreground bg-black/20 rounded-xl p-5 border border-white/5">
                     {(car.specs.split('|')[1] || '').trim()}
                   </div>
                </div>
              )}
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

export function CatalogGrid() {
  const [search, setSearch] = React.useState("");
  const [activeBrand, setActiveBrand] = React.useState<string | null>(null);
  const [selectedCar, setSelectedCar] = React.useState<Car | null>(null);

  const brands = React.useMemo(() => {
    const set = new Set(CARS.map(c => c.brand));
    return Array.from(set).sort();
  }, []);

  const filteredCars = React.useMemo(() => {
    return CARS.filter(car => {
      const matchesSearch = car.title.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = activeBrand ? car.brand === activeBrand : true;
      return matchesSearch && matchesBrand;
    });
  }, [search, activeBrand]);

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Каталог 2026"
            title="Более 130 премиальных моделей"
            subtitle="Актуальные электромобили и гибриды. Все машины разбиты по производителям для удобного поиска."
          />
        </Reveal>

        {/* Search & Filters */}
        <div className="mt-12 space-y-6">
          <Reveal delay={50}>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Поиск по названию модели..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="size-4" />
                </button>
              )}
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

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car, i) => (
            <Reveal key={car.title} delay={(i % 12) * 30}>
              <CarCard car={car} onShowDetails={setSelectedCar} />
            </Reveal>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="mt-20 text-center py-20 glass rounded-3xl border-dashed border-2 border-border/50">
             <p className="text-xl text-muted-foreground">По вашему запросу ничего не найдено</p>
             <button 
               onClick={() => { setSearch(""); setActiveBrand(null); }}
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