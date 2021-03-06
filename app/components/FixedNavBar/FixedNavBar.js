import React, { PropTypes } from 'react';

import NavButton from '../NavButton/';
import Logo from '../Logo/';

import style from './style.scss';

const FixedNavBar = (props) => {
  return (
    <div className={`${style.fixedNavBar} ${props.className}`}>
      <Logo className={style.logo}/>
      <NavButton className={style.button}/>

    </div>
  );
};

export default FixedNavBar;