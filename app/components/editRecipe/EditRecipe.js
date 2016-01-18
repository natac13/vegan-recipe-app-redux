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
import InputForm from '../inputForm/';

/*** styling ***/
import style from './style';
import * as colors from '../../scss/colors';

export default class EditRecipe extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const { key } = props.params;
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
                <InputForm
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    submitText="Update Recipe"
                    name={name}
                    imageURL={imageURL}
                    ingredients={ingredients}
                    directions={directions} />
                <LivePreview
                    className={style.livePreview}
                    name={name}
                    directions={data.get('directions')}
                    ingredients={data.get('ingredients')} />


            </div>
        );
    }

}