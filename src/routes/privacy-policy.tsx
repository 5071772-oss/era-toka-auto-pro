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
          <p className="whitespace-pre-line">
            1.1. Настоящая Политика обработки персональных данных определяет порядок обработки и обеспечения безопасности персональных данных, осуществляемых Николаевым Алексеем Викторовичем, являющимся плательщиком налога на профессиональный доход, далее — Оператор.{'\u00a0'}

            1.2. Настоящая Политика разработана в соответствии с Конституцией Российской Федерации, Федеральным законом от 27 июля 2006 года № 152-ФЗ «О персональных данных», иными федеральными законами и нормативными правовыми актами Российской Федерации в области персональных данных.{'\u00a0'}

            1.3. При обработке персональных данных Оператор руководствуется действующей редакцией Федерального закона от 27 июля 2006 года № 152-ФЗ «О персональных данных», включая положения статьи 12 с учетом изменений, внесенных Федеральным законом от 26 июля 2026 года № 265-ФЗ, а также требованиями статей 18.1, 19 и 22 Федерального закона № 152-ФЗ.{'\u00a0'}

            1.4. Настоящая Политика применяется ко всей информации, которую Оператор может получить о субъектах персональных данных при использовании сайта: https://auto-prestige-alchemy.relaxdev.ru/ а также при обращении к Оператору посредством телефонной связи, электронной почты, мессенджеров, социальных сетей и иных используемых Оператором каналов связи.{'\u00a0'}

            1.5. Настоящая Политика является общедоступным документом и размещается в свободном доступе на сайте Оператора.{'\u00a0'}

            1.6. Оператор принимает необходимые и достаточные правовые, организационные и технические меры для обеспечения выполнения обязанностей, предусмотренных законодательством Российской Федерации о персональных данных.{'\u00a0'}

            1.7. Настоящая Политика не заменяет собой согласие субъекта персональных данных в случаях, когда получение такого согласия требуется законодательством Российской Федерации.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Сведения об Операторе</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li className="whitespace-pre-line">
              Полное наименование: Самозанятый Николаев Алексей Викторович.
              Краткое наименование: СМЗ Николаев А. В.
              ИНН: 500101036007.
              Адрес Оператора: 143909, Московская область, г. Балашиха, Московский б-р, д. 1/13, кв. 215.
              Адрес сайта: https://auto-prestige-alchemy.relaxdev.ru/
              Адрес электронной почты для обращений по вопросам обработки персональных данных: 5071772@gmail.com.
              Оператор: Николаев Алексей Викторович.
              Лицо, ответственное за организацию обработки персональных данных: Николаев Алексей Викторович, самостоятельно.
            </li>
            <li>{'\n'}</li>
            <li>{'\n'}</li>
            <li>{'\n'}</li>
            <li>{'\n'}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Основные понятия</h2>
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
