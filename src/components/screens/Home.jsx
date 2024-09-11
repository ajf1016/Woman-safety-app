import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For the plus icon in the story circle
import {COLORS, SIZES} from '../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';

export default function Home() {
  const [pin, setPin] = useState('');
  // Dummy data for friends (empty means no friends, else array of objects)
  const friends = [
    {
      name: 'Vasundhara',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {name: 'Koshik', image: 'https://randomuser.me/api/portraits/men/4.jpg'},
    {name: 'Vaibav', image: 'https://randomuser.me/api/portraits/women/2.jpg'},
    {name: 'Bob', image: 'https://randomuser.me/api/portraits/men/1.jpg'},
    {name: 'Ajmal', image: 'https://randomuser.me/api/portraits/women/1.jpg'},
    {name: 'Brahmank', image: 'https://randomuser.me/api/portraits/men/1.jpg'},
    {name: 'Alice', image: 'https://randomuser.me/api/portraits/women/1.jpg'},
    {name: 'Bob', image: 'https://randomuser.me/api/portraits/men/1.jpg'},
    {name: 'Alice', image: 'https://randomuser.me/api/portraits/women/1.jpg'},
    {name: 'Bob', image: 'https://randomuser.me/api/portraits/men/1.jpg'},
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Top Section - Profile and Greeting */}
      <View style={styles.topSection}>
        <Text style={styles.greeting}>Hai, John!</Text>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/men/10.jpg'}} // Profile picture URL
          style={styles.profilePic}
        />
      </View>

      {/* Friends Section - Instagram Story-like Circles */}
      <View style={styles.friendsSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Add Friend Circle */}
          <TouchableOpacity style={styles.storyCircle}>
            <Ionicons
              name="add-circle-outline"
              size={SIZES.wp('20%')}
              color={COLORS.green}
            />
            <Text style={styles.storyText}>Add Friend</Text>
          </TouchableOpacity>

          {/* Show Friends */}
          {friends.length > 0 &&
            friends.map((friend, index) => (
              <View
                style={{
                  alignItems: 'center',
                  marginRight: SIZES.wp('3%'),
                }}>
                <LinearGradient
                  key={index}
                  colors={['#009262', '#FF671F', '#06038D', '#808080']}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: 'transparent',
                    backgroundColor: 'transparent',
                    width: SIZES.wp('20%'),
                    height: SIZES.wp('20%'),
                    borderRadius: SIZES.wp('20%'),
                  }}>
                  <Image
                    source={{uri: friend.image}}
                    style={styles.friendImage}
                  />
                </LinearGradient>
                <Text style={styles.storyText}>{friend.name}</Text>
              </View>
            ))}
        </ScrollView>
      </View>

      {/* Main Buttons - SOS and Start Travel */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[
            styles.mainButton, // Predefined style from StyleSheet
            {backgroundColor: 'red', padding: 15}, // Inline style
          ]}>
          <Text style={styles.buttonText}>SOS</Text>
        </TouchableOpacity>
        <Text style={styles.sosDescription}>
          Pressing the SOS button will immediately:
        </Text>
        <Text style={styles.sosInstruction}>
          * Start tracking your location.
        </Text>
        <Text style={styles.sosInstruction}>
          * Send an emergency SMS to your friends with your live location.
        </Text>
        <Text style={styles.sosInstruction}>
          * Trigger a loud alarm on your device.
        </Text>
      </View>
      <View
        style={[
          styles.buttonSection,
          {
            marginTop: SIZES.wp('5%'),
            borderColor: COLORS.green,
            marginBottom: SIZES.wp('5%'),
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.mainButton, // Predefined style from StyleSheet
            {backgroundColor: COLORS.green, padding: 15}, // Inline style
          ]}>
          <Text style={styles.buttonText}>Start Travel</Text>
        </TouchableOpacity>
        {/* Input Section for PIN */}
        <View style={styles.pinSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter 4 PIN"
            keyboardType="numeric"
            value={pin}
            onChangeText={setPin}
            placeholderTextColor={COLORS.light_gray}
          />
          <TouchableOpacity
            style={[
              styles.submitButton, // Button style
              {backgroundColor: COLORS.green},
            ]}
            onPress={() => console.log('Entered PIN:', pin)} // Handle PIN submission
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.travelButtonText}>Start Travel</Text>
        <Text style={styles.travelDescription}>
          Press "Start Travel" to activate the travel mode:
        </Text>
        <Text style={styles.travelInstruction}>
          * You will need to enter a PIN every 5 minutes.
        </Text>
        <Text style={styles.travelInstruction}>
          * If you enter the wrong PIN, you will have 3 attempts.
        </Text>
        <Text style={styles.travelInstruction}>
          * After 3 failed attempts, the SOS feature will automatically
          activate.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.wp('5%'),
    paddingVertical: SIZES.wp('5%'),
    backgroundColor: '#fff',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.wp('5%'),
    justifyContent: 'space-between',
  },
  profilePic: {
    width: SIZES.wp('10%'),
    height: SIZES.wp('10%'),
    borderRadius: 30,
  },
  greeting: {
    fontSize: SIZES.wp('6%'),
    fontWeight: '400',
    color: COLORS.black,
  },
  friendsSection: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  storyCircle: {
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 50,
  },
  storyText: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.green,
  },
  friendImage: {
    width: SIZES.wp('18%'),
    height: SIZES.wp('18%'),
    borderRadius: SIZES.wp('20%'),
    borderWidth: 3, // Optional to add an inner border
    borderColor: '#fff', // White border for a cleaner look
    backgroundColor: '#e0e0e0',
  },
  buttonSection: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderColor: COLORS.red,
    borderWidth: 2,
    padding: SIZES.wp('2%'),
    borderRadius: 10,
  },
  mainButton: {
    width: '100%',
    height: SIZES.wp('20%'),
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: SIZES.wp('5%'),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  pinSection: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
  },
  input: {
    height: SIZES.wp('13%'),
    borderColor: COLORS.green,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    width: '65%',
    marginRight: 10,
    color: COLORS.green,
    fontWeight: 'bold',
    fontSize: SIZES.wp('5%'),
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '30%',
    height: SIZES.wp('13%'),
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  sosDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    textAlign: 'left',
  },
  sosInstruction: {
    fontSize: 14,
    color: '#777',
    marginBottom: 3,
    textAlign: 'left',
  },
  travelSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  travelButton: {
    width: '100%',
    backgroundColor: '#00AA00',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  travelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  travelDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    textAlign: 'left',
  },
  travelInstruction: {
    fontSize: 14,
    color: '#777',
    marginBottom: 3,
    textAlign: 'left',
  },
});
