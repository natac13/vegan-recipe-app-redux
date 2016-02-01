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

const AddRecipe = (props) => {

    const onSubmit = (values, dispatch) => {
        const { name, created_date, imageURL, ingredients, directions } = values;
        const defaultDate = moment().format('MMMM DD, YYYY');
        const finalDate = !created_date ? defaultDate : created_date.value;

        const newRecipe = fromJS({
            name: format('name')(name),
            id: uuid.v4(),
            created_date: formatDate(finalDate),
            imageURL: format('imageURL')(!imageURL ? '' : imageURL),
            ingredients: format('ingredients')(ingredients),
            directions: format('directions')(directions)
        });
        props.actions.addRecipe(newRecipe);
        props.actions.push(`/recipes/${snakedNameOf(newRecipe)}`);
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
    fields: ['name', 'created_date', 'imageURL', 'directions', 'ingredients']
})(AddRecipe);