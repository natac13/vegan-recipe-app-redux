import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware  from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/';

const loggerMiddleware = logger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);


export default function configureStore(initialState) {
    // applyMiddleware supercharges createStore with middleware:

    // We can use it exactly like “vanilla” createStore.
    return createStoreWithMiddleware(rootReducer, initialState);
}