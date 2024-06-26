import { Slot } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import ContentWrapper from "@/components/content_wrapper";

const Layout = () => (
  <View style={styles.flex}>
    <ContentWrapper>
      <Slot />
    </ContentWrapper>
  </View>
);

export default Layout;

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
