import React, {useContext, useEffect, useState} from 'react';

// libs
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import {StatusBar} from 'react-native';
import Dashboard from '../Dashboard';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import Welcome from '../auth/Welcome';
import {UserContext} from '../context/stores/Userstore';

const Stack = createNativeStackNavigator();

const AuthScreen = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={'Login'}>
    {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const MainScreen = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Dashboard">
    {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
    <Stack.Screen name="Dashboard" component={Dashboard} />
  </Stack.Navigator>
);

export default function Navigation() {
  const {userState, userDispatch} = useContext(UserContext);
  const [isWelcome, setIsWelcome] = useState(true);

  const checkUserLogIn = async () => {
    const is_slider_done = await AsyncStorage.getItem('is_slider_done');
    const user = await AsyncStorage.getItem('user');
    // AsyncStorage.removeItem('user');
    if (is_slider_done) {
      if (user) {
        userDispatch({
          type: 'UPDATE_USER',
          user: {
            is_slider_done: true,
            user: true,
          },
        });
      } else {
        userDispatch({
          type: 'UPDATE_USER',
          user: {
            is_slider_done: true,
            user: false,
          },
        });
      }
    } else {
      userDispatch({
        type: 'UPDATE_USER',
        user: {
          is_slider_done: false,
          user: false,
        },
      });
    }
  };

  const rednerScreen = () => {
    if (userState.is_verified) {
      return <MainScreen />;
    } else {
      return <AuthScreen />;
    }
  };

  useEffect(() => {
    checkUserLogIn();
    setTimeout(() => {
      setIsWelcome(false);
    }, 1500);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      {rednerScreen()}
    </NavigationContainer>
  );
}
