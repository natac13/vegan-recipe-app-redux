import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { fromJS, Map, List } from 'immutable';
import { reduxForm } from 'redux-form';
import moment from 'moment';


import format, {
    formatDate,
    handlePreview,
    stringifyRecipe,
    lineify
} from '../../js/format';

import { snakedNameOf } from '../../js/core_helpers';

/*** Components ***/
const TextField = require('material-ui/lib/text-field');
import LivePreview from '../livePreview/';
import Button from '../home/linkButton/';
import InputForm from '../inputForm/';

/*** styling ***/
import style from './style';
import * as colors from '../../scss/colors';

class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.handleClear  = this.handleClear.bind(this);
        const { key } = props.params;
        const recipeToEdit = props.recipeList.get(key);

        this.props.initializeForm(stringifyRecipe(recipeToEdit));
    }

    shouldComponentUpdate = shouldPureComponentUpdate;


    onSubmit(values, dispatch) {
        const { name, created_date, imageURL, ingredients, directions } = values;
        const finalDate = !created_date ? '' : created_date.value;
        const { key } = this.props.params;
        console.log(key);
        const updatedRecipe = fromJS({
            name: format('name')(name),
            created_date: formatDate(finalDate),
            imageURL: format('imageURL')(!imageURL ? '' : imageURL),
            ingredients: format('ingredients')(ingredients),
            directions: format('directions')(directions)
        });
        this.props.actions.updateRecipe(updatedRecipe, this.props.recipeList.get(key));
        this.props.actions.push(`/recipes/${snakedNameOf(updatedRecipe)}`);
    }

    handleClear(field) {
        const input = this.props.fields[field];
        console.log(input)
        input.setValue('')
    }


    render() {
        const { fields, handleSubmit } = this.props;


        return (
            <div className={style.wrapper}>
                <InputForm
                    handleClear={this.handleClear}
                    submitText="Update Recipe"
                    {...this.props}
                    handleSubmit={handleSubmit.bind(null, this.onSubmit.bind(this))} />
                <LivePreview
                    className={style.livePreview}
                    { ...handlePreview(fields) } />


            </div>
        );
    }

}

export default reduxForm({
    form: 'editRecipe',
    fields: ['name', 'created_date', 'imageURL', 'directions', 'ingredients']
})(EditRecipe);