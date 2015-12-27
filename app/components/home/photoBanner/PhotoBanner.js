import React, { Component, PropTypes } from 'react';

import style from './style.scss';

export default class PhotoBanner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.photoBanner}>
                <div className={style.bananas}>

                </div>
                <div className={style.oatmealBananas}>

                </div>
                <div className={style.bigRiceSalad}>

                </div>

            </div>
        );
    }
}

