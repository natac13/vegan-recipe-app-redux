import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';

import Main          from '../containers/Main';
import Home          from '../components/home/';
import RecipeList    from '../components/recipeList/';
import AddRecipe     from '../components/addRecipe/';
// import RecipeDetails from '../components/Recipe/RecipeDetails';


export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    <Route path="/recipes" component={RecipeList} />
        {/*<Route path="/recipes/:index" component={RecipeDetails} />*/}
    <Route path="/addNew" component={AddRecipe} />
  </Route>
);