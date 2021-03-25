import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenseDestroyer } from '../../actions';

import './style.css';

class Table extends Component {
  renderTableRows() {
    const { expenses, deleteExpense } = this.props;
    return (
      expenses.map((expense) => (
        <tr key={ expense.id }>
          <td>{ expense.description }</td>
          <td>{ expense.tag }</td>
          <td>{ expense.method }</td>
          <td>{ expense.value }</td>
          <td>{ expense.exchangeRates[expense.currency].name }</td>
          <td>{ parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
          <td>
            { parseFloat(expense.value * (expense.exchangeRates[expense.currency].ask)).toFixed(2) }
          </td>
          <td>Real</td>
          <td>
            <button className="btn btn-warning" type="button">
              <i className="fas fa-edit" />
            </button>
            <button
              onClick={ () => deleteExpense(expense) }
              data-testid="delete-btn"
              className="btn btn-danger"
              type="button"
            >
              <i style={ { color: '#212529' } } className="fas fa-trash" />
            </button>
          </td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <div style={ { overflowX: 'auto' } } className="container-table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { this.renderTableRows() }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(expenseDestroyer(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
