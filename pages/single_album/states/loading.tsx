import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@/components/skeleton";
import { numColumns } from "@/config/constants";

const Loading = () => (
  <FlashList
    data={Array(6)}
    estimatedItemSize={6}
    numColumns={numColumns}
    renderItem={() => (
      <View style={styles.image}>
        <View style={styles.skeleton_container}>
          <Skeleton />
        </View>
      </View>
    )}
  />
);

export default Loading;

const styles = StyleSheet.create({
  image: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  skeleton_container: {
    borderRadius: 20,
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
  },
});
