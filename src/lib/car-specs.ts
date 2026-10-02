/**
 * Разбор строки характеристик модели.
 *
 * В данных каталога характеристики лежат одним текстом вида
 * «Характеристики: Размеры 4930 x 1940 x 1599mm Колёсная база 2915 мм ... | Информация о покупке ...».
 * Здесь он разбирается на поля — иначе на странице модели вместо таблицы
 * пришлось бы показывать сплошной абзац, а поисковик не понимал бы числа.
 */

export interface SpecRow {
  label: string;
  value: string;
}

export interface SpecBlock {
  title: string;
  text: string;
}

export interface CarSpecs {
  vehicleType: string;
  rows: SpecRow[];
  blocks: SpecBlock[];
  reviewUrl: string | null;
  /** Короткая строка для карточки: «гибрид, 39 кВт·ч, 490 л.с., полный привод» */
  summary: string;
}

const KB = "\u00a0";

function pick(pattern: RegExp, text: string, group = 1): string | null {
  const match = pattern.exec(text);
  const value = match?.[group];
  return value ? value.trim() : null;
}

function toNumber(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number.parseFloat(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function parseSpecs(specs: string): CarSpecs {
  const sections = specs.split("|").map((section) => section.trim());
  const charSectionRaw = sections.find((section) => section.startsWith("Характеристики")) ?? "";
  const charSection = charSectionRaw.replace(/^Характеристики:\s*/, "").replace(/^Характеристики:\s*/, "").trim();
  const rest = sections.filter((section) => !section.startsWith("Характеристики")).join(" | ").trim();

  const dims = /Размеры:?\s*(\d{3,5})\s*[x*х×]\s*(\d{3,5})\s*[x*х×]\s*(\d{3,5})/.exec(charSection);
  const wheelbase = pick(/(?:Колёсная|Колесная) база\s*(\d{3,4})/, charSection);
  const wheels = pick(
    /Колеса:?\s*([^А-ЯЁ]+?)(?=\s*(?:Батаре|Бак|Мощность|Привод|Разгон|Пневма|Дальность|Максим|$))/i,
    charSection,
  );
  const battery = toNumber(pick(/Батаре[яи]:?\s*([\d.,]+)\s*kwh/i, charSection));
  const tank = toNumber(pick(/Бак:?\s*([\d.,]+)\s*(?:л|литр)/i, charSection));
  const power = toNumber(pick(/(\d{2,4})\s*л\.?\s?с\.?/i, charSection));
  const acceleration = toNumber(pick(/Разгон[^:]{0,60}?(\d+(?:[.,]\d+)?)\s*сек/i, charSection));
  const range = toNumber(pick(/Дальность хода[^:]*:\s*([\d\s]{2,6})/i, charSection));
  const elecOnlyRange = /на чистой электротяге/i.test(charSection) ? range : null;
  const maxSpeed = toNumber(pick(/Максимальная скорость[^:]*:\s*(\d{2,3})/i, charSection));
  const driveRaw =
    pick(/(?:Привод:?\s*)?(Полный|Задний|Передний)\s*привод/i, charSection) ??
    pick(/Привод:?\s*(Полный|Задний|Передний)/i, charSection);
  const drive = driveRaw
    ? driveRaw.toLowerCase()
    : /2х электромотор|два электромотор/i.test(charSection)
      ? "полный"
      : null;
  const airSuspension = /Пневма/i.test(charSection);
  const isHybrid = /гибрид|hybrid|phev|erev/i.test(specs) || /Бак:?\s*\d/i.test(charSection);
  const isErev = /erev|подключаем/i.test(specs);

  const rows: SpecRow[] = [];
  if (dims?.[1] && dims[2] && dims[3]) {
    rows.push({ label: "Габариты (Д×Ш×В)", value: `${dims[1]} × ${dims[2]} × ${dims[3]} мм` });
  }
  if (wheelbase) rows.push({ label: "Колёсная база", value: `${wheelbase} мм` });
  if (battery) rows.push({ label: "Батарея", value: `${formatNumber(battery)} кВт·ч` });
  if (tank) rows.push({ label: "Бак", value: `${formatNumber(tank)} л` });
  if (power) rows.push({ label: "Мощность", value: `${formatNumber(power)} л.с.` });
  if (drive) rows.push({ label: "Привод", value: drive });
  if (acceleration) rows.push({ label: "Разгон до 100 км/ч", value: `${formatNumber(acceleration)} с` });

  const rangeRows: string[] = [];
  if (range && !elecOnlyRange) rangeRows.push(`${formatNumber(range)} км`);
  if (elecOnlyRange) rangeRows.push(`${formatNumber(elecOnlyRange)} км на электротяге`);
  if (rangeRows.length) rows.push({ label: "Запас хода", value: rangeRows.join(", ") });
  if (maxSpeed) rows.push({ label: "Максимальная скорость", value: `${formatNumber(maxSpeed)} км/ч` });
  if (wheels) rows.push({ label: "Колёса", value: wheels });
  if (airSuspension) rows.push({ label: "Пневмоподвеска", value: "есть" });

  const blocks: SpecBlock[] = [];
  const purchaseMatch = /Информация о покупке\s*([\s\S]*)/.exec(rest);
  if (purchaseMatch?.[1]) {
    let text = purchaseMatch[1].trim();
    // в части карточек характеристики продублированы внутри блока покупки
    if (charSection && text.startsWith(charSection.slice(0, 60))) {
      text = text.slice(charSection.length).trim();
    }
    const conditionsIndex = text.search(/(?:^|\s)Условия:/);
    if (conditionsIndex > 0) {
      blocks.push({ title: "Информация о покупке", text: text.slice(0, conditionsIndex).trim() });
      const tail = text.slice(conditionsIndex).trim().replace(/^Условия:\s*/, "");
      const termsIndex = tail.search(/(?:^|\s)Сроки:/);
      if (termsIndex > 0) {
        blocks.push({ title: "Условия оплаты", text: tail.slice(0, termsIndex).trim() });
        const deadlines = tail.slice(termsIndex).trim().replace(/^Сроки:\s*/, "");
        const reviewIndex = deadlines.search(/Обзор и тест-драйв|Тест-драйв и обзор/);
        if (reviewIndex > 0) {
          blocks.push({ title: "Сроки поставки", text: deadlines.slice(0, reviewIndex).trim() });
        } else if (deadlines) {
          blocks.push({ title: "Сроки поставки", text: deadlines.replace(/https?:\/\/\S+/g, "").trim() });
        }
      } else if (tail) {
        blocks.push({ title: "Условия и сроки", text: tail.replace(/https?:\/\/\S+/g, "").trim() });
      }
    } else if (text) {
      blocks.push({ title: "Условия покупки", text: text.replace(/https?:\/\/\S+/g, "").trim() });
    }
  } else if (rest) {
    blocks.push({ title: "Условия покупки", text: rest.replace(/https?:\/\/\S+/g, "").trim() });
  }

  const reviewUrl = /https?:\/\/\S+/.exec(specs)?.[0] ?? null;
  const vehicleType = isHybrid
    ? isErev
      ? "Гибрид с генератором (EREV)"
      : "Гибрид"
    : "Электромобиль";

  const summaryParts: string[] = [isHybrid ? "гибрид" : "электромобиль"];
  if (battery) summaryParts.push(`батарея ${formatNumber(battery)}${KB}кВт·ч`);
  if (power) summaryParts.push(`${formatNumber(power)}${KB}л.с.`);
  if (drive) summaryParts.push(`${drive} привод`);
  if (acceleration) summaryParts.push(`разгон ${formatNumber(acceleration)} с`);
  if (range && !elecOnlyRange) summaryParts.push(`запас хода ${formatNumber(range)}${KB}км`);

  return {
    vehicleType,
    rows,
    blocks,
    reviewUrl,
    summary: summaryParts.join(", "),
  };
}

/** Цена в юанях числом — для сортировки и фильтров. */
export function priceInYuan(price: string): number | null {
  const match = /([\d\s]{3,})/.exec(price);
  return toNumber(match?.[1] ?? null);
}
