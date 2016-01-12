import {
    DB_REQUEST,
    FAILED_REQUEST,
    SUCCESSFUL_REQUEST,
    SELECT_CATEGORY
} from '../constants/';

export function dbRequest() {
    return {
        type: DB_REQUEST
    }
}

export function faildedRequest() {
    return {
        type: FAILED_REQUEST
    }
}

export function successfulRequest() {
    return {
        type: SUCCESSFUL_REQUEST
    }
}

