import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

export const actionTypes = {
  authenticate: 'AUTHENTICATE',
  signOut: 'SIGN_OUT',
};

export const authenticate = (isLogin, email, password) => {
  return async dispatch => {
    try {
      const response = isLogin
        ? await auth().signInWithEmailAndPassword(email, password)
        : await auth().createUserWithEmailAndPassword(email, password);

      dispatch({
        type: actionTypes.authenticate,
        payload: response.user.email,
      });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  };
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
