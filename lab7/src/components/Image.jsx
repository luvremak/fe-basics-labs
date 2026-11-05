import React from 'react';

// Функціональний компонент: усе, що потрібно для показу фото, передається через props.
// Фото є посиланням, як і в ЛР4; ширину задає батьківський компонент Content.
function Image({ src, alt, href, width }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={src} alt={alt} width="1500" height="1120" style={{ width: width + '%' }} />
    </a>
  );
}

export default Image;
