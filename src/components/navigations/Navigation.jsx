import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar, ActivityIndicator, View} from 'react-native';

// Screens
import Dashboard from '../Dashboard';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import Welcome from '../auth/Welcome';

// User Context
import {UserContext} from '../context/stores/Userstore';
import TabNavigation from './TabNavigation';
import {COLORS} from '../../constants/theme';

const Stack = createNativeStackNavigator();

const AuthScreen = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Login">
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const MainScreen = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="TabNavigation">
    <Stack.Screen name="TabNavigation" component={TabNavigation} />
    <Stack.Screen name="Dashboard" component={Dashboard} />
  </Stack.Navigator>
);

export default function Navigation() {
  const {userState, userDispatch} = useContext(UserContext);
  const [loading, setLoading] = useState(true); // Add a loading state

  const checkUserLogIn = async () => {
    try {
      let user_data = await AsyncStorage.getItem('user');

      // Check if user_data exists and is valid
      if (user_data) {
        user_data = JSON.parse(user_data); // Safely parse the data

        console.log('>>', user_data.is_verified);

        // Check if is_verified exists and compare it correctly
        if (
          user_data.is_verified === true ||
          user_data.is_verified === 'true'
        ) {
          userDispatch({
            type: 'UPDATE_USER',
            user: {is_verified: true},
          });
        } else {
          userDispatch({
            type: 'UPDATE_USER',
            user: {is_verified: false},
          });
        }
      } else {
        console.log('No user data found.');
        // Optionally, handle cases where user_data is null
        userDispatch({
          type: 'UPDATE_USER',
          user: {is_verified: false},
        });
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setLoading(false); // Set loading to false after check
    }
  };

  console.log('NAV', userState.is_verified);

  useEffect(() => {
    checkUserLogIn();
  }, []);

  // Loading indicator while checking auth state
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#770092" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      {userState.is_verified ? <MainScreen /> : <AuthScreen />}
    </NavigationContainer>
  );
}
