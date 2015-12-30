import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

/*** Components ***/
const RaisedButton = require('material-ui/lib/raised-button');

import Navbar      from './navbar/';
import PhotoBanner from './photoBanner/';

/*** Styling ***/
import style from './style.scss';

/*==============================================
=            Connection to Redux setup            =
==============================================*/

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/creators';


function mapStateToProps(state) {
    const { routing, recipeList } = state;
    return {
        routing,
        recipeList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch),
        dispatch
    }
}


/*=====  End of Connect to Redux setup  ======*/



export class Home extends Component{

    constructor(props) {
        super(props);
        // need to dispatch the async action here.
        // ONLY if recipeList is empty
        if(!!this.props.actions && this.props.recipeList.size === 0) {
            console.log('FIREBASE SEARCH')
            this.props.actions.getRecipeListFirebase(this);
        }
    }
    shouldComponentUpdate = shouldPureComponentUpdate;


    componentDidUpdate() {
        console.log('updated');
        // console.log(this.props.recipeList);
        // console.log(JSON.stringify(this.props.recipeList.toJS(), null, 2));
    }

    render(){
        const { pushPath } = this.props.actions;
        const nav1 = {
            label: 'Add New Recipe',
            onClick() {
                pushPath('/addnew')
            }
        }
        const nav2 = {
            label: 'See Recipe List',
            onClick() {
                pushPath('/recipes');
            }
        }
        const nav3 = {
            label: 'Login',
            onClick() {
                pushPath('/login')
            }
        }
        return (
        <div className={style.app}>
            <Navbar nav1={nav1} nav2={nav2} nav3={nav3} />
            <PhotoBanner />

        </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
