import {
    REQUEST_DB,
    REQUEST_FAILED,
    REQUEST_SUCCESSFUL,
    SELECT_CATEGORY,
    RESET
} from '../constants/';

export function dbRequest() {
    return {
        type: REQUEST_DB
    };
}

export function failedRequest(err) {
    return {
        type: REQUEST_FAILED,
        payload: err || {},
        error: true
    };
}

export function successfulRequest() {
    return {
        type: REQUEST_SUCCESSFUL,
        error: false
    };
}

export function resetAsync() {
    return {
        type: RESET
    };
}
