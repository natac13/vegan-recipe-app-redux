import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { reduxForm } from 'redux-form';

import Button from '../home/linkButton';
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


    handleSubmit(event) {
        event.preventDefault();
        const { fields: { username, password } } = this.props;
        fp.authWithPassword({
            email: username.value,
            password: password.value
        }, { remember: 'sessionOnly' })
            .then((authData) => {
                console.log('Admin login good');
                console.log(authData);
            });

    }

    handleGoogle(event) {
        event.preventDefault();
        fp.authWithOAuthPopup('google', { remember: 'sessionOnly' })
            .then((authData) => {
                console.log('Successful login');
                console.log(authData);
            });
    }
    render() {
        const { fields: { username, password } } = this.props;
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
                    onClick={this.handleSubmit}
                    label="Login" />
                <Button
                    onClick={this.handleGoogle}
                    label="Login with Google" />
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    fields: ['username', 'password']
})(UserLogin);