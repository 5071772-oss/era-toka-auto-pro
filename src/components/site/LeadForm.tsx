import { useEffect } from "react";
import { Send } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost } from "./ui";

export function LeadForm() {
  useEffect(() => {
    // Clear any existing scripts to avoid duplicates on HMR
    const scriptId = "amoforms_script_1738426";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) existingScript.remove();

    // 1. Initialize globals exactly as in the user snippet
    (window as any)["amo_forms_params"] = (window as any)["amo_forms_params"] || {
      setMeta: function(p: any) {
        this.params = (this.params || []).concat([p]);
      }
    };
    
    (window as any)["amo_forms_load"] = (window as any)["amo_forms_load"] || function(f: any) {
      (window as any)["amo_forms_load"].f = ((window as any)["amo_forms_load"].f || []).concat([f]);
    };
    
    // Call load with the specific configuration
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
    script.id = scriptId;
    script.async = true;
    script.charset = "utf-8";
    script.src = "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1786780023";
    document.body.appendChild(script);

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
          <div className="glass rounded-xl p-6 min-h-[450px] relative overflow-hidden bg-[#0A0A0A]/80 border-[#B4FF00]/20">
            {/* 
              AmoCRM script will inject the form. 
              Usually it replaces a script tag or appends to body, 
              but we provide a container just in case it can be targeted.
            */}
            <div id="amoforms_container_1738426" className="w-full h-full">
              <div className="flex items-center justify-center p-12 text-muted-foreground animate-pulse text-sm">
                Загрузка формы amoCRM...
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      
      <style>{`
        /* Attempt to style the amoCRM elements to match the theme */
        .amoforms-form-container, [id^="amoforms_"] {
          font-family: 'Inter', sans-serif !important;
        }
        .amoforms-button {
          background-color: #B4FF00 !important;
          color: #0A0A0A !important;
          border-radius: 6px !important;
        }
      `}</style>
    </Section>
  );
}
