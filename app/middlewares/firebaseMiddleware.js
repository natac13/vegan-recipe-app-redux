import { routeActions } from 'redux-simple-router';
import {
    RECIPE_ADD,
    RECIPE_DELETE,
    RECIPE_UPDATE,
    RECIPE_UPDATE_NAME,
    RECIPE_UPDATE_DIRECTIONS,
    RECIPE_UPDATE_INGREDIENTS,
    LIST_BUILD,
    LOGIN
} from '../constants/';

import {
    dbRequest,
    failedRequest,
    successfulRequest
} from '../actions/';

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
        When I call the listBuild action from RecipeList.js the middleware will
        intercept and create the actions signature that I first had. ~~Because I
        dispatch the same action.type the I need to check action.recipeList
        is undefined or I get an infinite loop~~ Instead just call next which is
        the same as dispatch except for the fact it just continues down the
        middleware chain to the store/reducer. The dispatch will start the
        cycle from the beginner forcing me into the check with undefined.
         */
        if (action.type === LIST_BUILD) {
            dispatch(dbRequest());
            return list.then(
                snap => {
                    dispatch(successfulRequest());
                    return next({ ...action, recipeList: snap.val() });
                },
                error => {
                    dispatch(failedRequest());
                });
        }
        else if (action.type === RECIPE_ADD) {
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
            return recipeDBPath.set(recipe).then(
                function addSuccessful() {
                    console.log('fb success');
                    // once successful continue the action to be added
                    return next(action);
                },
                function addFailure(err) {
                    console.log(err, 'Error adding the recipe to Firebase');
                    // if there was an error I will not continue with recipeAdd
                    // but instead send an error action.
                    dispatch(failedRequest());
                    // dispatch(routeActions.push('/recipes'))
                    return next(action);
                }
            );

        }
        else if (action.type == RECIPE_UPDATE) {
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
            return recipeDBPath.set(recipe).then(
                function updateSuccessful() {
                    console.log('fb success');
                    return next(action);
                },
                function updateFailure(err) {
                    console.log(err, 'Error updating the recipe to Firebase');
                    dispatch(failedRequest());
                    return next(action);
                }
            );

        } else if (action.type == LOGIN) {
            // this action is where I started with redux-actions and FSA
            const { username, password } = action.payload;
            fp.authWithPassword({
                email: username,
                password
            }, { remember: 'sessionOnly' })
                .then((authData) => {
                    console.log('Admin login good');
                    console.log(authData);
                });
            return next(action);
        } else {
            const nextState = next(action);
            return nextState;

        }

    };
};

export default firebaseMiddleware;