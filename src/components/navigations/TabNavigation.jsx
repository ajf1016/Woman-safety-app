import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../constants/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Sample screen components for different features
const MapScreen = () => <View style={styles.screenContainer} />;
const ReportIncidentScreen = () => <View style={styles.screenContainer} />;
const SOSScreen = () => <View style={styles.screenContainer} />;
const VoiceActivatedSOSScreen = () => <View style={styles.screenContainer} />;
const SafeZonesScreen = () => <View style={styles.screenContainer} />;

const TabNavigation = () => {
  // Header component for the stack navigator
  const HeaderRight = () => (
    <View style={styles.headerRight}>
      <TouchableOpacity style={styles.headerButton}>
        <MaterialIcons name="local-hospital" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton}>
        <Icon name="notifications" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton}>
        <Icon name="settings" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  const HeaderLeft = () => (
    <TouchableOpacity style={styles.headerButton}>
      <MaterialIcons name="person-add" size={24} color="white" />
    </TouchableOpacity>
  );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: COLORS.background},
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Track Me',
          tabBarIcon: ({color, size}) => (
            <Icon name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportIncidentScreen}
        options={{
          tabBarLabel: 'Report',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="report" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SOS"
        component={SOSScreen}
        options={{
          tabBarLabel: 'SOS',
          tabBarIcon: ({color, size}) => (
            <Icon name="warning" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="VoiceSOS"
        component={VoiceActivatedSOSScreen}
        options={{
          tabBarLabel: 'Voice SOS',
          tabBarIcon: ({color, size}) => (
            <Icon name="mic" color={color} size={size} />
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
});

export default TabNavigation;
