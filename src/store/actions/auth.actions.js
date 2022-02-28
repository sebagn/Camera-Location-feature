import auth from '@react-native-firebase/auth';
import {fetchProfile, insertProfile} from '../../db/profile-db';

export const actionTypes = {
  authenticate: 'AUTHENTICATE',
  signOut: 'SIGN_OUT',
  saveProfile: 'SAVE_PROFILE',
  loadProfile: 'LOAD_PROFILE',
};

export const authenticate = (isLogin, email, password, navigation) => {
  return async dispatch => {
    try {
      const response = isLogin
        ? await auth().signInWithEmailAndPassword(email, password)
        : await auth().createUserWithEmailAndPassword(email, password);

      dispatch({
        type: actionTypes.authenticate,
        payload: response.user.email,
      });

      navigation.navigate('Direcciones');
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

export const saveProfile = (email, name, image) => {
  return async dispatch => {
    const result = await insertProfile(email, name, image);
    dispatch({
      type: actionTypes.saveProfile,
      payload: {
        name: name,
        profilePicture: image,
      },
    });
  };
};
export const loadProfile = user => {
  return async dispatch => {
    try {
      const profile = await fetchProfile(user);
      dispatch({
        type: actionTypes.loadProfile,
        payload: {
          name: profile[0].name,
          profilePicture: profile[0].profilePicture,
        },
      });
    } catch (e) {
      console.warn(e);
    }
  };
};
