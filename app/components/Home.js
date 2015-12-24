import React, { Component } from 'react';
import { Link }             from 'react-router';

const FlatButton = require('material-ui/lib/flat-button');



export default class Home extends Component{
    render(){
        return (
          <div className="">

                <Link to={`/recipes`}> Go See the List of Recipes</Link>





                <Link to={`/addnew`}> Add New Recipe </Link>




          </div>
        );
    }
}
