import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import style from './style';

const LivePreview = ( { name, directions, ingredients }) => {
    return (
        <div className={style.livePreview}>
            <p className={style.name}>Name: {name}</p>
            Ingredients
            <ul className={style.ingredientsList}>
                {ingredients}
            </ul>
            Directions:
            <ul className={style.directionsList}>
                {directions}
            </ul>
        </div>
    );
};

LivePreview.propTypes = {
    name: PropTypes.string,
    directions: ImmutablePropTypes.list,
    ingredients: ImmutablePropTypes.list
};

export default LivePreview;