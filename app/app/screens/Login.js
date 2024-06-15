import axios from "axios";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";

import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

import { serverUrl } from "../utils/api";
import { isValidEmail } from "../utils/formValidate";
import { save } from "../utils/userToken";


const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateCredentials = () => {
    if (email === "" && password === "") {
      Alert.alert("Incomplete Information", "Please fill in all fields", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
      return false;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateCredentials()) return;

    try {
      setIsLoading(true);
      const url = `${serverUrl}/api/user/login`;
      const response = await axios.post(url, {
        email: email,
        password: password,
      });

      const data = response.data;
      if (data.success) {
        await save("token", data.token);
        await save("username", data.username); // Store the username in secure storage

        Alert.alert("Success", "Logged in successfully", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("HomePage");
            },
            style: "cancel",
          },
        ]);
      } else {
        Alert.alert("Invalid Credentials", "Please enter valid credentials", [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image
              style={styles.logoIcon}
              contentFit="cover"
              source={require("../assets/logo.png")}
            />
            <Image
              style={styles.logoText}
              contentFit="cover"
              source={require("../assets/group-36697.png")}
            />
          </View>
          <View style={styles.loginSection}>
            <Text style={styles.loginTitle}>Login</Text>
            <View style={styles.inputFields}>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
              />
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                />
                <Pressable
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.eyeIconContainer}
                >
                  <Image
                    source={
                      passwordVisible
                        ? require("../assets/iconoireyesolid2.png")
                        : require("../assets/iconoireyemasked.png")
                    }
                    style={styles.eyeIcon}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            {isLoading && (
              <ActivityIndicator
                size="small"
                color={Color.colorWhitesmoke}
                style={{ marginRight: 10 }}
              />
            )}
            {!isLoading && <Text style={styles.loginButtonText}>Login</Text>}
          </TouchableOpacity>
          <View style={styles.signUpAndForgotPassword}>
            <Pressable style={styles.signUpText} onPress={handleSignUp}>
              <Text>
                Don't have an account?
                <Text style={styles.signUpLink}>Sign Up</Text>
              </Text>
            </Pressable>
            <Pressable
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhitesmoke,
    paddingHorizontal: 55,
    paddingTop: 91,
    paddingBottom: 86,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  logo: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoIcon: {
    width: 95,
    height: 96,
    marginBottom: 10,
  },
  logoText: {
    width: 230,
    height: 36,
  },
  loginSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginTitle: {
    fontSize: FontSize.size_8xl,
    fontWeight: "800",
    fontFamily: FontFamily.poppinsExtraBold,
    color: Color.colorSlateblue,
    marginBottom: 10,
  },
  inputFields: {
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
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 280,
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
    padding: 8,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_3xs,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
    width: 280,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginButtonText: {
    color: Color.colorWhitesmoke,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
  },
  signUpAndForgotPassword: {
    alignItems: "center",
  },
  signUpText: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interRegular,
    marginBottom: 10,
  },
  signUpLink: {
    color: Color.colorSlateblue,
    textDecorationLine: "underline",
  },
  forgotPassword: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interRegular,
    color: Color.colorSlateblue,
  },
  forgotPasswordText: {
    textDecorationLine: "underline",
  },
});

export default Login;
