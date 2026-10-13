'use strict';

/* ЛР5, варіант 59.
   Таблиця 1 має 15 рядків, тому 59 mod 15 = 14 — працюємо за рядком 14,
   тобто форма складається з полів 1, 4, 5, 7, 9 таблиці 2:
   ПІБ, Телефон, ID-card, Дата народження, e-mail.
   У завданні 2 реагує клітинка 14, а дія на подвійний клік береться зі
   списку з 10 пунктів: 14 mod 10 = 4 — зміна кольору побічної діагоналі. */

/* ============ Завдання 1: форма і регулярні вирази ============ */

var fields = [
  {
    id: 'fio',
    label: 'ПІБ',
    // Прізвище з великої літери (разом із подвійним через дефіс) + ініціали «І. П.»
    // (пробіл між ініціалами необов’язковий)
    pattern: /^[А-ЯЄІЇҐ][а-яєіїґ'’]+(?:[-'’][А-ЯЄІЇҐ]?[а-яєіїґ'’]+)*\s+[А-ЯЄІЇҐ]\.\s?[А-ЯЄІЇҐ]\.$/,
    message: 'ПІБ має бути у форматі «Прізвище І. П.», наприклад: Крошка Д. О.'
  },
  {
    id: 'phone',
    label: 'Телефон',
    pattern: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    message: 'Телефон має бути у форматі (ЧЧЧ)-ЧЧЧ-ЧЧ-ЧЧ, наприклад: (067)-123-45-67'
  },
  {
    id: 'idcard',
    label: 'ID-card',
    pattern: /^[А-ЯЄІЇҐ]{2}\s?№\s?\d{6}$/,
    message: 'ID-card має бути у форматі «АБ №123456»: дві великі літери, № і шість цифр'
  },
  {
    id: 'birth',
    label: 'Дата народження',
    pattern: /^(\d{2})\.(\d{2})\.(\d{4})$/,
    message: 'Дата народження має бути у форматі ЧЧ.ЧЧ.ЧЧЧЧ, наприклад: 19.06.2007',
    // додаткова перевірка: такий день справді існує і дата не в майбутньому
    extraCheck: function (value) {
      var parts = value.split('.');
      var day = Number(parts[0]);
      var month = Number(parts[1]);
      var year = Number(parts[2]);
      var date = new Date(year, month - 1, day);
      var isRealDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

      if (!isRealDate) {
        return 'Такої дати не існує — перевірте день і місяць';
      }
      if (date > new Date()) {
        return 'Дата народження не може бути в майбутньому';
      }
      if (year < 1900) {
        return 'Рік має бути не раніший за 1900';
      }
      return '';
    }
  },
  {
    id: 'email',
    label: 'e-mail',
    pattern: /^[A-Za-z0-9]([A-Za-z0-9._-]*[A-Za-z0-9])?@[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?\.com$/,
    message: 'e-mail має бути у форматі ім’я@домен.com, наприклад: kroshka@example.com'
  }
];

var form = document.getElementById('user-form');
var formMessage = document.getElementById('form-message');

function checkField(field) {
  var input = document.getElementById(field.id);
  var value = input.value.trim();

  if (value === '') {
    return 'Поле «' + field.label + '» не заповнене';
  }
  if (!field.pattern.test(value)) {          // перевірка регулярним виразом
    return field.message;
  }
  if (field.extraCheck) {
    return field.extraCheck(value);
  }
  return '';
}

function markField(field, errorText) {
  var wrapper = document.getElementById('field-' + field.id);
  var errorBox = document.getElementById('error-' + field.id);

  errorBox.textContent = errorText;
  wrapper.classList.remove('valid', 'invalid');
  wrapper.classList.add(errorText ? 'invalid' : 'valid');
}

function collectValues() {
  var data = [];
  for (var i = 0; i < fields.length; i++) {
    data.push({ label: fields[i].label, value: document.getElementById(fields[i].id).value.trim() });
  }
  return data;
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showResultWindow(data) {
  var rows = '';
  for (var i = 0; i < data.length; i++) {
    rows += '<dt>' + escapeHtml(data[i].label) + '</dt><dd>' + escapeHtml(data[i].value) + '</dd>';
  }

  var html = '<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8">' +
    '<title>Введені дані</title><style>' +
    'body{font-family:"Segoe UI",Arial,sans-serif;margin:20px;color:#1f2328}' +
    'h1{font-size:1.2rem}dt{font-weight:600;margin-top:8px}dd{margin:0}' +
    '</style></head><body><h1>Введені дані</h1><dl>' + rows + '</dl></body></html>';

  var resultWindow = window.open('', 'lab5-result', 'width=420,height=400');
  if (!resultWindow) {
    return false;                            // вікно заблокував браузер
  }
  resultWindow.document.write(html);
  resultWindow.document.close();
  resultWindow.focus();
  return true;
}

function showResultPanel(data) {
  var old = document.getElementById('result-panel');
  if (old) {
    old.parentNode.removeChild(old);
  }

  var panel = document.createElement('div');
  panel.className = 'result-panel';
  panel.id = 'result-panel';

  var title = document.createElement('h3');
  title.textContent = 'Введені дані';
  panel.appendChild(title);

  var list = document.createElement('dl');
  for (var i = 0; i < data.length; i++) {
    var dt = document.createElement('dt');
    dt.textContent = data[i].label;
    var dd = document.createElement('dd');
    dd.textContent = data[i].value;
    list.appendChild(dt);
    list.appendChild(dd);
  }
  panel.appendChild(list);
  form.appendChild(panel);
}

form.addEventListener('submit', function (event) {
  event.preventDefault();                    // сторінка не перезавантажується

  var errorCount = 0;
  for (var i = 0; i < fields.length; i++) {
    var errorText = checkField(fields[i]);
    markField(fields[i], errorText);
    if (errorText) {
      errorCount = errorCount + 1;
    }
  }

  var panel = document.getElementById('result-panel');
  if (panel) {
    panel.parentNode.removeChild(panel);
  }

  if (errorCount > 0) {
    formMessage.className = 'form-message fail';
    formMessage.textContent = 'Знайдено помилок: ' + errorCount + '. Виправте виділені поля.';
    return;
  }

  var data = collectValues();
  var opened = showResultWindow(data);
  formMessage.className = 'form-message ok';

  if (opened) {
    formMessage.textContent = 'Дані коректні — виведено в окремому вікні.';
  } else {
    showResultPanel(data);
    formMessage.textContent = 'Дані коректні. Окреме вікно заблокував браузер, тому дані показано нижче.';
  }
});

/* ============ Завдання 2: таблиця 6×6 та події миші ============ */

var SIZE = 6;
var TARGET_NUMBER = 14;                      // клітинка варіанта
var CLICK_DELAY = 250;                       // мс: чекаємо, чи не буде подвійного кліка

var grid = document.getElementById('grid');
var palette = document.getElementById('palette');
var resetButton = document.getElementById('reset-colors');
var cells = [];                              // cells[рядок][стовпець]
var clickTimer = null;

function buildGrid() {
  var number = 1;
  for (var row = 0; row < SIZE; row++) {
    var tr = document.createElement('tr');
    cells[row] = [];

    for (var col = 0; col < SIZE; col++) {
      var td = document.createElement('td');
      td.textContent = number;
      cells[row][col] = td;

      if (number === TARGET_NUMBER) {
        td.classList.add('target');
        td.title = 'Клітинка варіанта: наведення, клік, подвійний клік';
        addTargetEvents(td);
      }

      tr.appendChild(td);
      number = number + 1;
    }
    grid.appendChild(tr);
  }
}

function randomColor() {
  var value = Math.floor(Math.random() * 0x1000000);     // 0 … 16777215
  return '#' + ('000000' + value.toString(16)).slice(-6);
}

// Темний або світлий текст — залежно від яскравості фону
function textColorFor(hex) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  var brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 140 ? '#1f2328' : '#ffffff';
}

function paint(cell, color) {
  cell.style.backgroundColor = color;
  cell.style.color = textColorFor(color);
}

// Побічна діагональ: клітинки, у яких номер рядка + номер стовпця = 5 (нумерація з нуля)
function paintAntiDiagonal(color) {
  for (var row = 0; row < SIZE; row++) {
    paint(cells[row][SIZE - 1 - row], color);
  }
}

function addTargetEvents(cell) {
  // наведення — випадковий колір
  cell.addEventListener('mouseover', function () {
    paint(cell, randomColor());
  });

  // клік — колір із палітри; виконуємо із затримкою, щоб не спрацювати двічі
  // перед подвійним кліком (браузер надсилає два click перед dblclick)
  cell.addEventListener('click', function () {
    if (clickTimer) {
      clearTimeout(clickTimer);
    }
    clickTimer = setTimeout(function () {
      paint(cell, palette.value);
      clickTimer = null;
    }, CLICK_DELAY);
  });

  // подвійний клік — побічна діагональ
  cell.addEventListener('dblclick', function () {
    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
    }
    paintAntiDiagonal(palette.value);
  });
}

resetButton.addEventListener('click', function () {
  for (var row = 0; row < SIZE; row++) {
    for (var col = 0; col < SIZE; col++) {
      cells[row][col].style.backgroundColor = '';
      cells[row][col].style.color = '';
    }
  }
});

buildGrid();
