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

export function failedRequest() {
    return {
        type: REQUEST_FAILED
    };
}

export function successfulRequest() {
    return {
        type: REQUEST_SUCCESSFUL
    };
}

export function resetAsync() {
    return {
        type: RESET
    };
}
