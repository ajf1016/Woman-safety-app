import React from 'react';
import {View, Text, Button} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <View>
      <Text>Welcome!</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

export default Welcome;
