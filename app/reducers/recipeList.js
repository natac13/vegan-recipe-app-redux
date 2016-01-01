import { fromJS, Map } from 'immutable';
import {
    ADD_RECIPE,
    DELETE_RECIPE,
    UPDATE_RECIPE_NAME,
    UPDATE_RECIPE_DIRECTIONS,
    UPDATE_RECIPE_INGREDIENTS,
    BUILD_LIST
} from '../constants/';

import {
    addRecipe,
    deleteRecipe,
    updateRecipeName,
    updateRecipeDirections,
    updateRecipeIngredients,
    convertFirebaseData
} from '../js/core';

// import { mongoDataToImmutableMap } from '../js/database';

import { snakeCase } from '../js/core_helpers';
// sample file for now
var initialState = require("../../sample");

const recipeList = (state = Map(), action) => {
    switch (action.type) {
        case ADD_RECIPE:
            return addRecipe(state, action.recipe);
        case DELETE_RECIPE:
            return deleteRecipe(state, action.recipeName);
        case UPDATE_RECIPE_NAME:
            return updateRecipeName(state, action.oldName, action.newName);
        case UPDATE_RECIPE_DIRECTIONS:
            return state.update(snakeCase(action.recipeName), (recipe) => {
                return updateRecipeDirections(recipe, action.directions);
            });
        case UPDATE_RECIPE_INGREDIENTS:
            return state.update(snakeCase(action.recipeName), (recipe) => {
                return updateRecipeIngredients(recipe, action.ingredients);
            });
        case BUILD_LIST:
            return state.merge(convertFirebaseData(action.recipeList));
        default:
            return state;
    }
};

export default recipeList;
