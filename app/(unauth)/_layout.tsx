import { Slot } from "expo-router";
import React from "react";

import ContentWrapper from "@/components/content_wrapper";

const Layout = () => (
  <ContentWrapper>
    <Slot />
  </ContentWrapper>
);

export default Layout;
