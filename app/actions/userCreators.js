import { createAction } from 'redux-actions';

import {
    LOGIN,
    LOGOUT,
    LOGIN_ADMIN,
    LOGOUT_ADMIN
} from '../constants';

export const login  = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const loginAdmin  = createAction(LOGIN_ADMIN);
export const logourAdmin = createAction(LOGOUT_ADMIN);