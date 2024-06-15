import React from "react";
import Svg, { Path } from "react-native-svg";

const LeftArrow = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <Path
        d="M30 15v14a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V15a1 1 0 0 0-1-1h-9v3a1 1 0 0 1-1.659.753l-8-7a1.001 1.001 0 0 1 0-1.506l8-7A1 1 0 0 1 12 3v3h9a9.01 9.01 0 0 1 9 9z"
        fill="#ffffff"
      />
    </Svg>
  );
};

export default LeftArrow;
