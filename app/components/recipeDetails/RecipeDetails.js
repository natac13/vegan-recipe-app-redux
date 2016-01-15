import React, { PropTypes } from 'react';

import style from './style';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/';

export const RecipeDetails = (props) => {
    const { key } = props.routeParams;
    const recipe = props.recipeList.get(key);
    return (
        <div >
            <h1 >
                {recipe.get('name')}
            </h1>
        </div>
    )
}



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
)(RecipeDetails);


