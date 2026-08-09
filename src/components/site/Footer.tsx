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
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-primary transition-opacity hover:opacity-80"
          >
            Telegram: {TELEGRAM_HANDLE}
          </a>
          <a
            href={MESSENGER_MAX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-sm text-primary transition-opacity hover:opacity-80"
          >
            Написать в Max
          </a>
        </div>

        <nav aria-label="Навигация в подвале" className="flex flex-col gap-2">
          {LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
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
