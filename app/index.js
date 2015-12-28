import React             from 'react';
import { render }        from 'react-dom';
import Router            from 'react-router';
import { Provider }      from 'react-redux';
import { createHistory } from 'history';
import routes            from './config/routes';

import { syncReduxAndRouter } from 'redux-simple-router'


import configureStore from './store/configureStore';
const store = configureStore();



const rootElement = document.getElementById('root');
const history = createHistory();

syncReduxAndRouter(history, store);

/*=====================================
=            gh-pages Hack            =
=======================================
 * When pushing to gh-pages I got an error about not finding the route for
 * vegan-recipe-app-redux which is the name of the repo. I did a console.log
 * of the state to find that it was trying to be the path which is used by
 * react-router. This does not mathc anything in the config/routes.js file so
 * I guessed at just using pushPath to reset the URL which works but I do think
 * there has to be a better way. However I got this working.
 */
import { pushPath } from './actions/creators';
// console.log(store.getState());
store.dispatch(pushPath('/'));
// console.log(store.getState());


/*=====  End of gh-pages Hack  ======*/

render((
    <Provider store={store}>
        <Router history={history} >
            {routes}
        </Router>
    </Provider>
), rootElement);

