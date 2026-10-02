/**
 * Готовит сжатые версии файлов сборки.
 *
 * Почему это нужно: статику сайта (`/assets/*`) отдаёт nginx хостинга напрямую,
 * минуя приложение. Сжать её на лету из кода нельзя, поэтому рядом с каждым
 * файлом сборки кладём его gzip-версию — `.gz`. Если в nginx включён `gzip_static`,
 * он сам отдаст готовый сжатый файл, и скрипты поедут в браузер втрое легче.
 * Если не включён — файлы просто лежат рядом и ничего не ломают.
 *
 * Запускается после сборки: npm run postbuild (или вручную node scripts/precompress.mjs).
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const assetsDir = join(process.cwd(), ".output", "public", "assets");
const COMPRESSIBLE = /\.(?:js|css|svg|json)$/i;

let files = [];
try {
  files = readdirSync(assetsDir).filter((name) => COMPRESSIBLE.test(name));
} catch {
  console.warn(`[precompress] папка ${assetsDir} не найдена — сжимать нечего`);
  process.exit(0);
}

let totalRaw = 0;
let totalGzip = 0;

for (const name of files) {
  const file = join(assetsDir, name);
  const raw = readFileSync(file);
  const gzipped = gzipSync(raw, { level: 9 });
  writeFileSync(`${file}.gz`, gzipped);
  totalRaw += raw.length;
  totalGzip += gzipped.length;
}

const saved = totalRaw > 0 ? Math.round((1 - totalGzip / totalRaw) * 100) : 0;
console.log(
  `[precompress] сжато файлов: ${files.length}, ${Math.round(totalRaw / 1024)} КБ → ${Math.round(totalGzip / 1024)} КБ (−${saved}%)`,
);

// Проверяем, что файлы действительно на месте: молчаливый пропуск сломал бы замер
const sample = files[0];
if (sample && statSync(join(assetsDir, `${sample}.gz`)).size === 0) {
  console.error("[precompress] сжатый файл пустой — проверьте сборку");
  process.exit(1);
}
