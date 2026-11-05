import React from 'react';
import GoodsCard from './GoodsCard';
import goods from '../data/goods';

// Галерея: для кожного товару з масиву створюється окремий GoodsCard,
// а його дані передаються як props. key потрібен React, щоб розрізняти картки.
function GoodsGallery() {
  return (
    <div className="goods-gallery">
      {goods.map((item) => (
        <GoodsCard key={item.id} image={item.image} name={item.name} price={item.price} unit={item.unit} />
      ))}
    </div>
  );
}

export default GoodsGallery;
