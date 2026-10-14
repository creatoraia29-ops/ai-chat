import { ChatWidget } from './components/ChatWidget.jsx';

export default function App() {
  return (
    <div className="demo">
      <header className="demo__header">
        <span className="demo__logo">Северный дом</span>
        <nav className="demo__nav" aria-label="Разделы сайта">
          <a href="#catalog">Каталог</a>
          <a href="#delivery">Доставка</a>
          <a href="#contacts">Контакты</a>
        </nav>
      </header>
      <main className="demo__main">
        <p className="demo__eyebrow">Пример сайта</p>
        <h1>Мебель, которая остаётся с вами надолго</h1>
        <p className="demo__lead">
          Это демонстрационная страница магазина. Справа внизу — виджет чата
          ИИ-агента: откройте его, напишите вопрос и получите ответ из готовых сценариев.
        </p>
        <section className="demo__cards" id="catalog">
          <article>
            <h2>Комплект «Северный»</h2>
            <p>Стол, два стула и полка из ясеня. Спокойный светлый тон для небольшой комнаты.</p>
          </article>
          <article id="delivery">
            <h2>Доставка и самовывоз</h2>
            <p>По городу — за один-два дня. Шоурум на Невском проспекте работает до 20:00.</p>
          </article>
          <article id="contacts">
            <h2>Нужна консультация</h2>
            <p>Спросите в чате про цену, возврат или статус заказа — агент ответит сразу.</p>
          </article>
        </section>
      </main>
      <ChatWidget />
    </div>
  );
}
