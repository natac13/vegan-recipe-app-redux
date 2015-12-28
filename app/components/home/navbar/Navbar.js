import React, { PropTypes } from 'react';
import R from 'ramda';

import LinkButton from '../linkButton/';

import style from './style.scss';

const Navbar = ( { nav1, nav2, nav3, nav4 } ) => {


    return (
        <div className={style.navbar} >
            {!!nav1 && <LinkButton
                            label={nav1.label}
                            onClick={nav1.onClick}/>}
            {!!nav2 && <LinkButton
                            label={nav2.label}
                            onClick={nav2.onClick}/>}
            {!!nav3 && <LinkButton
                            label={nav3.label}
                            onClick={nav3.onClick}/>}
            {!!nav4 && <LinkButton
                            label={nav4.label}
                            onClick={nav4.onClick}/>}
        </div>
    )
};

Navbar.propTypes = {
    nav1: PropTypes.object,
    nav2: PropTypes.object,
    nav3: PropTypes.object,
    nav4: PropTypes.object,
}

export default Navbar;
