import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color } from "../GlobalStyles";

import MapView, { Marker, Polyline } from "react-native-maps";
import {
  getDistance,
  getDirection,
  calculateTotalDistance,
  calculateETA,
} from "../utils/navigation";
import { getValueFor } from "../utils/userToken";
import { serverUrl } from "../utils/api";

import ForwardArrow from "../components/navigation/ForwardArrowNav";
import LeftArrow from "../components/navigation/LeftArrowNav";
import RightArrow from "../components/navigation/RightArrowNav";

const TurnByTurn = ({ route }) => {
  const { routeCoords, rideTime, totalDistance, destination } = route.params;
  const [eta, setEta] = useState(null);
  const mapRef = useRef(null);
  const navigate = useNavigation();
  const [currentStep, setCurrentStep] = useState(1); 
  const [arrowDirection, setArrowDirection] = useState("forward");
  const [riderPosition, setRiderPosition] = useState(null);
  const [remainingDistance, setRemainingDistance] = useState(
    totalDistance / 1000
  );

  useEffect(() => {
    if (mapRef.current && currentStep < routeCoords.length) {
      mapRef.current.animateToRegion({
        latitude: routeCoords[currentStep].latitude,
        longitude: routeCoords[currentStep].longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
    }
  }, [currentStep]);
  useEffect(() => {
    setArrowDirection(getArrowDirection());
  }, [currentStep]);
  useEffect(() => {
    setEta(calculateETA(remainingDistance, 15));
  }, [remainingDistance]);

  const handleEndTrip = () => {
    Alert.alert(
      "Save Ride",
      "Do you want to save this ride?",
      [
        {
          text: "Yes",
          onPress: handleSaveRide,
        },
        {
          text: "No",
          onPress: handleDiscardRide,
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  const handleSaveRide = async () => {
    const userToken = await getValueFor("token");
    console.log("User token", userToken);
    console.log(rideTime);
    const rideTimeInSeconds = parseInt(rideTime.replace("s", ""));
    const distanceTravelled = totalDistance - remainingDistance * 1000;
    try {
      const url = `${serverUrl}/api/user/rides/save`;
      console.log(
        "Saving ride",
        url,
        rideTimeInSeconds,
        distanceTravelled,
        routeCoords,
        15
      );
      const response = await axios.post(
        url,
        {
          duration: rideTimeInSeconds,
          distance: distanceTravelled,
          averageSpeed: 15,
          coordinates: routeCoords,
          destination: destination.description,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("Ride saved", response.data);
      const data = response.data;
      if (data.success) {
        Alert.alert("Ride saved successfully");
      } else {
        Alert.alert("Failed to save ride");
      }
      navigate.navigate("RideHistory");
    } catch (e) {
      console.log("Error saving ride", e);
    }
  };
  const handleDiscardRide = () => {
    navigate.navigate("HomePage");
  };
  const getArrowDirection = () => {
    if (currentStep === 0) {
      return "forward";
    } else if (currentStep === routeCoords.length - 1) {
      return "arrived";
    } else {
      const prevCoord = routeCoords[currentStep - 1];
      const currCoord = routeCoords[currentStep];
      const nextCoord = routeCoords[currentStep + 1];

      return getDirection(prevCoord, currCoord, nextCoord);
    }
  };

  const handleNextStep = () => {
    if (currentStep < routeCoords.length - 1) {
      const remainingRouteCoords = routeCoords.slice(currentStep + 1);
      const remainingDist = calculateTotalDistance(remainingRouteCoords) / 1000;
      setRemainingDistance(remainingDist);
      setEta(calculateETA(remainingDist, 15));
      setCurrentStep((prevStep) => prevStep + 1);
      setRiderPosition(routeCoords[currentStep + 1]);
    } else {
      console.log("Navigation completed");
    }
  };

  const renderArrow = () => {
    switch (arrowDirection) {
      case "forward":
        return <ForwardArrow />;
      case "left":
        return <LeftArrow />;
      case "right":
        return <RightArrow />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: routeCoords[0].latitude,
          longitude: routeCoords[0].longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Marker coordinate={routeCoords[0]} title="Start" />
        <Marker coordinate={routeCoords[routeCoords.length - 1]} title="End" />
        <Polyline
          coordinates={routeCoords}
          strokeWidth={4}
          strokeColor={Color.colorBlack}
        />
        {riderPosition && (
          <Marker
            coordinate={riderPosition}
            title="Rider"
            description="Current position"
            image={require("./../assets/arrow2.png")}
          />
        )}
      </MapView>
      <View style={styles.navigationInfo}>
        <View style={styles.arrowContainer}>{renderArrow()}</View>
        <View>
          {arrowDirection === "arrived" ? (
            <Text style={styles.direction}>You have arrived!</Text>
          ) : (
            <>
              <Text style={styles.direction}>Head {arrowDirection}</Text>
              <Text style={styles.dirDist}>
                for
                {currentStep < routeCoords.length - 1
                  ? ` ${getDistance(
                      routeCoords[currentStep],
                      routeCoords[currentStep + 1]
                    )} m`
                  : "Arrived"}
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.routeDetails}>
        <View>
          <Text style={styles.distance}>{eta ? eta : "0 min"}</Text>
          <View style={styles.timeDetails}>
            <Text style={styles.details}>
              {remainingDistance.toFixed(2)} km
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.exitBtn} onPress={handleEndTrip}>
          <Text style={styles.exit}>End Trip</Text>
        </TouchableOpacity>
      </View>

      <Pressable style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dirDist: {
    fontSize: 28,
    color: Color.colorWhite,
  },
  exitBtn: {
    backgroundColor: "red",
    borderRadius: 15,
  },
  details: {
    color: "grey",
    fontSize: 14,
  },
  exit: {
    color: "white",
    fontSize: 25,
    padding: 10,
  },
  routeDetails: {
    position: "absolute",
    bottom: 100,
    backgroundColor: Color.colorWhite,
    padding: 25,
    borderRadius: 5,
    right: 0,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  arrowContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  timeDetails: {
    flexDirection: "row",
    gap: 5,
  },
  navigationInfo: {
    position: "absolute",
    top: 50,
    backgroundColor: Color.colorSlateblue,
    padding: 25,
    borderRadius: 5,
    marginRight: 20,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  direction: {
    fontSize: 36,
    color: Color.colorWhite,
  },
  distance: {
    fontSize: 16,
    fontSize: 28,
    fontWeight: "bold",
    color: Color.colorBlack,
  },
  nextButton: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TurnByTurn;
