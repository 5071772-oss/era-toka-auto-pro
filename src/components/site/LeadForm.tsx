import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost } from "./ui";

export function LeadForm() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. Initialize amo_forms_ globals matching the provided script snippet exactly
    window.amo_forms_params = window.amo_forms_params || {
      setMeta: function (p: any) {
        this.params = (this.params || []).concat([p]);
      }
    };
    
    window.amo_forms_load = window.amo_forms_load || function (f: any) {
      (window.amo_forms_load.f = window.amo_forms_load.f || []).concat([f]);
    };
    
    window.amo_forms_loaded = window.amo_forms_loaded || function (f: any, k: any) {
      (window.amo_forms_loaded.f = window.amo_forms_loaded.f || []).concat([[f, k]]);
    };

    // 2. Set form params using the provided ID and Hash
    window.amo_forms_load({
      id: "1738426",
      hash: "d240b72cfd16ae50e8044e0f6730c9aa",
      locale: "ru"
    });

    // 3. Inject the external script
    const scriptId = "amoforms_script_1738426";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.charset = "utf-8";
      script.src = "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1786786704";
      script.onload = () => {
        console.log("amoCRM script loaded");
        setLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }

    // Cleanup: we don't strictly need to remove the script as it handles its own singleton state
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
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                <Send className="size-4" aria-hidden="true" />
                Написать в Telegram
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="glass relative min-h-[450px] rounded-xl border border-primary/20 bg-background/70 p-6 shadow-[0_0_60px_-30px_var(--neon-soft)] sm:p-8">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm transition-opacity">
                <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}
            
            {/* 
               amoCRM will inject its widget here or at the end of body. 
               The div below provides a target if the script looks for a container by convention.
            */}
            <div id="amoforms_container_1738426" className="w-full"></div>
            
            <style>{`
              /* Custom styles to blend the amoCRM widget with the neon dark theme */
              #amoforms_container_1738426 iframe,
              .amoforms__iframe {
                background: transparent !important;
              }
              .amoforms-footer { display: none !important; }
            `}</style>

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Нажимая кнопку «Продолжить», вы подтверждаете, что принимаете пользовательское соглашение и соглашаетесь на обработку персональных данных.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

declare global {
  interface Window {
    amo_forms_params: any;
    amo_forms_load: any;
    amo_forms_loaded: any;
  }
}
