import React, { Component, PropTypes } from 'react';

import style from './style.scss';

export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header className={style.header} >
                    <h1>Vegan Recipes!</h1>
                </header>
                {this.props.children}
            </div>
        );
    }
}
