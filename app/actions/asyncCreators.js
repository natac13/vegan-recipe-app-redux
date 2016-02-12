import {
    DB_REQUEST,
    FAILED_REQUEST,
    SUCCESSFUL_REQUEST,
    SELECT_CATEGORY,
    RESET
} from '../constants/';

export function dbRequest() {
    return {
        type: DB_REQUEST
    };
}

export function failedRequest() {
    return {
        type: FAILED_REQUEST
    };
}

export function successfulRequest() {
    return {
        type: SUCCESSFUL_REQUEST
    };
}

export function resetAsync() {
    return {
        type: RESET
    };
}
