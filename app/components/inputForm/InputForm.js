import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import R from 'ramda';
import moment from 'moment';

import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Button from '../home/linkButton/';


/*** styling ***/
import * as colors from '../../scss/colors';
import style from './style';


export default class InputForm extends Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        handleClear: PropTypes.func,
        name: PropTypes.string,
        'created_date': PropTypes.string,
        imageURL: PropTypes.string,
        ingredients: PropTypes.string,
        directions: PropTypes.string,
        submitText: PropTypes.string

    };

    static defaultProps = {
        handleChange: (e) => {if (e) { console.log(e); }},
        handleClear: () => console.log('Giving the field from dataset this function should clear the state property.'),
        name: '',
        'created_date': '',
        imageURL: '',
        ingredients: '',
        directions: '',
        submitText: 'Submit'

    };

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
        this.clearOne = this.clearOne.bind(this);
        console.log(props);
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    clearOne(event) {
        // field is the corresponding input field to clear
        const { field } = event.target.dataset;
        this.refs[field].clearValue();
        // clearing parent state for livePreview to change.
        this.props.handleClear(field);
    }


    clear() {
        const { name, imageURL, directions, ingredients } = this.refs;
        const fields = [name, imageURL, directions, ingredients];
        const clearAll = R.map(ref => {
            if(!!ref) ref.clearValue();
        });

        this.props.handleClear('all');
        clearAll(fields);
    }

    dateChange(event, date) {

    }

    formatData(date) {
        const dateFormatted = moment(date).format('MMMM DD, YYYY');
        return dateFormatted;
    }

    render() {
        const { handleChange, submitText } = this.props;
        // const {
        //     name,
        //     imageURL,
        //     directions,
        //     ingredients
        // } = this.props;
        const { fields: { name, created_date, imageURL, directions, ingredients },
            handleSubmit,
            submitting,
            resetForm
        } = this.props;

        return (
            <div
                role="form"
                className={style.recipeForm}>

            <div className={style.inputField}>
                <TextField
                    floatingLabelText="New Recipe Name"
                    {...name}
                    ref="name"
                    id="name"
                    fullWidth={true}
                    underlineFocusStyle={{ borderColor: colors.text }}
                    floatingLabelStyle={{ color: colors.text }}
                    inputStyle={{ color: colors.inputText }} />
                <i
                    className={'material-icons ' + style.close}
                    data-field="name"
                    onClick={this.clearOne}>
                    remove_circle_outline
                </i>
            </div>

            <div className={style.inputField}>
                <DatePicker
                hintText="Data Created"
                id="created_date"
                onChange={handleChange}
                formatDate={this.formatData} />
            </div>

            <div className={style.inputField}>
                <TextField
                    floatingLabelText="Image URL"
                    {...imageURL}
                    ref="imageURL"
                    id="imageURL"
                    fullWidth={true}
                    underlineFocusStyle={{ borderColor: colors.text }}
                    floatingLabelStyle={{ color: colors.text }}
                    inputStyle={{ color: colors.inputText } } />
                <i
                    className={'material-icons ' + style.close}
                    data-field="imageURL"
                    onClick={this.clearOne}>
                    remove_circle_outline
                </i>
            </div>

            <div className={style.inputField}>
                <TextField
                    floatingLabelText="Ingredients"
                    {...ingredients}
                    ref="ingredients"
                    id="ingredients"
                    fullWidth={true}
                    underlineFocusStyle={{ borderColor: colors.text }}
                    floatingLabelStyle={{ color: colors.text }}
                    inputStyle={{ color: colors.inputText }}
                    multiLine={true}
                    rows={3}
                    rowsMax={8} />
                <i
                    className={'material-icons ' + style.close}
                    data-field="ingredients"
                    onClick={this.clearOne}>
                    remove_circle_outline
                </i>
            </div>

            <div className={style.inputField}>
                <TextField
                    floatingLabelText="Directions"
                    {...directions}
                    ref="directions"
                    id="directions"
                    fullWidth={true}
                    underlineFocusStyle={{ borderColor: colors.text }}
                    floatingLabelStyle={{ color: colors.text }}
                    inputStyle={{ color: colors.inputText }}
                    multiLine={true}
                    rows={3}
                    rowsMax={4} />
                <i
                    className={'material-icons ' + style.close}
                    data-field="directions"
                    onClick={this.clearOne}>
                    remove_circle_outline
                </i>
            </div>

            <div className={style.buttonGroup}>
                <Button
                    onClick={handleSubmit()}
                    label={submitText}
                    icon="add_circle_outline"
                    disabled={submitting} />
                <Button
                    onClick={resetForm}
                    label="Clear All Fields"
                    icon="undo"
                    disabled={submitting} />
            </div>

        </div>
        );
    }
}


