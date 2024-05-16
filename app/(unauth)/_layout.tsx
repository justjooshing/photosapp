import { Redirect, Slot } from "expo-router";
import React from "react";

import { useGetAuthToken } from "@/api/queries/auth";
import ContentWrapper from "@/components/content_wrapper";

const Layout = () => {
  const token = useGetAuthToken();

  return token ? (
    <Redirect href="/" />
  ) : (
    <ContentWrapper>
      <Slot />
    </ContentWrapper>
  );
};

export default Layout;
