import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { reduxForm } from 'redux-form';

import Promise from 'bluebird';

/*** Third party components ***/
import Input from 'react-toolbox/lib/input';
import TextField from 'material-ui/lib/text-field';
import Icon from 'react-fa';

/*** My components ***/
import Button from '../linkButton';

/*** Styling ***/
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
    this.onSubmit = this.onSubmit.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
  }

  handleGoogle(event) {
    event.preventDefault();
    const { login, push } = this.props.actions;
    const action = login();
    action.then((action) => {
      if (action.error) {

      } else {
        push('/recipes');
      }
    });

  }

  onSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {

      const { username, password } = values;
      const { loginAdmin, push } = this.props.actions;

      const action = loginAdmin(values);
      action.then((action) => {
        if (action.error) {
          const error = {
            name: action.error,
            _error: 'ERROR_LOGIN'
          };
          reject(error);
        } else {
          resolve();
          push('/recipes');
        }
      });
    });

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
        onSubmit={handleSubmit(this.onSubmit)}
        className={style.wrapper} >

        <Input
          {...username}
          type="text"
          data-input="username"
          label="Username/Email" />

        <Input
          {...password}
          type="password"
          data-input="password"
          label="Password" />

          <Button
              label="Login"
              type="submit"
              icon={submitting ?
                  <Icon spin name="cog"/> :
                  <Icon name="sign-in" />}
              disabled={submitting} />
          <Button
              onClick={resetForm}
              label="Clear Form"
              icon={<Icon name="undo" />}
              disabled={submitting} />
          <Button
              onClick={this.handleGoogle}
              label="Login with Google"
              icon={<Icon name="google" />}
              disabled={submitting} />
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  fields: ['username', 'password']
})(UserLogin);