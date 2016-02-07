import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { fromJS, Map, List } from 'immutable';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import axios from 'axios';


import format, {
    formatDate,
    handlePreview,
    stringifyRecipe,
    dropExtension
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
        const {
            name,
            created_date,
            imageURL,
            img,
            ingredients,
            directions } = values;
        let fileName;
        /*====================================
        =            Image upload            =
        ====================================*/
        if(!!img) {
            const file = img[0];
            const reader = new FileReader;
            fileName = dropExtension(file.name);
            reader.onload = () => {
                axios.post('/img', {
                    imageUrl: reader.result,
                    name: fileName
                });
            };
            reader.readAsDataURL(file);

        }

        const cloudinaryUrl = 'http://res.cloudinary.com/dxmist0g2/image/upload/';


        /*=====  End of Image upload  ======*/

        const finalDate = formatDate(!created_date ? moment() : created_date);
        const { key } = this.props.params;

        const updatedRecipe = fromJS({
            name: format('name')(name),
            created_date: finalDate,
            imageURL: !img ? imageURL : `${cloudinaryUrl}${fileName}`,
            ingredients: format('ingredients')(ingredients),
            directions: format('directions')(directions)
        });
        this.props.actions.updateRecipe(
                updatedRecipe,
                this.props.recipeList.get(key)
            );
        this.props.actions.push(`/recipes/${snakedNameOf(updatedRecipe)}`);
    }

    handleClear(field) {
        const input = this.props.fields[field];
        input.setValue('');
    }


    render() {
        const { fields, handleSubmit } = this.props;


        return (
            <div className={style.wrapper}>
                <InputForm
                    handleClear={this.handleClear}
                    submitText="Update Recipe"
                    {...this.props}
                    handleSubmit={handleSubmit.bind(
                            null,
                            this.onSubmit.bind(this)
                        )} />
                <LivePreview
                    className={style.livePreview}
                    { ...handlePreview(fields) } />


            </div>
        );
    }

}

export default reduxForm({
    form: 'editRecipe',
    fields: [
        'name',
        'created_date',
        'imageURL',
        'img',
        'directions',
        'ingredients'
    ]
})(EditRecipe);