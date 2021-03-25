import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, { type, email }) => {
  switch (type) {
  case LOGIN:
    console.log('LOGING...');
    return { ...state, email };
  default: return state;
  }
};

export default userReducer;
