import React      from 'react';
import { render } from 'react-dom';
import Router     from 'react-router';
import routes     from './config/routes';

import './scss/main.scss';


const rootElement = document.getElementById('app');

render((
  <Router>
    {routes}
  </Router>
), rootElement);