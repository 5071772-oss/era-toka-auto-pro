import { createFileRoute } from '@tanstack/react-router';
import { LegalLayout } from '@/components/site/LegalLayout';
import { LegalSection } from '@/components/site/LegalSection';
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
        <div className="text-sm space-y-2 mb-8 border-b border-white/5 pb-8">
          <p className="font-bold text-foreground">Редакция от 22 августа 2026 года</p>
          <p className="text-muted-foreground">Настоящее согласие является отдельным документом, выражающим волю субъекта персональных данных на обработку его персональных данных Самозанятым Николаевым Алексеем Викторовичем, ИНН 500101036007, далее — Оператор.</p>
        </div>

        <LegalSection title="Сведения об Операторе" defaultOpen>
          <ul className="list-none space-y-3">
            <li className="text-sm">
              <span className="text-foreground font-medium block mb-1">Оператор:</span>
              <span className="text-muted-foreground">Самозанятый Николаев Алексей Викторович</span>
            </li>
            <li className="text-sm">
              <span className="text-foreground font-medium block mb-1">ИНН:</span>
              <span className="text-muted-foreground">500101036007</span>
            </li>
            <li className="text-sm">
              <span className="text-foreground font-medium block mb-1">Адрес:</span>
              <span className="text-muted-foreground">143909, Московская область, г. Балашиха, Московский б-р, д. 1/13, кв. 215</span>
            </li>
            <li className="text-sm">
              <span className="text-foreground font-medium block mb-1">Сайт:</span>
              <span className="text-muted-foreground"><a href="https://auto-prestige-alchemy.relaxdev.ru/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://auto-prestige-alchemy.relaxdev.ru/</a></span>
            </li>
            <li className="text-sm">
              <span className="text-foreground font-medium block mb-1">Адрес электронной почты:</span>
              <span className="text-muted-foreground"><a href="mailto:5071772@gmail.com" className="text-primary hover:underline">5071772@gmail.com</a></span>
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Предоставление согласия" defaultOpen>
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              Я, действуя свободно, своей волей и в своем интересе, настоящим даю согласие Самозанятому Николаеву Алексею Викторовичу на обработку моих персональных данных на условиях настоящего согласия и Политики обработки персональных данных.
            </p>
            <p className="text-muted-foreground">
              Согласие предоставляется путем совершения мной отдельного однозначного действия, подтверждающего мою волю на обработку персональных данных, в том числе путем установки соответствующего незаполненного заранее флажка (чекбокса) в форме на сайте и последующей отправки формы.
            </p>
            <p className="text-muted-foreground">
              Согласие не считается предоставленным, если соответствующий чекбокс был установлен Оператором заранее либо если пользователь не совершил самостоятельного действия, позволяющего подтвердить его волю.
            </p>
          </div>
        </LegalSection>

        <LegalSection title="Перечень персональных данных">
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              В зависимости от конкретной формы обращения и предоставленной субъектом информации Оператор вправе обрабатывать:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>имя, фамилию, отчество</li>
              <li>номер телефона</li>
              <li>адрес электронной почты</li>
              <li>сведения, содержащиеся в обращении, заявке, сообщении или комментарии</li>
              <li>сведения о требуемом автомобиле (марка, модель, год выпуска, технические характеристики)</li>
              <li>сведения о предполагаемом бюджете</li>
              <li>иные персональные данные, добровольно предоставленные субъектом персональных данных</li>
            </ul>
            <p className="text-muted-foreground italic mt-4 text-xs">
              Оператор не запрашивает и не обрабатывает посредством стандартных форм сайта специальные категории персональных данных, касающиеся расовой или национальной принадлежности, политических взглядов, религиозных или философских убеждений, состояния здоровья или интимной жизни. Оператор не осуществляет обработку биометрических персональных данных.
            </p>
          </div>
        </LegalSection>

        <LegalSection title="Цели обработки персональных данных">
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              Персональные данные обрабатываются для следующих конкретных целей:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>приема и обработки обращения</li>
              <li>рассмотрения заявки</li>
              <li>связи с субъектом персональных данных по оставленной заявке</li>
              <li>предоставления консультации</li>
              <li>подбора автомобиля в соответствии с указанными параметрами</li>
              <li>подготовки предложения по приобретению автомобиля</li>
              <li>консультирования по вопросам приобретения и доставки автомобиля</li>
              <li>организации дальнейшего взаимодействия с клиентом</li>
              <li>заключения и исполнения договора</li>
              <li>предоставления запрошенной информации</li>
              <li>обеспечения функционирования форм сайта</li>
            </ul>
          </div>
        </LegalSection>

        <LegalSection title="Действия с персональными данными">
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              Согласие предоставляется на совершение следующих действий с персональными данными:
            </p>
            <div className="grid grid-cols-2 gap-2 text-muted-foreground">
              <div>• сбор</div>
              <div>• запись</div>
              <div>• систематизация</div>
              <div>• накопление</div>
              <div>• хранение</div>
              <div>• уточнение</div>
              <div>• извлечение</div>
              <div>• использование</div>
              <div>• предоставление</div>
              <div>• блокирование</div>
              <div>• удаление</div>
              <div>• уничтожение</div>
              <div>• обезличивание</div>
            </div>
            <p className="text-muted-foreground italic text-xs pt-2">
              Обработка может осуществляться как с использованием средств автоматизации, так и без использования средств автоматизации.
            </p>
          </div>
        </LegalSection>

        <LegalSection title="Способы обработки">
          <div className="space-y-3 text-sm">
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>путем получения данных из заполненных субъектом форм на сайте</li>
              <li>путем получения данных из электронных сообщений</li>
              <li>путем получения данных в телефонных обращениях</li>
              <li>путем получения данных при взаимодействии посредством используемых Оператором мессенджеров и социальных сетей</li>
              <li>путем внесения данных в информационные системы и программные сервисы</li>
              <li>путем хранения и обработки данных на электронных и иных носителях</li>
            </ul>
          </div>
        </LegalSection>

        <LegalSection title="Получатели и обработчики персональных данных">
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              Для достижения указанных целей Оператор вправе использовать информационные системы и сервисы. В настоящее время Оператор использует или планирует использовать:
            </p>
            <div className="flex flex-wrap gap-2">
              {['amoCRM', 'Telegram', 'MAX', 'VK', 'Lovable'].map((service) => (
                <span key={service} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
                  {service}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground text-xs italic pt-2">
              Передача персональных данных каждому конкретному сервису осуществляется только в пределах, необходимых для соответствующей цели, и при наличии соответствующего правового основания.
            </p>
          </div>
        </LegalSection>

        <LegalSection title="Трансграничная передача">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Оператор не рассматривает настоящее согласие как самостоятельное разрешение на неограниченную трансграничную передачу персональных данных.
            </p>
            <p>
              Если использование конкретного информационного сервиса предполагает трансграничную передачу персональных данных, такая передача осуществляется только при соблюдении требований статьи 12 Федерального закона от 27 июля 2006 года № 152-ФЗ «О персональных данных».
            </p>
          </div>
        </LegalSection>

        <LegalSection title="Срок действия согласия">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Настоящее согласие действует до достижения целей обработки персональных данных либо до его отзыва субъектом персональных данных, если иное основание для продолжения обработки не предусмотрено законодательством Российской Федерации.
            </p>
            <p>
              После достижения целей обработки Оператор прекращает обработку и уничтожает персональные данные либо обеспечивает их обезличивание, если дальнейшее хранение не требуется законодательством Российской Федерации.
            </p>
          </div>
        </LegalSection>

        <LegalSection title="Отзыв согласия">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Субъект персональных данных вправе отозвать настоящее согласие, направив отзыв по электронной почте:
            </p>
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
              <a href="mailto:5071772@gmail.com" className="text-primary hover:underline font-medium">
                5071772@gmail.com
              </a>
            </div>
            <p>
              или по почтовому адресу:
            </p>
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg text-sm">
              <p>143909, Московская область</p>
              <p>г. Балашиха, Московский б-р, д. 1/13, кв. 215</p>
            </div>
            <p className="italic text-xs pt-2">
              После получения отзыва Оператор прекращает обработку персональных данных. Отзыв согласия не влияет на законность обработки, осуществленной до его отзыва.
            </p>
          </div>
        </LegalSection>

        <LegalSection title="Права субъекта персональных данных">
          <div className="space-y-3 text-sm">
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>получать сведения об обработке своих персональных данных</li>
              <li>требовать уточнения своих персональных данных</li>
              <li>требовать блокирования или уничтожения персональных данных</li>
              <li>отозвать настоящее согласие</li>
              <li>требовать прекращения обработки персональных данных</li>
              <li>обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке</li>
            </ul>
          </div>
        </LegalSection>

        <LegalSection title="Согласие на рекламу">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="font-bold text-foreground">
              Настоящее согласие не является согласием на получение рекламы.
            </p>
            <p>
              Согласие на получение рекламных и информационных сообщений оформляется отдельно. Отсутствие согласия на получение рекламных сообщений не препятствует направлению заявки, получению консультации, получению ответа на обращение, подбору автомобиля или получению информации, непосредственно связанной с обращением субъекта персональных данных.
            </p>
          </div>
        </LegalSection>

        <LegalSection title="Контактная информация Оператора">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
              <p className="text-foreground font-bold mb-2">Основные контакты</p>
              <p className="text-muted-foreground mb-2">Самозанятый Николаев Алексей Викторович</p>
              <p className="text-muted-foreground">ИНН: 500101036007</p>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
              <p className="text-foreground font-bold mb-2">По вопросам данных</p>
              <p className="text-muted-foreground mb-1">
                <a href="mailto:5071772@gmail.com" className="text-primary hover:underline">
                  5071772@gmail.com
                </a>
              </p>
              <p className="text-muted-foreground text-xs italic">Обратитесь с вопросами по обработке данных</p>
            </div>
          </div>
        </LegalSection>

        <LegalSection title="Согласие через форму сайта">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>Для использования настоящего согласия в формах сайта применяется обязательный чекбокс:</p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-foreground">☐ Я даю согласие на обработку моих персональных данных на условиях Согласия на обработку персональных данных.</div>
            <p>Ссылка на полный текст согласия должна вести на настоящий документ. Чекбокс не должен быть предварительно отмечен и должен подтверждаться самостоятельным действием пользователя.</p>
            <p>Согласие на получение рекламных и информационных сообщений оформляется отдельно и не является обязательным условием отправки основной заявки.</p>
          </div>
        </LegalSection>

        <LegalSection title="Подтверждение предоставления согласия">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Факт предоставления согласия может подтверждаться Оператором посредством фиксации:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>даты и времени предоставления согласия;</li>
              <li>формы сайта, через которую оно предоставлено;</li>
              <li>версии текста согласия, действовавшей на момент предоставления;</li>
              <li>технических данных, позволяющих подтвердить совершение соответствующего действия;</li>
              <li>содержания направленной формы.</li>
            </ul>
          </div>
        </LegalSection>

        <LegalSection title="Заключительные положения">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Настоящее согласие применяется к персональным данным, предоставленным субъектом непосредственно Оператору в связи с соответствующим обращением.</p>
            <p>Оператор не вправе использовать настоящее согласие для целей, не соответствующих указанным в документе, если отсутствует самостоятельное законное основание.</p>
            <p>Настоящее согласие является отдельным от согласия на получение рекламных сообщений и применяется с учетом Политики обработки персональных данных Оператора.</p>
          </div>
        </LegalSection>
      </LegalLayout>
      <Footer />
    </>
  );
}
