import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import Navigation from './src/components/navigations/Navigation';
import UserStore from './src/components/context/stores/Userstore';
import {COLORS} from './src/constants/theme';

const App = () => (
  <UserStore>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
    <Navigation />
  </UserStore>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
