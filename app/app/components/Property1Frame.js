import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";

import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1Frame = ({
  username = "Username",
  property1Frame36700Position,
  property1Frame36700BorderRadius,
  property1Frame36700Width,
  property1Frame36700Top,
  property1Frame36700Left,
}) => {
  const property1Frame36700Style = useMemo(() => {
    return {
      ...getStyleValue("position", property1Frame36700Position),
      ...getStyleValue("borderRadius", property1Frame36700BorderRadius),
      ...getStyleValue("width", property1Frame36700Width),
      ...getStyleValue("top", property1Frame36700Top),
      ...getStyleValue("left", property1Frame36700Left),
    };
  }, [
    property1Frame36700Position,
    property1Frame36700BorderRadius,
    property1Frame36700Width,
    property1Frame36700Top,
    property1Frame36700Left,
  ]);

  return (
    <View style={[styles.property1frame36700, property1Frame36700Style]}>
      <View style={styles.property1frame36700Inner}>
        <View style={styles.usernameWrapper}>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    fontSize: FontSize.size_xs,
    lineHeight: 15,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray_200,
    textAlign: "left",
  },
  usernameWrapper: {
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

export default Property1Frame;
