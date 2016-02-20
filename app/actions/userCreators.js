import { createAction } from 'redux-actions';

import {
    LOGIN,
    LOGOUT,
    LOGIN_ADMIN,
    LOGOUT_ADMIN,
    LOGIN_GOOGLE,
    LOGIN_GITHUB,
    LOGIN_TWITTER,
    LOGIN_FACEBOOK
} from '../constants';

export const login  = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const loginAdmin  = createAction(LOGIN_ADMIN);
export const logoutAdmin = createAction(LOGOUT_ADMIN);
export const loginGoogle = createAction(LOGIN_GOOGLE);
export const loginGithub = createAction(LOGIN_GITHUB);
export const loginTwitter = createAction(LOGIN_TWITTER);
export const loginFacebook = createAction(LOGIN_FACEBOOK);