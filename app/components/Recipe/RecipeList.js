import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';


import ListItem from './ListItem';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/creators';


function mapStateToProps(state) {
    const { routing, recipeList } = state;
    return {
        routing,
        recipeList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch),
        dispatch
    };
}


export class RecipeList extends Component {

    static propTypes = {
        recipeList: ImmutablePropTypes.map.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        let list = this.props.recipeList.toArray().map((recipe, index) =>{
            return (
                <ListItem
                    name={recipe.get('name')}
                    link={this.props.actions.pushPath}
                    key={recipe.get('id') || index} />
            );
        });

        return (
            <div className="recipe-list">
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RecipeList);