import { Map } from 'immutable';

import format from '../format';

/**
 * Takes in the Immutable Map Recipe which is first converted to plain JavaScript
 * which is then run through the conversions to return a stringified recipe
 * object
 * @param {Immutable Map} recipe
 * @param {String} an id which is the uid from Firebase authentication calls.
 * @return {obejct}        recipe with directions and ingredients stringified
 */
export function stringifyRecipe(recipe, authorID) {
  let plainRecipe = Map.isMap(recipe) ? recipe.toJS() : recipe;
  let { ingredients, directions } = plainRecipe;
  let strIngredients,
    strDirections;
  if (!!ingredients) {
    strIngredients = ingredients.reduce((prev, ingredient, index) => {
      if (index === 0) return `${ingredient.item}:${ingredient.amount}`;
      return `${prev};${ingredient.item}:${ingredient.amount}`;
    }, '');
  }

  if (!!directions) {
    strDirections = directions.reduce((prev, direction, index) => {
      if (index === 0) return direction;
      return `${prev};${direction}`;
    },  '');
  }
  return {
    authorID,
    ...plainRecipe,
    ingredients: strIngredients,
    directions: strDirections
  };
}

/**
 * Takes in a recipe object which is either from Firebase or the input user data
 * Therefore the directions and ingredients are just in string form
 * Spread out all properties, override the name, directions and ingredients after
 * running through the formatter
 * @param  {object} recipe an object built with user input data or received from
 * Firebase
 * @return {object}        same recipe as input but the directions, and
 * ingredients are in the proper array form
 */
export function properRecipeFormat({ ...recipe, name, directions, ingredients }) {
  if (!!name) {
    name        = format('name')(name);
    directions  = !!directions ? format('directions')(directions)   : [];
    ingredients = !!ingredients ? format('ingredients')(ingredients) : [];

    return {
      ...recipe,
      name,
      directions,
      ingredients
    };
  }

  return false;

}