import React, { Component, PropTypes } from 'react';
import { fromJS, Map, List } from 'immutable';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { reduxForm } from 'redux-form';


import moment from 'moment';
import uuid from 'node-uuid';

import format, {
    formatDate,
    handlePreview
} from '../../js/format';
import { snakedNameOf } from '../../js/core_helpers';

/*** Components ***/
import LivePreview from '../livePreview/';
import InputForm from '../inputForm';

/*** styling ***/
import style from './style';
import axios from 'axios';
const AddRecipe = (props) => {

    const onSubmit = (values, dispatch) => {
        const { name, created_date, imageURL, ingredients, directions } = values;
        const file = values.img[0];
        const reader = new FileReader;
        reader.onload = () => {
            axios.post('/img', {
                imageUrl: reader.result,
                name: file.name
            });
        };
        reader.readAsDataURL(file);

        const defaultDate = moment().format('MMMM DD, YYYY');
        const finalDate = !created_date ? defaultDate : created_date.value;

        const newRecipe = fromJS({
            name: format('name')(!name ? '' : name),
            id: uuid.v4(),
            created_date: formatDate(finalDate),
            imageURL: format('imageURL')(!imageURL ? '' : imageURL),
            ingredients: format('ingredients')(!ingredients ? '' : ingredients),
            directions: format('directions')(!directions ? '' : directions)
        });
        // props.actions.addRecipe(newRecipe);
        // props.actions.push(`/recipes/${snakedNameOf(newRecipe)}`);
    };

    const { fields, handleSubmit } = props;

    return (
        <div className={style.wrapper}>
            <InputForm
                submitText="Add New Recipe!"
                { ...props }
                handleSubmit={handleSubmit.bind(null, onSubmit)} />
            <LivePreview
                className={style.livePreview}
                { ...handlePreview(fields) } />
        </div>
    );
};

export default reduxForm({
    form: 'addRecipe',
    fields: ['name', 'created_date', 'imageURL', 'directions', 'ingredients', 'img']
})(AddRecipe);