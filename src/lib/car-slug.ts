import { CARS, type Car } from "./catalog-data";

const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .split("")
    .map((char) => TRANSLIT[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/, "");
}

const slugByCar = new Map<Car, string>();
const carBySlugMap = new Map<string, Car>();

for (const car of CARS) {
  const base = slugify(car.title) || "car";
  let slug = base;
  let suffix = 2;
  while (carBySlugMap.has(slug)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
  slugByCar.set(car, slug);
  carBySlugMap.set(slug, car);
}

/** Адрес страницы модели: /catalog/<slug> */
export function carSlug(car: Car): string {
  return slugByCar.get(car) ?? "";
}

export function carBySlug(slug: string): Car | undefined {
  return carBySlugMap.get(slug);
}

/** Все модели одной марки — для блока «другие модели» и внутренних ссылок. */
export function carsByBrand(brand: string): Car[] {
  return CARS.filter((car) => car.brand === brand);
}

export const ALL_CAR_SLUGS: string[] = [...carBySlugMap.keys()];
