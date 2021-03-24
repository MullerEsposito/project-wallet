export const LOGIN = 'LOGIN';

export const loginCreator = (email) => ({
  type: LOGIN,
  value: email,
});
