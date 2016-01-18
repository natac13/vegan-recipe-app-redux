import React, { Component, PropTypes } from 'react';
import R from 'ramda';

const TextField = require('material-ui/lib/text-field');
import Button from '../home/linkButton/';


/*** styling ***/
import * as colors from '../../scss/colors';
import style from './style';


export default class InputForm extends Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        name: PropTypes.string,
        imageURL: PropTypes.string,
        ingredients: PropTypes.string,
        directions: PropTypes.string,
        submitText: PropTypes.string

    };

    static defaultProps = {
        handleChange: (e) => console.log(e),
        name: '',
        imageURL: '',
        ingredients: '',
        directions: '',
        submitText: 'Submit'

    };

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }

    componentDidMount() {

    }




    clear() {
        const { name, imageURL, directions, ingredients } = this.refs;
        const fields = [name, imageURL, directions, ingredients];
        const clearAll = R.map(ref => {
            if(!!ref) ref.clearValue();
        });
        clearAll(fields)
    }

    render() {
        const { handleChange, handleSubmit, submitText } = this.props;
        const { name, imageURL, directions, ingredients } = this.props;
        return (
            <div
                role="form"
                className={style.recipeInput}>
            <TextField
                floatingLabelText="New Recipe Name"
                onChange={handleChange}
                defaultValue={name}
                ref="name"
                id="name"
                fullWidth={true}
                underlineFocusStyle={{borderColor: colors.text}}
                floatingLabelStyle={{color: colors.text}}
                inputStyle={{color: colors.inputText}} />
            <TextField
                floatingLabelText="Image URL"
                onChange={handleChange}
                defaultValue={imageURL}
                ref="imageURL"
                id="imageURL"
                fullWidth={true}
                underlineFocusStyle={{borderColor: colors.text}}
                floatingLabelStyle={{color: colors.text}}
                inputStyle={{color: colors.inputText}} />
            <TextField
                floatingLabelText="Ingredients"
                onChange={handleChange}
                defaultValue={ingredients}
                ref="ingredients"
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
                onChange={handleChange}
                defaultValue={directions}
                ref="directions"
                id="directions"
                fullWidth={true}
                underlineFocusStyle={{borderColor: colors.text}}
                floatingLabelStyle={{color: colors.text}}
                inputStyle={{color: colors.inputText}}
                multiLine={true}
                rows={3}
                rowsMax={4} />
            <div className={style.buttonGroup}>
                <Button
                    onClick={handleSubmit}
                    label={submitText} />
                <Button
                    onClick={this.clear}
                    label="Clear All Fields" />
            </div>
        </div>
        );
    }
}


