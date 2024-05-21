import React, { useEffect } from "react";
import { BackHandler, Text } from "react-native";

import { useLogout } from "@/api/queries/auth";

const Goodbye = () => {
  const logout = useLogout();

  useEffect(() => {
    setTimeout(() => {
      logout.mutate();
      BackHandler.exitApp();
    }, 1000);
  }, []);
  return <Text>Goodbye</Text>;
};

export default Goodbye;
