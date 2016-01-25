import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

/*** Components ***/

import Navbar      from './navbar/';
import PhotoBanner from './photoBanner/';

/*** Styling ***/
import style from './style.scss';

export default class Home extends Component {

    constructor(props) {
        super(props);

    }
    shouldComponentUpdate = shouldPureComponentUpdate;


    componentDidUpdate() {
        // console.log(this.props.recipeList);
        // console.log(JSON.stringify(this.props.recipeList.toJS(), null, 2));
    }

    render() {
        const { push } = this.props.actions;
        const nav1 = {
            label: 'Add New Recipe',
            onClick() {
                push('/addnew');
            }
        };
        const nav2 = {
            label: 'See Recipe List',
            onClick() {
                push('/recipes');
            }
        };
        const nav3 = {
            label: 'Login',
            onClick() {
                push('/login');
            }
        };
        return (
        <div className={style.app}>
            <Navbar nav1={nav1} nav2={nav2} nav3={nav3} />
            <PhotoBanner />

        </div>
        );
    }
}

