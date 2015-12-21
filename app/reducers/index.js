import { combineReducers } from 'redux';

import recipeList from './recipeList';

const rootReducer = combineReducers({
    recipeList
});

export default rootReducer;