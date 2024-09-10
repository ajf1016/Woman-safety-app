import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {UserContext} from '../context/stores/Userstore';
import {COLORS} from '../../constants/theme';

const SignupScreen = ({navigation}) => {
  const {userDispatch} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (pin !== confirmPin) {
      newErrors.confirmPin = 'Emergency Pins do not match';
      valid = false;
    }

    if (!phone || phone.length < 10) {
      newErrors.phone = 'Valid phone number is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      setIsLoading(true);
      // Prepare the payload
      const userData = {
        username,
        email,
        password,
        confirmPassword,
        phone,
        pin,
        confirmPin,
      };

      try {
        const response = await fetch(
          'http://127.0.0.1:8001/api/v1/user_auth/create_user/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          },
        );

        const data = await response.json();

        if (response.ok) {
          // Handle successful response
          console.log('Signup successful', data);
          const userData = result.user;

          // Update the user state globally
          userDispatch({
            type: 'UPDATE_USER',
            user: {
              username: userData.username,
              email: userData.email,
              phone: userData.phone,
              city: userData.city,
              gender: userData.gender,
              locality: userData.locality,
              state: userData.state,
              is_verified: true, // Assuming successful signup means user is verified
            },
          });
          Alert.alert('Signup successful');
        } else {
          // Handle server errors or validation failures
          console.log('Signup failed', data);
          Alert.alert('Signup failed');
          // Optionally show server-side validation errors
          setErrors(data.errors || {});
        }
      } catch (error) {
        console.error('Error during signup:', error);
        Alert.alert('Error during signup');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      {/* Username Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Full Name"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={COLORS.green}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}
      </View>

      {/* Email Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={COLORS.green}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Password Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={COLORS.green}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Confirm your Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor={COLORS.green}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>

      {/* Phone Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.green}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      {/* Gender Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Set 4 digit Pin (for emergency situations)"
          value={pin}
          secureTextEntry
          onChangeText={setPin}
          placeholderTextColor={COLORS.green}
        />
        {errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}
      </View>

      {/* Gender Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Confirm your 4 digit Pin"
          value={confirmPin}
          secureTextEntry
          onChangeText={setConfirmPin}
          placeholderTextColor={COLORS.green}
        />
        {errors.confirmPin && (
          <Text style={styles.errorText}>{errors.confirmPin}</Text>
        )}
      </View>

      <View style={styles.buttonView}>
        {!isLoading ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={handleSignup}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <Text style={styles.buttonText}>Loading...</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={styles.footerText}
        onPress={() => navigation.navigate('Login')}>
        Already Have Account?<Text style={styles.signup}> Login</Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  inputView: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    borderColor: COLORS.green,
    borderWidth: 1,
    borderRadius: 7,
    color: COLORS.green,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: COLORS.green,
  },

  button: {
    backgroundColor: COLORS.green,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
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

export default SignupScreen;
