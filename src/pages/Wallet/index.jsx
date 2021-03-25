import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '../../components/Form';
import Table from '../../components/Table';
import imgLogo from '../../assets/logo.png';
import './style.css';

class Wallet extends React.Component {
  renderHeader() {
    const { expenses, user } = this.props;

    const totalExpense = expenses.reduce((total, { value, currency, exchangeRates }) => {
      const price = parseFloat(exchangeRates[currency].ask);

      return total + parseFloat(value) * price;
    }, 0);
    return (
      <header>
        <img className="img-fluid" src={ imgLogo } alt="Wallet logo" />
        <p data-testid="email-field">{`Email: ${user.email}`}</p>
        <p data-testid="total-field">
          {`Despesa Total: R$ ${totalExpense.toFixed(2)} `}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }

  render() {
    return (
      <div className="container-wallet">
        { this.renderHeader() }
        <Form />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape(Object)).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ wallet, user }) => ({
  expenses: wallet.expenses,
  user,
});

export default connect(mapStateToProps, null)(Wallet);
