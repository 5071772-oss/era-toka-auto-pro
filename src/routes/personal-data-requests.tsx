import { createFileRoute } from '@tanstack/react-router';
import { LegalLayout } from '@/components/site/LegalLayout';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { Mail } from 'lucide-react';
import { btnPrimary } from '@/components/site/ui';

export const Route = createFileRoute('/personal-data-requests')({
  component: PersonalDataRequestsPage,
  head: () => ({
    title: 'Обращения по вопросам ПДн | ЭРА ТОКА',
    meta: [
      { name: 'description', content: 'Контакты для обращений по вопросам обработки персональных данных' },
    ],
  }),
});

function PersonalDataRequestsPage() {
  const email = "5071772@gmail.com";
  
  return (
    <>
      <Header />
      <LegalLayout title="Обращения по вопросам обработки персональных данных">
        <section className="space-y-6">
          <p className="text-lg">
            По вопросам обработки персональных данных, реализации прав субъекта персональных данных, отзыва согласия и направления иных обращений можно обратиться к Оператору.
          </p>

          <div className="space-y-4 not-prose mt-8">
            <div className="glass p-6 rounded-2xl border border-white/5 space-y-3">
              <p className="text-xs uppercase tracking-widest text-primary font-bold">Контактная информация</p>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Оператор:</span>
                  <span className="text-foreground">Самозанятый Николаев Алексей Викторович</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">ИНН:</span>
                  <span className="text-foreground">500101036007</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">E-mail:</span>
                  <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Почтовый адрес:</span>
                  <span className="text-foreground">143909, Московская область, г. Балашиха, Московский б-р, д. 1/13, кв. 215</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href={`mailto:${email}?subject=Обращение по вопросу персональных данных`}
                className={`${btnPrimary} inline-flex items-center gap-2 px-8 py-4 text-base`}
              >
                <Mail className="size-5" />
                Написать по вопросу обработки персональных данных
              </a>
            </div>
          </div>
        </section>
      </LegalLayout>
      <Footer />
    </>
  );
}
