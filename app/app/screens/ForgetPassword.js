import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color, FontSize, FontFamily, Padding, Border } from "../GlobalStyles";

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");

  return (
    <View style={[styles.forgetPassword, styles.emailAddressBorder]}>
      <View style={styles.frameParent}>
        <View style={styles.forgotPasswordParent}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
          <Text style={styles.dontWorryIt}>
            Don’t worry! It happens. Please enter the email associated with your
            account.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email Address"
        />
      </View>
      <View style={styles.frame}>
        <View style={styles.sendCode}>
          <Text style={styles.sendCode1}>Send Code</Text>
        </View>
        <View style={styles.frame1}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.textTypo}>
              <Text style={styles.alreadyHaveAn}>Already have an account?</Text>
              <Text style={styles.text1}>{` `}</Text>
              <Text style={styles.text1}>
                <Text style={styles.login1}>Login</Text>
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emailAddressBorder: {
    borderStyle: "solid",
    backgroundColor: Color.colorWhitesmoke_100,
  },
  textTypo: {
    lineHeight: 15,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
  },
  forgotPassword: {
    fontSize: FontSize.size_11xl,
    letterSpacing: -0.3,
    lineHeight: 39,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    width: 274,
    textAlign: "left",
    color: Color.colorSlateblue,
  },
  dontWorryIt: {
    color: Color.colorGray_300,
    display: "flex",
    alignItems: "flex-end",
    width: 275,
    marginTop: 13,
    fontFamily: FontFamily.interRegular,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  forgotPasswordParent: {
    width: 301,
    justifyContent: "center",
  },
  emailAddress1: {
    color: Color.colorGray_100,
  },
  emailAddressWrapper: {
    flexDirection: "row",
  },
  emailAddressInner: {
    padding: Padding.p_11xs,
  },
  emailAddress: {
    borderRadius: 5,
    borderColor: Color.colorSlateblue,
    borderWidth: 2,
    padding: Padding.p_sm,
    marginTop: 15,
    flexDirection: "row",
    width: 280,
  },
  frameParent: {
    width: 280,
  },
  sendCode1: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhitesmoke,
    textAlign: "center",
    lineHeight: 18,
    fontSize: FontSize.size_sm,
  },
  sendCode: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorSlateblue,
    height: 47,
    justifyContent: "flex-end",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_sm,
    width: 280,
    alignItems: "center",
  },
  alreadyHaveAn: {
    color: Color.colorBlack,
  },
  text1: {
    color: Color.colorSlateblue,
  },
  login1: {
    textDecoration: "underline",
  },
  frame1: {
    marginTop: 15,
    width: 274,
    justifyContent: "center",
    overflow: "hidden",
  },
  frame: {
    width: 300,
    height: 83,
    marginTop: 25,
    alignItems: "center",
    overflow: "hidden",
  },
  forgetPassword: {
    borderColor: Color.colorBlack,
    borderWidth: 1,
    flex: 1,
    width: "100%",
    height: 844,
    paddingHorizontal: 24,
    paddingVertical: 220,
    alignItems: "center",
    overflow: "hidden",
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
    left: -10,
    top: 10,
  },
});

export default ForgetPassword;
