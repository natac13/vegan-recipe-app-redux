import React             from 'react';
import { render }        from 'react-dom';
import Router            from 'react-router';
import { createHistory } from 'history';
import routes            from './config/routes';

import { syncReduxAndRouter } from 'redux-simple-router'


import Main from './components/Main.js';


import configureStore from './store/configureStore';
const store = configureStore();
console.log(store.getState())
import './scss/main.scss';



const rootElement = document.getElementById('root');
const histroy = createHistory();
render((
  <Router history={history} >
    {routes}
  </Router>
), rootElement);

