import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import Navigation from './src/components/navigations/Navigation';
import UserStore from './src/components/context/stores/Userstore';

const App = () => (
  <UserStore>
    <StatusBar barStyle="light-content" backgroundColor="#f4f4f4" />
    <Navigation />
  </UserStore>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
