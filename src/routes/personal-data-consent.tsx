import { createFileRoute } from '@tanstack/react-router';
import { LegalLayout } from '@/components/site/LegalLayout';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';

export const Route = createFileRoute('/personal-data-consent')({
  component: PersonalDataConsentPage,
  head: () => ({
    title: 'Согласие на обработку персональных данных | ЭРА ТОКА',
    meta: [
      { name: 'description', content: 'Согласие на обработку персональных данных для пользователей сайта ЭРА ТОКА' },
    ],
  }),
});

function PersonalDataConsentPage() {
  return (
    <>
      <Header />
      <LegalLayout title="Согласие на обработку персональных данных">
        <section>
          <p>
            Я, заполняя форму на сайте https://era-toka-auto-pro.lovable.app, даю свое согласие Самозанятому Николаеву Алексею Викторовичу на обработку моих персональных данных, указанных при заполнении веб-формы, а также технической информации, автоматически передаваемой устройством.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-foreground mb-2">Цели обработки:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Осуществление обратной связи, включая направление уведомлений, запросов, касающихся использования сайта и оказания услуг;</li>
            <li>Предоставление консультаций по вопросам подбора, покупки и доставки автомобилей;</li>
            <li>Улучшение качества работы сайта и пользовательского опыта;</li>
            <li>Проведение статистических и иных исследований на основе обезличенных данных.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-bold text-foreground mb-2">Перечень действий:</h3>
          <p>
            Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-foreground mb-2">Срок действия:</h3>
          <p>
            Настоящее согласие действует с момента его предоставления до дня его отзыва мною в письменной форме или по электронной почте Оператора.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-white/5 text-sm space-y-1">
          <p className="font-bold text-foreground">Оператор:</p>
          <p>Самозанятый Николаев Алексей Викторович</p>
          <p>ИНН: 500101036007</p>
          <p>E-mail: 5071772@gmail.com</p>
          <p className="mt-2">Адрес:</p>
          <p>143909, Московская область, г. Балашиха, Московский б-р, д. 1/13, кв. 215</p>
        </div>
      </LegalLayout>
      <Footer />
    </>
  );
}
