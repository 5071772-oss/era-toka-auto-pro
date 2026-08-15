import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { EXPERT, TELEGRAM_URL } from "@/lib/brand";
import { leadSchema } from "@/lib/leads.schema";
import { submitLead } from "@/lib/leads.functions";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, btnGhost, btnPrimary } from "./ui";

const fieldClass = (hasError?: boolean) =>
  `w-full rounded-md border ${
    hasError ? "border-destructive focus:ring-destructive" : "border-input focus:border-primary/60"
  } bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-steel focus:outline-none focus:ring-1 focus:ring-ring transition-colors`;

const labelClass = "mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground";

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const send = useServerFn(submitLead);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const raw = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
    };


    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string") {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrors({});
    try {
      await send({ data: parsed.data });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrors({ form: "Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram." });
    }
  }

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
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnGhost} mt-8`}
            >
              <Send className="size-4" aria-hidden="true" />
              Написать в Telegram
            </a>
          </div>
        </Reveal>

        <Reveal delay={80}>
          {status === "success" ? (
            <div className="glass flex h-full flex-col items-start justify-center rounded-xl p-8 sm:p-10">
              <CheckCircle2 className="size-8 text-primary" aria-hidden="true" />
              <p className="mt-5 text-xl font-semibold tracking-tight">
                Заявка отправлена. Алексей свяжется с вами по указанному контакту.
              </p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnGhost} mt-8`}
              >
                <Send className="size-4" aria-hidden="true" />
                Написать в Telegram
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="glass rounded-xl p-6 sm:p-8">
              <div className="grid gap-5">
                <div>
                  <label className={labelClass} htmlFor="name">
                    Имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    className={fieldClass(!!errors["name"])}
                    placeholder="Как к вам обращаться"
                  />
                  {errors["name"] && <p className="mt-1 text-[10px] uppercase text-destructive tracking-wider">{errors["name"]}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">
                    Телефон
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    maxLength={30}
                    className={fieldClass(!!errors["phone"])}
                    placeholder="+7 (999) 000-00-00"
                  />
                  {errors["phone"] && <p className="mt-1 text-[10px] uppercase text-destructive tracking-wider">{errors["phone"]}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Почта
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={120}
                    className={fieldClass(!!errors["email"])}
                    placeholder="example@mail.ru"
                  />
                  {errors["email"] && <p className="mt-1 text-[10px] uppercase text-destructive tracking-wider">{errors["email"]}</p>}
                </div>
              </div>


              {errors["form"] ? (
                <p role="alert" className="mt-5 text-sm text-destructive">
                  {errors["form"]}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className={`${btnPrimary} mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70`}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Отправляем…
                  </>
                ) : (
                  "Получить консультацию"
                )}
              </button>
              <p className="mt-4 text-center text-[10px] text-muted-foreground leading-relaxed">
                Нажимая кнопку «Получить консультацию», вы подтверждаете, что принимаете{" "}
                <a href="#" className="underline hover:text-primary transition-colors">пользовательское соглашение</a>, 
                даёте поручение и согласие на обработку персональных данных.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
