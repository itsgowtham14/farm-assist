import React from 'react';

const Header = ({ title, subtitle }) => {
  return (
    <header className="index-header">
      <h1 className="index_h1">{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
};

export default Header;