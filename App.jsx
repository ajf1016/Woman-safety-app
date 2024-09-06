import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// import Communications from 'react-native-communications';
import {SendDirectSms} from 'react-native-send-direct-sms';

const emergencyPhoneNumber = 'tel:+918606740548';
// const emergencyPhoneNumber = 'tel:7876699539';

const HomeScreen = ({navigation}) => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [password, setPassword] = useState('');
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef(null);

  // Request location permission for both Android and iOS
  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      console.log('Android');
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs location access to send SOS alerts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted for Android..!!');
          setHasLocationPermission(true);
        } else {
          console.log('Location permission denied for Android');
          Alert.alert(
            'Permission Denied Android',
            'Location permission is required to send SOS alerts.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      console.log('IOS');
      Geolocation.requestAuthorization('whenInUse').then(status => {
        if (status === 'granted') {
          console.log('Location permission granted for iOS');
          setHasLocationPermission(true);
        } else {
          console.log('Location permission denied for iOS');
          Alert.alert(
            'Permission Denied IOS',
            'Location permission is required to send SOS alerts.',
          );
        }
      });
    }
  }, []);

  // Get current location
  const getCurrentLocation = useCallback(() => {
    // if (!hasLocationPermission) {
    //   Alert.alert(
    //     'Permission Denied GET',
    //     'Location permission is required to send SOS alerts.',
    //   );
    //   return;
    // }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        console.log('Current location:', latitude, longitude);
      },
      error => {
        console.log('Location error:', error.message);
        Alert.alert('Error', 'Failed to get your current location.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [hasLocationPermission]);

  // Open Google Maps with the current location
  const openMaps = () => {
    if (!currentLocation) {
      Alert.alert(
        'Location not available',
        'Cannot open maps without location.',
      );
      return;
    }
    const {latitude, longitude} = currentLocation;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  // send sms
  function sendSmsData(mobileNumber, bodySMS) {
    SendDirectSms(mobileNumber, bodySMS)
      .then(res => console.log('SMS sent successfully', res))
      .catch(err => console.error('Error sending SMS', err));
  }

  // Handle SOS button press
  const handleSOSPress = useCallback(async () => {
    await requestLocationPermission();
    getCurrentLocation();

    sendSmsData('+918606740548', 'Hai');
    if (currentLocation) {
      const {latitude, longitude} = currentLocation;
      const message = `SOS Alert! I'm at Latitude ${latitude}, Longitude ${longitude}`;
      // Communications.textWithoutEncoding('+918606740548', message);
      //   Linking.openURL(emergencyPhoneNumber); // Call the emergency number
      Alert.alert('SOS Alert', 'Your SOS alert has been sent!', [{text: 'OK'}]);
    }
  }, [currentLocation, requestLocationPermission]);

  // Timer for sending SOS if password is not entered
  useEffect(() => {
    if (timerStarted) {
      const sosTimer = setTimeout(() => {
        if (!password) {
          Alert.alert('Timeout', 'No password entered. Sending SOS alert...');
          handleSOSPress();
        }
      }, 30 * 1000); // 30 seconds timeout

      timerRef.current = sosTimer;

      return () => clearTimeout(sosTimer); // Clear timer on component unmount
    }
  }, [timerStarted, password, handleSOSPress]);

  // Handle password submission
  const handlePasswordSubmit = () => {
    const correctPassword = '123'; // Replace with your actual password
    if (password === correctPassword) {
      Alert.alert('Success', 'Password is correct. Happy journey!');
      clearTimeout(timerRef.current); // Clear the SOS timer
    } else {
      Alert.alert('Incorrect Password', 'Sending SOS alert...');
      handleSOSPress();
    }
  };

  // Start the timer when the component is mounted
  useEffect(() => {
    setTimerStarted(true);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Women’s Safety App</Text>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            sendSmsData('+917876699539', 'Its an SOS..im in trouble')
          }>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function App() {
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  passwordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  prompt: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
