import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { Padding, Color, Border, FontFamily, FontSize } from "../GlobalStyles";


import { serverUrl } from "../utils/api";
import { save } from "../utils/userToken";

import Navbar from "../components/NavBar";

const ChangeUsername = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUsername, setCurrentUsername] = React.useState("");
  const [newUsername, setNewUsername] = React.useState("");
  const handleChangeUsername = async () => {
    if (currentUsername === "" || newUsername === "") {
      alert("Please enter your current and new username");
      return;
    }
    if (currentUsername === newUsername) {
      alert("Current and new username cannot be the same");
      return;
    }
    try {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync("token");
      const response = await fetch(`${serverUrl}/api/user/change-username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentUsername,
          newUsername,
        }),
      });

      const data = await response.json();
      setIsLoading(false);
      if (data.success) {
        Alert.alert("Username updated successfully");
        save("username", newUsername);
        navigation.navigate("Settings");
      } else {
        Alert.alert(data.error);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.changeUsername}>
      <View style={styles.frameParent}>
        <View style={styles.phbicycleDuotoneParent}>
          <Image
            style={styles.phbicycleDuotoneIcon}
            contentFit="cover"
            source={require("../assets/logo.png")}
          />
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../assets/group-36697.png")}
          />
        </View>
        <View style={styles.frameWrapper}>
          <View style={styles.phbicycleDuotoneParent}>
            <Text style={styles.changePassword1}>Change Username</Text>

            <TextInput
              style={styles.input}
              onChangeText={setCurrentUsername}
              value={currentUsername}
              placeholder="Current Username"
            />
          </View>

          <TextInput
            style={styles.input}
            onChangeText={setNewUsername}
            value={newUsername}
            placeholder="New Username"
          />
        </View>

        <View style={styles.loginButtonWrapper}>
          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
          {!isLoading && (
            <Pressable
              style={styles.loginButton}
              onPress={() => {
                handleChangeUsername();
              }}
            >
              <Text style={styles.signUpButton}>Update</Text>
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.vector}>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/Vector.png")}
          />
        </Pressable>
      </View>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: "100%",
    overflow: "hidden",
    padding: 18,
  },
  passwordLayout: {
    padding: Padding.p_3xs,
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: Color.colorSlateblue,
    backgroundColor: Color.colorWhitesmoke,
    flexDirection: "row",
    height: 47,
    width: 280,
    borderRadius: Border.br_3xs,
    alignItems: "center",
    borderStyle: "solid",
  },
  phbicycleDuotoneIcon: {
    width: 95,
    height: 96,
    overflow: "hidden",
  },
  frameChild: {
    width: 230,
    height: 36,
  },
  phbicycleDuotoneParent: {
    alignItems: "center",
  },
  changePassword1: {
    fontSize: 20,
    letterSpacing: -0.2,
    lineHeight: 26,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorSlateblue,
    textAlign: "left",
    fontWeight: "600",
  },
  password1: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray,
    textAlign: "left",
  },
  passwordWrapper: {
    justifyContent: "center",
    padding: Padding.p_11xs,
    flexDirection: "row",
    alignItems: "center",
  },
  iconoireyeSolid: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  password2: {
    marginTop: 20,
  },
  passwordParent: {
    height: 114,
    marginTop: 20,
  },
  frameWrapper: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginTop: 30,
  },
  signUpButton: {
    top: 15,
    left: 115,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhitesmoke,
    textAlign: "center",
    position: "absolute",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: Color.colorSlateblue,
    height: 47,
    width: 280,
    borderRadius: Border.br_3xs,
  },
  loginButtonWrapper: {
    marginTop: 30,
  },
  frameParent: {
    zIndex: 0,
    alignItems: "center",
  },
  icon: {
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  vector: {
    left: "15.9%",
    top: "13.51%",
    right: "81.28%",
    bottom: "84.36%",
    width: "2.82%",
    height: "2.13%",
    zIndex: 1,
    position: "absolute",
  },
  changeUsername: {
    backgroundColor: Color.colorWhitesmoke,
    borderColor: "#000",
    borderWidth: 1,
    flex: 1,
    height: 844,
    paddingHorizontal: 0,
    paddingVertical: 132,
    alignItems: "center",
    overflow: "hidden",
    borderStyle: "solid",
    width: "100%",
  },
  input: {
    height: 50,
    margin: 8,
    padding: 10,
    width: 280,
    borderWidth: 1.2,
    borderRadius: Border.br_3xs,
    borderColor: Color.colorSlateblue,
    alignItems: "center",
    top: 10,
  },
});

export default ChangeUsername;
