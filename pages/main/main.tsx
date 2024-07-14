import { View, Text, StyleSheet, FlatList } from "react-native";

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
          <View>
            {!images.data?.length && (images.isLoading || images.isFetching) ? (
              <FlatList
                horizontal
                data={Array(5)}
                contentContainerStyle={styles.item_container}
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
                contentContainerStyle={styles.item_container}
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
  item_container: {
    gap: 1,
  },
});
