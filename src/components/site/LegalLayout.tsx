import * as React from 'react';
import { SectionHeading, Reveal } from './ui';

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-primary">
              {title}
            </h1>
            <div className="h-1 w-20 bg-primary/20 rounded-full" />
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <div className="glass p-8 sm:p-12 rounded-3xl border border-white/5 prose prose-invert prose-primary max-w-none text-muted-foreground leading-relaxed space-y-8">
            {children}
          </div>
        </Reveal>
        
        <Reveal delay={200}>
          <div className="mt-12 p-6 glass border border-primary/10 rounded-2xl bg-primary/5">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Оператор сайта</p>
            <div className="text-sm text-foreground/80 space-y-1">
              <p>Самозанятый Николаев Алексей Викторович</p>
              <p>ИНН: 500101036007</p>
              <p>Адрес: 143909, Московская область, г. Балашиха, Московский б-р, д. 1/13, кв. 215</p>
              <p>E-mail: 5071772@gmail.com</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
