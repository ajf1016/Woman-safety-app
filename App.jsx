import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './src/components/navigations/Navigation';
import UserStore from './src/components/context/stores/Userstore';
import {COLORS} from './src/constants/theme';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => (
  <UserStore>
    <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
    <Navigation />
  </UserStore>
);

export default App;
