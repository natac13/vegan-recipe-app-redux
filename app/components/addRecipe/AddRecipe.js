import React, { Component, PropTypes } from 'react';
import { fromJS, Map, List } from 'immutable';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { reduxForm } from 'redux-form';


import moment from 'moment';
import uuid from 'node-uuid';

import format, {
    formatDate,
    handlePreview,
    dropExtension
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
        const { name, created_date, img, ingredients, directions } = values;
        /*====================================
        =            Image upload            =
        ====================================*/

        const file = img[0];
        const reader = new FileReader;
        const fileName = dropExtension(file.name);
        reader.onload = () => {
            axios.post('/img', {
                imageUrl: reader.result,
                name: fileName
            });
        };
        reader.readAsDataURL(file);

        const cloudinaryUrl = 'http://res.cloudinary.com/dxmist0g2/image/upload/';


        /*=====  End of Image upload  ======*/
        /*** Create date ***/
        const defaultDate = moment();
        const finalDate = formatDate(!created_date ?
                                        defaultDate : created_date
                                    );

        const newRecipe = fromJS({
            name: format('name')(!name ? '' : name),
            id: uuid.v4(),
            created_date: finalDate,
            imageURL: `${cloudinaryUrl}${fileName}`,
            ingredients: format('ingredients')(!ingredients ? '' : ingredients),
            directions: format('directions')(!directions ? '' : directions)
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
    fields: [
        'name',
        'created_date',
        'imageURL',
        'directions',
        'ingredients',
        'img'
    ]
})(AddRecipe);