import {
    ADD_RECIPE,
    DELETE_RECIPE,
    UPDATE_RECIPE,
    UPDATE_RECIPE_NAME,
    UPDATE_RECIPE_DIRECTIONS,
    UPDATE_RECIPE_INGREDIENTS,
    BUILD_LIST
} from '../constants/';

// export { routeActions } from 'redux-simple-router';
import { routeActions } from 'redux-simple-router';
export const { push } = routeActions;

export function addRecipe(recipe) {
    return {
        type: ADD_RECIPE,
        recipe
    };
}

export function deleteRecipe(recipeName) {
    return {
        type: DELETE_RECIPE,
        recipeName
    };
}

export function updateRecipe(newRecipe, oldRecipe) {
    return {
        type: UPDATE_RECIPE,
        newRecipe,
        oldRecipe
    }
}

export function updateRecipeName(oldName, newName) {
    return {
        type: UPDATE_RECIPE_NAME,
        oldName,
        newName
    };
}

export function updateRecipeDirections(recipeName, directions) {
    return {
        type: UPDATE_RECIPE_DIRECTIONS,
        recipeName,
        directions
    };
}

export function updateIngredients(recipeName, ingredients) {
    return {
        type: UPDATE_RECIPE_INGREDIENTS,
        recipeName,
        ingredients
    };
}

/**
 * This action is tricky. It is called in RecipeList component without any args.
 * However my custom Firebase middleware will intercept this action and send
 * out a request for the data, via promise. Upon success the middleware will
 * call next on the data being returned by Firebase. Very similar to
 * Redux-Promise however the return value from Firebase is a snapshot which I
 * call .val() on to get the actual data.
 * @param  {object} recipeList From Firebase and therefore directions and
 *                             ingredients are strings
 * @return {object}
 */
export function buildList(recipeList) {
    return {
        type: BUILD_LIST,
        recipeList
    };
}










/*===============================
=            MongoDb            =
===============================*/

// export function buildList(recipeList) {
//     return {
//         type: types.BUILD_LIST,
//         recipeList
//     }
// }

// export function showError(error) {
//     return {
//         type: types.SHOW_ERROR,
//         error
//     }
// }

// import { fetchFromMongo } from '../js/database';

// export function getFullRecipeList() {
//     return function(dispatch, getState) {
//         return fetchFromMongo().then(
//             docs => dispatch(buildList(docs)),
//             error => dispatch(showError(error))
//         );
//     };
// }
//


/*=====  End of MongoDb  ======*/
