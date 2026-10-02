import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Send, Check } from "lucide-react";
import { EXPERT, MESSENGER_MAX_URL, TELEGRAM_URL } from "@/lib/brand";
import { Reveal } from "./Reveal";
import { GOALS, reachGoal } from "@/lib/analytics";
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
const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground";

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

export function LeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [consent, setConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const consentVersion = "22.08.2026";
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

    if (!consent) {
      alert("Необходимо дать согласие на обработку персональных данных");
      return;
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, String(value)));

    const currentNote = body.get(FIELD_NOTE) || "";
    const consentDetails = [
      `[Согласие на обработку ПДн: Да]`,
      `[Версия согласия: ${consentVersion}]`,
      `[Дата и время согласия: ${new Date().toISOString()}]`,
      `[Форма: Заявка на консультацию]`,
      marketingConsent ? "[Согласие на маркетинг: Да]" : "[Согласие на маркетинг: Нет]",
    ].join("\n");
    body.set(FIELD_NOTE, `${currentNote}\n${consentDetails}`.trim());

    try {
      await fetch(AMO_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: body.toString(),
      });
      reachGoal(GOALS.formSent);
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                <Send className="size-4" aria-hidden="true" />
                Написать в Telegram
              </a>
              <a
                href={MESSENGER_MAX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhost}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Написать в Max
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
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "lead-name-error" : undefined}
                      className={`${inputClass} ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name ? (
                      <p id="lead-name-error" className="mt-2 text-xs text-destructive">
                        {errors.name}
                      </p>
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
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                      className={`${inputClass} ${errors.phone ? "border-destructive" : ""}`}
                    />
                    {errors.phone ? (
                      <p id="lead-phone-error" className="mt-2 text-xs text-destructive">
                        {errors.phone}
                      </p>
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
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "lead-email-error" : undefined}
                      className={`${inputClass} ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email ? (
                      <p id="lead-email-error" className="mt-2 text-xs text-destructive">
                        {errors.email}
                      </p>
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

                  <div className="flex items-start gap-3 py-2">
                    <input
                      id="consent-checkbox"
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 size-4 rounded border-border bg-background/60 text-primary transition-colors focus:ring-2 focus:ring-primary/25"
                    />
                    <label
                      htmlFor="consent-checkbox"
                      className="text-xs leading-relaxed text-muted-foreground cursor-pointer"
                    >
                      Я даю согласие на обработку моих персональных данных на условиях{" "}
                      <Link
                        to="/personal-data-consent"
                        className="text-primary underline hover:text-primary/80 transition-colors"
                      >
                        Согласия на обработку персональных данных
                      </Link>
                      .
                    </label>
                  </div>

                  <div className="flex items-start gap-3 py-2">
                    <input
                      id="marketing-checkbox"
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-1 size-4 rounded border-border bg-background/60 text-primary transition-colors focus:ring-2 focus:ring-primary/25"
                    />
                    <label
                      htmlFor="marketing-checkbox"
                      className="text-xs leading-relaxed text-muted-foreground cursor-pointer"
                    >
                      Я согласен получать рекламные и информационные сообщения от Николаева Алексея
                      Викторовича на условиях{" "}
                      <Link
                        to="/marketing-consent"
                        className="text-primary underline hover:text-primary/80 transition-colors"
                      >
                        Согласия на рекламу
                      </Link>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={sending || !consent}
                    className={`${btnPrimary} w-full disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {sending ? "Отправляем…" : "Получить консультацию"}
                  </button>

                  <p className="text-[10px] leading-relaxed text-muted-foreground/60">
                    Нажимая кнопку «Получить консультацию», вы подтверждаете предоставление согласия
                    на обработку персональных данных на условиях{" "}
                    <Link
                      to="/personal-data-consent"
                      className="underline hover:text-primary transition-colors"
                    >
                      Согласия на обработку персональных данных
                    </Link>{" "}
                    и ознакомление с{" "}
                    <Link
                      to="/privacy-policy"
                      className="underline hover:text-primary transition-colors"
                    >
                      Политикой обработки персональных данных
                    </Link>
                    .
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
