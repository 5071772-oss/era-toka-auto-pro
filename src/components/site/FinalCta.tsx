import { Send } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/brand";
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
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={btnGhost}>
              <Send className="size-4" aria-hidden="true" />
              Написать Алексею
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
