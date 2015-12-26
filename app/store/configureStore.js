import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/';

export default function configureStore(initialState) {
    // applyMiddleware supercharges createStore with middleware:
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

    // We can use it exactly like “vanilla” createStore.
    return createStoreWithMiddleware(rootReducer);
}