'use strict';

/* ЛР4, варіант 59.
   Завдання 1: номер елемента = (n mod 10) + 1 = (59 mod 10) + 1 = 10.
   Десятий змістовий елемент сторінки (останній пункт списку хобі) отримуємо
   методом getElementById(), наступний, одинадцятий (абзац «Улюблені фільми
   та книга:») — методом querySelector(). Кожен клік змінює кольори фону й
   тексту на наступну пару зі свого набору, після останньої пари кольори
   повертаються до початкових.
   Завдання 2: чотири кнопки керують зображенням під текстом. */

/* ---------- Завдання 1: зміна кольорів за кліком ---------- */

var statesForId = [
  { background: '#0b5ed7', text: '#ffffff' },   // синій фон, білий текст
  { background: '#ffd43b', text: '#1f2328' },   // жовтий фон, темний текст
  { background: '', text: '' }                  // порожні значення — початкові кольори
];

var statesForSelector = [
  { background: '#157347', text: '#ffffff' },   // зелений фон, білий текст
  { background: '#f1c0e8', text: '#2b1430' },   // рожевий фон, темний текст
  { background: '', text: '' }
];

function addColorCycle(element, states, name) {
  if (!element) {
    console.warn('ЛР4: не знайдено елемент (' + name + ')');
    return;
  }

  var step = 0;
  element.classList.add('js-clickable');
  element.title = 'Клікніть, щоб змінити кольори (' + name + ')';

  element.addEventListener('click', function () {
    var state = states[step % states.length];
    element.style.backgroundColor = state.background;   // доступ до властивості style
    element.style.color = state.text;
    step = step + 1;
  });
}

// 10-й елемент — доступ за ідентифікатором
var elementById = document.getElementById('click-target-id');
addColorCycle(elementById, statesForId, 'getElementById');

// 11-й елемент — доступ за CSS-селектором (класом)
var elementBySelector = document.querySelector('.click-target-selector');
addColorCycle(elementBySelector, statesForSelector, 'querySelector');

/* ---------- Завдання 2: кнопки «Додати», «Збільшити», «Зменшити», «Видалити» ---------- */

var gallery = document.getElementById('gallery');
var statusLine = document.getElementById('gallery-status');
var buttonAdd = document.getElementById('btn-add');
var buttonGrow = document.getElementById('btn-grow');
var buttonShrink = document.getElementById('btn-shrink');
var buttonRemove = document.getElementById('btn-remove');

var MAX_IMAGES = 4;       // більше копій на сторінці не додаємо
var MIN_WIDTH = 20;       // мінімальна ширина зображення, % від ширини блока
var MAX_WIDTH = 100;      // максимальна ширина
var WIDTH_STEP = 10;      // крок кнопок «Збільшити» / «Зменшити»

var currentWidth = 70;    // стартова ширина (такий самий відсоток задано у style.css)

// Зразок для кнопки «Додати»: копія першого посилання із зображенням
var imageTemplate = gallery.firstElementChild.cloneNode(true);

function images() {
  return gallery.querySelectorAll('img');   // пошук усіх зображень галереї
}

function applyWidth() {
  var list = images();
  for (var i = 0; i < list.length; i++) {
    list[i].style.width = currentWidth + '%';
  }
}

function updateControls() {
  var count = images().length;

  buttonAdd.disabled = count >= MAX_IMAGES;
  buttonRemove.disabled = count === 0;
  buttonGrow.disabled = count === 0 || currentWidth >= MAX_WIDTH;
  buttonShrink.disabled = count === 0 || currentWidth <= MIN_WIDTH;

  if (count === 0) {
    statusLine.textContent = 'Зображень немає. Натисніть «Додати», щоб повернути фото.';
  } else {
    statusLine.textContent = 'Зображень на сторінці: ' + count + '. Ширина: ' + currentWidth + '%.';
  }
}

buttonAdd.addEventListener('click', function () {
  if (images().length >= MAX_IMAGES) {
    return;
  }
  gallery.appendChild(imageTemplate.cloneNode(true));   // додаємо копію зображення
  applyWidth();
  updateControls();
});

buttonGrow.addEventListener('click', function () {
  currentWidth = Math.min(currentWidth + WIDTH_STEP, MAX_WIDTH);
  applyWidth();
  updateControls();
});

buttonShrink.addEventListener('click', function () {
  currentWidth = Math.max(currentWidth - WIDTH_STEP, MIN_WIDTH);
  applyWidth();
  updateControls();
});

buttonRemove.addEventListener('click', function () {
  if (gallery.lastElementChild) {
    gallery.removeChild(gallery.lastElementChild);      // видаляємо останнє зображення
  }
  updateControls();
});

applyWidth();
updateControls();
