import {
    ADD_RECIPE,
    DELETE_RECIPE,
    UPDATE_RECIPE,
    UPDATE_RECIPE_NAME,
    UPDATE_RECIPE_DIRECTIONS,
    UPDATE_RECIPE_INGREDIENTS,
    BUILD_LIST
} from '../constants/';

import {
    dbRequest,
    failedRequest,
    successfulRequest
} from '../actions/asyncCreators';

/*==================================
=            Formatting            =
==================================*/

import {
    snakeCase,
    snakedNameOf
} from '../js/core_helpers';

import {
    recipeExtras
} from '../js/core';


import {
    stringifyRecipe,
    properRecipeFormat
} from '../js/format';

/*=====  End of Formatting  ======*/

/*===========================================
=            Firebase Connection            =
===========================================*/

import Firebase from 'firebase';
import Fireproof from 'fireproof';
const fireRef = new Firebase('https://vegan-recipes.firebaseio.com/');
const fp = new Fireproof(fireRef);
const list = fp.child('recipeList');

/*=====  End of Firebase Connection  ======*/



const firebaseMiddleware = ({ dispatch, getState }) => next => {
    let firebaseRecipeList = {};



    return action => {
        /*
        When I call the buildList action from RecipeList.js the middleware will
        intercept and create the actions signature that I first had. ~~Because I
        dispatch the same action.type the I need to check action.recipeList
        is undefined or I get an infinite loop~~ Instead just call next which is
        the same as dispatch except for the fact it just continues down the
        middleware chain to the store/reducer. The dispatch will start the
        cycle from the beginner forcing me into the check with undefined.
         */
        if (action.type === BUILD_LIST) {
            dispatch(dbRequest());
            return list.then(
                snap => {
                    dispatch(successfulRequest());
                    return next({...action, recipeList: snap.val()});
                },
                error => {
                    dispach(failedRequest());
                });
        }
        else if (action.type === ADD_RECIPE) {
            /*
            Recipe is from the AddRecipe Component state which is an immutable
            data structure.
            Becomes stringified to add to the DB.
             */
            let recipe = stringifyRecipe(action.recipe);
            // create a child Firebase ref for the new recipe
            const snakedName = snakeCase(recipe.name);
            const recipeDBPath = list.child(snakedName);
            // Send to Firebase
            recipeDBPath.set(recipe).then(
                () => console.log('fb success'),
                err => console.log(err, 'Error adding the recipe to Firebase')
            );

            // Continue flow to the reducer so the recipe is added to the store.
            return next(action);
        }
        else if (action.type == UPDATE_RECIPE) {
            const { newRecipe, oldRecipe } = action;
            /*
            Check if the recipe name has been changed from the original. This is
            important since the name is used as the key for the recipe in both
            the Firebase data structure and the Redux store.
             */
            if (newRecipe.get('name') !== oldRecipe.get('name')) {
                list.child(snakeCase(oldRecipe.get('name'))).remove();
            }

            // find the child Firebase ref for the recipe to update
            // create a DBPath if deleted above
            const snakedName = snakeCase(newRecipe.get('name'));
            const recipeDBPath = list.child(snakedName);
            // Send to Firebase
            let recipe = stringifyRecipe(newRecipe);
            recipeDBPath.set(recipe).then(
                () => console.log('fb success'),
                err => console.log(err, 'Error updaing the recipe to Firebase')
            );

            return next(action);
        }

        const nextState = next(action);
        return nextState;
    };
};

export default firebaseMiddleware;