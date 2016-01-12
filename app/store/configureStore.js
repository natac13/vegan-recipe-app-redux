import { createStore, applyMiddleware } from 'redux';
/*** Middlewares ***/
import thunkMiddleware  from 'redux-thunk';
import logger from 'redux-logger';
import firebaseMiddleware from '../middlewares/firebaseMiddleware';
/*** Reducer ***/
import rootReducer from '../reducers/';

const loggerMiddleware = logger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
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