import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import R from 'ramda';

import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Button from '../home/linkButton/';


/*** styling ***/
import * as colors from '../../scss/colors';
import style from './style';


export default class InputForm extends Component {

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
        this.clearOne = this.clearOne.bind(this);
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    clearOne(event) {
        // field is the corresponding input field to clear
        const { field } = event.target.dataset;
        // this.refs[field].clearValue();
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

    render() {
        const { submitText } = this.props;
        const { fields: {
                name,
                created_date,
                imageURL,
                directions,
                ingredients,
                img
            },
            handleSubmit,
            submitting,
            resetForm
        } = this.props;

        return (
            <form
                role="form"
                encType="multipart/form-data"
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
                value={created_date.value}
                onChange={(_, value) => created_date.onChange(value)} />
            </div>

            <div className={style.inputField}>
                <TextField
                    { ...img }
                    value={null}
                    id="img"
                    type="file"
                    fullWidth={true}
                    underlineFocusStyle={{ borderColor: colors.text }}
                    floatingLabelStyle={{ color: colors.text }}
                    inputStyle={{ color: colors.inputText }} />
                <i
                    className={'material-icons ' + style.close}
                    data-field="img"
                    onClick={this.clearOne}>
                    remove_circle_outline
                </i>
            </div>

            <div className={style.inputField}>
                <TextField
                    floatingLabelText="Ingredients"
                    {...ingredients}
                    value={ingredients.value}
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
                    value={directions.value}
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
                    label="Reset"
                    icon="undo"
                    disabled={submitting} />
            </div>

        </form>
        );
    }
}


