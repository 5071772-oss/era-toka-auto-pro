import { useEffect } from "react";
import { Send } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost } from "./ui";

export function LeadForm() {
  useEffect(() => {
    const scriptId = "amoforms_script_1738426";
    if (document.getElementById(scriptId)) return;

    const win = window as any;
    
    // Exact initialization logic based on amoCRM standard
    (function (a, m, o, c, r, m_sub) {
      a[o] = a[o] || function () {
        (a[o].a = a[o].a || []).push(arguments);
      };
      a[o].l = 1 * (new Date() as any);
      r = m.createElement(c);
      m_sub = m.getElementsByTagName(c)[0];
      (r as any).async = 1;
      (r as any).src = "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1738426";
      (r as any).id = scriptId;
      if (m_sub && m_sub.parentNode) {
        m_sub.parentNode.insertBefore(r, m_sub);
      } else {
        m.head.appendChild(r);
      }
    })(win, document, "amo_forms_", "script", null, null);

    win.amo_forms_("params", {
      id: "1738426",
      hash: "d240b72cfd16ae50e8044e0f6730c9aa",
      locale: "ru",
    });
    win.amo_forms_("load");
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
            <div id="amoforms_container_1738426" className="w-full h-full min-h-[400px]">
              <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                <div className="mb-4 text-primary animate-pulse">
                  <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
                  Загрузка формы...
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      
      <style>{`
        .amoforms-form-container, .amoforms-modal, .amoforms-overlay, [id^="amoforms_"] {
          --amoforms-primary-color: #B4FF00 !important;
          font-family: 'Inter', sans-serif !important;
        }
        
        .amoforms-button {
          background-color: #B4FF00 !important;
          color: #0A0A0A !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
        }

        iframe[id^="amoforms_"] {
          background: transparent !important;
          border-radius: 12px !important;
        }
        
        .amoforms-modal-content {
          background-color: #0A0A0A !important;
          border: 1px solid rgba(180, 255, 0, 0.2) !important;
        }
      `}</style>
    </Section>
  );
}
