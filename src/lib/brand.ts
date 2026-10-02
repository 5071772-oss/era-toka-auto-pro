/** Бот в Telegram: принимает обращения круглосуточно и сам заводит заявку. */
export const TELEGRAM_BOT_USERNAME = "era_toka_bot";
/** Прямая ссылка на бота — для разметки и упоминаний. */
export const TELEGRAM_DIRECT_URL = `https://t.me/${TELEGRAM_BOT_USERNAME}`;
/**
 * Кнопки «Написать в Telegram» ведут через приём заявок: он запоминает страницу
 * и utm-метки и передаёт их боту, поэтому в заявке видно, откуда пришёл человек.
 */
export const TELEGRAM_URL = "https://avnhome2012.chatium.ru/era-toka/bot/api/go?to=telegram";
export const TELEGRAM_HANDLE = `@${TELEGRAM_BOT_USERNAME}`;
export const MESSENGER_MAX_URL = "https://max.ru/u/f9LHodD0cOL5qBmUSSH8QHlUNDMuc6wcErgSlLpD1ltQdYfpXn0kDw6qNYo";
export const PHONE = "+79162253359";
export const PHONE_FORMATTED = "+7 (916) 225-33-59";
export const CATALOG_URL = "https://uk3963.craftum.io/products";
export const BRAND = "ЭРА ТОКА";
export const TAGLINE = "Время двигаться иначе";
export const EXPERT = "Николаев Алексей";

export const NAV_ITEMS = [
  { label: "Каталог", href: "/catalog" },
  { label: "Подбор", href: "/#podbor" },
  { label: "Автомобили", href: "/#avtomobili" },
  { label: "Поставка", href: "/#postavka" },
  { label: "Услуги", href: "/#uslugi" },
  { label: "FAQ", href: "/#faq" },
];
