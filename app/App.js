const Stack = createNativeStackNavigator();
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useFonts } from "expo-font";

import { getValueFor } from "./app/utils/userToken";

import Login from "./app/screens/Login";
import HomePage from "./app/screens/HomePage";
import SignUp from "./app/screens/SignUp";
import ForgetPassword from "./app/screens/ForgetPassword";
import Settings from "./app/screens/Settings";
import RideHistory from "./app/screens/RideHistory";
import ChangePassword from "./app/screens/ChangePassword";
import ChangeUsername from "./app/screens/ChangeUsername";
import TurnByTurn from "./app/screens/TurnByTurn";
import RideDetails from "./app/screens/RideDetails";

const App = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkForToken = async () => {
      const token = await getValueFor("token");
      setUserToken(token);
    };
    console.log("Checking for token", userToken);
    checkForToken();
  }, []);

  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("./app/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./app/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./app/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./app/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./app/assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-LightItalic": require("./app/assets/fonts/Poppins-LightItalic.ttf"),
    "Inter-Regular": require("./app/assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./app/assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./app/assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"HomePage"}>
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TurnByTurn"
            options={{ headerShown: false }}
            component={TurnByTurn}
          />
          <Stack.Screen
            name="RideHistory"
            component={RideHistory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RideDetails"
            component={RideDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangeUsername"
            component={ChangeUsername}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
