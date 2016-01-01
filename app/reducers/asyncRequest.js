import { fromJS, Map } from 'immutable';
import R from 'ramda';
import {
    boolUpdater
} from '../js/immunurry';

import {
    REQUEST_RECIPES,
    SELECT_CATEGORY,
    FAILED_REQUEST,
    SUCCESSFUL_REQUEST
} from '../constants/';

const initialState = Map({
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

export const request = R.compose(fetchingData, noFail, noSuccess);
export const success = R.compose(noFetching, noFail, didSucceed);
export const failed  = R.compose(failedData, noFetching, noSuccess);

const asyncRequest = (state=initialState, action) => {
    switch (action.type) {
        case REQUEST_RECIPES:
            return request(state);
        case FAILED_REQUEST:
            return failed(state);
        case SUCCESSFUL_REQUEST:
            return success(state);
        default:
            return state;
    }
}

export default asyncRequest;