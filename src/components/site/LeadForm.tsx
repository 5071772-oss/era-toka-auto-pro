import { useEffect } from "react";
import { Send } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost } from "./ui";

export function LeadForm() {
  useEffect(() => {
    // 1. Clear any old script instances to avoid conflicts
    const scriptId = "amoforms_script_1738426";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) existingScript.remove();

    // 2. Setup the global amoCRM structure exactly as provided
    (window as any)["amo_forms_params"] = (window as any)["amo_forms_params"] || {
      setMeta: function(p: any) {
        this.params = (this.params || []).concat([p]);
      }
    };
    
    (window as any)["amo_forms_load"] = (window as any)["amo_forms_load"] || function(f: any) {
      (window as any)["amo_forms_load"].f = ((window as any)["amo_forms_load"].f || []).concat([f]);
    };

    // 3. Register the form configuration
    (window as any)["amo_forms_load"]({
      id: "1738426",
      hash: "d240b72cfd16ae50e8044e0f6730c9aa",
      locale: "ru"
    });

    (window as any)["amo_forms_loaded"] = (window as any)["amo_forms_loaded"] || function(f: any, k: any) {
      (window as any)["amo_forms_loaded"].f = ((window as any)["amo_forms_loaded"].f || []).concat([[f, k]]);
    };

    // 4. Inject the script directly into the container instead of body
    // Some amoCRM scripts look for their parent element
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.charset = "utf-8";
    script.src = "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1786780023";
    
    const container = document.getElementById("amoforms_container_1738426");
    if (container) {
      container.appendChild(script);
    } else {
      document.body.appendChild(script);
    }

    return () => {
      // Basic cleanup
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) scriptToRemove.remove();
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
          <div className="glass rounded-xl p-6 min-h-[500px] relative overflow-hidden bg-[#0A0A0A]/80 border-[#B4FF00]/20 flex flex-col items-center justify-center">
            {/* 
              Target container for the amoCRM form injection.
              If the script doesn't automatically target this ID, 
              amoCRM usually appends to its own script tag.
            */}
            <div id="amoforms_container_1738426" className="w-full h-full flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="mb-4 text-primary animate-pulse">
                  <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
                  Загрузка формы amoCRM...
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      
      <style>{`
        /* Match amoCRM elements to our design tokens */
        .amoforms-form-container, .amoforms-modal, .amoforms-overlay, [id^="amoforms_"] {
          --amoforms-primary-color: #B4FF00 !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        /* Force form elements to fit our dark theme where possible */
        .amoforms-button {
          background-color: #B4FF00 !important;
          color: #0A0A0A !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
          border: none !important;
          padding: 12px 24px !important;
        }

        .amoforms-input {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(180, 255, 0, 0.2) !important;
          color: white !important;
          border-radius: 6px !important;
        }

        iframe[id^="amoforms_"] {
          background: transparent !important;
          border-radius: 12px !important;
          min-height: 450px !important;
        }
      `}</style>
    </Section>
  );
}
