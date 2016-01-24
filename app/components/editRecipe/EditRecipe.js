import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { fromJS, Map, List } from 'immutable';
import moment from 'moment';

import format, {
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

export default class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear  = this.handleClear.bind(this);
        const { key } = props.params;
        this.state = {
            data: props.recipeList.get(key)
        };
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    handleChange(event, date) {
        if (event === null) {
            this.setState({
                data: this.state.data.set('created_date', moment(date).format('MMMM DD, YYYY'))
            });
        } else {
            let { id: property, value } = event.target;
            const data = format(property)(value);


            this.setState({
                data: this.state.data.set(property, data)
            });

        }
    }

    handleSubmit(event) {
        const { key } = this.props.params;
        event.preventDefault();
        const updatedRecipe = this.state.data;
        /**

            TODO:
            - add validation
            - Stop the addRecipeFirebase action if there is no name value!

         */
        this.props.actions.updateRecipe(updatedRecipe, this.props.recipeList.get(key));
        this.props.actions.push(`/recipes/${snakedNameOf(updatedRecipe)}`);
    }

    handleClear(field) {
        if (field === 'all') {
            this.setState({
                data: fromJS({
                    id: '',
                    created_date: '',
                    name: '',
                    ingredients: [],
                    directions: [],
                    imageURL: ''
                })
            });
            return true;
        }
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

    render() {
        const { data } = this.state;
        // get string version to use as default values on the input fields
        let {
                name,
                created_date,
                imageURL,
                ingredients,
                directions
            } = stringifyRecipe(data);

        directions = lineify(directions);
        ingredients = lineify(ingredients);

        return (
            <div className={style.wrapper}>
                <InputForm
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    handleClear={this.handleClear}
                    submitText="Update Recipe"
                    name={name}
                    created_date={created_date}
                    imageURL={imageURL}
                    ingredients={ingredients}
                    directions={directions} />
                <LivePreview
                    className={style.livePreview}
                    name={name}
                    created_date={created_date}
                    imageURL={data.get('imageURL')}
                    directions={data.get('directions')}
                    ingredients={data.get('ingredients')} />


            </div>
        );
    }

}