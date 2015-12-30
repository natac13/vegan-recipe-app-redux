import * as types from '../constants/recipeTypes';

export { pushPath } from 'redux-simple-router'

export function addRecipe(recipe) {
    return {
        type: types.ADD_RECIPE,
        recipe
    };
}

export function deleteRecipe(recipeName) {
    return {
        type: types.DELETE_RECIPE,
        recipeName
    };
}

export function updateRecipeName(oldName, newName) {
    return {
        type: types.UPDATE_RECIPE_NAME,
        oldName,
        newName
    };
}

export function updateRecipeDirections(recipeName, directions) {
    return {
        type: types.UPDATE_RECIPE_DIRECTIONS,
        recipeName,
        directions
    };
}

export function updateIngredients(recipeName, ingredients) {
    return {
        type: types.UPDATE_RECIPE_INGREDIENTS,
        recipeName,
        ingredients
    };
}

import Firebase from 'firebase';
import Fireproof from 'fireproof';
const fireRef = new Firebase('https://vegan-recipes.firebaseio.com/');
const fp = new Fireproof(fireRef);
const list = fp.child('recipeList');


export function getRecipeListFirebase(context) {
    return function(dispatch, getState) {
        // list.once('value', function(snapShot) {
        //     dispatch(buildList(snapShot.val()))
        // })
        // return Promise.resolve()
        return list.then(function(snap) {
            // NOTE: recipeList in firebase format through buildList
            // Convert in the reducer
            dispatch(buildList(snap.val()));
        });
    }
}

import {
    recipeExtras,
    properRecipeFormat
} from '../js/core';
import { snakeCase } from '../js/core_helpers';

/**
 * This recipe is from the user input and is in the string format for directions
 * and the ingredients
 *
 * Need to add checks for if no name property on the recipe coming in.
 * If this is the case do not send to firebase or the redux store!
 */
export function addRecipeFirebase(recipe) {
    return function (dispatch, getState) {
        // create a child Firebase ref for the new recipe
        const snakedName = snakeCase(recipe.name);
        const dbPath = list.child(snakedName);


        // the recipe will get a different uuid for firebase and the store.
        let buffedRecipe = recipeExtras(recipe).toObject();

        return dbPath.set(buffedRecipe).then(function() {
            // By passing the buffedRecipe to addRecipe I let recipeExtras see
            // the recipe object already has a created_date and id. Therefore
            // using them instead of creating new versions.

            const realFormatRecipe = properRecipeFormat(buffedRecipe)
            // check that there is a recipe coming back from formatting
            if (!!realFormatRecipe) dispatch(addRecipe(realFormatRecipe));
        });

    }
}

/**
 * currently the recipeList going through this action creator is in Firebase
 * format. So the directions and ingredients are strings. The reducer function
 * will handle the conversion.
 * @param  {object} recipeList From Firebase
 * @return {object}            Action object for the reducer function recipeList
 */
export function buildList(recipeList) {
    return {
        type: types.BUILD_LIST,
        recipeList
    }
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
