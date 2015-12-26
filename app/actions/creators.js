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
import Rebase from 're-base';

export function getRecipeListFirebase(context) {
    return function(dispatch, getState) {
        let base = Rebase.createClass('https://vegan-recipes.firebaseio.com/');
        base.fetch('recipeList', {
            context: context,
            asArray: false,
            then: (data) => {
                dispatch(buildList(data));
            }
        });
        return Promise.resolve()
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
