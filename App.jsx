import {useEffect, useRef, useState} from 'react';
import {
  PermissionsAndroid,
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {SendDirectSms} from 'react-native-send-direct-sms';

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(currentLocation ? true : false);
  const [watchId, setWatchId] = useState(null);
  const [passwordRequired, setPasswordRequired] = useState(true);
  const [password, setPassword] = useState('');
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef(null);
  const trackingIntervalRef = useRef(null);

  // default password
  const CODE = '123';

  // mobile number to send SMS
  const MOBILE_NO = '+916239165083';

  // location permission
  const requestAndroidLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to ensure safety tracking.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLoading(true);
        console.log('Location permission granted');
        startLocationTracking();
      } else {
        console.log('Location permission denied');
        Alert.alert(
          'Permission Denied',
          'Location permission is required to track safety.',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // SMS Permission
  const requestAndroidSMSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'SMS Permission',
          message:
            'This app needs access to your SMS to ensure safety tracking.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('SMS permission granted');
        startLocationTracking();
      } else {
        console.log('SMS permission denied');
        Alert.alert(
          'Permission Denied',
          'SMS permission is required to track safety.',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Send SMS
  function sendSmsData(mobileNumber, lat, long) {
    SendDirectSms(
      mobileNumber,
      `This is an emergency message. Please help me. My location is: https://maps.google.com/?q=${lat},${long}`,
    )
      .then(res => console.log('then', res))
      .catch(err => console.log('catch', err));
  }

  // Start location tracking
  const startLocationTracking = () => {
    console.log('Starting location tracking');
    const id = Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        console.log(latitude, longitude);
      },
      error => {
        if (error.code === 3) {
          // Timeout error
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setCurrentLocation({latitude, longitude});
              console.log('Fallback:', latitude, longitude);
            },
            err => console.log('Fallback error:', err),
            {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
          );
        } else {
          console.log(error);
        }
      },
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 10000},
    );
    console.log(currentLocation);
    setWatchId(id);
  };

  // Handle password submission
  const handlePasswordSubmit = () => {
    if (password === CODE) {
      Alert.alert('Success', 'Password is correct. Happy journey!');
      clearTimeout(timerRef.current); // Clear the SOS timer
      setPasswordRequired(false); // Reset password requirement
    } else {
      Alert.alert('Incorrect Password', 'Sending SOS alert...');
      sendSmsData(
        MOBILE_NO,
        currentLocation?.latitude,
        currentLocation?.longitude,
      );
    }
    setPassword(''); // Clear the password input after submission
  };

  const openMap = (lat, long) => {
    const url = `https://maps.google.com/?q=${lat},${long}`;
    Linking.openURL(url)
      .then(() => {
        console.log('Map opened');
      })
      .catch(err => {
        console.error('Failed to open map:', err);
      });
  };

  // Request permissions on component mount
  useEffect(() => {
    requestAndroidSMSPermission();
    requestAndroidLocationPermission();
  }, []);

  // Start tracking location
  useEffect(() => {
    setInterval(() => {
      requestAndroidLocationPermission();
    }, 10 * 1000);
    return () => clearInterval(trackingIntervalRef.current);
  }, []);

  // Stop tracking when component unmounts
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  // Start SOS timer
  useEffect(() => {
    const timer = setInterval(() => {
      setPasswordRequired(true); // Prompt user for password every 10 seconds
    }, 10 * 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // return {currentLocation, requestAndroidLocationPermission};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Women’s Safety App</Text>
      {passwordRequired && (
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
            onPress={handlePasswordSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.loc_box}>
        <Text style={styles.loc_text}>
          Lat : {currentLocation?.latitude || 'Loading'}, long :{' '}
          {currentLocation?.longitude || 'Loading'}
        </Text>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() =>
            openMap(currentLocation?.latitude, currentLocation?.longitude)
          }>
          <Text style={styles.mapButtonText}>View Your Current Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendSMSButton}
          onPress={() =>
            sendSmsData(
              MOBILE_NO,
              currentLocation?.latitude,
              currentLocation?.longitude,
            )
          }>
          <Text style={styles.sendSMSButtonText}>Send SMS Anyway</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  loc_box: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  loc_text: {
    fontSize: 16,
    color: '#333',
  },
  mapButton: {
    backgroundColor: '#11ff00',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  mapButtonText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
  },
  sendSMSButton: {
    backgroundColor: '#e40e0e',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
  },
  sendSMSButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '900',
  },
});

export default App;
