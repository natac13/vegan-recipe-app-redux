import {
  failedRequest
} from '../actions/';

import { authToUser } from '../js/formatting/user';

/**
 * authenticate :: Fn -> Object -> Fn -> FireRef -> string -> promise
 * @param  {Function} next     the next function from the middleware arguments.
 * This function will send the given action down the chain of middlewares,
 * ending at the root reducer.
 * @param  {object}   action   action object which was originally dispatch from
 * the UI.
 * @param  {Function}   dispatch function to start a fresh dispatch cycle
 * @param  {Firebase Reference}   fireRef  See Firebase docs
 * @param  {String}   provider name of the provider being used for the
 * authentication with OAuth
 * @return {Promise}            Will be one of the success of failure promise
 * functions from the 'then' call off the firebase ref. Meaning a simple call
 * .then() on this return value on only need the first 'success' function.
 */
export function authenticate(next, dispatch, action, fireRef, provider) {
  return fireRef.authWithOAuthPopup(provider, {
    remember: 'sessionOnly'
  })
  .then(
    function loginSuccess(authData) {
      console.log(authData);

      const user = authToUser(authData);
      return next({
        ...action,
        payload: user
      });
    },
    function loginFailure(error) {
      return dispatch(failedRequest(error));
    });
}


export function sendRecipe(next, dispatch, action, dbPath, recipe) {
  return dbPath.set(recipe).then(
    function addSuccessful() {
      // once successful continue the action to be added
      return next(action);
    },
    function addFailure(error) {
      // if there was an error I will not continue with recipeAdd
      // but instead dispatch a failedRequest action, passing in
      // the error object.
      return dispatch(failedRequest(error));
    });
}