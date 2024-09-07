// This is the dashboar where the user will get the past record and all the details which she should know before travelling 
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const SummaryCard = ({ title, value, icon, color }) => (
  <View style={[styles.summaryCard, { borderColor: color }]}>
    <View style={styles.cardContent}>
      {icon}
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
      </View>
    </View>
  </View>
);

const AlertItem = ({ alert, onPress }) => (
  <TouchableOpacity onPress={() => onPress(alert)} style={styles.alertItem}>
    <Text style={styles.alertText}>{alert.details}</Text>
  </TouchableOpacity>
);

const Dashboard = () => {
  const [genderData, setGenderData] = useState({ men: 0, women: 0 });
  const [alerts, setAlerts] = useState([]);
  const [trendData, setTrendData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ data: [10, 20, 15, 30, 25, 40] }] // Sample trend data
  });

  // Fetch gender data from API
  useEffect(() => {
    const fetchGenderData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=100'); // Fetch 100 random users
        const users = response.data.results;

        // Calculate gender distribution
        const menCount = users.filter(user => user.gender === 'male').length;
        const womenCount = users.filter(user => user.gender === 'female').length;

        setGenderData({ men: menCount, women: womenCount });
      } catch (error) {
        console.error('Error fetching gender data:', error);
      }
    };

    fetchGenderData();
  }, []);

  const handleAlertPress = useCallback((alert) => {
    Alert.alert('Alert Details', alert.details);
  }, []);

  const filteredAlerts = useMemo(() => {
    return {
      loneWoman: alerts.filter(alert => alert.type === 'Lone Woman'),
      surroundedWoman: alerts.filter(alert => alert.type === 'Surrounded Woman'),
      sos: alerts.filter(alert => alert.type === 'SOS'),
    };
  }, [alerts]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Women Safety Analytics</Text>
        <TouchableOpacity style={styles.profileIcon}>
          <FontAwesome name="user-circle" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <SummaryCard
          title="Men"
          value={genderData.men}
          icon={<AntDesign name="man" size={24} color="#FF9933" />}
          color="#FF9933"
        />
        <SummaryCard
          title="Women"
          value={genderData.women}
          icon={<AntDesign name="woman" size={24} color="#28A745" />}
          color="#28A745"
        />
      </View>

      {/* Trend Analysis */}
      <View style={styles.panel}>
        <Text style={styles.sectionTitle}>Trend Analysis</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={trendData}
            width={width * 0.9} // Responsive width
            height={220}
            chartConfig={chartConfig}
            bezier // Smooth line
            style={styles.lineChart}
          />
        </View>
      </View>

      {/* Recent Alerts */}
      <View style={styles.panel}>
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        {alerts.length > 0 ? (
          <ScrollView style={styles.alertList}>
            {alerts.slice(0, 5).map((alert, index) => (
              <AlertItem key={index} alert={alert} onPress={handleAlertPress} />
            ))}
            {alerts.length > 5 && (
              <TouchableOpacity onPress={() => Alert.alert('See More Alerts', 'You have more alerts.')}>
                <Text style={styles.seeMore}>See More</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        ) : (
          <Text style={styles.noAlerts}>No recent alerts</Text>
        )}
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#f0f0f5',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff', // Match the login page background color
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff', // Match button color from login page
  },
  profileIcon: {
    padding: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  panel: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff', // Match section titles color from login page
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
    width: '100%', // Ensure full width
    marginBottom: 20, // Add space below charts
  },
  lineChart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  alertItem: {
    backgroundColor: '#ffcccc',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  alertText: {
    color: '#333',
    fontSize: 16,
  },
  alertList: {
    maxHeight: 200, // Limit height for scrollable area
  },
  seeMore: {
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  noAlerts: {
    textAlign: 'center',
    color: '#666',
  },
});

export default Dashboard;
