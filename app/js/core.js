import { Map, List, fromJS } from 'immutable';
import { snakeCase } from './core_helpers';

import uuid   from 'node-uuid';
import moment from 'moment';

/**
 * takes in a recipe object or immutable map. Will run through fromJS to make
 * sure I get back an immutable Map deeply converted.
 * Will created a extras map with an id and created_date to merge to the recipe
 * map.
 * @param  {[type]} recipe [description]
 * @return {[type]}        [description]
 */
function recipeExtras(recipe) {
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
 */
export function addRecipe(state, recipe) {
    recipe = recipeExtras(recipe);
    let recipeName = recipe.get('name');

    const snakedName = snakeCase(recipeName);

    return state.set(snakedName, recipe);
}

export function deleteRecipe(state, recipeName) {
    const snakedName = snakeCase(recipeName);

    return state.remove(snakedName);
}

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

export function updateRecipeDirections(recipe, directions) {
    return recipe.update('directions', () => List(directions));
}