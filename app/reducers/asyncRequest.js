import { fromJS, Map } from 'immutable';
import R from 'ramda';
import {
    boolUpdater
} from '../js/immunurry';

import {
    REQUEST_DB,
    SELECT_CATEGORY,
    REQUEST_FAILED,
    REQUEST_SUCCESSFUL,
    RESET
} from '../constants/';

const initialState = fromJS({
    fetching: false,
    didFail: false,
    success: false
});


/**
 * Functions that is looking for a state immutable map to run update on
 */
const fetchingData = boolUpdater('fetching', true);
const noFetching   = boolUpdater('fetching', false);
const didSucceed   = boolUpdater('success', true);
const noSuccess    = boolUpdater('success', false);
const failedData   = boolUpdater('didFail', true);
const noFail       = boolUpdater('didFail', false);

export const request  = R.compose(fetchingData, noFail, noSuccess);
export const success  = R.compose(noFetching, noFail, didSucceed);
export const failed   = R.compose(failedData, noFetching, noSuccess);


const asyncRequest = (state=initialState, action) => {
    switch (action.type) {
        case REQUEST_DB:
            return request(state);
        case REQUEST_FAILED:
            return failed(state);
        case REQUEST_SUCCESSFUL:
            return success(state);
        case RESET:
            return initialState;
        default:
            return state;
    }
};

export default asyncRequest;