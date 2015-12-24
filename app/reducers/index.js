import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router'

import recipeList from './recipeList';

const rootReducer = combineReducers(Object.assign({}, {
    recipeList
}, {
    routing: routeReducer
}));

export default rootReducer;