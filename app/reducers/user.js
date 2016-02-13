import { Map } from 'immutable';

import {
    LOGIN,
    LOGOUT,
    LOGIN_ADMIN,
    LOGOUT_ADMIN
} from '../constants/';

const initialState = Map({

});

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return ;
        case LOGOUT:
            return ;
        case LOGIN_ADMIN:
            return ;
        case LOGOUT_ADMIN:
            return ;
        default:
            return state;
    }
};

export default user;