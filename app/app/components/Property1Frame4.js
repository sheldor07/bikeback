import React, { useMemo } from "react";
import { Pressable } from "react-native";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { FontSize, FontFamily, Color } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1Frame4 = ({
  property1Frame36717Position,
  property1Frame36717MarginTop,
  setAcceptedTerms,
  acceptedTerms,
}) => {
  const property1Frame36717Style = useMemo(() => {
    return {
      ...getStyleValue("position", property1Frame36717Position),
      ...getStyleValue("marginTop", property1Frame36717MarginTop),
    };
  }, [property1Frame36717Position, property1Frame36717MarginTop]);

  return (
    <View
      style={{ marginVertical: 10, flexDirection: "row", alignItems: "center" }}
    >
      <Pressable onPress={() => setAcceptedTerms(!acceptedTerms)}>
        {acceptedTerms ? (
          <Image
            style={styles.teenyiconstickCircleOutline}
            contentFit="cover"
            source={require("../assets/icon1.png")}
          />
        ) : (
          <Image
            style={styles.teenyiconstickCircleOutline}
            contentFit="cover"
            source={require("../assets/teenyiconstickcircleoutline.png")}
          />
        )}
      </Pressable>

      <Text style={styles.iAcceptThe}>
        I accept the terms and privacy policy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  teenyiconstickCircleOutline: {
    width: 20,
    height: 20,
  },
  iAcceptThe: {
    fontSize: FontSize.size_2xs,
    lineHeight: 14,
    fontFamily: FontFamily.interRegular,
    color: Color.colorSlateblue_100,
    textAlign: "left",
    marginLeft: 5,
  },
  property1frame36717: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Property1Frame4;
