import React, { Component } from 'react';
// import { Link }             from 'react-router';

const RaisedButton = require('material-ui/lib/raised-button');


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions/creators';


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


export class Home extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        console.log(this.props.recipeList.toJS())
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
