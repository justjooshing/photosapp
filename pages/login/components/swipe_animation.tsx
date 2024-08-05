import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

import SwipeImage from "./swipe_image";

import { tokens } from "@/config/tamagui/tokens";

const SwipeAnimation = () => (
  <View style={styles.section}>
    <LinearGradient
      style={styles.icon}
      colors={[tokens.color.grey1, tokens.color.grey4]}
    >
      <AntDesign name="delete" size={24} color={tokens.color.red2} />
    </LinearGradient>
    <View style={styles.container}>
      {Array(4)
        .fill(undefined)
        .map((_, i) => (
          <SwipeImage instance={i} key={i} />
        ))}
    </View>
    <LinearGradient
      style={styles.icon}
      colors={[tokens.color.grey1, tokens.color.grey4]}
    >
      <AntDesign name="folder1" size={24} color={tokens.color.green} />
    </LinearGradient>
  </View>
);

export default SwipeAnimation;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: tokens.space[3] * 5,
  },
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    backgroundColor: tokens.color.grey2,
    padding: tokens.space[1],
    borderRadius: 50,
  },
});
