import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import GoodsGallery from './components/GoodsGallery';

/* ЛР7, варіант 59. Основний компонент: до нього додаються всі інші.
   Завдання 1 — сторінка ЛР4 з компонентів Header, Content (і Image всередині Content).
   Завдання 2 — галерея товарів з карток GoodsCard. */

function App() {
  return (
    <div className="page">
      <header className="lab-title">
        <h1>Лабораторна робота №7. React: компоненти і props</h1>
        <p>Крошка Дар'я Олександрівна, група ІМ-44, варіант 59</p>
      </header>

      <section className="task" aria-labelledby="task1-title">
        <h2 className="task-title" id="task1-title">Завдання 1. Сторінка ЛР4 на React</h2>
        <main className="sheet">
          <Header name="Крошка Дар'я Олександрівна" />
          <Content />
        </main>
      </section>

      <section className="task" aria-labelledby="task2-title">
        <h2 className="task-title" id="task2-title">Завдання 2. Галерея товарів</h2>
        <GoodsGallery />
      </section>
    </div>
  );
}

export default App;
