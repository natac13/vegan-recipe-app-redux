import React, { Component } from 'react';

/*** Components ***/
const RaisedButton = require('material-ui/lib/raised-button');
import PhotoBanner from './photoBanner/';
import LinkButton  from './linkButton/';

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
        return (
        <div className={style.app}>
            <PhotoBanner />
            <div className={style.container}>
                <LinkButton
                    label="See Recipe List Natac Vantage"
                    onClick={() => this.props.actions.pushPath('/recipes')} />
                <LinkButton
                    label="Add New Recipe"
                    onClick={() => this.props.actions.pushPath('/addnew')} />

            </div>
        </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
