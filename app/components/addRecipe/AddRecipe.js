import React, { Component, PropTypes } from 'react';
import { fromJS, Map, List } from 'immutable';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { reduxForm } from 'redux-form';


import moment from 'moment';
import uuid from 'node-uuid';

import format from '../../js/format';
import { snakedNameOf } from '../../js/core_helpers';

/*** Components ***/
const TextField = require('material-ui/lib/text-field');
import LivePreview from '../livePreview/';
import Button from '../home/linkButton/';
import InputForm from '../inputForm';

/*** styling ***/
import style from './style';
import * as colors from '../../scss/colors';

class AddRecipe extends Component {

    constructor(props) {
        super(props);
        /*** bind functions ***/
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear  = this.handleClear.bind(this);

        // const defaultDate = moment().format('MMMM DD, YYYY');
        // this.state = {
        //     data: fromJS({
        //         id: uuid.v4(),
        //         created_date: defaultDate,
        //         name: '',
        //         ingredients: [],
        //         directions: [],
        //         imageURL: ''
        //     })
        // };
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    // handleChange(event, date) {
    //     if (event === null) {
    //         this.setState({
    //             data: this.state.data.set('created_date', moment(date).format('MMMM DD, YYYY'))
    //         });
    //     } else {
    //         let { id: property, value } = event.target;
    //         let formatter = format(property);
    //         const data = formatter(value);


    //         this.setState({
    //             data: this.state.data.set(property, data)
    //         });

    //     }
    // }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     const newRecipe = this.state.data;


    //     this.props.actions.addRecipe(newRecipe);
    //     this.props.actions.push(`/recipes/${snakedNameOf(newRecipe)}`);
    // }

    handleClear(field) {
        if (field === 'directions' || field === 'ingredients') {
            this.setState({
                data: this.state.data.set(field, List())
            });
        } else {
            this.setState({
                data: this.state.data.set(field, '')
            });

        }
    }


    componentDidUpdate() {
        // console.log(this.props);
    }

    handleSubmit(values, dispatch) {
        const { name, created_date, imageURL, ingredients, directions } = values;
        const newRecipe = fromJS({
            name: format('name')(name),
            imageURL: format('imageURL')(!imageURL ? '' : imageURL),
            ingredients: format('ingredients')(ingredients),
            directions: format('directions')(directions)
        });
        this.props.actions.addRecipe(newRecipe);
        this.props.actions.push(`/recipes/${snakedNameOf(newRecipe)}`);
    }

    render() {
        // const { data } = this.state;
        // const name = data.get('name');
        const { fields: { name, created_date, imageURL, directions, ingredients },
            handleSubmit,
            submitting,
            resetForm
        } = this.props;

        return (
            <div className={style.wrapper}>
                <InputForm
                    handleChange={this.handleChange}
                    submitText="Add New Recipe!"
                    handleClear={this.handleClear}
                    { ...this.props }
                    handleSubmit={handleSubmit.bind(null, this.handleSubmit)} />
                <LivePreview
                    className={style.livePreview}
                    name={format('name')(!name.value ? '' : name.value)}
                    created_date={created_date.value}
                    imageURL={format('imageURL')(!imageURL.value ? '' : imageURL.value)}
                    directions={format('directions')(!directions.value ? '' : directions.value)}
                    ingredients={format('ingredients')(!ingredients.value ? '' : ingredients.value)} />
            </div>
        );
    }
}

export default reduxForm({
    form: 'addRecipe',
    fields: ['name', 'created_date', 'imageURL', 'directions', 'ingredients']
})(AddRecipe);