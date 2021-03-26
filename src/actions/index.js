import fetchCurrencies from '../services/fetchCurrencies';

export const LOGIN = 'LOGIN';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const HANDLE_WALLET_ERROR = 'HANDLE_WALLET_ERROR';

export const loginCreator = (email) => ({
  type: LOGIN,
  email,
});

export const expenseCreator = (expense) => ({
  type: CREATE_EXPENSE,
  expense,
});

export const expenseDestroyer = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const expenseUpdater = (expense) => ({
  type: UPDATE_EXPENSE,
  expense,
});

export const expenseEditor = (expense, editMode = false) => ({
  type: EDIT_EXPENSE,
  expense,
  editMode,
});

const requestCurrenciesCreator = () => ({
  type: REQUEST_CURRENCIES,
});

const getCurrenciesCreator = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

const handleWalletErrorCreator = (error) => ({
  type: HANDLE_WALLET_ERROR,
  error,
});

export const fetchCurrenciesCreator = () => async (dispatch) => {
  try {
    dispatch(requestCurrenciesCreator());
    const fetchedCurrencies = await fetchCurrencies();
    delete fetchedCurrencies.USDT;
    const currencies = Object.keys(fetchedCurrencies);

    dispatch(getCurrenciesCreator(currencies));
  } catch (error) {
    dispatch(handleWalletErrorCreator(error));
  }
};
