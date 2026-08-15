import { useEffect, useRef, useState } from "react";
import { Send, Check } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost, btnPrimary } from "./ui";

const AMO_ACTION = "https://forms.amocrm.ru/queue/add";
const AMO_FORM_ID = "1738426";
const AMO_HASH = "d240b72cfd16ae50e8044e0f6730c9aa";
const FIELD_NAME = "fields[name_1]";
const FIELD_PHONE = "fields[985603_1][1442081]";
const FIELD_EMAIL = "fields[985605_1][1442093]";
const FIELD_NOTE = "fields[note_2]";

const inputClass =
  "w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/25";
const labelClass = "mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground";

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

export function LeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const [note, setNote] = useState("");

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const model = (e as CustomEvent<string>).detail;
      if (model) setNote(`Интересует: ${model}`);
    };
    window.addEventListener("era-toka:prefill", onPrefill);
    return () => window.removeEventListener("era-toka:prefill", onPrefill);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get(FIELD_NAME) ?? "").trim();
    const phone = String(data.get(FIELD_PHONE) ?? "").trim();
    const email = String(data.get(FIELD_EMAIL) ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Укажите имя";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Укажите корректный телефон";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Некорректный e-mail";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, String(value)));
    try {
      await fetch(AMO_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: body.toString(),
      });
      setSent(true);
    } catch {
      setErrors({ name: "Не удалось отправить. Напишите в Telegram." });
    } finally {
      setSending(false);
    }
  };


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
          <div className="glass rounded-xl border border-primary/20 bg-background/70 p-6 shadow-[0_0_60px_-30px_var(--neon-soft)] sm:p-8">
            {sent ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <span className="mb-5 flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-7" aria-hidden="true" />
                </span>
                <p className="text-xl font-semibold tracking-tight">Заявка отправлена</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {EXPERT} свяжется с вами в ближайшее рабочее время. Для быстрого ответа напишите в
                  Telegram.
                </p>
              </div>
            ) : (
              <>
                <form
                  ref={formRef}
                  action={AMO_ACTION}
                  method="POST"
                  noValidate
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  <input type="hidden" name="form_id" value={AMO_FORM_ID} />
                  <input type="hidden" name="hash" value={AMO_HASH} />
                  <input type="hidden" name="user_origin" value="" />

                  <div>
                    <label className={labelClass} htmlFor="lead-name">
                      Имя
                    </label>
                    <input
                      id="lead-name"
                      name={FIELD_NAME}
                      type="text"
                      autoComplete="name"
                      placeholder="Как к вам обращаться"
                      className={`${inputClass} ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name ? (
                      <p className="mt-2 text-xs text-destructive">{errors.name}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="lead-phone">
                      Телефон
                    </label>
                    <input
                      id="lead-phone"
                      name={FIELD_PHONE}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+7 (900) 000-00-00"
                      className={`${inputClass} ${errors.phone ? "border-destructive" : ""}`}
                    />
                    {errors.phone ? (
                      <p className="mt-2 text-xs text-destructive">{errors.phone}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="lead-email">
                      E-mail
                    </label>
                    <input
                      id="lead-email"
                      name={FIELD_EMAIL}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={`${inputClass} ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email ? (
                      <p className="mt-2 text-xs text-destructive">{errors.email}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="lead-note">
                      Комментарий
                    </label>
                    <textarea
                      id="lead-note"
                      name={FIELD_NOTE}
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Модель, бюджет, сроки — по желанию"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button type="submit" disabled={sending} className={`${btnPrimary} w-full disabled:opacity-60`}>
                    {sending ? "Отправляем…" : "Получить консультацию"}
                  </button>


                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных и принимаете
                    пользовательское соглашение.
                  </p>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
