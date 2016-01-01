import {
    REQUEST_RECIPES,
    FAILED_REQUEST,
    SUCCESSFUL_REQUEST,
    SELECT_CATEGORY
} from '../constants/';

export function requestRecipes() {
    return {
        type: REQUEST_RECIPES
    }
}

export function faildedRequest() {
    return {
        type: FAILED_REQUEST
    }
}

export function successfulRequest() {
    return {
        type: SUCCESSFUL_REQUEST
    }
}

