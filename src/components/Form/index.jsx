import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenseCreator, expenseEditor, expenseUpdater } from '../../actions';
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

  componentDidUpdate() {
    this.getExpenseFromReducer();
  }

  getExpenseFromReducer() {
    const { expense, editExpense } = this.props;

    if (expense) {
      this.setState({ expense }, () => {
        editExpense(false, true);
      });
    }
  }

  async fetchCurrencies() {
    const currencies = await fetchCurrencies('https://economia.awesomeapi.com.br/json/all');
    delete currencies.USDT;
    this.setState({ currencies });
    return currencies;
  }

  async handleOnSubmit(e) {
    e.preventDefault();
    const { target: { name } } = e;
    const { expense } = this.state;
    const { createExpense, updateExpense } = this.props;

    if (name === 'create') {
      const exchangeRates = await this.fetchCurrencies();
      const newExpense = { ...expense, exchangeRates };

      createExpense(newExpense);
    } else if (name === 'update') {
      updateExpense(expense);
    }
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

  renderButton() {
    const { editMode } = this.props;

    if (editMode) {
      return (
        <button
          onClick={ this.handleOnSubmit }
          name="update"
          className="btn btn-info btn-sm"
          type="button"
        >
          Editar despesa
        </button>
      );
    }
    return (
      <button
        onClick={ this.handleOnSubmit }
        name="create"
        className="btn btn-info btn-sm"
        type="button"
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { editMode } = this.props;
    return (
      <form
        className={ `container-form ${editMode && 'editMode'}` }
      >
        { this.renderValueInput() }
        { this.renderCurrencySelect() }
        { this.renderPaymentMethodSelect() }
        { this.renderTagSelect() }
        { this.renderDescriptionInput() }
        { this.renderButton() }
      </form>
    );
  }
}

Form.propTypes = {
  createExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  expense: PropTypes.oneOfType([PropTypes.shape(Object), PropTypes.bool]).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  editMode: wallet.editMode,
  expense: wallet.expense,
});

const mapDispatchToProps = (dispatch) => ({
  createExpense: (expense) => dispatch(expenseCreator(expense)),
  editExpense: (expense, editMode) => dispatch(expenseEditor(expense, editMode)),
  updateExpense: (expense) => dispatch(expenseUpdater(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
