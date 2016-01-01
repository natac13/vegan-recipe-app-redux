import R from 'ramda';

/*========================================================
=            Curried versions of immutable.js            =
========================================================*/

export const boolUpdater = R.curry((what, toBool, state) => {
    return state.update(what, (what) => toBool)
});

export const getter = R.curry((what, state) => {
    return state.get(what);
});

export const deleter = R.curry((what, state) => {
    return state.delete(what);
});

export const sizer = R.curry(state => {
    return state.size();
});


/*=====  End of Curried versions of immutable.js  ======*/

