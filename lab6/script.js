'use strict';

/* ЛР6, варіант 59.
   Таблиця 1 має 20 рядків, тому 59 mod 20 = 19 — рядок 19: поля 1, 4, 2, 3, 8
   таблиці 2, тобто picture, city, name, cell, phone.
   Дані беруться з зовнішнього API https://randomuser.me/api методом fetch();
   fetch повертає проміс, тому обробка написана ланцюжком .then().then().catch().finally(). */

var API_URL = 'https://randomuser.me/api/';

var loadButton = document.getElementById('load-btn');
var countSelect = document.getElementById('count');
var statusLine = document.getElementById('status');
var cardsBox = document.getElementById('cards');

// Поля, які виводимо, — у порядку рядка 19 таблиці 1.
// get() дістає значення з розібраного об’єкта JSON.
var shownFields = [
  { label: 'Місто', get: function (user) { return user.location.city; } },
  { label: "Ім'я", get: function (user) { return user.name.title + ' ' + user.name.first + ' ' + user.name.last; } },
  { label: 'Мобільний', get: function (user) { return user.cell; } },
  { label: 'Телефон', get: function (user) { return user.phone; } }
];

function setStatus(text, kind) {
  statusLine.textContent = text;
  statusLine.className = 'status' + (kind ? ' ' + kind : '');
}

function createCard(user) {
  var card = document.createElement('article');
  card.className = 'card';

  var image = document.createElement('img');
  image.src = user.picture.large;                 // поле picture
  image.alt = 'Фото користувача ' + user.name.first + ' ' + user.name.last;
  image.width = 128;
  image.height = 128;
  image.loading = 'lazy';
  card.appendChild(image);

  var list = document.createElement('dl');
  for (var i = 0; i < shownFields.length; i++) {
    var term = document.createElement('dt');
    term.textContent = shownFields[i].label;

    var value = document.createElement('dd');
    // textContent, а не innerHTML: дані зовнішні, і так вони не можуть
    // потрапити на сторінку як розмітка
    value.textContent = shownFields[i].get(user) || '—';

    list.appendChild(term);
    list.appendChild(value);
  }
  card.appendChild(list);

  return card;
}

function renderUsers(users) {
  cardsBox.textContent = '';                      // прибираємо попередній результат
  for (var i = 0; i < users.length; i++) {
    cardsBox.appendChild(createCard(users[i]));
  }
}

function loadUsers() {
  var count = countSelect.value;

  loadButton.disabled = true;
  setStatus('Завантаження даних…');

  fetch(API_URL + '?results=' + count)
    .then(function (response) {
      // перший проміс: отримано відповідь сервера
      if (!response.ok) {
        throw new Error('Сервер відповів кодом ' + response.status);
      }
      return response.json();                     // розбір JSON — теж проміс
    })
    .then(function (data) {
      // другий проміс: JSON уже перетворено на об’єкт JavaScript
      if (!data.results || data.results.length === 0) {
        throw new Error('Відповідь не містить даних');
      }
      renderUsers(data.results);
      setStatus('Отримано записів: ' + data.results.length + '. Джерело: ' + API_URL, 'done');
    })
    .catch(function (error) {
      // Сюди потрапляють і помилки мережі, і помилки, кинуті вище.
      // fetch відхиляє проміс лише коли запит не дійшов (TypeError);
      // відповіді 404 чи 500 вважаються успішними, тому їх перевіряємо вручну.
      var text = (error instanceof TypeError)
        ? 'немає зв’язку з сервером, перевірте підключення до інтернету'
        : error.message;
      cardsBox.textContent = '';
      setStatus('Не вдалося отримати дані: ' + text, 'error');
    })
    .finally(function () {
      // виконується в будь-якому разі
      loadButton.disabled = false;
    });
}

loadButton.addEventListener('click', loadUsers);
