import {
  CREATE_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, UPDATE_EXPENSE,
  REQUEST_CURRENCIES,
  GET_CURRENCIES,
  HANDLE_WALLET_ERROR,
} from '../actions';

const INITIAL_STATE = {
  expenses: [],
  expense: false,
  editMode: false,
  isFetching: false,
  currencies: [],
};

const createExpense = (expenses, expense) => {
  const id = expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1;

  return { id, ...expense };
};

const removeExpense = (expenses, expense) => (
  expenses.filter((value) => value.id !== expense.id)
);

const updateExpense = (expenses, expense) => {
  const updatedExpenses = [...expenses];
  const foundIndex = updatedExpenses.findIndex((exp) => exp.id === expense.id);
  updatedExpenses.splice(foundIndex, 1, expense);

  return updatedExpenses;
};

const walletReducer = (
  state = INITIAL_STATE, { type, expense, editMode, currencies, error },
) => {
  const { expenses } = state;

  switch (type) {
  case CREATE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, createExpense(expenses, expense)],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: removeExpense(expenses, expense),
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: updateExpense(expenses, expense),
      editMode: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expense,
      editMode,
    };
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      isFetching: false,
      currencies,
    };
  case HANDLE_WALLET_ERROR:
    return {
      ...state,
      isFetching: false,
      error,
    };
  default: return state;
  }
};

export default walletReducer;
