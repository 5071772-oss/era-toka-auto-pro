import { useEffect } from "react";
import { Send } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost } from "./ui";

export function LeadForm() {
  useEffect(() => {
    const scriptId = "amoforms_script_1738426";
    
    // Function to initialize and load the script
    const initAmoForm = () => {
      if (!document.getElementById(scriptId)) {
        (window as any)["amo_forms_params"] = (window as any)["amo_forms_params"] || {
          setMeta: function (p: any) {
            this.params = (this.params || []).concat([p]);
          },
        };

        (window as any)["amo_forms_load"] = (window as any)["amo_forms_load"] || function (f: any) {
          ((window as any)["amo_forms_load"].f = (window as any)["amo_forms_load"].f || []).concat([f]);
        };

        (window as any)["amo_forms_load"]({
          id: "1738426",
          hash: "d240b72cfd16ae50e8044e0f6730c9aa",
          locale: "ru",
        });

        const script = document.createElement("script");
        script.id = scriptId;
        script.async = true;
        script.charset = "utf-8";
        script.src = "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1786780023";
        document.body.appendChild(script);
      }
    };

    // If script is already in document body but not executed, we might need to trigger it
    // But usually, adding it once is enough.
    initAmoForm();

    // The script typically looks for a specific div or creates its own.
    // Based on the user's provided script, it might be looking for a script tag with that ID.
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
          <div className="glass rounded-xl p-6 min-h-[450px] relative overflow-hidden bg-[#0A0A0A]/80 border-[#B4FF00]/20">
            {/* The amoCRM form container */}
            <div id="amoforms_container_1738426" className="w-full h-full amoforms-custom-container">
              <div className="flex items-center justify-center p-12 text-muted-foreground animate-pulse">
                Загрузка формы amoCRM...
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      
      {/* Global CSS to style the amoCRM iframe content if possible (limited due to iframe) */}
      <style>{`
        .amoforms-custom-container iframe {
          border-radius: 8px !important;
          background: transparent !important;
        }
      `}</style>
    </Section>
  );
}


