import React, { PropTypes } from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import style from './style';

const LivePreview = ( { name, created_date, directions, ingredients, img }) => {

  const outputDirections = directions.map((direction, index) => {
    return (
      <li key={index}> {direction}</li>
    );
  });
  const outputIngredients = ingredients.map((ingredient, index) => {
    return (
      <li key={index}>
        <p>{ingredient.get('amount')} - {ingredient.get('item')}</p>
      </li>
    );
  });
  return (
    <div className={style.livePreview}>
      <p className={style.name}>Name: {name}</p>
      <p className={style.createDate}> Created On: {created_date} </p>
      <img className={style.img} src={img.value ? img.value : 'http://placehold.it/150'}/>
      Ingredients
      <ul className={style.ingredientsList}>
        {outputIngredients}
      </ul>
      Directions:
      <ul className={style.directionsList}>
        {outputDirections}
      </ul>

    </div>
  );
};

LivePreview.propTypes = {
  name: PropTypes.string,
  created_date: PropTypes.string,
  directions: ImmutablePropTypes.list,
  ingredients: ImmutablePropTypes.list,
  img: PropTypes.object
};

LivePreview.defaultProps ={
  name: '',
  created_date: '',
  directions: List(),
  ingredients: List(),
  img: {}
};

export default LivePreview;