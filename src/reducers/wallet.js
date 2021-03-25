import { CREATE_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, { type, expense }) => {
  const { expenses } = state;
  const id = expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1;

  switch (type) {
  case CREATE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { id, ...expense }],
    };
  case DELETE_EXPENSE:
    const updatedExpenses = expenses.filter((value) => value.id !== expense.id);
    return {
      ...state,
      expenses: updatedExpenses,
    };
  default: return state;
  }
};

export default walletReducer;
