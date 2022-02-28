/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MainNavigator from './navigation';
import store from './store';
import {Provider} from 'react-redux';

import {initAddressDB} from './db/address-db';
import {initProfileDB} from './db/profile-db';

initAddressDB()
  .then(() => {
    console.log('Address DB initialized');
  })
  .catch(err => {
    console.log('Address DB initialization failed', err);
  });

initProfileDB()
  .then(() => {
    console.log('Profile DB initialized');
  })
  .catch(err => {
    console.log('Profile DB initialization failed', err);
  });

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
