import { createFileRoute } from '@tanstack/react-router';
import { LegalLayout } from '@/components/site/LegalLayout';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
  head: () => ({
    title: 'Политика обработки персональных данных | ЭРА ТОКА',
    meta: [
      { name: 'description', content: 'Политика в отношении обработки персональных данных Оператора ЭРА ТОКА' },
    ],
  }),
});

function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <LegalLayout title="Политика обработки персональных данных">
        <div className="text-sm space-y-2 mb-8 border-b border-white/5 pb-8">
          <p className="font-bold text-foreground">Самозанятый Николаев Алексей Викторович</p>
          <p>ИНН 500101036007</p>
          <p className="mt-4 text-muted-foreground">Дата редакции документа: 22 августа 2026 года</p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Общие положения</h2>
          <p>
            Настоящая Политика обработки персональных данных (всегда далее далее – «Политика») разработана в соответствии с законодательством Российской Федерации (Федеральный закон от 27 июля 2006 г. № 152-ФЗ «О персональных данных») и определяет порядок, условия обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые Оператором.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Принципы обработки персональных данных</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Законность и справедливая основа обработки;</li>
            <li>Ограничение обработки достижением конкретных, заранее определенных и законных целей;</li>
            <li>Недопущение обработки персональных данных, несовместимой с целями сбора данных;</li>
            <li>Соответствие содержания и объема обрабатываемых данных заявленным целям обработки;</li>
            <li>Обеспечение точности, достаточности и актуальности данных.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Объем обрабатываемых данных</h2>
          <p>Оператор обрабатывает следующие категории данных:</p>
          <table className="w-full border-collapse border border-white/10 mt-4">
            <thead>
              <tr className="bg-white/5">
                <th className="border border-white/10 p-2 text-left">Категория</th>
                <th className="border border-white/10 p-2 text-left">Пример данных</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white/10 p-2 text-muted-foreground">Основные данные</td>
                <td className="border border-white/10 p-2">Имя, Фамилия</td>
              </tr>
              <tr>
                <td className="border border-white/10 p-2 text-muted-foreground">Контактные данные</td>
                <td className="border border-white/10 p-2">Номер телефона, E-mail</td>
              </tr>
              <tr>
                <td className="border border-white/10 p-2 text-muted-foreground">Технические данные</td>
                <td className="border border-white/10 p-2">IP-адрес, cookie, данные об устройстве</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Права субъекта персональных данных</h2>
          <p>Пользователь имеет право:</p>
          <ul className="list-decimal pl-5 space-y-2">
            <li>Получать информацию, касающуюся обработки его персональных данных;</li>
            <li>Требовать уточнения, блокирования или уничтожения своих данных;</li>
            <li>Отозвать согласие на обработку персональных данных;</li>
            <li>Обжаловать действия или бездействие Оператора в уполномоченный орган.</li>
          </ul>
        </section>
        
        <section className="mt-12 pt-8 border-t border-white/10">
          <p className="text-foreground font-medium">
            Полный текст политики обработки персональных данных находится по ссылке:{'\u00a0'}
            <a 
              href="https://disk.yandex.ru/i/lhREyTK3Ir6KFw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4 decoration-primary/30 transition-all"
            >
              Скачать документ (Yandex Disk)
            </a>
          </p>
        </section>
      </LegalLayout>
      <Footer />
    </>
  );
}
