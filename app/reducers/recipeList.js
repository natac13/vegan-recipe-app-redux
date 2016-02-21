import { fromJS, Map } from 'immutable';
import {
    RECIPE_ADD,
    RECIPE_DELETE,
    RECIPE_UPDATE,
    RECIPE_UPDATE_NAME,
    RECIPE_UPDATE_DIRECTIONS,
    RECIPE_UPDATE_INGREDIENTS,
    LIST_BUILD
} from '../constants/';

import {
    recipeAdd,
    recipeDelete,
    recipeUpdate,
    recipeUpdateName,
    recipeUpdateDirections,
    recipeUpdateIngredients
} from '../js/core';

import { convertFirebaseData } from '../js/formatting/database';
// import { mongoDataToImmutableMap } from '../js/database';

import { snakeCase } from '../js/core_helpers';
// sample file for now
var initialState = require('../../sample');

const recipeList = (state = Map(), action) => {
    switch (action.type) {
        case RECIPE_ADD:
            return recipeAdd(state, action.recipe);
        case RECIPE_DELETE:
            return recipeDelete(state, action.recipeName);
        case RECIPE_UPDATE:
            return recipeUpdate(state, action.oldRecipe, action.newRecipe);
        case RECIPE_UPDATE_NAME:
            return recipeUpdateName(state, action.oldName, action.newName);
        case RECIPE_UPDATE_DIRECTIONS:
            return state.update(snakeCase(action.recipeName), (recipe) => {
                return recipeUpdateDirections(recipe, action.directions);
            });
        case RECIPE_UPDATE_INGREDIENTS:
            return state.update(snakeCase(action.recipeName), (recipe) => {
                return recipeUpdateIngredients(recipe, action.ingredients);
            });
        case LIST_BUILD:
            return state.merge(convertFirebaseData(action.recipeList));
        default:
            return state;
    }
};

export default recipeList;
