import { Phone, Send } from "lucide-react";
import { MESSENGER_MAX_URL, PHONE, PHONE_FORMATTED, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, btnGhost, btnPrimary, scrollToForm } from "./ui";

export function FinalCta() {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40" aria-hidden="true" />
      <Reveal>
        <div className="relative">
          <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Подберём автомобиль под вашу <span className="neon-text">реальную жизнь</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Электромобиль или гибрид, Китай или Европа, город или дальние поездки — начнём с ваших
            задач и рассчитаем понятный маршрут поставки.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={scrollToForm} className={btnPrimary}>
              Начать подбор
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
        </div>
      </Reveal>
    </Section>
  );
}
