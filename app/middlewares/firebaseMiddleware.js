import {
    ADD_RECIPE,
    DELETE_RECIPE,
    UPDATE_RECIPE_NAME,
    UPDATE_RECIPE_DIRECTIONS,
    UPDATE_RECIPE_INGREDIENTS,
    BUILD_LIST
} from '../constants/';

import {
    requestRecipes,
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
    recipeExtras,
    properRecipeFormat
} from '../js/core';

import { stringifyRecipe } from '../js/format';

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
            dispatch(requestRecipes());
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
            let recipe = stringifyRecipe(action.recipe);
            // create a child Firebase ref for the new recipe
            const snakedName = snakeCase(recipe.name);
            const recipeDBPath = list.child(snakedName);
            recipeDBPath.set(recipe).then(
                () => console.log('fb success'),
                err => console.log(err)
            );
            return next(action);

        }

        const nextState = next(action);
        return nextState;
    };
};

export default firebaseMiddleware;