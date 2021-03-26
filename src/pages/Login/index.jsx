import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginCreator } from '../../actions';
import imgLogo from '../../assets/logo.png';

import './style.css';

const INITIAL_STATE = {
  email: '',
  password: '',
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange({ target: { name, value } }) {
    const inputs = Array.from(document.querySelectorAll('input'));
    const loginButton = document.querySelector('button');
    this.setState({ [name]: value });

    loginButton.disabled = this.validateFields(inputs);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { createLogin, history } = this.props;

    createLogin(email);
    history.push('/carteira');
  }

  validateFields(fields) {
    const minLengthPassword = 6;
    const regexEmail = /^[A-Za-z0-9]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/;

    return fields.reduce((validation, { name, value }) => {
      switch (name) {
      case 'email':
        if (value.match(regexEmail)) return validation;
        return true;
      case 'password':
        if (value.length >= minLengthPassword) return validation;
        return true;
      default: return true;
      }
    }, false);
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="container-login container-fluid">
        <img className="img-fluid" src={ imgLogo } alt="Wallet Logo" />
        <form onSubmit={ this.handleOnSubmit }>
          <input
            name="email"
            value={ email }
            onChange={ this.handleOnChange }
            data-testid="email-input"
            className="form-control"
            type="email"
            required
          />
          <input
            name="password"
            value={ password }
            onChange={ this.handleOnChange }
            data-testid="password-input"
            className="form-control"
            type="password"
            required
          />
          <button disabled className="btn btn-success" type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  createLogin: PropTypes.func.isRequired,
  history: PropTypes.shape(Object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createLogin: (email) => dispatch(loginCreator(email)),
});

export default connect(null, mapDispatchToProps)(Login);
