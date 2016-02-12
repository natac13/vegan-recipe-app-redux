import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { reduxForm } from 'redux-form';

import Button from '../linkButton';
import TextField from 'material-ui/lib/text-field';

import style from './style';


/*===========================================
=            Firebase Connection            =
===========================================*/

import Firebase from 'firebase';
import Fireproof from 'fireproof';
const fireRef = new Firebase('https://vegan-recipes.firebaseio.com/');
const fp = new Fireproof(fireRef);


/*=====  End of Firebase Connection  ======*/


class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoogle = this.handleGoogle.bind(this);
    }

    handleGoogle(event) {
        event.preventDefault();
        fp.authWithOAuthPopup('google', { remember: 'sessionOnly' })
            .then((authData) => {
                console.log('Successful login');
                console.log(authData);
            });
    }

    handleSubmit(values, dispatch) {
        const { username, password } = values;
        const { login } = this.props.actions;

        const action = login(values);
        action.then((data) => {
            console.log(data)
        })

    }
    render() {
        const {
            fields: { username, password },
            handleSubmit,
            submitting,
            resetForm
        } = this.props;
        return (
            <form
                className={style.wrapper}
                >
                <TextField
                type="text"
                data-input="username"
                floatingLabelText="Username"
                {...username} />

                <TextField
                type="password"
                data-input="password"
                floatingLabelText="Password"
                {...password} />

                <TextField
                type="text"
                floatingLabelText="Username"
                onChange={this.handleChange}
                />
                <Button
                    onClick={handleSubmit(this.handleSubmit)}
                    label="Login"
                    disabled={submitting} />
                <Button
                    onClick={this.handleGoogle}
                    label="Login with Google"
                    disabled={submitting} />
                <Button
                    onClick={resetForm}
                    label="Clear Form"
                    disabled={submitting} />
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    fields: ['username', 'password']
})(UserLogin);