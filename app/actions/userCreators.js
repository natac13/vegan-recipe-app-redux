import { createAction } from 'redux-actions';

import {
    LOGIN,
    LOGOUT
} from '../constants';

export const login  = createAction(LOGIN);
export const logout = createAction(LOGOUT);