import { Send } from "lucide-react";
import heroImage from "@/assets/hero-ev.jpg";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { btnGhost, btnPrimary, scrollToForm } from "./ui";

const BADGES = ["BEV", "HEV", "PHEV", "EREV", "Китай", "Европа", "Америка", "Корея"];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-50" aria-hidden="true" />
      <img
        src={heroImage}
        alt="Электрический кроссовер с потоками энергии на тёмном фоне ночного города"
        width={1600}
        height={1104}
        className="pointer-events-none absolute -right-24 top-10 hidden w-[70%] max-w-4xl select-none opacity-45 mix-blend-screen lg:block"
      />
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
          {EXPERT} поможет подобрать, проверить и доставить автомобиль под ваш бюджет, маршруты,
          климат и реальные задачи.
        </p>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Китай, Европа, Америка и Корея. Полный цикл сопровождения: от консультации и выбора модели
          до логистики, таможни, документов и передачи автомобиля.
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
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={btnGhost}>
            <Send className="size-4" aria-hidden="true" />
            Написать Алексею в Telegram
          </a>
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
                Эксперт по подбору и поставке электромобилей и гибридов
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Консультация по вашему сценарию: город, трасса, семья, зарядка, бюджет и ликвидность
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
