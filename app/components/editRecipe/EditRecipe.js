import React, { Component, PropTypes } from 'react';
import { fromJS, Map } from 'immutable';

import format, {
    stringifyRecipe
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
            data: props.recipeList.get(key)
        };
    }

    componentWillMount() {

    }

    handleChange(event) {
        let { id: property, value } = event.target;
        const data = format(property)(value);


        this.setState({
            data: this.state.data.set(property, data)
        });
    }

    handleSubmit(event) {
        const { key } = this.props.routeParams;
        event.preventDefault();
        /**

            TODO:
            - add validation
            - Stop the addRecipeFirebase action if there is no name value!

         */
        this.props.actions.updateRecipe(this.state.data, this.props.recipeList.get(key));
        // pushPath to recipe/:the name of recipe
        // this.props.actions.pushPath('/');
    }

    render() {
        const { data } = this.state;

        const { name, ingredients, directions } = stringifyRecipe(data);
        const outputDirections = data.get('directions').map((direction, index) => {
            return (
                <li key={index}> {direction}</li>
            );
        });
        const outputIngredients = data.get('ingredients').map((ingredient, index) => {
            return (
                <li key={index}>
                    {/*<p>Item: {ingredient.get('item')} </p>
                    <p>Amount: {ingredient.get('amount')} </p>*/}
                    <p>{ingredient.get('amount')} - {ingredient.get('item')}</p>
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
                    {/*<button
                        type="button"
                        onClick={this.handleSubmit}
                        className={style.submit}>
                        Submit Changes</button>*/}
                    <Button
                        onClick={this.handleSubmit}
                        label="Submit Changes" />
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
