import { useEffect } from "react";
import { Send } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost } from "./ui";

export function LeadForm() {
  useEffect(() => {
    // 1. Remove any old script instances
    const oldScript = document.getElementById("amoforms_script_1738426");
    if (oldScript) oldScript.remove();

    // 2. Define the script loader function exactly as amoCRM expects
    (function(a, m, o, c, r, n) {
      a[o + c] = a[o + c] || {
        setMeta: function(p: any) {
          this.params = (this.params || []).concat([p]);
        },
      };
      a[o + r] = a[o + r] || function(f: any) {
        (a[o + r] as any).f = ((a[o + r] as any).f || []).concat([f]);
      };
      // Load the form
      (a[o + r] as any)({
        id: "1738426",
        hash: "d240b72cfd16ae50e8044e0f6730c9aa",
        locale: "ru",
      });
      a[o + n] = a[o + n] || function(f: any, k: any) {
        (a[o + n] as any).f = ((a[o + n] as any).f || []).concat([[f, k]]);
      };
    })(window as any, 0, "amo_forms_", "params", "load", "loaded");

    // 3. Create and append the script
    const script = document.createElement("script");
    script.id = "amoforms_script_1738426";
    script.async = true;
    script.charset = "utf-8";
    script.src = "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1786780023";
    
    // We append to body to ensure it's outside any React shadow DOM or restricted areas if any
    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("amoforms_script_1738426");
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
              Target container. The amoCRM script usually looks for a 
              script tag with its ID or appends to a specific class.
              If it's a modal form, it won't appear here, but we style 
              it anyway.
            */}
            <div id="amoforms_container_1738426" className="w-full h-full min-h-[400px]">
              <div className="text-center py-20">
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
        
        .amoforms-button {
          background-color: #B4FF00 !important;
          color: #0A0A0A !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }

        iframe[id^="amoforms_"] {
          background: transparent !important;
          border-radius: 12px !important;
          width: 100% !important;
        }

        /* If the form is in a modal, adjust its background */
        .amoforms-modal-content {
          background-color: #0A0A0A !important;
          border: 1px solid rgba(180, 255, 0, 0.2) !important;
          border-radius: 16px !important;
        }
      `}</style>
    </Section>
  );
}
