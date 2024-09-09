import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

const SignupScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

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

    if (!phone || phone.length < 10) {
      newErrors.phone = 'Valid phone number is required';
      valid = false;
    }

    if (!gender) {
      newErrors.gender = 'Gender is required';
      valid = false;
    }

    if (!locality) {
      newErrors.locality = 'Locality is required';
      valid = false;
    }

    if (!city) {
      newErrors.city = 'City is required';
      valid = false;
    }

    if (!state) {
      newErrors.state = 'State is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = () => {
    if (validateForm()) {
      // Handle signup logic
      console.log('Signup successful');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      {/* Username Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Username"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={'#770092'}
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
          placeholderTextColor={'#770092'}
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
          placeholderTextColor={'#770092'}
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
          placeholderTextColor={'#770092'}
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
          placeholderTextColor={'#770092'}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      {/* Gender Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Gender"
          value={gender}
          onChangeText={setGender}
          placeholderTextColor={'#770092'}
        />
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
      </View>

      {/* Locality Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Locality"
          value={locality}
          onChangeText={setLocality}
          placeholderTextColor={'#770092'}
        />
        {errors.locality && (
          <Text style={styles.errorText}>{errors.locality}</Text>
        )}
      </View>

      {/* City Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your City"
          value={city}
          onChangeText={setCity}
          placeholderTextColor={'#770092'}
        />
        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
      </View>

      {/* State Input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Enter your State"
          value={state}
          onChangeText={setState}
          placeholderTextColor={'#770092'}
        />
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>
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
    backgroundColor: '#f4f4f4',
  },
  inputView: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    borderColor: '#770092',
    borderWidth: 1,
    borderRadius: 7,
    color: '#770092',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#770092',
  },

  button: {
    backgroundColor: '#770092',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
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
    color: '#770092',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
