import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function LoginForm() {
  let navigation = useNavigation();
  const [click, setClick] = useState(false);
  const {username, setUsername} = useState('');
  const {password, setPassword} = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email or Password"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={'#770092'}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={'#770092'}
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
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert('Login Successfuly!')}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
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
    backgroundColor: '#f4f4f4',
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
    color: '#770092',
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
    borderColor: '#770092',
    borderWidth: 1,
    borderRadius: 7,
    color: '#770092',
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
    color: '#770092',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#770092',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
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
    color: '#770092',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
