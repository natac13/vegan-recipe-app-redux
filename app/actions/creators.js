import * as types from '../constants/recipeTypes';


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