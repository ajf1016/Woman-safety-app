import React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({navigation}) => {
  const handleLogout = async () => {
    // Remove access token from AsyncStorage
    await AsyncStorage.removeItem('accessToken');
    navigation.navigate('Welcome');
  };

  return (
    <View>
      <Text>Welcome to the Dashboard!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Dashboard;
