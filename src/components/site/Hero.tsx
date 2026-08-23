import { ArrowUpRight, Phone, Send } from "lucide-react";
import { CATALOG_URL, EXPERT, MESSENGER_MAX_URL, PHONE, PHONE_FORMATTED, TELEGRAM_URL } from "@/lib/brand";
import { btnGhost, btnPrimary, btnSmall, scrollToForm } from "./ui";
const HERO_IMG = "https://project--dbec8924-ca7b-41f6-b87a-9cd9693ce1a1.lovable.app/__l5e/assets-v1/e1dc2e40-b83e-4913-9eb1-4ee5deaf4373/hero-ev.jpg";
const VECTOR_CAR = "https://cdn.relaxdev.ru/users/avnhome2012@yandex.ru/era-toka-auto-pro/Era-Toka/new-arcfox-2.webp";


const BADGES = ["BEV", "HEV", "PHEV", "EREV", "Китай", "Европа", "Америка", "Корея"];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMG}
          alt="Premium electric vehicle"
          className="h-full w-full object-cover opacity-40 mix-blend-luminosity grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
          Электромобили и гибриды под ключ
        </p>

        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Электромобили и гибриды <span className="neon-text">под ключ</span> в РФ
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
          {EXPERT} поможет подобрать, проверить and доставить автомобиль под ваш бюджет, маршруты,
          климат and реальные задачи.
        </p>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Китай, Европа, Америка and Корея. Полный цикл сопровождения: от консультации and выбора модели
          до логистики, таможни, документов and передачи автомобиля.
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {BADGES.map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-border px-3.5 py-1.5 text-xs tracking-wide text-muted-foreground"
            >
              {badge}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={scrollToForm} className={btnPrimary}>
            Получить подбор
          </button>
          <a href={`tel:${PHONE}`} className={`${btnGhost} flex-1 sm:flex-initial`}>
            <Phone className="size-4" aria-hidden="true" />
            {PHONE_FORMATTED}
          </a>
          <div className="flex gap-2">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${btnGhost} flex-1 sm:flex-initial`}>
              <Send className="size-4" aria-hidden="true" />
              Telegram
            </a>
            <a href={MESSENGER_MAX_URL} target="_blank" rel="noopener noreferrer" className={`${btnGhost} flex-1 sm:flex-initial`}>
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

        <div className="glass mt-14 max-w-2xl rounded-xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span
              className="mt-1.5 h-10 w-0.5 shrink-0 bg-primary"
              style={{ boxShadow: "0 0 18px var(--neon-soft)" }}
              aria-hidden="true"
            />
            <div>
              <p className="text-lg font-semibold tracking-tight">{EXPERT}</p>
              <p className="mt-1 text-sm text-primary">
                Эксперт по подбору and поставке электромобилей and гибридов
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Консультация по вашему сценарию: город, трасса, семья, зарядка, бюджет and ликвидность
              </p>
            </div>
          </div>
          <p className="mt-6 border-t border-border pt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Один эксперт — весь маршрут поставки под контролем.
          </p>
        </div>
      </div>
    </section>
  );
}