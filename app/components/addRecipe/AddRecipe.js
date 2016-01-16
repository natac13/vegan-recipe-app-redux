import React, { Component, PropTypes } from 'react';
import { fromJS, Map } from 'immutable';

import moment from 'moment';
import uuid from 'node-uuid';

import format from '../../js/format';
import { snakedNameOf } from '../../js/core_helpers';

/*** Components ***/
const TextField = require('material-ui/lib/text-field');
import LivePreview from '../livePreview/';
import Button from '../home/linkButton/';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/';

/*** styling ***/
import style from './style';
import * as colors from '../../scss/colors';


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
        const thisMonth = moment().format('MMMM YYYY');
        this.state = {
            data: fromJS({
                id: uuid.v4(),
                created_date: thisMonth,
                name: '',
                ingredients: [],
                directions: [],
                imageURL: ''
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
        const newRecipe = this.state.data;
        /**

            TODO:
            - add validation
            - Stop the addRecipeFirebase action if there is no name value!

         */
        // console.log(this.state.data);
        this.props.actions.addRecipe(newRecipe);
        this.props.actions.pushPath(`/recipes/${snakedNameOf(newRecipe)}`);
    }

    componentDidUpdate() {
        // console.log(this.props);
    }

    render() {
        const { data } = this.state;
        const name = data.get('name');


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
                        fullWidth="true"
                        underlineFocusStyle={{borderColor: colors.text}}
                        floatingLabelStyle={{color: colors.text}}
                        inputStyle={{color: colors.inputText}} />
                    <TextField
                        floatingLabelText="Image URL"
                        onChange={this.handleChange}
                        id="imageURL"
                        fullWidth="true"
                        underlineFocusStyle={{borderColor: colors.text}}
                        floatingLabelStyle={{color: colors.text}}
                        inputStyle={{color: colors.inputText}} />
                    <TextField
                        floatingLabelText="Ingredients"
                        onChange={this.handleChange}
                        id="ingredients"
                        fullWidth="true"
                        underlineFocusStyle={{borderColor: colors.text}}
                        floatingLabelStyle={{color: colors.text}}
                        inputStyle={{color: colors.inputText}} />
                    <TextField
                        floatingLabelText="Directions"
                        onChange={this.handleChange}
                        id="directions"
                        fullWidth="true"
                        underlineFocusStyle={{borderColor: colors.text}}
                        floatingLabelStyle={{color: colors.text}}
                        inputStyle={{color: colors.inputText}} />
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
                    directions={data.get('directions')}
                    ingredients={data.get('ingredients')} />


            </div>
        );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddRecipe);