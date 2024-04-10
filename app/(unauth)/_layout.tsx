import { Redirect, Slot } from "expo-router";
import Cookies from "js-cookie";
import React from "react";

const Layout = () => {
  const jwt = Cookies.get("jwt");

  return jwt ? <Redirect href="/" /> : <Slot />;
};

export default Layout;
