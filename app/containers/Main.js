import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/';

import style from './style.scss';


export class Main extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        /*
        Mapping over all the children and cloning that child element with the
        props from this container component which is connected to Redux!
         */
        const childrenWithStoreProp = React.Children.map(
            this.props.children,
            (child) => {
                return React.cloneElement(child, {...this.props});
            });
        return (
            <div>
                <header className={style.header} >
                    <h1>Vegan Recipes!</h1>
                </header>
                {childrenWithStoreProp}
            </div>
        );
    }
}
/*========================================
=            Redux connection            =
========================================*/

function mapStateToProps(state) {
    const { recipeList, asyncRequest, routing } = state;
    return {
        recipeList,
        asyncRequest,
        routing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch),
        dispatch
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);


/*=====  End of Redux connection  ======*/

