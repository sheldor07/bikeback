import React, { useMemo } from "react";
import { Text, StyleSheet, View, } from "react-native";
import { Image } from "expo-image";

import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Password = ({
  password,
  iconoireyeSolid,
  propBackgroundColor,
  propMarginTop,
}) => {
  const passwordStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor),
      ...getStyleValue("marginTop", propMarginTop),
    };
  }, [propBackgroundColor, propMarginTop]);

  return (
    <View style={[styles.password, styles.passwordFlexBox, passwordStyle]}>
      <View style={[styles.passwordWrapper, styles.passwordFlexBox]}>
        <Text style={styles.password1}>{password}</Text>
      </View>
      <Image
        style={styles.iconoireyeSolid}
        contentFit="cover"
        source={iconoireyeSolid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  passwordFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  password1: {
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
  password: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhitesmoke_200,
    borderStyle: "solid",
    borderColor: Color.colorSlateblue_200,
    borderWidth: 2,
    width: 280,
    height: 47,
    justifyContent: "space-between",
    padding: Padding.p_3xs,
    marginTop: 15,
  },
});

export default Password;
