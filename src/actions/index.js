export const LOGIN = 'LOGIN';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

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
