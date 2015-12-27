import { Map, List, fromJS } from 'immutable';
import { snakeCase } from './core_helpers';

import uuid from 'node-uuid';
import moment from 'moment';

/**
 * takes in a recipe object or immutable map. Will run through fromJS to make
 * sure I get back an immutable Map deeply converted.
 * Will created a extras map with an id and created_date to merge to the recipe
 * map.
 * @param   {object} recipe  has the input fields
 * @return  {Immutable Map}        recipe buffed with an id and date.
 */
export function recipeExtras(recipe) {
    recipe = fromJS(recipe);
    const id = uuid.v4();
    const date = moment().format('MMMM Do YYYY');
    const extras = Map({
        id: id,
        created_date: date
    });
    return recipe.merge(extras);
}
/**
 * Takes in the state and a recipe and will return a new state with the added
 * recipe as a immutable map with an id and created_date from calling recipeExtras()
 * @param {immutable Map} state  The state which represents the recipe list of
 * the main state.
 * @param {object|immutable} recipe a recipe with a name property to set as the
 * key of the recipe list Map
 * should have a name, directions and ingredients property from user.
 */
export function addRecipe(state, recipe) {
    recipe = recipeExtras(recipe);
    let recipeName = recipe.get('name');

    const snakedName = snakeCase(recipeName);

    return state.set(snakedName, recipe);
}

/**
 * Takes in the state and a recipe name and will return a new state with the
 * recipe that has the given recipe name removed
 * @param  {immutable map} state      the recipe list Map
 * @param  {string} recipeName typed from the user
 * @return {immutable map}
 */
export function deleteRecipe(state, recipeName) {
    const snakedName = snakeCase(recipeName);

    return state.remove(snakedName);
}

/**
 * Takes in the state tree, the old recipe name and a new recipe name. This will
 * find the recipe and change the name of it at the same time change the key on
 * the recipe list which points to that recipe
 * @param  {immutable Map} state   recipe list Map state
 * @param  {string} oldName from the user the original name for the recipe
 * @param  {string} newName from the user the new name from the recipe
 * @return {immutable Map}
 */
export function updateRecipeName(state, oldName, newName) {
    const oldSnakedName = snakeCase(oldName);
    const newSnakedName = snakeCase(newName);

    const recipe = state.get(oldSnakedName);
    if (!!recipe) {
        state = state.remove(oldSnakedName);
        const changedRecipe = recipe.update('name', () => newName);

        return state.set(newSnakedName, fromJS(changedRecipe));
    } else {
        return state;
    }
}

/**
 * Takes in just a recipe Map and a new set of directions which in a List
 * @param  {immutable Map} recipe     the recipe itself from the recipe list Map
 * @param  {array} directions new set of directions from the user
 * @return {immutable Map} recipe Map
 */
export function updateRecipeDirections(recipe, directions) {
    return recipe.update('directions', () => List(directions));
}

/**
 * Takes in just a recipe Map and a new set of ingredients. The ingredients of
 * the recipe are update by deeply converting the ingredients with fromJS()
 * @param  {immutable Map} recipe      the recipe itself from the recipe Map
 * @param  {array} ingredients  an array of ingredient objects {item: , amount}
 * @return {immutable Map}  recipe Map
 */
export function updateRecipeIngredients(recipe, ingredients) {
    return recipe.update('ingredients', () => fromJS(ingredients));
}