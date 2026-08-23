import { useEffect, useState } from "react";
import { Menu, Phone, Send, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BRAND, MESSENGER_MAX_URL, NAV_ITEMS, PHONE, PHONE_FORMATTED, TAGLINE, TELEGRAM_URL } from "@/lib/brand";
import { btnPrimary, scrollToForm } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "glass border-b border-border" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="text-base font-semibold tracking-[0.18em] text-foreground">
            {BRAND}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            {TAGLINE}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            item.href.startsWith('/') ? (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            )
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 rounded-md border border-border p-1">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-primary"
                title="Написать в Telegram"
              >
                <Send className="size-3.5" aria-hidden="true" />
              </a>
              <div className="h-3 w-px bg-border" aria-hidden="true" />
              <a
                href={MESSENGER_MAX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-primary"
                title="Написать в Max"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3.5"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
            >
              <Phone className="size-3" />
              <span>'''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''\n                                        \n                                            \n                                            Перед внесением изменений:\n\n Проанализируй существующую структуру сайта.\n\n Найди все страницы.\n\n Найди все формы.\n\n Найди все места, где собираются:\n\n имя;\n\n телефон;\n\n e-mail;\n\n комментарий;\n\n параметры автомобиля;\n\n другие пользовательские данные.\n\n Найди существующие кнопки отправки форм.\n\n Найди текущие ссылки в Header и Footer.\n\n Не удаляй существующие функции.\n\n Не меняй существующую бизнес-логику без необходимости.\n\n Не создавай дубликаты существующих страниц.\n\n Сохрани существующий визуальный стиль.</span>
            </a>
          </div>
          <button type="button" onClick={scrollToForm} className={`${btnPrimary} py-2.5`}>
            Получить подбор
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-border p-2 text-foreground md:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="glass border-t border-border md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4">
            {NAV_ITEMS.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              )
            ))}
            <a
              href={`tel:${PHONE}`}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              <Phone className="size-4" />
              {PHONE_FORMATTED}
            </a>
            <div className="mt-2 flex items-center gap-2">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm"
              >
                <Send className="size-4" aria-hidden="true" />
                Telegram
              </a>
              <a
                href={MESSENGER_MAX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm"
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
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                scrollToForm();
              }}
              className={`${btnPrimary} mt-2 w-full`}
            >
              Получить подбор
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
