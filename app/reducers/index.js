import { combineReducers } from 'redux';
import { routeReducer }    from 'redux-simple-router';

import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
installDevTools(Immutable);

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