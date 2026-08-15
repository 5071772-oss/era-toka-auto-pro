import { Send } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost } from "./ui";

export function LeadForm() {
  return (
    <Section id="zayavka">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Заявка"
              title="Получите варианты под ваш бюджет"
              subtitle={`${EXPERT} свяжется с вами и поможет определить подходящий тип автомобиля и направление поставки.`}
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhost}
              >
                <Send className="size-4" aria-hidden="true" />
                Написать в Telegram
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="glass overflow-hidden rounded-xl border border-primary/20 bg-background/80 p-2 sm:p-4">
            <iframe
              src="https://forms.amocrm.ru/forms/html/form_1738426_d240b72cfd16ae50e8044e0f6730c9aa.html"
              title="Форма заявки amoCRM"
              className="block h-[620px] w-full border-0 bg-transparent sm:h-[580px]"
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
