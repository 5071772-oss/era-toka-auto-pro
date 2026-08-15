import { useEffect } from "react";
import { Send } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost } from "./ui";

export function LeadForm() {
  useEffect(() => {
    // 1. Initialize globals exactly as in the user snippet
    (window as any)["amo_forms_params"] = (window as any)["amo_forms_params"] || {
      setMeta: function(p: any) {
        this.params = (this.params || []).concat([p]);
      }
    };
    
    (window as any)["amo_forms_load"] = (window as any)["amo_forms_load"] || function(f: any) {
      (window as any)["amo_forms_load"].f = ((window as any)["amo_forms_load"].f || []).concat([f]);
    };
    
    (window as any)["amo_forms_load"]({
      id: "1738426",
      hash: "d240b72cfd16ae50e8044e0f6730c9aa",
      locale: "ru"
    });

    (window as any)["amo_forms_loaded"] = (window as any)["amo_forms_loaded"] || function(f: any, k: any) {
      (window as any)["amo_forms_loaded"].f = ((window as any)["amo_forms_loaded"].f || []).concat([[f, k]]);
    };

    // 2. Load the external script
    const script = document.createElement("script");
    script.id = "amoforms_script_1738426";
    script.async = true;
    script.charset = "utf-8";
    script.src = "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1786780023";
    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("amoforms_script_1738426");
      if (scriptToRemove) scriptToRemove.remove();
      // We don't remove globals to avoid issues if the script tries to reference them later
    };
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
          <div className="glass rounded-xl p-6 min-h-[450px] relative overflow-hidden bg-[#0A0A0A]/80 border-[#B4FF00]/20 flex items-center justify-center">
            {/* 
              The amoCRM script provided by the user is a "button" or "modal" type by default 
              if it doesn't specify a container. It will likely appear as a floating button 
              or we might need to trigger it.
              
              However, most users expect the form to appear inside the designated area.
              If it's a floating button, it will still work for amoCRM.
            */}
            <div className="text-center">
              <div className="mb-4 text-primary animate-pulse">
                <div className="size-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
                Инициализация формы amoCRM...
              </div>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Форма откроется автоматически или появится кнопка для заполнения заявки.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
      
      <style>{`
        /* Style the amoCRM elements to match the theme */
        .amoforms-form-container, .amoforms-modal, .amoforms-overlay {
          --amoforms-primary-color: #B4FF00 !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        /* Attempt to force the button to look like our primary button if it appears */
        .amoforms-button {
          background-color: #B4FF00 !important;
          color: #0A0A0A !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
          box-shadow: 0 0 20px rgba(180, 255, 0, 0.2) !important;
        }

        /* If it's an iframe, try to round corners */
        iframe[id^="amoforms_"] {
          border-radius: 12px !important;
          background-color: transparent !important;
        }
      `}</style>
    </Section>
  );
}
