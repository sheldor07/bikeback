import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import { Color } from "../GlobalStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { getValueFor } from "../utils/userToken";
import {
  convertMetersToKilometers,
  convertSecondsToHours,
} from "../utils/unitConversion";

import Navbar from "../components/NavBar";

const RideDetails = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [userName, setUserName] = useState("John Doe");

  useEffect(() => {
    const getUserName = async () => {
      const userName = await getValueFor("username");
      setUserName(userName);
    };
    getUserName();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Trip to {item.destination}</Text>
          <View style={styles.additionalInfoContainer}>
            <Text style={styles.date}>{userName} | </Text>
            <Text style={styles.date}>{formatDate(item.date)}</Text>
          </View>
        </View>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.coordinates[0].latitude,
          longitude: item.coordinates[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline
          coordinates={item.coordinates}
          strokeWidth={4}
          strokeColor="#1E90FF"
        />
      </MapView>
      <View style={styles.detailsContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <FontAwesome5 name="clock" size={20} color="#555" />
            <Text style={styles.statValue}>
              {convertSecondsToHours(item.duration)}
            </Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statItem}>
            <FontAwesome5 name="route" size={20} color="#555" />
            <Text style={styles.statValue}>
              {convertMetersToKilometers(item.distance)} km
            </Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statItem}>
            <FontAwesome5 name="tachometer-alt" size={20} color="#555" />
            <Text style={styles.statValue}>{item.averageSpeed} km/h</Text>
            <Text style={styles.statLabel}>Avg Speed</Text>
          </View>
        </View>
      </View>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "left",
    margin: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Color.colorSlateblue,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  profileContainer: {
    alignItems: "center",
  },

  map: {
    flex: 1,
  },
  detailsContainer: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
  },
  additionalInfoContainer: {
    flexDirection: "row",

    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  infoValue: {
    fontSize: 16,
  },
});

export default RideDetails;
