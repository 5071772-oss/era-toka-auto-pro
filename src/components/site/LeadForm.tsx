import { useEffect } from "react";
import { Send } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost } from "./ui";

export function LeadForm() {
  useEffect(() => {
    // amoCRM script integration
    const scriptId = "amoforms_script_1738426";
    if (!document.getElementById(scriptId)) {
      // 1. Initialize the global amo_forms_ object
      (window as any)["amo_forms_params"] = (window as any)["amo_forms_params"] || {
        setMeta: function (p: any) {
          this.params = (this.params || []).concat([p]);
        },
      };

      (window as any)["amo_forms_load"] = (window as any)["amo_forms_load"] || function (f: any) {
        (window as any)["amo_forms_load"].f = ((window as any)["amo_forms_load"].f || []).concat([f]);
      };

      // 2. Load the specific form configuration
      (window as any)["amo_forms_load"]({
        id: "1738426",
        hash: "d240b72cfd16ae50e8044e0f6730c9aa",
        locale: "ru",
      });

      // 3. Append the external amoCRM script
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.charset = "utf-8";
      script.src = "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1786780023";
      document.body.appendChild(script);
    }
  }, []);

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
          <div className="glass rounded-xl p-2 min-h-[450px] relative overflow-hidden">
            {/* The amoCRM form will be injected here by its script */}
            <div id="amoforms_container_1738426" className="w-full h-full">
              {/* Fallback loader style or message could go here if needed */}
              <div className="flex items-center justify-center p-12 text-muted-foreground animate-pulse">
                Загрузка формы amoCRM...
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

