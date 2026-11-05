// Дані для галереї товарів. Зображення — власні SVG-ілюстрації з папки assets/goods.
import apple from '../assets/goods/apple.svg';
import pear from '../assets/goods/pear.svg';
import grape from '../assets/goods/grape.svg';
import peach from '../assets/goods/peach.svg';
import lemon from '../assets/goods/lemon.svg';
import cherry from '../assets/goods/cherry.svg';
import plum from '../assets/goods/plum.svg';
import watermelon from '../assets/goods/watermelon.svg';

const goods = [
  { id: 1, name: 'Яблуко', price: 28, unit: 'кг', image: apple },
  { id: 2, name: 'Груша', price: 45, unit: 'кг', image: pear },
  { id: 3, name: 'Виноград', price: 85, unit: 'кг', image: grape },
  { id: 4, name: 'Персик', price: 70, unit: 'кг', image: peach },
  { id: 5, name: 'Лимон', price: 95, unit: 'кг', image: lemon },
  { id: 6, name: 'Черешня', price: 120, unit: 'кг', image: cherry },
  { id: 7, name: 'Слива', price: 55, unit: 'кг', image: plum },
  { id: 8, name: 'Кавун', price: 18, unit: 'кг', image: watermelon }
];

export default goods;
