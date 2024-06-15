import React from "react";
import Svg, { Path } from "react-native-svg";

const RightArrow = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <Path
        d="M30 10a1.002 1.002 0 0 1-.341.753l-8 7A1 1 0 0 1 20 17v-3h-9a1 1 0 0 0-1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V15a9.01 9.01 0 0 1 9-9h9V3a1 1 0 0 1 1.659-.753l8 7A1.002 1.002 0 0 1 30 10z"
        fill="#ffffff"
      />
    </Svg>
  );
};

export default RightArrow;
