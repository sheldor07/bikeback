import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color, FontFamily, FontSize } from "../GlobalStyles";

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Image
          style={styles.icon}
          source={require("../assets/home-icon1.png")}
        />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("RideHistory")}
      >
        <Image
          style={styles.icon}
          source={require("../assets/history-icon.png")}
        />
        <Text style={styles.label}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image
          style={styles.icon}
          source={require("../assets/settings-black-icon.png")}
        />
        <Text style={styles.label}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Color.colorGray,
    width: "100%",
    height: 80,
    position: "absolute",
    bottom: 0,
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  label: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_smi,
    textAlign: "center",
    color: Color.colorBlack,
  },
});

export default Navbar;
