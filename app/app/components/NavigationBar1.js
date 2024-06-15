import * as React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ActiveNo from "./ActiveNo";
import { Color, Padding } from "../GlobalStyles";

const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navigationBar}>
      <ActiveNo
        homeIcon={require("../assets/home-icon1.png")}
        text="Home"
        activeNoPosition="unset"
        activeNoFlex={1}
        activeNoHeight={36}
        homeColor="#000"
        homeOverflow="hidden"
        onHomeItemPress={() => navigation.navigate("HomePage")}
      />
      <ActiveNo
        homeIcon={require("../assets/history-icon1.png")}
        text="History"
        activeNoPosition="unset"
        activeNoFlex={1}
        activeNoHeight={36}
        homeColor="#000"
        homeOverflow="hidden"
        onHomeItemPress={() => navigation.navigate("RideHistory")}
      />
      <ActiveNo
        homeIcon={require("../assets/settings-icon1.png")}
        text="Settings"
        activeNoPosition="unset"
        activeNoFlex={1}
        activeNoHeight={36}
        homeColor="#2548c5"
        homeOverflow="unset"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    position: "absolute",
    top: 764,
    left: 0,
    backgroundColor: Color.colorWhite,
    width: 390,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Padding.p_xl,
    paddingBottom: Padding.p_6xs,
  },
});

export default NavigationBar;
