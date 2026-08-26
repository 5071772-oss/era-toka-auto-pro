import { createFileRoute } from '@tanstack/react-router';
import { LegalLayout } from '@/components/site/LegalLayout';
import { LegalSection } from '@/components/site/LegalSection';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';

export const Route = createFileRoute('/marketing-consent')({
  component: MarketingConsentPage,
  head: () => ({
    title: 'Согласие на получение рекламных сообщений | ЭРА ТОКА',
    meta: [
      { name: 'description', content: 'Согласие на получение рекламных и информационных сообщений от ЭРА ТОКА' },
    ],
  }),
});

function MarketingConsentPage() {
  return (
    <>
      <Header />
      <LegalLayout title="Согласие на получение рекламных и информационных сообщений">
        <LegalSection title="Назначение согласия" defaultOpen>
          <p>
            Настоящее согласие дает Оператору право направлять Пользователю информацию о новых предложениях, акциях, услугах и новостях в сфере импорта автомобилей.
          </p>
        </LegalSection>

        <LegalSection title="Способы получения рекламы">
          <ul className="list-disc pl-5 space-y-2">
            <li>SMS-сообщения;</li>
            <li>Звонки на указанный номер телефона;</li>
            <li>Сообщения в мессенджерах (Telegram, Max, WhatsApp);</li>
            <li>Электронная почта (e-mail рассылки).</li>
          </ul>
        </LegalSection>

        <LegalSection title="Виды сообщений">
          <ul className="list-disc pl-5 space-y-2">
            <li>Информационные дайджесты о рынке авто;</li>
            <li>Рекламные предложения по конкретным моделям;</li>
            <li>Приглашения к участию в специальных программах подбора.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Отзыв согласия">
          <p>
            Вы имеете право в любой момент отозвать данное согласие. Для этого необходимо направить уведомление на e-mail Оператора с темой «Отзыв согласия на рассылку». Обработка запроса занимает до 3-х рабочих дней.
          </p>
        </LegalSection>

        <div className="mt-12 pt-8 border-t border-white/5 text-sm space-y-1">
          <p className="font-bold text-foreground">Реквизиты Оператора:</p>
          <p>Самозанятый Николаев Алексей Викторович</p>
          <p>ИНН: 500101036007</p>
          <p>E-mail: 5071772@gmail.com</p>
        </div>
      </LegalLayout>
      <Footer />
    </>
  );
}
