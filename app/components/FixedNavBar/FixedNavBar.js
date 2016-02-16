import React, { PropTypes } from 'react';

import NavButton from '../NavButton/';
import Logo from '../Logo/';

import style from './style.scss';

const FixedNavBar = (props) => {
  return (
    <div className={style.fixedNavBar}>
      <div className={style.logo}>
        <Logo />

      </div>
      <div className={style.button}>
        <NavButton />

      </div>
    </div>
  );
};

export default FixedNavBar;