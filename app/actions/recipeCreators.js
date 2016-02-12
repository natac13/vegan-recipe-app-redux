import {
    RECIPE_ADD,
    RECIPE_DELETE,
    RECIPE_UPDATE,
    RECIPE_UPDATE_NAME,
    RECIPE_UPDATE_DIRECTIONS,
    RECIPE_UPDATE_INGREDIENTS,
    LIST_BUILD
} from '../constants/';

// export { routeActions } from 'redux-simple-router';
import { routeActions } from 'redux-simple-router';
export const { push } = routeActions;

export function recipeAdd(recipe) {
    return {
        type: RECIPE_ADD,
        recipe
    };
}

export function recipeDelete(recipeName) {
    return {
        type: RECIPE_DELETE,
        recipeName
    };
}

export function recipeUpdate(newRecipe, oldRecipe) {
    return {
        type: RECIPE_UPDATE,
        newRecipe,
        oldRecipe
    };
}

export function recipeUpdateName(oldName, newName) {
    return {
        type: RECIPE_UPDATE_NAME,
        oldName,
        newName
    };
}

export function recipeUpdateDirections(recipeName, directions) {
    return {
        type: RECIPE_UPDATE_DIRECTIONS,
        recipeName,
        directions
    };
}

export function recipeUpdateIngredients(recipeName, ingredients) {
    return {
        type: RECIPE_UPDATE_INGREDIENTS,
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
export function listBuild(recipeList) {
    return {
        type: LIST_BUILD,
        recipeList
    };
}










/*===============================
=            MongoDb            =
===============================*/

// export function listBuild(recipeList) {
//     return {
//         type: types.LIST_BUILD,
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
//             docs => dispatch(listBuild(docs)),
//             error => dispatch(showError(error))
//         );
//     };
// }
//


/*=====  End of MongoDb  ======*/
