import { combineReducers } from 'redux';
import { routeReducer }    from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';

import recipeList   from './recipeList';
import asyncRequest from './asyncRequest';

const rootReducer = combineReducers(Object.assign(
    {},
    {
        recipeList,
        asyncRequest
    },
    {
        routing: routeReducer,
        form: formReducer
    }

));

export default rootReducer;