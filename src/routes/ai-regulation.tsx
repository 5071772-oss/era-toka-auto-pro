import { createFileRoute } from '@tanstack/react-router';
import { LegalLayout } from '@/components/site/LegalLayout';
import { LegalSection } from '@/components/site/LegalSection';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';

export const Route = createFileRoute('/ai-regulation')({
  component: AiRegulationPage,
  head: () => ({
    title: 'Регламент использования ИИ | ЭРА ТОКА',
    meta: [
      { name: 'description', content: 'Регламент использования нейросетей и сервисов искусственного интеллекта в ЭРА ТОКА' },
    ],
  }),
});

function AiRegulationPage() {
  return (
    <>
      <Header />
      <LegalLayout title="Регламент использования нейросетей и сервисов искусственного интеллекта">
        <LegalSection title="1. Общие положения" defaultOpen>
          <p>
            Настоящий Регламент устанавливает правила и ограничения при использовании инструментов искусственного интеллекта (ИИ) в деятельности Оператора.
          </p>
        </LegalSection>

        <LegalSection title="2. Принципы использования ИИ">
          <ul className="list-disc pl-5 space-y-2">
            <li>Прозрачность: Пользователь должен быть уведомлен о применении ИИ;</li>
            <li>Контроль: Все решения, принятые ИИ, проходят проверку человеком;</li>
            <li>Безопасность: Данные пользователей защищены от несанкционированного доступа.</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Персональные данные и ИИ">
          <p>
            Запрещается загружать в публичные ИИ-сервисы (ChatGPT, Claude и др.) полные персональные данные клиентов без предварительного обезличивания. Требования к обезличиванию включают удаление ФИО, точных адресов и номеров документов.
          </p>
        </LegalSection>

        <LegalSection title="4. Ограничения функционала">
          <ul className="list-disc pl-5 space-y-2">
            <li>Запрет создания публичных ссылок на чаты с конфиденциальными данными;</li>
            <li>Запрет использования функции «Поделиться» для обсуждений, содержащих коммерческую тайну;</li>
            <li>Обязательное отключение функции обучения модели на пользовательских данных в настройках профиля.</li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Разрешенные сервисы и хранение">
          <p>
            К использованию разрешены только сервисы, прошедшие внутренний аудит безопасности. Все промежуточные данные ИИ хранятся в защищенном облачном контуре. В случае инцидента (утечки данных) Оператор обязан уведомить субъектов в течение 24 часов.
          </p>
        </LegalSection>

        <LegalSection title="6. Ответственность">
          <p>
            Контроль соблюдения Регламента осуществляет лично Оператор. Нарушение правил влечет за собой ответственность в соответствии с законодательством РФ.
          </p>
          <p className="mt-4 italic">
            Полный текст документа находится по адресу: <a href="https://disk.yandex.ru/i/tpZVqtW9utrjcw" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://disk.yandex.ru/i/tpZVqtW9utrjcw</a>
          </p>
        </LegalSection>
      </LegalLayout>
      <Footer />
    </>
  );
}
