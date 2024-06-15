import axios from "axios";

import { Image } from "expo-image";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

import { serverUrl } from "../utils/api";
import { isValidEmail, isValidPassword } from "../utils/formValidate";
import { save } from "../utils/userToken";

import Property1Frame4 from "../components/Property1Frame4";
const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const validateCredentials = () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Incomplete Information", "Please fill in all fields", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match", "Please re-enter your password", [
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
    } // Password validation check
    if (!isValidPassword(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must contain at least 8 characters, 1 capital letter, and 1 special character",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
      return false;
    }
    if (!acceptedTerms) {
      Alert.alert(
        "Terms and Conditions",
        "Please accept the terms and conditions",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateCredentials()) return;

    try {
      setIsLoading(true);
      const url = `${serverUrl}/api/user/signup`;
      const response = await axios.post(url, {
        userName: username,
        email: email,
        password: password,
      });
      const data = response.data;
      if (data.success) {
        const token = data.token;
        await save("token", token);
        await save("username", username);
        Alert.alert("Success", "Account created successfully", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("HomePage");
            },
            style: "cancel",
          },
        ]);
      } else {
        throw new Error(data.error);
      }
      setIsLoading(false);
    } catch (error) {
      let errorMessage = "An error occurred during sign-up.";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response received from the server.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message || errorMessage;
      }

      Alert.alert("Error", errorMessage, [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleTermsAndConditions = () => {
    Linking.openURL(
      "https://cdn.websitepolicies.com/wp-content/uploads/2022/11/terms-and-conditions-template-for-mobile-apps.pdf"
    );
  };

  const handleLogin = () => {
    navigation.navigate("Login");
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
          <View style={styles.signUpSection}>
            <Text style={styles.signUpTitle}>Sign Up</Text>
            <View style={styles.inputFields}>
              <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
              />
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
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  secureTextEntry={!confirmPasswordVisible}
                />
                <Pressable
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  style={styles.eyeIconContainer}
                >
                  <Image
                    source={
                      confirmPasswordVisible
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
        <Property1Frame4
          acceptedTerms={acceptedTerms}
          setAcceptedTerms={setAcceptedTerms}
          property1Frame36717Position="unset"
          property1Frame36717MarginTop={30}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          {isLoading && (
            <ActivityIndicator
              size="small"
              color={Color.colorWhitesmoke}
              style={{ marginRight: 10 }}
            />
          )}
          {!isLoading && <Text style={styles.signUpButtonText}>Sign Up</Text>}
        </TouchableOpacity>
        <View style={styles.termsAndLogin}>
          <Text style={styles.termsText}>
            By creating an account with us you agree to the{" "}
            <Text style={styles.termsLink} onPress={handleTermsAndConditions}>
              Terms and Conditions
            </Text>
          </Text>
          <Pressable style={styles.loginText} onPress={handleLogin}>
            <Text>
              Already have an account?{" "}
              <Text style={styles.loginLink}>Login</Text>
            </Text>
          </Pressable>
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
  signUpSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpTitle: {
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
  passwordInput: {
    flex: 1,
    height: 50,
    padding: 10,
    borderWidth: 1.2,
    borderRadius: Border.br_3xs,
    borderColor: Color.colorSlateblue,
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
  signUpButton: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_3xs,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
    width: 280,
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpButtonText: {
    color: Color.colorWhitesmoke,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
  },
  termsAndLogin: {
    alignItems: "center",
  },
  termsText: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interRegular,
    textAlign: "center",
    marginBottom: 10,
  },
  termsLink: {
    color: Color.colorSlateblue,
    textDecorationLine: "underline",
  },
  loginText: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interRegular,
  },
  loginLink: {
    color: Color.colorSlateblue,
    textDecorationLine: "underline",
  },
});

export default SignUp;
