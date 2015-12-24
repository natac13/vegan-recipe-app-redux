import React             from 'react';
import { render }        from 'react-dom';
import Router            from 'react-router';
import { Provider }      from 'react-redux';
import { createHistory } from 'history';
import routes            from './config/routes';

import { syncReduxAndRouter } from 'redux-simple-router'


import configureStore from './store/configureStore';
const store = configureStore();
import './scss/main.scss';



const rootElement = document.getElementById('root');
const history = createHistory();

syncReduxAndRouter(history, store);


render((
    <Provider store={store}>
        <Router history={history} >
            {routes}
        </Router>
    </Provider>
), rootElement);

