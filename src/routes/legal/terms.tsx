import { createFileRoute } from '@tanstack/react-router';
import { LegalLayout } from '@/components/site/LegalLayout';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';

export const Route = createFileRoute('/legal/terms')({
  component: TermsPage,
  head: () => ({
    title: 'Пользовательское соглашение | ЭРА ТОКА',
    meta: [
      { name: 'description', content: 'Пользовательское соглашение и условия использования сервиса ЭРА ТОКА' },
    ],
  }),
});

function TermsPage() {
  return (
    <>
      <Header />
      <LegalLayout title="Пользовательское соглашение">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">1. Предмет соглашения</h2>
          <p>
            Данное соглашение регулирует отношения между Пользователем и Оператором сайта «ЭРА ТОКА» по использованию информационных ресурсов сайта и получению услуг.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">2. Виды оказываемых услуг</h2>
          <p>Сайт оказывает информационные и консультационные услуги по:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Подбору автомобилей;</li>
            <li>Покупке автомобилей;</li>
            <li>Организации доставки автомобилей из Японии, Китая, Кореи, США, ОАЭ и других стран;</li>
            <li>Консультационным услугам по вопросам импорта транспортных средств.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">3. Согласие на обработку данных</h2>
          <p>
            Заполняя любую форму на сайте или нажимая кнопку «Получить консультацию» / «Продолжить», Пользователь выражает свое полное и безоговорочное согласие на обработку его персональных данных, а также на получение информационных сообщений в указанных мессенджерах или по телефону.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">4. Отказ от ответственности</h2>
          <p>
            Информация о стоимости, комплектации и сроках поставки автомобилей носит справочный характер. Окончательные условия фиксируются в индивидуальном договоре (контракте купли-продажи).
          </p>
        </section>
      </LegalLayout>
      <Footer />
    </>
  );
}
