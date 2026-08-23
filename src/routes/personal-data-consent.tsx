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
          <p className="mt-4 italic">
            Полный текст согласия на обработку персональных данных доступен по ссылке: <a href="https://disk.yandex.ru/i/mImMXJcvUB_sPw" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://disk.yandex.ru/i/mImMXJcvUB_sPw</a>
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-white/5 text-sm space-y-1">
          <p className="font-bold text-foreground">
</p>
          <p>
</p>
          <p>
</p>
          <p>
</p>
          <p className="mt-2">
</p>
          <p>
</p>
        </div>
      </LegalLayout>
      <Footer />
    </>
  );
}
