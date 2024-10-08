import { FlashList } from "@shopify/flash-list";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import CarouselImage from "./carousel_image";

import Skeleton from "@/components/skeleton";
import { tokens } from "@/config/tamagui/tokens";
import { useGetImages } from "@/server/images/queries";

const Carousel = () => {
  const images = useGetImages();

  return !images.data?.length && (images.isLoading || images.isFetching) ? (
    <FlashList
      horizontal
      data={Array(5)}
      estimatedItemSize={5}
      renderItem={() => (
        <View style={[styles.item, styles.skeleton]}>
          <Skeleton />
        </View>
      )}
    />
  ) : (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.item}
    >
      <FlashList
        horizontal
        data={images.data}
        estimatedItemSize={5}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item, index }) => (
          <View>
            <CarouselImage image={item} position={index} />
          </View>
        )}
      />
    </ScrollView>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  skeleton: {
    aspectRatio: 1,
    paddingHorizontal: 2,
  },
  container: {
    flexGrow: 0,
    paddingTop: tokens.space[3],
  },
  item: {
    minWidth: "100%",
    height: 100,
  },
});
