import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';

import Main          from '../components/Main';
import Home          from '../components/Home';
// import RecipeList    from '../components/Recipe/RecipeList';
import AddRecipe     from '../components/Recipe/AddRecipe';
// import RecipeDetails from '../components/Recipe/RecipeDetails';


export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    {/*<Route path="/recipes" component={RecipeList} />
        <Route path="/recipes/:index" component={RecipeDetails} />*/}
    <Route path="/addNew" component={AddRecipe} />
  </Route>
);