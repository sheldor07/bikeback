import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";

import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const EmailAddress = ({
  property1Frame36700Position,
  property1Frame36700BorderRadius,
  property1Frame36700Width,
  property1Frame36700MarginTop,
}) => {
  const property1Frame367001Style = useMemo(() => {
    return {
      ...getStyleValue("position", property1Frame36700Position),
      ...getStyleValue("borderRadius", property1Frame36700BorderRadius),
      ...getStyleValue("width", property1Frame36700Width),
      ...getStyleValue("marginTop", property1Frame36700MarginTop),
    };
  }, [
    property1Frame36700Position,
    property1Frame36700BorderRadius,
    property1Frame36700Width,
    property1Frame36700MarginTop,
  ]);

  return (
    <View style={[styles.property1frame36700, property1Frame367001Style]}>
      <View style={styles.property1frame36700Inner}>
        <View style={styles.emailAddressWrapper}>
          <Text style={styles.emailAddress}>Email Address</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emailAddress: {
    fontSize: FontSize.size_xs,
    lineHeight: 15,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray_200,
    textAlign: "left",
  },
  emailAddressWrapper: {
    flexDirection: "row",
  },
  property1frame36700Inner: {
    padding: Padding.p_11xs,
  },
  property1frame36700: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorWhitesmoke_100,
    borderStyle: "solid",
    borderColor: Color.colorSlateblue_200,
    borderWidth: 2,
    width: 300,
    padding: Padding.p_sm,
    flexDirection: "row",
  },
});

export default EmailAddress;
