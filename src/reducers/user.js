import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, { type, value }) => {
  switch (type) {
  case LOGIN:
    console.log('LOGING...');
    return { ...state, email: value };
  default: return state;
  }
};

export default userReducer;
