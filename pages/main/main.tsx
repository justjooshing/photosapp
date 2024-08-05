import { FlashList } from "@shopify/flash-list";
import { View, Text, StyleSheet } from "react-native";

import CarouselImage from "./components/carousel_image";
import NoData from "./components/no_data";

import { useGetImages } from "@/api/queries/images";
import Skeleton from "@/components/skeleton";
import { useImageContext } from "@/context/image";
import useHideSplashScreen from "@/hooks/useHideSplashScreen";
import MainImageHandler from "@/pages/main/components/main_image_handler";

const Images = () => {
  const { currentImageIndex, setCurrentImageIndex } = useImageContext();
  const images = useGetImages();
  useHideSplashScreen({ loaded: !!images.data || images.isError });

  if (images.isError) return <Text>{images.error.message}</Text>;
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
      {!images.data?.length && !(images.isLoading || images.isFetching) ? (
        <NoData />
      ) : (
        <>
          <MainImageHandler
            currentIndex={currentImageIndex}
            updateCurrentIndex={decreaseCurrentIndexIfFinalIndex}
          />
          {!images.data?.length && (images.isLoading || images.isFetching) ? (
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
          )}
        </>
      )}
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  skeleton: {
    aspectRatio: 1,
    paddingHorizontal: 2,
  },
  item: {
    height: 100,
  },
});
