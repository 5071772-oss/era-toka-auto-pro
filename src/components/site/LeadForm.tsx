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
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    
    let res = "";
    if (digits.startsWith("7") || digits.startsWith("8")) {
      const main = digits.slice(1);
      res = "+7 ";
      if (main.length > 0) res += "(" + main.slice(0, 3);
      if (main.length > 3) res += ") " + main.slice(3, 6);
      if (main.length > 6) res += "-" + main.slice(6, 8);
      if (main.length > 8) res += "-" + main.slice(8, 10);
    } else {
      res = "+" + digits.slice(0, 15);
    }
    return res;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const model = (e as CustomEvent<string>).detail;
      if (model) setNote(`Интересует: ${model}`);
    };
    window.addEventListener("era-toka:prefill", onPrefill);
    return () => window.removeEventListener("era-toka:prefill", onPrefill);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);
    const name = String(data.get(FIELD_NAME) ?? "").trim();
    const phone = String(data.get(FIELD_PHONE) ?? "").trim();
    const email = String(data.get(FIELD_EMAIL) ?? "").trim();

    const next: Errors = {};

    // Name validation
    if (name.length < 2) {
      next.name = "Пожалуйста, введите ваше имя";
    }

    // Phone validation (more strict)
    // Russian phones typically have 11 digits (including country code) or 10 without.
    const digitsOnly = phone.replace(/\D/g, "");
    if (!digitsOnly) {
      next.phone = "Введите номер телефона";
    } else if (digitsOnly.length < 10) {
      next.phone = "Номер слишком короткий";
    } else if (digitsOnly.length > 12) {
      next.phone = "Номер слишком длинный";
    }

    // Email validation (strict)
    if (!email) {
      next.email = "Введите ваш e-mail";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
        email,
      )
    ) {
      next.email = "Некорректный формат e-mail";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      e.preventDefault();
      return;
    }

    // Small delay to ensure browser handles the action before UI swap
    setTimeout(() => setSent(true), 50);
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
                <iframe name="amo_sink" title="amo" className="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none" />
                <form
                  ref={formRef}
                  action={AMO_ACTION}
                  method="POST"
                  encType="application/x-www-form-urlencoded"
                  target="amo_sink"
                  noValidate
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form_id" value={AMO_FORM_ID} />
                  <input type="hidden" name="hash" value={AMO_HASH} />
                  <input type="hidden" name="user_origin" value='{"datetime":"Sun Aug 17 2026 09:33:00 GMT+0000","referer":""}' />

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
                      value={phone}
                      onChange={handlePhoneChange}
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

                  <button type="submit" className={`${btnPrimary} w-full`}>
                    Получить консультацию
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
