import {actionTypes} from '../actions/auth.actions';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.authenticate:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.signOut:
      return {
        ...state,
        user: null,
      };
    default:
      return {...state};
  }
};
