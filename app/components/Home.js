import React, { Component } from 'react';
import { Link }             from 'react-router';

const RaisedButton = require('material-ui/lib/raised-button');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions/creators';
import { pushPath } from 'redux-simple-router'


function mapStateToProps(state) {
    const { routing } = state;
    return {
        routing
    }
}
const actions = Object.assign({}, ActionCreators, {pushPath:pushPath})
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


export class Home extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return (
          <div className="">
                <RaisedButton
                    label="See Recipe List"
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
