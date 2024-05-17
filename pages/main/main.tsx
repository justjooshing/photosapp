import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import CarouselImage from "./components/carousel_image";
import TodayNoData from "./components/today_no_data";

import { useGetImages } from "@/api/queries/images";
import MainImageHandler from "@/components/main_image_handler";
import Skeleton from "@/components/skeleton";
import { useHeadingContext } from "@/context/header";

const Images = () => {
  const { imageType } = useHeadingContext();
  const images = useGetImages(imageType);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  if (images.isError) return <Text>{images.error.message}</Text>;
  if (!images.data?.length && !images.isLoading && imageType === "similar")
    return <Text> No data </Text>;

  /**
   * Fixes issue where after sorting final index image
   * we were still trying to access that index
   */
  const decreaseCurrentIndexIfFinalIndex = () => {
    if (images.data?.length - 1 === currentImageIndex) {
      setCurrentImageIndex((curr) => curr - 1);
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* update empty state logic */}
      {!images.data?.length && !images.isLoading && imageType !== "similar" ? (
        <TodayNoData />
      ) : (
        <>
          <MainImageHandler
            mainImage={images.data?.[currentImageIndex]}
            isLastImage={images.data?.length === 1}
            updateCurrentIndex={decreaseCurrentIndexIfFinalIndex}
          />
          <View>
            {images.isLoading ? (
              <FlatList
                horizontal
                data={Array(5)}
                contentContainerStyle={{ gap: 1 }}
                renderItem={() => (
                  <View style={styles.skeleton_container}>
                    <Skeleton />
                  </View>
                )}
              />
            ) : (
              <FlatList
                horizontal
                data={images.data}
                keyExtractor={({ id }) => id.toString()}
                contentContainerStyle={{ gap: 1 }}
                renderItem={({ item, index }) => (
                  <CarouselImage
                    image={item}
                    position={index}
                    setCurrentImageIndex={setCurrentImageIndex}
                  />
                )}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  skeleton_container: { width: 100, aspectRatio: 1 },
  wrapper: {
    flex: 1,
  },
});
