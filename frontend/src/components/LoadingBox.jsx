import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingBox = () => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="2"
      animationDuration="0.75"
      width="50"
      visible={true}
    />
  );
};

export default LoadingBox;
