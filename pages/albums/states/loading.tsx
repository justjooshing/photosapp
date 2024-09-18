import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@/components/skeleton";
import { numColumns } from "@/config/constants";
import { tokens } from "@/config/tamagui/tokens";

const Loading = () => {
  return (
    <FlashList
      data={Array(6)}
      numColumns={numColumns}
      estimatedItemSize={6}
      renderItem={() => (
        <View style={styles.image}>
          <View style={styles.skeleton_container}>
            <Skeleton />
          </View>
        </View>
      )}
    />
  );
};

export default Loading;

const styles = StyleSheet.create({
  image: {
    alignItems: "center",
    position: "relative",
    width: "100%",
    paddingVertical: tokens.space[2],
  },
  skeleton_container: {
    borderRadius: tokens.radius[3],
    width: "80%",
    aspectRatio: 1,
    alignItems: "center",
    overflow: "hidden",
  },
});
