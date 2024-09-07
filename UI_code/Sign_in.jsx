// This is signin page for the user from here he will get otp 
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
      <Text style={styles.welcomeText}>Sign In</Text>
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

const SignIn = () => {
  const [name, setName] = React.useState('');
  const [aadhaarNumber, setAadhaarNumber] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handleSignIn = () => {
    const aadhaarRegex = /^\d{12}$/; // Aadhaar should be 12 digits
    const phoneNumberRegex = /^\d{10}$/; // Phone number should be 10 digits

    if (!name || !aadhaarNumber || !phoneNumber) {
      Alert.alert('Validation Error', 'Please enter Name, Aadhaar Number, and Phone Number.');
      return;
    }

    if (!aadhaarRegex.test(aadhaarNumber)) {
      Alert.alert('Validation Error', 'Aadhaar number must be exactly 12 digits.');
      return;
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      Alert.alert('Validation Error', 'Phone number must be exactly 10 digits.');
      return;
    }

    // Implement your sign-in logic here
    console.log('Sign In with:', name, aadhaarNumber, phoneNumber);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TopWave />
      <WelcomeText />
      <Text style={styles.safeEastText}>SAFE EAST Instant</Text>
      <CircularLogo />
      <View style={styles.form}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#666"
          style={styles.input}
        />
        <TextInput
          value={aadhaarNumber}
          onChangeText={setAadhaarNumber}
          keyboardType="numeric"
          maxLength={12} // Aadhaar Card number is 12 digits
          placeholder="Aadhaar Card Number"
          placeholderTextColor="#666"
          style={styles.input}
        />
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={10} // Phone number is 10 digits
          placeholder="Phone Number"
          placeholderTextColor="#666"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Get OTP For Verification </Text>
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
    overflow: 'hidden',
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
    fontSize: 16,
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
  safeEastText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
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
    top: 120,
    alignItems: 'center',
  },
  gradientTextContainer: {
    padding: 10,
    borderRadius: 5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SignIn;
