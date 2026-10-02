import type { ReactNode } from "react";
import { GOALS, reachGoal } from "@/lib/analytics";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[13px] font-semibold tracking-tight text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_20px_var(--neon-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-transparent px-5 py-2.5 text-[13px] font-medium tracking-tight text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export const btnSmall =
  "inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-[11px] font-medium tracking-tight text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-border/60 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function scrollToForm() {
  document.getElementById("zayavka")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function prefillModel(model: string) {
  reachGoal(model.includes("Подобрать аналог") ? GOALS.analogRequest : GOALS.priceRequest);
  window.dispatchEvent(new CustomEvent("era-toka:prefill", { detail: model }));
  scrollToForm();
}
