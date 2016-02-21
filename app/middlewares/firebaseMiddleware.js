import {
  RECIPE_ADD,
  RECIPE_DELETE,
  RECIPE_UPDATE,
  RECIPE_UPDATE_NAME,
  RECIPE_UPDATE_DIRECTIONS,
  RECIPE_UPDATE_INGREDIENTS,
  LIST_BUILD,
  LOGIN,
  LOGOUT,
  LOGIN_ADMIN,
  LOGOUT_ADMIN,
  LOGIN_GOOGLE,
  LOGIN_GITHUB,
  LOGIN_TWITTER,
  LOGIN_FACEBOOK
} from '../constants/';

import {
  dbRequest,
  failedRequest,
  successfulRequest,
  push,
  login,
  logout
} from '../actions/';

import {
  authenticate,
  sendRecipe
} from './helpers';

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


import { authToUser } from '../js/formatting/user';
import { stringifyRecipe } from '../js/formatting/recipe';

/*=====  End of Formatting  ======*/

/*===========================================
=            Firebase Connection            =
===========================================*/

import Firebase from 'firebase';
const fp = new Firebase('https://vegan-recipes.firebaseio.com/');
const list = fp.child('recipeList');
const users = fp.child('users');
let authID;

/*=====  End of Firebase Connection  ======*/
/*** Save user to db  ***/
fp.onAuth((authData) => {
  console.log(authData);
  if (authData) {
    users.child(authData.uid).set(authToUser(authData));
    authID = authData.uid;
  }
});

/*==================================
=            MIDDLEWARE            =
==================================*/

const firebaseMiddleware = ({ dispatch, getState }) => (next) => {
  let firebaseRecipeList = {};


  return (action) => {
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
      return list.once('value')
      .then(
        function listSuccessful(snap)  {
          dispatch(successfulRequest());
          return next({ ...action, recipeList: snap.val() });
        },
        function listFialure(error) {
          dispatch(failedRequest(error));
        });
    }
    else if (action.type === RECIPE_ADD) {
      /*
      Recipe is from the AddRecipe Component state which is an immutable
      data structure.
      Becomes stringified to add to the DB.
       */
      let recipe = stringifyRecipe(action.recipe, authID);

      // create a child Firebase ref for the new recipe
      const snakedName = snakeCase(recipe.name);
      const recipeDBPath = list.child(snakedName);
      // Send to Firebase
      return sendRecipe(next, dispatch, action, recipeDBPath, recipe);

    }
    else if (action.type == RECIPE_UPDATE) {
      const { newRecipe, oldRecipe } = action;

      // find the child Firebase ref for the recipe to update
      // create a DBPath if deleted above
      const snakedName = snakeCase(newRecipe.get('name'));
      const recipeDBPath = list.child(snakedName);
      // Send to Firebase
      let recipe = stringifyRecipe(newRecipe, authID);

      /*
      Check if the recipe name has been changed from the original. This is
      important since the name is used as the key for the recipe in both
      the Firebase data structure and the Redux store.
       */
      if (newRecipe.get('name') !== oldRecipe.get('name')) {
        return list.child(snakeCase(oldRecipe.get('name'))).remove()
          .then(
            function removeSuccess() {
              return sendRecipe(next, dispatch, action, recipeDBPath, recipe);
            },
            function removeFailure(error) {
              console.log('User does not have privilege to write to this recipe');
              return dispatch(failedRequest(error));
            });
      }
      return sendRecipe(next, dispatch, action, recipeDBPath, recipe);

    } else if (action.type === LOGIN_ADMIN) {
      // this action is where I started with redux-actions and FSA
      const { username, password } = action.payload;
      return fp.authWithPassword({
        email: username,
        password
      }, { remember: 'sessionOnly' }).then(
        function loginSuccess(authData) {
          const user = authToUser(authData);
          return next({
            ...action,
            payload: user
          });
        },
        function loginFailure(error) {
          return dispatch(failedRequest(error));
        });

    } else if (action.type === LOGIN_GOOGLE) {
      return authenticate(next, dispatch, action, fp, 'google');
    } else if (action.type === LOGIN_GITHUB) {
      return authenticate(next, dispatch, action, fp, 'github');
    } else if (action.type === LOGIN_TWITTER) {
      return authenticate(next, dispatch, action, fp, 'twitter');
    } else if (action.type === LOGIN_FACEBOOK) {
      return authenticate(next, dispatch, action, fp, 'facebook');
    } else if (action.type === LOGOUT) {
      fp.unauth();
      return next(action);
    } else {
      const nextState = next(action);
      return nextState;

    }

  };
};

export default firebaseMiddleware;