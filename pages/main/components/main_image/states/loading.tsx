import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@/components/skeleton";

const Loading = () => (
  <View style={styles.skeleton_container}>
    <Skeleton />
  </View>
);

export default Loading;

const styles = StyleSheet.create({
  skeleton_container: {
    width: "100%",
    aspectRatio: 1,
    padding: 20,
  },
});
