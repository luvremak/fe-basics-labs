import React from 'react';

// Картка товару. Компонент нічого не знає про конкретний товар:
// фото, назва й ціна приходять ззовні через props.
function GoodsCard({ image, name, price, unit }) {
  return (
    <article className="goods-card">
      <img src={image} alt={name} width="160" height="160" />
      <h3>{name}</h3>
      <p className="price">
        Ціна: <strong>{price} грн</strong>{unit ? ' / ' + unit : ''}
      </p>
    </article>
  );
}

export default GoodsCard;
