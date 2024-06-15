import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Pressable, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import { FontSize, FontFamily, Color, Border, Padding } from "../GlobalStyles";

import { getValueFor } from "../utils/userToken";

import Navbar from "../components/NavBar";

const Settings = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("John Doe");
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    navigation.navigate("Login");
  };

  useEffect(() => {
    const getUserName = async () => {
      const userName = await getValueFor("username");
      setUserName(userName);
    };
    getUserName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/frame-36698.png")}
      />

      <View style={styles.divider} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.profileContainer}>
          <View>
            <Image
              style={styles.profileImage}
              source={require("../assets/image-6.png")}
            />
          </View>
          <Text style={styles.username}>{userName}</Text>
        </View>
      </View>
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsTitle}>USER SETTINGS</Text>
        <Pressable
          style={styles.settingsItem}
          onPress={() => navigation.navigate("ChangeUsername")}
        >
          <View style={styles.settingsItemContent}>
            <View style={styles.settingsItemInner}>
              <View style={styles.settingsItemIconBackground}>
                <Image
                  style={styles.settingsItemIcon}
                  source={require("../assets/riuserline.png")}
                />
              </View>
              <Text style={styles.settingsItemText}>Change Username</Text>
            </View>
            <Image
              style={styles.settingsItemArrowIcon}
              source={require("../assets/vector1.png")}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.settingsItem}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <View style={styles.settingsItemContent}>
            <View style={styles.settingsItemInner}>
              <View style={styles.settingsItemIconBackground}>
                <Image
                  style={styles.settingsItemIcon}
                  source={require("../assets/mdipasswordoutline.png")}
                />
              </View>
              <Text style={styles.settingsItemText}>Change Password</Text>
            </View>
            <Image
              style={styles.settingsItemArrowIcon}
              source={require("../assets/vector1.png")}
            />
          </View>
        </Pressable>
        <Pressable style={styles.settingsItem} onPress={() => handleLogout()}>
          <View style={styles.settingsItemContent}>
            <View style={styles.settingsItemInner}>
              <View style={styles.settingsItemIconBackground}>
                <Image
                  style={styles.settingsItemIcon}
                  source={require("../assets/mdilogout.png")}
                />
              </View>
              <Text style={styles.settingsItemText}>Log out</Text>
            </View>
          </View>
        </Pressable>
      </View>

      <Navbar />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    alignItems: "center",
    paddingTop: Padding.p_8xl,
  },
  title: {
    fontSize: FontSize.size_8xl,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorSlateblue,
    marginBottom: 20,
  },
  logo: {
    width: 230,
    height: 132,
  },
  divider: {
    width: "90%",
    height: 2,
    backgroundColor: Color.colorGray_100,
    marginVertical: 20,
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: Border.br_3xs,
  },
  editIconContainer: {
    position: "absolute",
    left: 55,
    bottom: -5,
  },
  editIconBackground: {
    width: 30,
    height: 30,
    tintColor: Color.colorSlateblue,
  },
  editIcon: {
    width: 15,
    height: 15,
    position: "absolute",
    tintColor: Color.colorWhite,
  },
  username: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.colorBlack,
    marginTop: 10,
  },
  settingsContainer: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  settingsTitle: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorBlack,
    marginBottom: 10,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGainsboro,
  },
  settingsItemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingsItemInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsItemIconBackground: {
    width: 36,
    height: 36,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_full,
  },
  settingsItemIcon: {
    width: 20,
    height: 20,
    tintColor: Color.colorWhite,
  },
  settingsItemText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorGray_500,
  },
  settingsItemArrowIcon: {
    width: 10,
    height: 10,
    marginLeft: 10,
  },
  titleContainer: {
    width: "100%",
    padding: 24,
  },
});
export default Settings;
