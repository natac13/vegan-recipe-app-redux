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
            dispatch(buildList(snap.val()));
        });
    }
}

import { recipeExtras } from '../js/core';
import { snakeCase } from '../js/core_helpers';

export function addRecipeFirebase(recipe) {
    return function (dispatch, getState) {
        const snakedName = snakeCase(recipe.name);
        const buffedRecipe = recipeExtras(recipe).toObject();
        return list.child(snakedName).set(buffedRecipe).then(function() {
            dispatch(addRecipe(recipe));
        });

    }
}

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
