import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Монтуємо основний компонент App у div#root з index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
