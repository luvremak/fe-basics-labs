import React from 'react';

// Функціональний компонент: ім'я приходить через props
function Header(props) {
  return <h3 className="person-name">{props.name}</h3>;
}

export default Header;
