import { createStore, applyMiddleware } from 'redux';
/*** Reducer ***/
import rootReducer from '../reducers/';

export default function configureStore(initialState) {

    return createStore(rootReducer, initialState);
}