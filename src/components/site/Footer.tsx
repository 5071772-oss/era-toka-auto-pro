import { Menu, Send, X } from "lucide-react";
import { BRAND, EXPERT, MESSENGER_MAX_URL, NAV_ITEMS, TAGLINE, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/brand";

const LINKS = NAV_ITEMS.filter((item) => item.label !== "Услуги");

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold tracking-[0.18em]">{BRAND}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {TAGLINE}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">{EXPERT}</p>
          <div className="mt-2 flex items-center gap-2">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-primary transition-opacity hover:opacity-80 md:flex-none"
            >
              <Send className="size-4" aria-hidden="true" />
              Telegram
            </a>
            <a
              href={MESSENGER_MAX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-primary transition-opacity hover:opacity-80 md:flex-none"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Max
            </a>
          </div>
        </div>

        <nav aria-label="Навигация в подвале" className="flex flex-col gap-2">
          <a
            href={CATALOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Каталог
          </a>
          {LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Telegram
          </a>
          <a
            href={MESSENGER_MAX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Написать в Max
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-8">
        <p className="border-t border-border pt-6 text-xs leading-relaxed text-steel">
          Информация на сайте носит ознакомительный характер. Стоимость, возможность поставки,
          комплектация, сроки и условия рассчитываются индивидуально по конкретному автомобилю и
          направлению.
        </p>
      </div>
    </footer>
  );
}
