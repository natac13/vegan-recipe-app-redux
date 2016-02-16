import React, { PropTypes } from 'react';

import style from './style.scss';

const Logo = (props) => {
  return (
    <div>
      <header className={style.header} >
          <h1 className={style.title}>Vegan Recipes!</h1>
      </header>
    </div>
  );
};

export default Logo;