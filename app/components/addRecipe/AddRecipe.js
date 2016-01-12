import React, { Component, PropTypes } from 'react';
import { fromJS, Map } from 'immutable';

import format from '../../js/format';

/*** Components ***/
const TextField = require('material-ui/lib/text-field');
import LivePreview from '../livePreview/';
import Button from '../home/linkButton/';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/';

/*** styling ***/
import style from './style';


function mapStateToProps(state) {
    const { recipeList, asyncRequest, routing } = state;
    return {
        recipeList,
        asyncRequest,
        routing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch),
        dispatch
    };
}

class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            data: fromJS({
                name: '',
                ingredients: [],
                directions: []
            })
        };
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
        /**

            TODO:
            - add validation
            - Stop the addRecipeFirebase action if there is no name value!

         */
        this.props.actions.addRecipe(this.state.data);
        this.props.actions.pushPath('/recipes');
    }

    componentDidUpdate() {
        // console.log(this.props);
    }

    render() {
        const { data } = this.state;
        const name = data.get('name');
        const outputDirections = data.get('directions').map((direction, index) => {
            return (
                <li key={index}> {direction}</li>
            );
        });
        const outputIngredients = data.get('ingredients').map((ingredient, index) => {
            return (
                <li key={index}>
                    <p>Item: {ingredient.get('item')} </p>
                    <p>Amount: {ingredient.get('amount')} </p>
                </li>
            );
        });

        /*** override inline style ***/
        const styling = {
            width: '100%'
        };
        return (
            <div className={style.wrapper}>
                <form
                    role="form"
                    className={style.recipeInput}
                    ref="recipeForm">
                    <TextField
                        floatingLabelText="New Recipe Name"
                        onChange={this.handleChange}
                        id="name"
                        style={styling} />
                    <TextField
                        floatingLabelText="Ingredients"
                        onChange={this.handleChange}
                        id="ingredients"
                        style={styling} />
                    <TextField
                        floatingLabelText="Directions"
                        onChange={this.handleChange}
                        id="directions"
                        style={styling} />
                    <Button
                        onClick={this.handleSubmit}
                        label="Add New Recipe!" />
                    {/*<button
                        type="button"
                        onClick={this.handleSubmit}
                        className={style.submit}>
                        Submit</button>*/}
                </form>
                <LivePreview
                    className={style.livePreview}
                    name={name}
                    directions={outputDirections}
                    ingredients={outputIngredients} />


            </div>
        );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddRecipe);