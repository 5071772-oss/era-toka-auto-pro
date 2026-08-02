import { useEffect, useState } from "react";
import { Menu, Send, X } from "lucide-react";
import { BRAND, NAV_ITEMS, TAGLINE, TELEGRAM_URL } from "@/lib/brand";
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
        <a href="#hero" className="group flex flex-col leading-none">
          <span className="text-base font-semibold tracking-[0.18em] text-foreground">
            {BRAND}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            {TAGLINE}
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <Send className="size-4" aria-hidden="true" />
            Telegram
          </a>
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
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-md border border-border px-4 py-3 text-sm"
            >
              <Send className="size-4" aria-hidden="true" />
              Telegram
            </a>
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
