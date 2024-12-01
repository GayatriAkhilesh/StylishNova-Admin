import {LOGIN, SIGNOUT} from './constants';

const initialState = {
  isLoggedIn: false,
  userId: '',
};

export const stylishNovaReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        isLoggedIn: true,
      };
    case SIGNOUT:
      return {
        ...state,
        userId: '',
        isLoggedIn: false,
      };

    default:
      return state;
  }
};