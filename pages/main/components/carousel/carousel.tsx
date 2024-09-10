import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";

import CarouselImage from "./carousel_image";

import { useGetImages } from "@/api/images/queries";
import Skeleton from "@/components/skeleton";

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
    <FlashList
      horizontal
      data={images.data}
      estimatedItemSize={5}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.item}>
          <CarouselImage image={item} position={index} />
        </View>
      )}
    />
  );
};

export default Carousel;

const styles = StyleSheet.create({
  skeleton: {
    aspectRatio: 1,
    paddingHorizontal: 2,
  },
  item: {
    height: 100,
  },
});
