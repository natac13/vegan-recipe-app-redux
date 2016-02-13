import React, { Component, PropTypes } from 'react';
import R from 'ramda';

import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Icon from 'react-fa';
import Dropzone from 'react-dropzone';

import Button from '../linkButton/';
/*** styling ***/
import * as colors from '../../scss/colors';
import style from './style';

const InputForm = (props) => {
    const { fields: {
            name,
            created_date,
            directions,
            ingredients,
            img
        },
        handleSubmit,  // redux-form
        submitting,    // redux-form
        resetForm,     // redux-form
        onSubmit,      // add/edit Recipe Component
        submitText,    // add/edit Recipe Component
        error,         // String
        errors,        // Object with a name property
        submitFailed   // boolean
    } = props;


    return (
        <form
            role="form"
            encType="multipart/form-data"
            className={style.recipeForm}>

            <div className={style.inputField}>
                <TextField
                    floatingLabelText="New Recipe Name"
                    errorText={submitFailed && error == 'validation'? errors.name : null}
                    {...name}
                    id="name"
                    fullWidth={true}
                    underlineFocusStyle={{ borderColor: colors.text }}
                    floatingLabelStyle={{ color: colors.text }}
                    inputStyle={{ color: colors.inputText }} />
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
                    value={null}
                    onChange={(file) => {
                        file.preventDefault();
                        // spread files into an array
                        const files = [ ...file.target.files ];
                        const imgFile = files[0];
                        const reader = new FileReader;
                        const fileName = file.name;
                        // when the reader has loaded then I will call the
                        // redux form img.onChange function.
                        // I had to remove the {...img} from this input, since
                        // the onBlur function will change the imageURI back to
                        // the actual File object.
                        reader.onload = () => {
                            img.onChange(reader.result);
                        };
                        reader.readAsDataURL(imgFile);
                    }}
                    id="img"
                    type="file"
                    fullWidth={true}
                    underlineFocusStyle={{ borderColor: colors.text }}
                    floatingLabelStyle={{ color: colors.text }}
                    inputStyle={{ color: colors.inputText }} />
            </div>
{/*            <div className={style.inputField}>
                <Dropzone
                    onDrop={ (filesToUpload, event) => {
                        console.log(filesToUpload);
                    }}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
            </div>*/}
            <div className={style.inputField}>
                <TextField
                    floatingLabelText="Ingredients"
                    {...ingredients}
                    value={ingredients.value}
                    id="ingredients"
                    fullWidth={true}
                    underlineFocusStyle={{ borderColor: colors.text }}
                    floatingLabelStyle={{ color: colors.text }}
                    inputStyle={{ color: colors.inputText }}
                    multiLine={true}
                    rows={3}
                    rowsMax={8} />
            </div>

            <div className={style.inputField}>
                <TextField
                    floatingLabelText="Directions"
                    {...directions}
                    value={directions.value}
                    id="directions"
                    fullWidth={true}
                    underlineFocusStyle={{ borderColor: colors.text }}
                    floatingLabelStyle={{ color: colors.text }}
                    inputStyle={{ color: colors.inputText }}
                    multiLine={true}
                    rows={3}
                    rowsMax={4} />
            </div>

            <div className={style.buttonGroup}>
                <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    label={submitText}
                    icon={
                        submitting ?
                        <Icon spin name="cog" /> :
                        <Icon name="paper-plane"/>
                    }
                    disabled={submitting} />
                <Button
                    onClick={resetForm}
                    label="Reset"
                    icon={<Icon name="undo"/> }
                    disabled={submitting} />
            </div>
        </form>
    );
};

export default InputForm;
