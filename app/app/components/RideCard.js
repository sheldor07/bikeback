// RideCard.js
import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

import {
  convertSecondsToHours,
  convertMetersToKilometers,
} from "../utils/unitConversion";

const RideCard = ({ ride, onPress }) => {
  const formattedDate = new Date(ride.date).toLocaleDateString();

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.destination}>Trip to {ride.destination}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailColumn}>
          <Text style={styles.detailNumber}>
            {convertSecondsToHours(ride.duration)}hr
          </Text>
          <Text style={styles.detailLabel}>Duration</Text>
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.detailNumber}>
            {convertMetersToKilometers(ride.distance)}km
          </Text>
          <Text style={styles.detailLabel}>Distance</Text>
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.detailNumber}>{ride.averageSpeed}km/h</Text>
          <Text style={styles.detailLabel}>Avg Speed</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.colorWhite,
    borderRadius: 10,
    padding: Padding.p_base,
    marginBottom: Padding.p_base,
    shadowColor: Color.colorBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  destination: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "bold",
    marginBottom: Padding.p_xs,
    color: Color.colorSlateblue,
  },
  date: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDimgray,
    marginBottom: Padding.p_lg,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBlockColor: Color.colorDimgray,
    borderStartColor: Color.colorDimgray,
    borderEndColor: Color.colorDimgray,
    borderBlockWidth: 1,
  },
  detailColumn: {
    alignItems: "center",
  },
  detailNumber: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "bold",
    color: Color.colorPrimary,
    marginBottom: Padding.p_xs,
  },
  detailLabel: {},
});

export default RideCard;
