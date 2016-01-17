import React             from 'react';
import { render }        from 'react-dom';
import Router            from 'react-router';
import { Provider }      from 'react-redux';
import routes            from './config/routes';



import configureStore from './store/configureStore';
const store = configureStore();


/*===========================================
=            Immutable Dev tools            =
===========================================*/

import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
installDevTools(Immutable);

/*=====  End of Immutable Dev tools  ======*/



const rootElement = document.getElementById('root');
import { history } from './store/configureStore';



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
import { push } from './actions/';
// console.log(store.getState());
store.dispatch(push('/'));
// console.log(store.getState());


/*=====  End of gh-pages Hack  ======*/

render((
    <Provider store={store}>
        <Router history={history} >
            {routes}
        </Router>
    </Provider>
), rootElement);

