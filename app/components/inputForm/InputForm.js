import React, { PropTypes } from 'react';

const TextField = require('material-ui/lib/text-field');
import Button from '../home/linkButton/';


/*** styling ***/
import * as colors from '../../scss/colors';
import style from './style';

const InputForm = (props) => {
    return (
        <div
            role="form"
            className={style.recipeInput}
            ref="recipeForm">
            <TextField
                floatingLabelText="New Recipe Name"
                onChange={props.handleChange}
                id="name"
                fullWidth={true}
                underlineFocusStyle={{borderColor: colors.text}}
                floatingLabelStyle={{color: colors.text}}
                inputStyle={{color: colors.inputText}} />
            <TextField
                floatingLabelText="Image URL"
                onChange={props.handleChange}
                id="imageURL"
                fullWidth={true}
                underlineFocusStyle={{borderColor: colors.text}}
                floatingLabelStyle={{color: colors.text}}
                inputStyle={{color: colors.inputText}} />
            <TextField
                floatingLabelText="Ingredients"
                onChange={props.handleChange}
                id="ingredients"
                fullWidth={true}
                underlineFocusStyle={{borderColor: colors.text}}
                floatingLabelStyle={{color: colors.text}}
                inputStyle={{color: colors.inputText}}
                multiLine={true}
                rows={3}
                rowsMax={8} />
            <TextField
                floatingLabelText="Directions"
                onChange={props.handleChange}
                id="directions"
                fullWidth={true}
                underlineFocusStyle={{borderColor: colors.text}}
                floatingLabelStyle={{color: colors.text}}
                inputStyle={{color: colors.inputText}}
                multiLine={true}
                rows={3}
                rowsMax={4} />
            <Button
                onClick={props.handleSubmit}
                label="Add New Recipe!" />
        </div>
    )
}

InputForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string,
    imageURL: PropTypes.string,
    ingredients: PropTypes.string,
    directions: PropTypes.string
}

InputForm.defaultProps = {
    handleChange: (e) => console.log(e),
    name: '',
    imageURL: '',
    ingredients: '',
    directions: ''
}

export default InputForm;