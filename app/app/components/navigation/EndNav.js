import React from "react";
import { Text } from "react-native";
const CloseIcon = () => {
  return <Text style={styles.exit}>Exit</Text>;
};
const styles = {
    exit:{
        backgroundColor: "red", 
        color: "white",
        fontSize: 20,
        padding: 10,
        borderRadius: 5,
    }
    };
export default CloseIcon;
