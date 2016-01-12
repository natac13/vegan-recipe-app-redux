import { createStore, applyMiddleware } from 'redux';
/*** Middlewares ***/
import firebaseMiddleware from '../middlewares/firebaseMiddleware';
/*** Reducer ***/
import rootReducer from '../reducers/';

const createStoreWithMiddleware = applyMiddleware(
    firebaseMiddleware
)(createStore);

export default function configureStore(initialState) {
    // applyMiddleware supercharges createStore with middleware:

    // We can use it exactly like “vanilla” createStore.
    return createStoreWithMiddleware(rootReducer, initialState);
}