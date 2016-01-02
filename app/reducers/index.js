import { combineReducers } from 'redux';
import { routeReducer }    from 'redux-simple-router';

import recipeList   from './recipeList';
import asyncRequest from './asyncRequest';

const rootReducer = combineReducers(Object.assign(
    {},
    {
        recipeList,
        asyncRequest
    },
    {
        routing: routeReducer
    }
));

export default rootReducer;