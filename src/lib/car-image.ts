import { CAR_IMAGES, type CatalogImage } from "./catalog-assets";

/** Набор размеров картинки по её полному пути. */
export function imageFor(src: string): CatalogImage | undefined {
  return CAR_IMAGES[src];
}

/**
 * srcSet для <img>: браузер сам выберет подходящий размер.
 * Если вариант один — атрибут не нужен.
 */
export function srcSetFor(image: CatalogImage | undefined): string | undefined {
  if (!image || image.variants.length < 2) return undefined;
  return image.variants.map((variant) => `${variant.src} ${variant.w}w`).join(", ");
}
