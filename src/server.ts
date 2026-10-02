import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

/**
 * Сжатие ответов на стороне приложения.
 *
 * Nginx на хостинге платформенный и настраивать его нельзя, поэтому страницы,
 * скрипты и стили сжимаем сами: HTML страницы каталога — 187 КБ, клиентская
 * сборка — около 480 КБ, а с gzip это в 3–4 раза меньше.
 *
 * Используется стандартный CompressionStream: он есть и в Node, и в воркере,
 * поэтому сжатие работает в любом окружении сборки.
 */
const COMPRESSIBLE =
  /^(?:text\/|application\/(?:javascript|json|xml|x-www-form-urlencoded)|image\/svg\+xml)/i;
const MIN_COMPRESS_BYTES = 1024;
const MAX_CACHE_ENTRIES = 64;
const MAX_CACHE_BYTES = 1024 * 1024;

/**
 * Сжатые сборки лежат в памяти: имена файлов содержат хеш и никогда не меняются,
 * поэтому один и тот же файл можно сжимать один раз, а не на каждый запрос.
 */
const compressedCache = new Map<string, ArrayBuffer>();

function cachedCompressed(url: string): ArrayBuffer | undefined {
  return compressedCache.get(url);
}

function rememberCompressed(url: string, body: ArrayBuffer): void {
  if (body.byteLength > MAX_CACHE_BYTES) return;
  if (compressedCache.size >= MAX_CACHE_ENTRIES) {
    const oldest = compressedCache.keys().next().value;
    if (oldest !== undefined) compressedCache.delete(oldest);
  }
  compressedCache.set(url, body);
}

async function gzipBody(body: ReadableStream<Uint8Array>): Promise<ArrayBuffer> {
  return await new Response(body.pipeThrough(gzipStream())).arrayBuffer();
}

/** Типы CompressionStream в разных средах описаны по-разному — приводим к общему виду. */
function gzipStream(): TransformStream<Uint8Array, Uint8Array> {
  return new CompressionStream("gzip") as unknown as TransformStream<Uint8Array, Uint8Array>;
}

async function compressResponse(request: Request, response: Response): Promise<Response> {
  if (request.method === "HEAD") return response;
  if (response.status < 200 || response.status === 204 || response.status === 304) return response;
  if (response.headers.has("content-encoding")) return response;
  if (!/\bgzip\b/i.test(request.headers.get("accept-encoding") ?? "")) return response;

  const contentType = response.headers.get("content-type") ?? "";
  if (!COMPRESSIBLE.test(contentType)) return response;

  // Мелкие ответы дешевле отдать как есть
  const declaredLength = Number(response.headers.get("content-length") ?? "0");
  if (declaredLength > 0 && declaredLength < MIN_COMPRESS_BYTES) return response;
  if (!response.body) return response;

  const headers = new Headers(response.headers);
  const existingVary = headers.get("vary");
  headers.set("vary", existingVary ? `${existingVary}, accept-encoding` : "accept-encoding");
  headers.set("content-encoding", "gzip");
  headers.delete("content-length");

  const url = new URL(request.url);
  // Файлы сборки неизменяемы: сжимаем один раз и переиспользуем результат
  const cacheable = url.pathname.startsWith("/assets/");

  if (cacheable) {
    const cached = cachedCompressed(request.url);
    if (cached) {
      return new Response(cached, { status: response.status, statusText: response.statusText, headers });
    }
    const body = await gzipBody(response.body);
    rememberCompressed(request.url, body);
    return new Response(body, { status: response.status, statusText: response.statusText, headers });
  }

  return new Response(response.body.pipeThrough(gzipStream()), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return await compressResponse(request, normalized);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
