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
 * currently the recipeList going through this action creator is in Firebase
 * format. So the directions and ingredients are strings. The reducer function
 * will handle the conversion.
 * @param  {object} recipeList From Firebase
 * @return {object}            Action object for the reducer function recipeList
 */
export function buildList(recipeList) {
    return {
        type: BUILD_LIST,
        recipeList
    };
}


export function getRecipeListFirebase() {
    return function(dispatch, getState) {
        dispatch(requestRecipes());
        return list.then(function successFB(snap) {
            dispatch(successfulRequest());
            // NOTE: recipeList in firebase format through buildList
            // Convert in the reducer
            dispatch(buildList(snap.val()));
        }, function failFB() {
            dispatch(failedRequest());
        });
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
 * This recipe is from the user input and is in the string format for directions
 * and the ingredients
 *
 * Need to add checks for if no name property on the recipe coming in.
 * If this is the case do not send to firebase or the redux store!
 */
export function addRecipeFirebase(recipe) {
    return (dispatch) => {
        // create a child Firebase ref for the new recipe
        const snakedName = snakeCase(recipe.name);
        const dbPath = list.child(snakedName);


        // the recipe will get a different uuid for firebase and the store.
        let buffedRecipe = recipeExtras(recipe).toObject();
        const realFormatRecipe = properRecipeFormat(buffedRecipe);
        // check that there is a recipe coming back from formatting
        if (!!realFormatRecipe) dispatch(addRecipe(realFormatRecipe));
        return dbPath.set(buffedRecipe).then(function() {
            // By passing the buffedRecipe to addRecipe I let recipeExtras see
            // the recipe object already has a created_date and id. Therefore
            // using them instead of creating new versions.

            const realFormatRecipe = properRecipeFormat(buffedRecipe);
            // check that there is a recipe coming back from formatting
            if (!!realFormatRecipe) dispatch(addRecipe(realFormatRecipe));
        });

    };
}
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
