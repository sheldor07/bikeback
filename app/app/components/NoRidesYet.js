import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Color } from "../GlobalStyles";
const NoRidesYet = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 100,
      }}
    >
      <Image
        style={{ width: 200, height: 200, borderRadius: 15 }}
        source={require("../assets/image-5.png")}
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: Color.colorSlateblue,
          marginTop: 12,
        }}
      >
        No Rides Yet
      </Text>
    </View>
  );
};

export default NoRidesYet;
