import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Login from './src/components/auth/Login';
import SOSScreen from './src/components/SOSScreen';
import Dashboard from './src/components/Dashboard';
import Otp from './src/components/auth/Otp';
import SignIn from './src/components/auth/SignIn';
import ActiveListener from './src/components/ActiveListener';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

const emergencyPhoneNumber = 'tel:8606740548';

// Home Screen Component
const HomeScreen = ({navigation}) => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [password, setPassword] = useState('');
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef(null);

  // Request location permissions
  const requestLocationPermission = useCallback(async () => {
    Geolocation.requestAuthorization('whenInUse');
    Geolocation.getCurrentPosition(
      position => {
        setHasLocationPermission(true);
      },
      error => {
        setHasLocationPermission(false);
        Alert.alert(
          'Permission Denied',
          'Location permission is required to send SOS alerts.',
        );
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  // Handle SOS action
  const handleSOSPress = useCallback(async () => {
    await requestLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords;
        const message = `SOS Alert! I'm at Latitude ${latitude}, Longitude ${longitude}`;

        // Call the emergency number
        Linking.openURL(emergencyPhoneNumber);

        Alert.alert('SOS Alert', 'Your SOS alert has been sent!', [
          {text: 'OK'},
        ]);
      });
    } else {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to send SOS alerts.',
      );
    }
  }, [hasLocationPermission, requestLocationPermission]);

  // Set timer for SOS if password not entered
  useEffect(() => {
    if (timerStarted) {
      const sosTimer = setTimeout(() => {
        if (!password) {
          Alert.alert('Timeout', 'No password entered. Sending SOS alert...');
          handleSOSPress();
        }
      }, 30 * 1000); // 30 seconds

      timerRef.current = sosTimer;

      return () => clearTimeout(sosTimer);
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

  // Start timer when the component is mounted
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
        <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Stack Navigator
// const Stack = createStackNavigator();

function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <HomeScreen/> />
    // <Dashboard />
    // <SOSScreen />
    <ActiveListener />
    // <Login />
    // <SignIn />
    // <Otp />
    // <AndroidLocPermission />
  );
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
