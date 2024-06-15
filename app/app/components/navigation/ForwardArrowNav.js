import React from "react";
import Svg, { Path } from "react-native-svg";

const ForwardArrow = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <Path
        d="M23.91 11.413A1 1 0 0 1 23 12h-3v17a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V12H9a1 1 0 0 1-.752-1.658l7-8a1.03 1.03 0 0 1 1.504 0l7 8a1 1 0 0 1 .159 1.071z"
        fill="#ffffff"
      />
    </Svg>
  );
};

export default ForwardArrow;
