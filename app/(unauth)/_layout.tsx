import { Slot } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

import ContentWrapper from "@/components/content_wrapper";

const Layout = () => (
  <ScrollView>
    <ContentWrapper>
      <Slot />
    </ContentWrapper>
  </ScrollView>
);

export default Layout;
