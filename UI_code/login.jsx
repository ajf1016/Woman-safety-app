import React from 'react';
import { View, StatusBar, Image, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const CircularLogo = () => (
  <Image
    source={require('./assets/logo.png')}
    style={styles.logo}
  />
);

const WelcomeText = () => (
  <View style={styles.welcomeTextContainer}>
    <LinearGradient
      colors={['#FF9933', '#FFFFFF', '#138808']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientTextContainer}
    >
      <Text style={styles.welcomeText}>Welcome Onboard</Text>
    </LinearGradient>
  </View>
);

const TopWave = () => (
  <View style={styles.topWaveContainer}>
    <Svg width="150" height="80" viewBox="0 0 150 80" style={styles.wave}>
      <Path
        d="M0,30 C30,10 60,20 90,30 C120,40 150,20 150,30 L150,0 L0,0 Z"
        fill="#FF9933" // Indian saffron color
      />
    </Svg>
  </View>
);

const BottomWave = () => (
  <View style={styles.bottomWaveContainer}>
    <Svg width="150" height="80" viewBox="0 0 150 80" style={styles.wave}>
      <Path
        d="M0,50 C30,70 60,60 90,50 C120,40 150,60 150,50 L150,80 L0,80 Z"
        fill="#28A745" // Green color
      />
    </Svg>
  </View>
);

const App = () => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Regular expression to validate a 10-digit phone number
    const phoneNumberRegex = /^\d{10}$/;

    if (!phoneNumber || !password) {
      Alert.alert('Validation Error', 'Please enter both phone number and password.');
      return;
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      Alert.alert('Validation Error', 'Phone number must be exactly 10 digits.');
      return;
    }

    // Implement your login logic here
    console.log('Login with:', phoneNumber, password);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TopWave />
      <WelcomeText />
      <CircularLogo />
      <View style={styles.form}>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={10} // Limit the input to 10 digits
          placeholder="Phone Number"
          placeholderTextColor="#666" // Light gray color for the placeholder
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#666" // Light gray color for the placeholder
          style={styles.input}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <BottomWave />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden', // Ensures the wave doesn't overflow
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 20,
  },
  form: {
    width: '80%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16, // Ensure text inside the input is visible and matches placeholder
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  topWaveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 150,
    height: 80,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  bottomWaveContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 150,
    height: 80,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  welcomeTextContainer: {
    position: 'absolute',
    top: 120, // Adjust this value to position text just above the logo
    alignItems: 'center',
  },
  gradientTextContainer: {
    padding: 10,
    borderRadius: 5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Ensure the text is visible over the gradient
  },
});

export default App;
