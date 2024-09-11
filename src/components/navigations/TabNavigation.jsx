import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, SIZES} from '../../constants/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import Home from '../screens/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Sample screen components for different features
const TrackMe = () => <View style={styles.screenContainer} />;
const Report = () => <View style={styles.screenContainer} />;
const Contacts = () => <View style={styles.screenContainer} />;
const SafeZonesScreen = () => <View style={styles.screenContainer} />;

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={'Home'}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const HeaderRight = () => (
  <View style={styles.headerRight}>
    <TouchableOpacity style={styles.headerButton}>
      <Icon name="notifications" size={24} color={COLORS.green} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerButton}>
      <Icon name="help-circle-outline" size={24} color={COLORS.green} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerButton}>
      <Icon name="settings" size={24} color={COLORS.green} />
    </TouchableOpacity>
  </View>
);

const HeaderLeft = () => (
  <TouchableOpacity style={styles.headerRight}>
    <Image
      source={require('../../assets/images/logo.png')}
      style={styles.image}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

const CustomHeader = ({title}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginBottom: Platform.OS == 'ios' ? SIZES.wp('11%') : SIZES.wp('19%'),
      }}>
      <View
        style={{
          height: SIZES.wp('20%'),
          // paddingVertical: SIZES.wp('5%'),
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: COLORS.background,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <HeaderLeft />
        <HeaderRight />
      </View>
    </SafeAreaView>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: 'gray',
        header: () => <CustomHeader />,
        showLabel: Platform.OS == 'ios' ? false : true,
        tabBarLabelStyle: {
          fontSize: SIZES.wp('3%'), // Adjust font size if needed
          paddingBottom: SIZES.wp('3%'), // Adds space below the label to avoid congestion
        },
        tabBarStyle: {
          height: Platform.OS == 'ios' ? SIZES.wp('25%') : SIZES.wp('20%'), // Adjust this to increase the tab bar height
          paddingVertical: SIZES.wp('2%'), // Adjust padding to space things out vertically
          backgroundColor: COLORS.background,
        },
      })}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TrackMe"
        component={TrackMe}
        options={{
          tabBarLabel: 'Track Me',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="my-location" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="report-problem" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SafeZones"
        component={SafeZonesScreen}
        options={{
          tabBarLabel: 'Safe Zones',
          tabBarIcon: ({color, size}) => (
            <Icon name="shield-checkmark" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="contact-page" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    paddingHorizontal: 10,
  },
  headerRight: {
    flexDirection: 'row',
  },
  image: {
    width: SIZES.wp('15%'),
    height: SIZES.wp('15%'),
  },
});

export default TabNavigation;
