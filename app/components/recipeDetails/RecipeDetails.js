import React, { PropTypes } from 'react';

import style from './style.scss';

/**

    TODO:
    - Need to change this component to a real react component not just function
    I believe this will fix the errors I get about cannot update state during a
    state change.

 */

const RecipeDetails = (props) => {
    console.log(props);
    const { key } = props.params;
    const recipe = props.recipeList.get(key);
    const name = recipe.get('name');
    if (props.asyncRequest.get('didFail')) {
        props.actions.recipeDelete(name);
        // props.actions.push('/recipes');
        props.actions.resetAsync();
    }
    console.log(props);

    const createdDate = recipe.get('created_date');
    const directions = recipe.get('directions').map((direction, index) => {
        return (
            <p className={style.direction} key={index}>
                {direction}
            </p>
        );
    });
    const ingredients = recipe.get('ingredients').map((ingredient, index) => {
        return (
            <p className={style.ingredient} key={index}>
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
    );
};

export default RecipeDetails;
