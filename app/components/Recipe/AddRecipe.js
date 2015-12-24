import React, { Component, PropTypes } from 'react';

const TextField = require('material-ui/lib/text-field');

export default class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let { id, value } = event.target;
        console.log(value);
        console.log(id);
    }

    render() {
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
            </div>
        );
    }
}