import React, { Component } from 'react';

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
        if(!!this.props.actions) {
            this.props.actions.getRecipeListFirebase(this);
        }
    }
    componentDidUpdate() {
        console.log('updated');
        console.log(this.props.recipeList);
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
            {/*<div className={style.container}>
                <LinkButton
                    label="See Recipe List Natac Vantage"
                    onClick={() => this.props.actions.pushPath('/recipes')} />
                <LinkButton
                    label="Add New Recipe"
                    onClick={() => this.props.actions.pushPath('/addnew')} />

            </div>*/}
        </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
