import React, { Component, PropTypes } from 'react';
import { fromJS, Map } from 'immutable';

import format, {
    stringifyRecipe,
    lineify
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
import * as colors from '../../scss/colors';

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
        this.props.actions.push(`/recipes/${key}`);
    }

    render() {
        const { data } = this.state;
        // get string version to use as default values on the input fields
        let { name, imageURL, ingredients, directions } = stringifyRecipe(data);

        directions = lineify(directions);
        ingredients = lineify(ingredients);



        return (
            <div className={style.wrapper}>
                <div
                    role="form"
                    className={style.recipeInput}
                    ref="recipeForm">
                    <TextField
                        floatingLabelText="New Recipe Name"
                        defaultValue={name}
                        onChange={this.handleChange}
                        id="name"
                        fullWidth={true}
                        underlineFocusStyle={{borderColor: colors.text}}
                        floatingLabelStyle={{color: colors.text}}
                        inputStyle={{color: colors.inputText}} />
                    <TextField
                        floatingLabelText="Image URL"
                        defaultValue={imageURL}
                        onChange={this.handleChange}
                        id="imageURL"
                        fullWidth={true}
                        underlineFocusStyle={{borderColor: colors.text}}
                        floatingLabelStyle={{color: colors.text}}
                        inputStyle={{color: colors.inputText}} />
                    <TextField
                        floatingLabelText="Ingredients"
                        defaultValue={ingredients}
                        onChange={this.handleChange}
                        id="ingredients"
                        fullWidth={true}
                        underlineFocusStyle={{borderColor: colors.text}}
                        floatingLabelStyle={{color: colors.text}}
                        inputStyle={{color: colors.inputText}}
                        multiLine={true}
                        rows={3}
                        rowsMax={8} />
                    <TextField
                        floatingLabelText="Directions"
                        defaultValue={directions}
                        onChange={this.handleChange}
                        id="directions"
                        fullWidth={true}
                        underlineFocusStyle={{borderColor: colors.text}}
                        floatingLabelStyle={{color: colors.text}}
                        inputStyle={{color: colors.inputText}}
                        multiLine={true}
                        rows={3}
                        rowsMax={4} />
                    <Button
                        onClick={this.handleSubmit}
                        label="Add New Recipe!" />
                </div>
                <LivePreview
                    className={style.livePreview}
                    name={name}
                    directions={data.get('directions')}
                    ingredients={data.get('ingredients')} />


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
