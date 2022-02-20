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

import {init} from './db';

init()
  .then(() => {
    console.log('DB initialized');
  })
  .catch(err => {
    console.log('DB initialization failed', err);
  });

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
