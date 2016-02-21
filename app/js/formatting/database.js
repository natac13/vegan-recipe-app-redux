import R from 'ramda';
import { fromJS } from 'immutable';
import { properRecipeFormat } from './recipe';

/**
 * Will take in the recipeList from Firebase and convert to the recipeList to
 * save in the redux store.
 * From Firebase the recipe object's directions and ingredients are strings.
 * Therefore this function will convert them to an array of string directions
 * and an array of ingredient object
 * @param  {object} recipeList  From Firebase
 * @return {Immutable Map} spread out the recipe first then override the name,
 * directions and ingredient properties with proper format after format function
 */
export const convertFirebaseData = R.compose(fromJS,
                                            R.map(properRecipeFormat));
