import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {UserContext} from '../context/stores/Userstore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../constants/theme';

export default function LoginForm() {
  let navigation = useNavigation();
  const {userDispatch, userState} = useContext(UserContext);

  const {username, setUsername} = useState('');
  const {password, setPassword} = useState('');

  const handleLogin = async () => {
    console.log('Login');
    let user_data = {
      ...userState.user,
      is_verified: true,
    };
    await AsyncStorage.setItem('user', JSON.stringify(user_data)).then(
      result => {
        userDispatch({
          type: 'UPDATE_USER',
          user: {
            user: true,
            ...user_data,
          },
        });
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login your account</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email or Phone"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={COLORS.green}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={COLORS.green}
        />
      </View>
      <View style={styles.rememberView}>
        <Pressable onPress={() => Alert.alert('Forget Password!')}>
          <Text style={styles.forgetText}>Login with OTP</Text>
        </Pressable>
        <View>
          <Pressable onPress={() => Alert.alert('Forget Password!')}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={styles.footerText}
        onPress={() => navigation.navigate('Signup')}>
        Don't Have Account?<Text style={styles.signup}> Sign Up</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 70,
    backgroundColor: COLORS.background,
  },
  image: {
    height: 200,
    width: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 40,
    color: COLORS.green,
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    borderColor: COLORS.green,
    borderWidth: 1,
    borderRadius: 7,
    color: COLORS.green,
  },
  rememberView: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  forgetText: {
    fontSize: 13,
    color: COLORS.green,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: COLORS.green,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 30,
  },
  footerText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },
  signup: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
