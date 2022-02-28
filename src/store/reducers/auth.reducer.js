import {actionTypes} from '../actions/auth.actions';

const initialState = {
  user: null,
  name: '',
  profilePicture: null,
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
    case actionTypes.saveProfile:
      return {
        ...state,
        name: action.payload.name,
        profilePicture: action.payload.profilePicture,
      };
    case actionTypes.loadProfile:
      return {
        ...state,
        name: action.payload.name,
        profilePicture: action.payload.profilePicture,
      };
    default:
      return {...state};
  }
};
