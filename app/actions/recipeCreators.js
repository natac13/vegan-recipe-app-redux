import {
    ADD_RECIPE,
    DELETE_RECIPE,
    UPDATE_RECIPE_NAME,
    UPDATE_RECIPE_DIRECTIONS,
    UPDATE_RECIPE_INGREDIENTS,
    BUILD_LIST
} from '../constants/';

export { pushPath } from 'redux-simple-router';

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


/*======================================
=            Firebase setup            =
======================================*/
import Firebase from 'firebase';
import Fireproof from 'fireproof';
const fireRef = new Firebase('https://vegan-recipes.firebaseio.com/');
const fp = new Fireproof(fireRef);
const list = fp.child('recipeList');
/*=====  End of Firebase setup  ======*/

/*=====================================
=            asyncCreators            =
=====================================*/

import {
    requestRecipes,
    failedRequest,
    successfulRequest
} from './asyncCreators';

/*=====  End of asyncCreators  ======*/


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

import {
    snakeCase,
    snakedNameOf
} from '../js/core_helpers';
import {
    recipeExtras,
    properRecipeFormat
} from '../js/core';


/**
 * Recipe in string format with directions and ingredients
 * @param  {object} recipe
 */
export function updateRecipeFirebase(recipe, oldRecipe) {
    return (dispatch, getState) => {
        // different name remove out dbPath
        if (recipe.name !== oldRecipe.get('name')) {
            list.child(snakeCase(oldRecipe.get('name'))).remove();
        }


        // find the child Firebase ref for the recipe to update
        // create a DBPath if deleted above
        const snakedName = snakeCase(recipe.name);
        const dbPath = list.child(snakedName);


        return dbPath.set(recipe).then(function() {
            const realFormatRecipe = properRecipeFormat(recipe);
            if (!!realFormatRecipe) {
                dispatch(updateRecipeName(oldRecipe.get('name'), realFormatRecipe.name));
                dispatch(updateRecipeDirections(recipe.name, realFormatRecipe.directions));
                dispatch(updateIngredients(recipe.name, realFormatRecipe.ingredients));
            }
            // check that there is a recipe coming back from formatting
            // if (!!realFormatRecipe) dispatch(addRecipe(realFormatRecipe));
        });
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
