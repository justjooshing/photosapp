import React, { useEffect } from "react";
import { BackHandler, Text } from "react-native";

const Goodbye = () => {
  useEffect(() => {
    setTimeout(BackHandler.exitApp, 1000);
  }, []);
  return <Text>Goodbye</Text>;
};

export default Goodbye;
