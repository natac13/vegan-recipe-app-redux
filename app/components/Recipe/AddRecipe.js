import React, { Component, PropTypes } from 'react';
import { fromJS, Map } from 'immutable';

const TextField = require('material-ui/lib/text-field');
const Paper = require('material-ui/lib/paper');

import format from '../../js/format';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../../actions/creators';


function mapStateToProps(state) {
    const { recipeList, routing } = state;
    return {
        recipeList,
        routing
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch),
        dispatch
    }
}

class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const name = '';
        const ingredients = [];
        const directions = [];
        // console.log(this.props);
        this.state = {
            data: fromJS({
                name,
                ingredients,
                directions
            })
        }
    }

    handleChange(event) {
        let { id: property, value } = event.target;
        let formatter = format(property);
        const data = formatter(value);


        this.setState({
            data: this.state.data.set(property, data)
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, directions, ingredients } = event.target
        const recipe = {
            name: name.value,
            directions: directions.value,
            ingredients: ingredients.value
        };
        this.props.actions.addRecipe(recipe);
    }

    componentDidUpdate() {
        console.log(this.props)
    }

    render() {
        let outputDirections = this.state.data.get('directions').map((direction, index) => {
            return (
                <li key={index}> {direction}</li>
            );
        });

        let outputIngredients = this.state.data.get('ingredients').map((ingredient, index) => {
            return (
                <li key={index}>
                    <p>Item: {ingredient.get('item')} </p>
                    <p>Amount: {ingredient.get('amount')} </p>
                </li>
            );
        });

        let list = this.props.recipeList.map((recipe, index) =>{
            return (
                <li key={index}>
                    <p> recipe name {recipe.get('name')}</p>
                </li>
            );
        });
        return (
            <div className="">
                <form
                    role="form"
                    className="col span_4_of_8 recipe-input"
                    onSubmit={this.handleSubmit} >
                <TextField
                    floatingLabelText="New Recipe Name"
                    onChange={this.handleChange}
                    id="name" />
                <TextField
                    floatingLabelText="Directions"
                    onChange={this.handleChange}
                    id="directions" />
                <TextField
                    floatingLabelText="Ingredients"
                    onChange={this.handleChange}
                    id="ingredients" />
                    <button type="submit" >Submit</button>
                </form>
                <div className="col span_4_of_8 recipe-output">
                    <Paper zDepth={4} rounded={false}>
                        <p>Name!!!: {this.state.data.get('name')}</p>
                        Directions:
                        <ul>
                            {outputDirections}
                        </ul>
                        Ingredients
                        <ul>
                            {outputIngredients}
                        </ul>

                    </Paper>
                    <ul>
                    {list}
                    </ul>
                </div>

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddRecipe);