import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { reduxForm } from 'redux-form';

import Promise from 'bluebird';

/*** Third party components ***/
import Input from 'react-toolbox/lib/input';
import Icon from 'react-fa';

/*** My components ***/
import Button from '../linkButton';

/*** Styling ***/
import style from './style';


class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }


  handleLogin(type, event) {
    event.preventDefault();
    const { push } = this.props.actions;
    const login = this.props.actions[`login${type}`];
    const action = login(); // just the loginTYPE being called
    action.then((action) => {
      if (action.error) {
        console.log(action.error);
      } else {
        push('/recipes');
      }
    });
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.actions.logout();

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
            onClick={this.handleLogin.bind(this, 'Google')}
            label="Login with Google"
            icon={<Icon name="google" />}
            disabled={submitting} />
          <Button
            onClick={this.handleLogin.bind(this, 'Github')}
            label="Login with Github"
            icon={<Icon name="github" />}
            disabled={submitting} />
          <Button
            onClick={this.handleLogin.bind(this, 'Twitter')}
            label="Login with Twitter"
            icon={<Icon name="twitter" />}
            disabled={submitting} />
          <Button
            onClick={this.handleLogin.bind(this, 'Facebook')}
            label="Login with Facebook"
            icon={<Icon name="facebook" />}
            disabled={submitting} />
          <Button
            onClick={this.handleLogout.bind(this)}
            label="Logout Bye Bye!"
            icon={<Icon name="sign-out" />}
            disabled={submitting} />
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  fields: ['username', 'password']
})(UserLogin);