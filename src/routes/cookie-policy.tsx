import { createFileRoute } from '@tanstack/react-router';
import { LegalLayout } from '@/components/site/LegalLayout';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';

export const Route = createFileRoute('/cookie-policy')({
  component: CookiePolicyPage,
  head: () => ({
    title: 'Политика использования файлов cookie | ЭРА ТОКА',
    meta: [
      { name: 'description', content: 'Информация об использовании файлов cookie на сайте ЭРА ТОКА' },
    ],
  }),
});

function CookiePolicyPage() {
  return (
    <>
      <Header />
      <LegalLayout title="Политика использования файлов cookie">
        <section>
          <h3 className="text-lg font-bold text-foreground mb-2">Что такое cookie?</h3>
          <p>
            Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайта. Они помогают сайту запоминать информацию о вас, например, выбранный язык или настройки фильтров в каталоге.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-foreground mb-4">Категории используемых cookie</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-primary font-bold">1. Необходимые cookie</h4>
              <p className="text-sm">Обеспечивают базовую функциональность сайта и безопасность. Без них сайт не сможет работать корректно.</p>
            </div>
            <div>
              <h4 className="text-primary font-bold">2. Функциональные cookie</h4>
              <p className="text-sm">Позволяют запоминать ваш выбор (например, регион или параметры поиска авто) для более удобного использования.</p>
            </div>
            <div>
              <h4 className="text-primary font-bold">3. Аналитические cookie</h4>
              <p className="text-sm">Используются для сбора информации о том, как посетители взаимодействуют с сайтом, какие страницы наиболее популярны.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-foreground mb-2">Назначение аналитики и технические данные</h3>
          <p>
            Мы обрабатываем технические данные (IP-адрес, тип браузера, время доступа) для улучшения производительности сайта и защиты от спама в формах обратной связи.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-foreground mb-2">Изменение настроек</h3>
          <p>
            Вы можете отключить cookie в настройках своего браузера. Обратите внимание, что это может привести к частичной потере функциональности сайта.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-foreground mb-2">Используемые сервисы</h3>
          <p>На текущий момент сайт использует встроенные технические средства аналитики Lovable для мониторинга работоспособности интерфейса. Сторонние рекламные пиксели не подключены.</p>
        </section>
      </LegalLayout>
      <Footer />
    </>
  );
}
