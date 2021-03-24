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
    this.setState({ [name]: value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { createLogin, history } = this.props;

    createLogin(email);
    history.push('/carteira');
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
          />
          <input
            name="password"
            value={ password }
            onChange={ this.handleOnChange }
            data-testid="password-input"
            className="form-control"
            type="password"
          />
          <button className="btn btn-success" type="submit">Entrar</button>
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
