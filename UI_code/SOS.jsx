// THis is the sos section which is use to sens the sos functionalities 
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Linking } from 'react-native';
import * as Location from 'expo-location'; // Import Expo Location API

const emergencyPhoneNumber = 'tel:6239165083'; // Replace with actual emergency number

// SOS Activation Screen
const SOSScreen = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordFine, setIsPasswordFine] = useState(false);
  const [isTravelStarted, setIsTravelStarted] = useState(false);
  const timerRef = useRef(null);
  const recheckTimerRef = useRef(null);
  const sosTimerRef = useRef(null);

  // Request location permission
  const requestLocationPermission = useCallback(async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to send SOS alerts.');
        return;
      }
      setHasLocationPermission(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to request location permission');
    }
  }, []);

  // Handle SOS Press: send location info and make a call
  const handleSOSPress = useCallback(async () => {
    await requestLocationPermission();
    if (hasLocationPermission) {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const message = `SOS Alert! I'm at Latitude ${latitude}, Longitude ${longitude}`;

      // Automatically open the phone dialer with the emergency number
      Linking.openURL(emergencyPhoneNumber);

      Alert.alert('SOS Alert', 'Your SOS alert has been sent!', [{ text: 'OK' }]);
    } else {
      Alert.alert('Permission Denied', 'Location permission is required to send SOS alerts.');
    }
  }, [hasLocationPermission]);

  // Handle password submission
  const handlePasswordSubmit = () => {
    const correctPassword = '123'; // Replace with actual password
    if (password === correctPassword) {
      Alert.alert('Password Fine', 'You are safe!');
      clearTimeout(timerRef.current); // Clear the current timer
      clearTimeout(recheckTimerRef.current); // Clear recheck timer
      clearTimeout(sosTimerRef.current); // Clear SOS timer
      setIsPasswordFine(true);
      recheckPassword(); // Re-prompt for password after 5 seconds
    } else {
      Alert.alert('Incorrect Password', 'Sending SOS alert...');
      handleSOSPress();
    }
  };

  // Recheck password every 5 seconds (you can change this interval)
  const recheckPassword = () => {
    recheckTimerRef.current = setTimeout(() => {
      setIsPasswordFine(false); // Reset password fine status
      Alert.alert('Re-enter Password', 'Please re-enter your password to confirm you are safe.');
      startAutoSOSTimer(); // Start the 5-second timer for SOS
    }, 5 * 1000); // Re-prompt after 5 seconds
  };

  // Start travel and activate SOS
  const handleStartTravel = () => {
    setIsTravelStarted(true);
    setIsPasswordFine(false);
    startAutoSOSTimer(); // Start 5-second auto-SOS timer if no password is entered
  };

  // Stop travel and clear timers
  const handleStopTravel = () => {
    setIsTravelStarted(false);
    setIsPasswordFine(false);
    clearTimeout(timerRef.current);
    clearTimeout(recheckTimerRef.current);
    clearTimeout(sosTimerRef.current);
  };

  // Clear the auto-SOS timer if password is entered within 5 seconds
  useEffect(() => {
    if (password) {
      clearTimeout(timerRef.current);
      clearTimeout(sosTimerRef.current);
    }
  }, [password]);

  // Start the 5-second timer for auto SOS if no password is entered
  const startAutoSOSTimer = () => {
    sosTimerRef.current = setTimeout(() => {
      if (!password) {
        Alert.alert('Timeout', 'No password entered. Sending SOS alert...');
        handleSOSPress();
      }
    }, 5 * 1000); // Set to 5 seconds
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Mode (SOS Active)</Text>

      {/* Start/Stop Travel */}
      {!isTravelStarted ? (
        <TouchableOpacity style={styles.startButton} onPress={handleStartTravel}>
          <Text style={styles.buttonText}>Start Travel</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.stopButton} onPress={handleStopTravel}>
          <Text style={styles.buttonText}>Stop Travel</Text>
        </TouchableOpacity>
      )}

      {/* Password Input */}
      {isTravelStarted && !isPasswordFine && (
        <View style={styles.passwordContainer}>
          <Text style={styles.prompt}>Enter Password:</Text>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handlePasswordSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* "Password Fine" Message */}
      {isPasswordFine && <Text style={styles.passwordFineText}>Password is fine. You are safe!</Text>}

      {/* SOS Button */}
      {isTravelStarted && (
        <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
          <Text style={styles.sosButtonText}>Send SOS Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles for the SOS screen with matching color scheme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34', // Background color matching the login page
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#61dafb', // Primary color matching login page
  },
  startButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  stopButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#20232a', // Card background color to match theme
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    marginBottom: 20,
  },
  prompt: {
    fontSize: 18,
    marginBottom: 10,
    color: '#61dafb', // Primary color for text
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff', // Input background color
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  sosButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  passwordFineText: {
    color: 'green',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default SOSScreen;
