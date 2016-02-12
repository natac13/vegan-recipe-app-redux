import { createStore, applyMiddleware } from 'redux';
/*** Middlewares ***/
import logger from 'redux-logger';
import firebaseMiddleware from '../middlewares/firebaseMiddleware';
/*** Reducer ***/
import rootReducer from '../reducers/';


import { createHistory } from 'history';
import { syncHistory, routeReducer } from 'redux-simple-router';

export const history = createHistory();
// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(history);

const loggerMiddleware = logger();

const createStoreWithMiddleware = applyMiddleware(
    reduxRouterMiddleware,
    firebaseMiddleware,
    loggerMiddleware
)(createStore);

/*===========================================
=            Immutable Dev tools            =
===========================================*/

import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
installDevTools(Immutable);

/*=====  End of Immutable Dev tools  ======*/




export default function configureStore(initialState) {
    // applyMiddleware supercharges createStore with middleware:

    // We can use it exactly like “vanilla” createStore.
    return createStoreWithMiddleware(rootReducer, initialState);
}