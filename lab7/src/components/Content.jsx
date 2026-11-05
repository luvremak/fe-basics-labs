import React from 'react';
import Image from './Image';
import viaductPhoto from '../assets/vorokhta-viaduct.jpg';

/* Компонент-клас із вмістом сторінки ЛР4.
   У ЛР4 елементи шукались у DOM (getElementById, querySelector), а кольори й
   розмір фото змінювались напряму через element.style. У React так не роблять:
   усе, що змінюється, зберігається у state, а render() щоразу будує розмітку
   заново за цим станом. */

// Пари кольорів для кліків (ті самі, що в ЛР4). Порожня пара — початкові кольори.
const COLORS_ITEM_10 = [
  { backgroundColor: '#0b5ed7', color: '#ffffff' },
  { backgroundColor: '#ffd43b', color: '#1f2328' },
  {}
];
const COLORS_ITEM_11 = [
  { backgroundColor: '#157347', color: '#ffffff' },
  { backgroundColor: '#f1c0e8', color: '#2b1430' },
  {}
];

const MAX_IMAGES = 4;
const MIN_WIDTH = 20;
const MAX_WIDTH = 100;
const WIDTH_STEP = 10;

const PHOTO = {
  src: viaductPhoto,
  href: 'https://vorokhtianska-rada.gov.ua/',
  alt: "Ворохта з висоти: старий кам'яний арковий віадук і новий залізничний міст над річкою Прут на тлі Карпат"
};

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step10: 0,          // скільки разів клікнули на 10-й елемент
      step11: 0,          // ... і на 11-й
      images: [1],        // ідентифікатори фото в галереї (потрібні для key)
      nextId: 2,
      width: 70           // ширина фото, % від ширини блока
    };
  }

  // Стрілкові функції — щоб this у обробниках вказував на компонент
  clickItem10 = () => {
    this.setState((state) => ({ step10: state.step10 + 1 }));
  };

  clickItem11 = () => {
    this.setState((state) => ({ step11: state.step11 + 1 }));
  };

  addImage = () => {
    this.setState((state) =>
      state.images.length >= MAX_IMAGES
        ? null
        : { images: [...state.images, state.nextId], nextId: state.nextId + 1 }
    );
  };

  removeImage = () => {
    this.setState((state) => ({ images: state.images.slice(0, -1) }));
  };

  growImage = () => {
    this.setState((state) => ({ width: Math.min(state.width + WIDTH_STEP, MAX_WIDTH) }));
  };

  shrinkImage = () => {
    this.setState((state) => ({ width: Math.max(state.width - WIDTH_STEP, MIN_WIDTH) }));
  };

  render() {
    const { step10, step11, images, width } = this.state;
    const count = images.length;

    // Колір беремо з масиву за номером кліку: після останньої пари — знову з початку
    const style10 = step10 === 0 ? {} : COLORS_ITEM_10[(step10 - 1) % COLORS_ITEM_10.length];
    const style11 = step11 === 0 ? {} : COLORS_ITEM_11[(step11 - 1) % COLORS_ITEM_11.length];

    return (
      <div className="content">
        <p>
          Дата і місце народження: <time dateTime="2007-06-19">19 червня 2007 року</time>, селище Солоне,
          Дніпропетровська область.
        </p>

        <p>
          Освіта: ЗЗСО «Солонянський ліцей», селище Солоне, Дніпропетровська область;<br />
          Національний технічний університет України «Київський політехнічний інститут імені Ігоря
          Сікорського», факультет інформатики та обчислювальної техніки (ФІОТ), група ІМ-44.
        </p>

        <p>Хобі:</p>
        <ul>
          <li>Довгі прогулянки</li>
          <li>Еволюція</li>
          <li>Судоку</li>
          <li>Кейворди</li>
          <li>Філворди</li>
          {/* 10-й змістовий елемент: (59 mod 10) + 1 = 10 */}
          <li className="clickable" style={style10} onClick={this.clickItem10}
              title="Клікніть, щоб змінити кольори">
            Кросворди, сканворди та інші газетні головоломки
          </li>
        </ul>

        {/* 11-й елемент — наступний за десятим */}
        <p className="clickable" style={style11} onClick={this.clickItem11}
           title="Клікніть, щоб змінити кольори">
          Улюблені фільми та книга:
        </p>
        <ol>
          <li>Фільм <i lang="en">«The Act of Killing»</i>, 2012</li>
          <li>Фільм <i lang="en">«Mysterious Skin»</i>, 2004</li>
          <li>Книга «Тягар пристрастей людських», Вільям Сомерсет Моем, 1915</li>
        </ol>

        <p>
          Ворохта — гірське селище в Надвірнянському районі Івано-Франківської області, розташоване на
          березі річки Прут на висоті близько 850 метрів над рівнем моря, серед вершин Чорногори та
          Ґорґан. Це один із найстаріших кліматичних і гірськолижних курортів Карпат: саме тут, на
          ворохтянських трамплінах, починалася історія українського лижного спорту. Головна пам'ятка
          селища — кам'яний арковий залізничний віадук через Прут, збудований у 1894–1895 роках для
          австрійської залізниці. На початку 2000-х рух потягів ним припинили (тепер вони ходять новим
          мостом поруч), і старий віадук став однією з найвідоміших туристичних локацій Карпат.
        </p>

        <figure>
          <div className="gallery">
            {images.map((id) => (
              <Image key={id} src={PHOTO.src} alt={PHOTO.alt} href={PHOTO.href} width={width} />
            ))}
          </div>
          <figcaption>
            Ворохтянський віадук. Фото є посиланням на офіційний сайт Ворохтянської селищної ради.
          </figcaption>
        </figure>

        <div className="controls">
          <button type="button" onClick={this.addImage} disabled={count >= MAX_IMAGES}>Додати</button>
          <button type="button" onClick={this.growImage} disabled={count === 0 || width >= MAX_WIDTH}>Збільшити</button>
          <button type="button" onClick={this.shrinkImage} disabled={count === 0 || width <= MIN_WIDTH}>Зменшити</button>
          <button type="button" onClick={this.removeImage} disabled={count === 0}>Видалити</button>
        </div>
        <p className="status" role="status">
          {count === 0
            ? 'Зображень немає. Натисніть «Додати», щоб повернути фото.'
            : 'Зображень на сторінці: ' + count + '. Ширина: ' + width + '%.'}
        </p>
      </div>
    );
  }
}

export default Content;
