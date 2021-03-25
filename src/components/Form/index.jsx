import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenseCreator } from '../../actions';
import fetchCurrencies from '../../services/fetchCurrency';

import './style.css';

const INITIAL_STATE = {
  value: '0',
  currency: 'USD',
  method: 'Cartão de crédito',
  tag: '',
  description: '',
};

class Form extends Component {
  constructor() {
    super();
    this.state = {
      expense: INITIAL_STATE,
      currencies: [],
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const currencies = await fetchCurrencies('https://economia.awesomeapi.com.br/json/all');
    delete currencies.USDT;
    this.setState({ currencies });
    return currencies;
  }

  async handleOnSubmit(e) {
    e.preventDefault();
    const { expense: { value, currency, method, tag, description } } = this.state;
    const { createExpense } = this.props;

    const exchangeRates = await this.fetchCurrencies();

    const expense = { value, currency, method, tag, description, exchangeRates };
    createExpense(expense);
    this.setState({ expense: INITIAL_STATE });
  }

  handleOnChange({ target: { name, value } }) {
    this.setState(({ expense }) => (
      {
        expense: { ...expense, [name]: value },
      }
    ));
  }

  renderValueInput() {
    const { expense: { value } } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          name="value"
          value={ value }
          onChange={ this.handleOnChange }
          data-testid="value-input"
          id="value"
          type="number"
        />
      </label>
    );
  }

  renderCurrencySelect() {
    const { currencies, expense: { currency } } = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          value={ currency }
          onChange={ this.handleOnChange }
          data-testid="currency-input"
          id="currency"
        >
          { Object.entries(currencies).map((cur) => (
            <option
              key={ cur[1].code }
              data-testid={ cur[1].code }
              value={ cur[1].code }
            >
              { cur[1].code }
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderPaymentMethodSelect() {
    const { expense: { method } } = this.state;
    const listMethod = ['Cartão de crédito', 'Cartão de débito', 'Dinheiro'];
    return (
      <label htmlFor="method">
        Método de Pagamento:
        <select
          name="method"
          value={ method }
          onChange={ this.handleOnChange }
          data-testid="method-input"
          id="method"
        >
          { listMethod.map((currentMethod) => (
            <option key={ currentMethod } value={ currentMethod }>{currentMethod}</option>
          ))}
        </select>
      </label>
    );
  }

  renderTagSelect() {
    const { expense: { tag } } = this.state;
    const tagList = [
      'Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde',
    ];

    return (
      <label htmlFor="category">
        Tag:
        <select
          name="tag"
          value={ tag }
          onChange={ this.handleOnChange }
          data-testid="tag-input"
          id="category"
        >
          <option defaultChecked value="">Categoria</option>
          { tagList.map((currentTag) => (
            <option key={ currentTag } value={ currentTag }>{currentTag}</option>
          ))}
        </select>
      </label>
    );
  }

  renderDescriptionInput() {
    const { expense: { description } } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          name="description"
          value={ description }
          onChange={ this.handleOnChange }
          data-testid="description-input"
          id="description"
        />
      </label>
    );
  }

  render() {
    return (
      <form onSubmit={ this.handleOnSubmit } className="container-form">
        { this.renderValueInput() }
        { this.renderCurrencySelect() }
        { this.renderPaymentMethodSelect() }
        { this.renderTagSelect() }
        { this.renderDescriptionInput() }
        <button className="btn btn-info btn-sm" type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

Form.propTypes = {
  createExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createExpense: (expense) => dispatch(expenseCreator(expense)),
});

export default connect(null, mapDispatchToProps)(Form);
