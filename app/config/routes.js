import React from 'react';

import { Router, Route, IndexRoute } from 'react-router';
import Main          from '../containers/Main';
import Home          from '../components/home/';
import RecipeList    from '../components/recipeList/';
import AddRecipe     from '../components/addRecipe/';
import RecipeDetails from '../components/recipeDetails';
import EditRecipe    from '../components/editRecipe/';
import UserLogin     from '../components/userLogin/';


export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    <Route path="/recipes" component={RecipeList} />
        <Route path="/recipes/:key" component={RecipeDetails} />
    <Route path="/addNew" component={AddRecipe} />
    <Route path="/edit/:key" component={EditRecipe} />
    <Route path="/login" component={UserLogin} />
  </Route>
);