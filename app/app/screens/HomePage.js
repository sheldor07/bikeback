import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

import { Color, FontFamily, FontSize } from "../GlobalStyles";

import { serverUrl } from "../utils/api";
import { getValueFor } from "../utils/userToken";

import RightArrowIcon from "../components/RightArrow";
import AutoComplete from "../components/AutoCompleteInput";
import Navbar from "../components/NavBar";

const HomePage = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBegin, setShowBegin] = useState(false);
  const [isDestinationMode, setIsDestinationMode] = useState(false);
  const [startingLocation, setStartingLocation] = useState({
    place_id: "",
    description: "",
  });
  const [destination, setDestination] = useState({
    place_id: "",
    description: "",
  });
  const [duration, setDuration] = useState("");
  const [startingSuggestions, setStartingSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.045,
    longitudeDelta: 0.045,
  });
  const [routeCoords, setRouteCoords] = useState([]);
  const [rideTime, setRideTime] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    if (mapRef.current && routeCoords.length > 0) {
      mapRef.current.animateToRegion({
        latitude: routeCoords[0].latitude,
        longitude: routeCoords[0].longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
    }
  }, [routeCoords]);
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        ...location,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0045,
        longitudeDelta: 0.0045,
      });
    })();
  }, []);
  const handleBeginRide = () => {
    if (routeCoords.length === 0) {
      alert("Route not calculated yet");
      return;
    }
    const tripDescription = isDestinationMode ? destination : startingLocation;
    navigation.navigate("TurnByTurn", {
      routeCoords,
      rideTime,
      totalDistance,
      destination: tripDescription,
    });
  };
  const handleCalculateRoute = async () => {
    if (isDestinationMode) {
      if (!startingLocation || !destination) {
        alert("Please fill in all fields");
        return;
      }
      if (startingLocation.place_id === destination.place_id) {
        alert("Starting location and destination cannot be the same");
        return;
      }
    } else {
      if (!startingLocation) {
        alert("Please fill in the starting location");
        return;
      }

      // Type validation for duration
      const parsedDuration = parseInt(duration, 10);
      if (isNaN(parsedDuration) || parsedDuration <= 0) {
        alert("Please enter a valid duration");
        return;
      }
    }
    if (isDestinationMode) {
      try {
        setIsLoading(true);
        const url = `${serverUrl}/api/route/destination/`;
        const response = await axios.post(
          url,
          {
            start: {
              place_id: startingLocation.place_id,
            },
            end: {
              place_id: destination.place_id,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        setRouteCoords(data["coordinates"]);
        setRideTime(data["seconds"]);
        setTotalDistance(data["distanceMeters"]);
        setIsLoading(false);
        setShowBegin(true);

        if (!response.status === 200) {
          alert("Failed to get the route");
          return;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.message === "Network Error") {
            alert(
              "No internet connection. Please check your network and try again."
            );
          } else {
            alert(
              "An error occurred while getting the route. Please try again later."
            );
          }
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
        console.error(error);
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const url = `${serverUrl}/api/route/leisure/`;
        const response = await axios.post(
          url,
          {
            startingLocation: {
              placeId: startingLocation.place_id,
            },
            rideDuration: parseInt(duration) * 60,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        setRouteCoords(data["coordinates"]);
        setRideTime(data["seconds"]);
        setTotalDistance(data["distanceMeters"]);
        setIsLoading(false);
        setShowBegin(true);

        if (!response.status === 200) {
          alert("Failed to get the route");
          return;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.message === "Network Error") {
            alert(
              "No internet connection. Please check your network and try again."
            );
          } else {
            alert(
              "An error occurred while getting the route. Please try again later."
            );
          }
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.homePage}>
      <View style={styles.rideMode}>
        <View style={[styles.rideModeChild, styles.childPosition]} />
        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.buttonChild,
              styles.buttonPosition,
              !isDestinationMode && styles.selectedButton,
            ]}
            onPress={() => setIsDestinationMode(false)}
          >
            <Text style={[styles.dark, styles.darkTypo]}>Leisure Mode</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonChild,
              styles.buttonPosition,
              isDestinationMode && styles.selectedButton,
            ]}
            onPress={() => setIsDestinationMode(true)}
          >
            <Text style={[styles.dark, styles.darkTypo]}>Destination Mode</Text>
          </Pressable>
        </View>
        <View style={styles.autoCompleteContainer}>
          <AutoComplete
            isDestinationMode={isDestinationMode}
            startingLocation={startingLocation}
            setStartingLocation={setStartingLocation}
            destination={destination}
            setDestination={setDestination}
            duration={duration}
            setDuration={setDuration}
            startingSuggestions={startingSuggestions}
            setStartingSuggestions={setStartingSuggestions}
            destinationSuggestions={destinationSuggestions}
            setDestinationSuggestions={setDestinationSuggestions}
          />
        </View>
        <View style={styles.beginRideButtonContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Pressable
              style={styles.beginRideButton}
              onPress={handleCalculateRoute}
            >
              <Text style={styles.calcRouteText}>Calculate Route</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={location.latitude ? location : undefined}
        >
          {location.latitude && routeCoords.length == 0 && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={"You're here!"}
            />
          )}

          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeWidth={6}
              strokeColor={StyleSheet.colorSlateblue}
            />
          )}
        </MapView>
      </View>
      {showBegin && (
        <Pressable
          style={styles.beginRideBtn}
          onPress={() => handleBeginRide()}
        >
          <Text style={styles.beginRideText}> Begin Ride</Text>
          <RightArrowIcon />
        </Pressable>
      )}

      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homePage: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Color.colorWhitesmoke,
  },
  rideMode: {
    width: "100%",
    padding: 20,
    backgroundColor: Color.colorWhite,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorGray,
  },
  rideModeChild: {
    backgroundColor: Color.colorWhite,
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    left: "0%",
    position: "absolute",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  beginRideBtn: {
    flexDirection: "row",
    backgroundColor: Color.colorSlateblue,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    bottom: 75,
    left: 100,
  },
  buttonChild: {
    backgroundColor: Color.colorBlack,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dark: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: FontSize.size_sm,
    textAlign: "center",
  },
  selectedButton: {
    backgroundColor: Color.colorSlateblue,
  },
  beginRideButtonContainer: {
    alignItems: "center",
    marginTop: 20,
    zIndex: 10,
  },
  beginRideButton: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  beginRideText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: FontSize.size_sm,
    textAlign: "center",
    fontSize: FontSize.size_lg,
  },
  calcRouteText: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: FontSize.size_sm,
    textAlign: "center",
  },
  mapContainer: {
    flex: 1,
    width: "100%",
  },
  map: {
    flex: 1,
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: Color.colorGray,
    width: "100%",
  },
  homeItem: {
    alignItems: "center",
  },
  homeIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  home: {
    color: Color.colorSlateblue,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_3xs,
    textAlign: "center",
  },
  home1: {
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_3xs,
    textAlign: "center",
  },
});

export default HomePage;
