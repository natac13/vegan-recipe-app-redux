import React, { PropTypes } from 'react';

import style from './style.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/';

export const RecipeDetails = (props) => {
    const { key } = props.routeParams;
    const recipe = props.recipeList.get(key);
    const name = recipe.get('name');
    const createdDate = recipe.get('created_date');
    const directions = recipe.get('directions').map(direction => {
        return (
            <p className={style.direction}>
                {direction}
            </p>
        );
    });
    const ingredients = recipe.get('ingredients').map(ingredient => {
        return (
            <p className={style.ingredient}>
                {ingredient.get('amount')} - {ingredient.get('item')}
            </p>
        );
    });

    return (
        <div className={style.wrapper}>
            <div className={style.intro}>
                <img
                    src={recipe.get('imageURL')}
                    alt={name}
                    className={style.image} />

                <header className={style.title}>
                    <h1 className={style.name}>
                        {name}
                    </h1>
                    <h3 className={style.createdDate}>
                        Created in: {createdDate}
                    </h3>
                </header>

            </div>
            <div className={style.content}>
                <div className={style.ingrendients}>
                    {ingredients}
                </div>
                <div className={style.directions}>
                    {directions}
                </div>
            </div>


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


