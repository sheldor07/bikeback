import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const ActiveNo = ({
  homeIcon,
  text = "Home",
  homeNumberOfLines,
  activeNoPosition,
  activeNoFlex,
  activeNoHeight,
  homeColor,
  homeOverflow,
  onHomeItemPress,
}) => {
  const activeNoStyle = useMemo(() => {
    return {
      ...getStyleValue("position", activeNoPosition),
      ...getStyleValue("flex", activeNoFlex),
      ...getStyleValue("height", activeNoHeight),
    };
  }, [activeNoPosition, activeNoFlex, activeNoHeight]);

  const homeStyle = useMemo(() => {
    return {
      ...getStyleValue("color", homeColor),
      ...getStyleValue("overflow", homeOverflow),
    };
  }, [homeColor, homeOverflow]);

  return (
    <View style={[styles.activeno, activeNoStyle]} onPress={onHomeItemPress}>
      <Image style={styles.homeIcon} contentFit="cover" source={homeIcon} />
      <Text style={[styles.home, homeStyle]} numberOfLines={homeNumberOfLines}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeIcon: {
    width: 30,
    height: 30,
    overflow: "hidden",
  },
  home: {
    fontSize: FontSize.size_3xs,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.colorBlack,
    textAlign: "center",
    marginTop: 5,
    overflow: "hidden",
  },
  activeno: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_7xs,
  },
});

export default ActiveNo;
