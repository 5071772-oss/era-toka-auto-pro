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
  const [model, setModel] = useState("");

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === "string") setModel(detail);
    };
    window.addEventListener("era-toka:prefill", handler);
    return () => window.removeEventListener("era-toka:prefill", handler);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const raw = {
      name: String(formData.get("name") ?? ""),
      contact: String(formData.get("contact") ?? ""),
      city: String(formData.get("city") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      carType: String(formData.get("carType") ?? ""),
      model: String(formData.get("model") ?? ""),
      condition: String(formData.get("condition") ?? ""),
      dailyMileage: String(formData.get("dailyMileage") ?? ""),
      charging: String(formData.get("charging") ?? ""),
      comment: String(formData.get("comment") ?? ""),
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
              <div className="grid gap-5 sm:grid-cols-2">
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
                  <label className={labelClass} htmlFor="contact">
                    Телефон или Telegram
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    required
                    maxLength={120}
                    className={fieldClass(!!errors["contact"])}
                    placeholder="+7… или @username"
                  />
                  {errors["contact"] && <p className="mt-1 text-[10px] uppercase text-destructive tracking-wider">{errors["contact"]}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="city">
                    Город
                  </label>
                  <input id="city" name="city" maxLength={100} className={fieldClass(!!errors["city"])} placeholder="Москва" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="budget">
                    Бюджет
                  </label>
                  <input id="budget" name="budget" maxLength={100} className={fieldClass(!!errors["budget"])} placeholder="Ориентир по бюджету" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="carType">
                    Тип автомобиля
                  </label>
                  <select id="carType" name="carType" defaultValue="пока не знаю" className={fieldClass()}>
                    <option value="электромобиль">электромобиль</option>
                    <option value="гибрид">гибрид</option>
                    <option value="пока не знаю">пока не знаю</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="model">
                    Желаемая модель
                  </label>
                  <input
                    id="model"
                    name="model"
                    maxLength={150}
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className={fieldClass()}
                    placeholder="Если есть предпочтения"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="condition">
                    Новый автомобиль или с пробегом
                  </label>
                  <select id="condition" name="condition" defaultValue="не определился" className={fieldClass()}>
                    <option value="новый">новый</option>
                    <option value="с пробегом">с пробегом</option>
                    <option value="не определился">не определился</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="dailyMileage">
                    Средний пробег в день
                  </label>
                  <input id="dailyMileage" name="dailyMileage" maxLength={60} className={fieldClass()} placeholder="Например, 60 км" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="charging">
                    Есть ли зарядка дома или на работе
                  </label>
                  <select id="charging" name="charging" defaultValue="не знаю" className={fieldClass()}>
                    <option value="есть дома">есть дома</option>
                    <option value="есть на работе">есть на работе</option>
                    <option value="нет">нет</option>
                    <option value="не знаю">не знаю</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="comment">
                    Комментарий
                  </label>
                  <textarea id="comment" name="comment" rows={4} maxLength={1000} className={fieldClass()} placeholder="Задачи, маршруты, пожелания" />
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
