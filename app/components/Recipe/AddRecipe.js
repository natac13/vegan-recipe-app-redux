import React, { Component, PropTypes } from 'react';
import { fromJS, Map } from 'immutable';

const TextField = require('material-ui/lib/text-field');
const Paper = require('material-ui/lib/paper');

import format from '../../js/format';

export default class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        const name = '';
        const ingredients = [];
        const directions = [];
        const x = {
            name,
            ingredients,
            directions
        };
        this.state = {
            data: fromJS(x)
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

    render() {
        console.log(this.state.data.has('name'));
        console.log(this.state.data.has('ingredients'));
        console.log(this.state.data.has('directions'));
        let outputDirections = this.state.data.get('directions').map((direction, index) => {
            return (
                <li key={index}> {direction}</li>
            )
        });

        let outputIngredients = this.state.data.get('ingredients').map((ingredient, index) => {
            return (
                <li>
                    <p>Item: {ingredient.get('item')} </p>
                    <p>Amount: {ingredient.get('amount')} </p>
                </li>
            )
        });
        return (
            <div className="">
                <form role="form" className="col span_4_of_8 recipe-input" >
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

                </form>
                <div className="col span_4_of_8 recipe-output">
                    <Paper zDepth={4} rounded={false}>
                        <p>Name: {this.state.data.get('name')}</p>
                        Directions:
                        <ul>
                            {outputDirections}
                        </ul>
                        Ingredients
                        <ul>
                            {outputIngredients}
                        </ul>

                    </Paper>

                </div>

            </div>
        );
    }
}