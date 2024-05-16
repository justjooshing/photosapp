import { Redirect, Slot } from "expo-router";
import React from "react";

import { useGetAuthToken } from "@/api/queries/auth";

const Layout = () => {
  const token = useGetAuthToken();

  return token ? <Redirect href="/" /> : <Slot />;
};

export default Layout;
