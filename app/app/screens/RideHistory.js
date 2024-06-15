import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

import { getValueFor } from "../utils/userToken";
import { serverUrl } from "../utils/api";

import RideCard from "../components/RideCard";
import NoRidesYet from "../components/NoRidesYet";
import Navbar from "../components/NavBar";


const RideHistory = () => {
  const navigation = useNavigation();
  const [rideData, setRideData] = useState([]);
  const renderRideCard = ({ item }) => (
    <RideCard
      ride={item}
      onPress={() => navigation.navigate("RideDetails", { item })}
    />
  );
  const fetchRideHistory = async () => {
    const userToken = await getValueFor("token");

    try {
      const url = `${serverUrl}/api/user/rides`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setRideData(response.data.rideHistory);
    } catch (err) {
      console.error("Failed to fetch ride history", err);
    }
  };
  useEffect(() => {
    fetchRideHistory();
  }, []);
  return (
    <SafeAreaView style={styles.rideHistory}>
      <View style={styles.headerContainer}>
        <Text style={[styles.yourPast]}>Your past</Text>
        <Text style={[styles.routes]}>routes</Text>
      </View>
      {rideData.length === 0 ? (
        <NoRidesYet />
      ) : (
        <FlatList
          data={rideData}
          renderItem={renderRideCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: Padding.p_base,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
  },
  listContainer: {
    paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_base,
  },
  homeItemFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  homeTypo: {
    marginTop: 5,
    textAlign: "center",
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  //   routesTypo: {
  //     height: 65,
  //     textAlign: "left",
  //     fontSize: FontSize.size_26xl,
  //     color: Color.colorBlack,
  //     position: "absolute",
  //   },
  homeIcon: {
    width: 30,
    height: 30,
    overflow: "hidden",
  },
  home: {
    color: Color.colorBlack,
    marginTop: 5,
    textAlign: "center",
    fontSize: FontSize.size_3xs,
    overflow: "hidden",
  },
  homeItem: {
    height: 36,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_7xs,
    flex: 1,
  },
  home1: {
    color: Color.colorSlateblue,
    marginTop: 5,
    textAlign: "center",
    fontSize: FontSize.size_3xs,
  },
  navigationBar: {
    top: 764,
    left: 0,
    backgroundColor: Color.colorWhite,
    width: 390,
    height: 80,
    flexDirection: "row",
    paddingHorizontal: Padding.p_xl,
    paddingBottom: Padding.p_6xs,
    position: "absolute",
    alignItems: "center",
  },
  yourPast: {
    fontSize: 45,
    fontWeight: "300",
    fontFamily: FontFamily.poppinsLight,
    color: "#000",
  },
  routes: {
    fontSize: 45,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
  },
  rideHistory: {
    backgroundColor: Color.colorWhitesmoke,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
    flex: 1,
  },
});

export default RideHistory;
