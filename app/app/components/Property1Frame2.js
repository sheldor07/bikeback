import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";

import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1Frame2 = ({
  password = "Password",
  property1Frame36708Position,
  property1Frame36708Top,
  property1Frame36708Left,
  property1Frame36708Width,
}) => {
  const property1Frame36708Style = useMemo(() => {
    return {
      ...getStyleValue("position", property1Frame36708Position),
      ...getStyleValue("top", property1Frame36708Top),
      ...getStyleValue("left", property1Frame36708Left),
      ...getStyleValue("width", property1Frame36708Width),
    };
  }, [
    property1Frame36708Position,
    property1Frame36708Top,
    property1Frame36708Left,
    property1Frame36708Width,
  ]);

  return (
    <View
      style={[
        styles.property1frame36708,
        styles.passwordWrapperFlexBox,
        property1Frame36708Style,
      ]}
    >
      <View style={[styles.passwordWrapper, styles.passwordWrapperFlexBox]}>
        <Text style={styles.password}>{password}</Text>
      </View>
      <Image
        style={styles.iconoireyeSolid}
        contentFit="cover"
        source={require("../assets/iconoireyesolid.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  passwordWrapperFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  password: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray_200,
    textAlign: "left",
  },
  passwordWrapper: {
    justifyContent: "center",
    padding: Padding.p_11xs,
  },
  iconoireyeSolid: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  property1frame36708: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorWhitesmoke_200,
    borderStyle: "solid",
    borderColor: Color.colorSlateblue_200,
    borderWidth: 2,
    width: 300,
    height: 47,
    justifyContent: "space-between",
    padding: Padding.p_3xs,
  },
});

export default Property1Frame2;
