import React, { Component } from 'react';

/*** Components ***/
const RaisedButton = require('material-ui/lib/raised-button');

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
        console.log(this.props.recipeList)
    }

    render(){
        return (
          <div className="">
                <RaisedButton
                    label="See Recipe List!"
                    onClick={() => this.props.actions.pushPath('/recipes')}
                    className="material-icons-custom-github" />

                <RaisedButton
                    label="Add New Recipe"
                    onClick={() => this.props.actions.pushPath('/addnew')}
                    className="material-icons-custom-github" />


          </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
