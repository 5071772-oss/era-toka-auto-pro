import * as React from 'react';
import { ChevronDown } from 'lucide-react';

interface LegalSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

/**
 * Раскрывающийся раздел юридического документа.
 * Заголовок всегда виден, содержимое разворачивается по клику.
 */
export function LegalSection({ title, defaultOpen = false, children }: LegalSectionProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const id = React.useId();

  return (
    <section className="border-b border-white/10 last:border-b-0">
      <h2 className="m-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-start justify-between gap-6 py-5 text-left text-lg sm:text-xl font-bold text-foreground transition-colors hover:text-primary"
        >
          <span className="text-pretty">{title}</span>
          <ChevronDown
            aria-hidden="true"
            className={`mt-1 size-5 shrink-0 text-primary transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h2>
      <div
        id={id}
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-6 space-y-4">{children}</div>
        </div>
      </div>
    </section>
  );
}
