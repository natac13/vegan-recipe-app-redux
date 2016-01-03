import React, { Component, PropTypes } from 'react';
import { fromJS, Map } from 'immutable';

import format, {
    stringifyRecipeArrays
} from '../../js/format';

/*** Components ***/
const TextField = require('material-ui/lib/text-field');
import LivePreview from '../livePreview/';
import Button from '../home/linkButton/';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/';

/*** styling ***/
import style from './style';

export class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const { key } = props.routeParams;
        this.state = {
            recipe: props.recipeList.get(key)
        };
    }

    componentWillMount() {
        console.log('The recipe in state');
        console.log(this.state.recipe);
    }

    handleChange(event) {
        let { id: property, value } = event.target;
        const data = format(property)(value);


        this.setState({
            recipe: this.state.recipe.set(property, data)
        });
    }

    handleSubmit(event) {
        const { key } = this.props.routeParams;
        event.preventDefault();
        const { recipe } = this.state;
        console.log('state');
        console.log(recipe.get('name'));
        const name = recipe.get('name');
        const { ingredients, directions } = stringifyRecipeArrays(
                                                recipe.get('ingredients'),
                                                recipe.get('directions')
                                            );

        const recipeState = {
            name: name,
            ingredients: ingredients,
            directions: directions
        };
        /**

            TODO:
            - add validation
            - Stop the addRecipeFirebase action if there is no name value!

         */
        /***************
        The update works for name but the store does not get updated yet
        ****************/
        this.props.actions.updateRecipeFirebase(recipeState, this.props.recipeList.get(key));
        // pushPath to recipe/:the name of recipe
        this.props.actions.pushPath('/');
    }

    render() {
        const { recipe } = this.state;


        const name = recipe.get('name');
        const { ingredients, directions } = stringifyRecipeArrays(
                                                recipe.get('ingredients'),
                                                recipe.get('directions')
                                            );
        const outputDirections = recipe.get('directions').map((direction, index) => {
            return (
                <li key={index}> {direction}</li>
            );
        });
        const outputIngredients = recipe.get('ingredients').map((ingredient, index) => {
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
                    ref="recipeUpdate">
                    <TextField
                        floatingLabelText="Name"
                        defaultValue={name}
                        onChange={this.handleChange}
                        id="name"
                        style={styling} />
                    <TextField
                        floatingLabelText="Ingredients"
                        defaultValue={ingredients}
                        onChange={this.handleChange}
                        id="ingredients"
                        style={styling} />
                    <TextField
                        floatingLabelText="Directions"
                        defaultValue={directions}
                        onChange={this.handleChange}
                        id="directions"
                        style={styling} />
                    <button
                        type="button"
                        onClick={this.handleSubmit}
                        className={style.submit}>
                        Submit Changes</button>
                    {/*<Button
                        onClick={this.handleSubmit}
                        label="Submit Changes" />*/}
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


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditRecipe);
