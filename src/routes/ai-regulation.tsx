import { createFileRoute } from '@tanstack/react-router';
import { LegalLayout } from '@/components/site/LegalLayout';
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
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">1. Общие положения</h2>
          <p>
            Настоящий Регламент устанавливает правила и ограничения при использовании инструментов искусственного интеллекта (ИИ) в деятельности Оператора.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">2. Принципы использования ИИ</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Прозрачность: Пользователь должен быть уведомлен о применении ИИ;</li>
            <li>Контроль: Все решения, принятые ИИ, проходят проверку человеком;</li>
            <li>Безопасность: Данные пользователей защищены от несанкционированного доступа.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">3. Персональные данные и ИИ</h2>
          <p>
            Запрещается загружать в публичные ИИ-сервисы (ChatGPT, Claude и др.) полные персональные данные клиентов без предварительного обезличивания. Требования к обезличиванию включают удаление ФИО, точных адресов и номеров документов.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">4. Ограничения функционала</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Запрет создания публичных ссылок на чаты с конфиденциальными данными;</li>
            <li>Запрет использования функции «Поделиться» для обсуждений, содержащих коммерческую тайну;</li>
            <li>Обязательное отключение функции обучения модели на пользовательских данных в настройках профиля.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">5. Разрешенные сервисы и хранение</h2>
          <p>
            К использованию разрешены только сервисы, прошедшие внутренний аудит безопасности. Все промежуточные данные ИИ хранятся в защищенном облачном контуре. В случае инцидента (утечки данных) Оператор обязан уведомить субъектов в течение 24 часов.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">6. Ответственность</h2>
          <p>
            Контроль соблюдения Регламента осуществляет лично Оператор. Нарушение правил влечет за собой ответственность в соответствии с законодательством РФ.
          </p>
        </section>
      </LegalLayout>
      <Footer />
    </>
  );
}
