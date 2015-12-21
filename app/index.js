import React      from 'react';
import { render } from 'react-dom';
import Router     from 'react-router';
// import routes     from './config/routes';
import Main from './components/Main.js';

// import './scss/main.scss';


const rootElement = document.getElementById('root');

// render((
//   <Router>
//     {routes}
//   </Router>
// ), rootElement);
//
render((
    <Main />
    ), rootElement);