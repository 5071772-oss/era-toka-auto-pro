/**
 * Генерирует public/sitemap.xml из данных каталога.
 * Запуск: npm run sitemap
 *
 * Слаги берутся из того же модуля, что и страницы моделей (src/lib/car-slug.ts),
 * поэтому адреса в карте сайта всегда совпадают с реальными.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CARS } from "../src/lib/catalog-data";
import { carSlug } from "../src/lib/car-slug";
import { SITE_URL } from "../src/lib/site";

const here = dirname(fileURLToPath(import.meta.url));
const target = resolve(here, "../public/sitemap.xml");

const STATIC_PAGES: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/catalog", changefreq: "weekly", priority: "0.9" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.2" },
  { path: "/personal-data-consent", changefreq: "yearly", priority: "0.2" },
  { path: "/marketing-consent", changefreq: "yearly", priority: "0.2" },
  { path: "/cookie-policy", changefreq: "yearly", priority: "0.2" },
  { path: "/ai-regulation", changefreq: "yearly", priority: "0.2" },
  { path: "/personal-data-requests", changefreq: "yearly", priority: "0.2" },
];

const escapeXml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const lastmod = new Date().toISOString().slice(0, 10);

const entries = [
  ...STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    changefreq: page.changefreq,
    priority: page.priority,
  })),
  ...CARS.map((car) => ({
    url: `${SITE_URL}/catalog/${carSlug(car)}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) =>
      `  <url>\n    <loc>${escapeXml(entry.url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(target, xml, "utf8");
console.log(`sitemap.xml: ${entries.length} адресов → ${target}`);
