import React, { Component, PropTypes } from 'react';

const TextField = require('material-ui/lib/text-field');

export default class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <div className="">
                <form role="fore" className="" >
                <TextField
                    floatingLabelText="New Recipe Name"
                    onChange={this.handleChange} />

                </form>
            </div>
        );
    }
}