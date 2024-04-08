import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from "react-native";

import { useGetImages } from "@/api/query";
import MainImageHandler from "@/components/MainImageHandler";

const Images = () => {
  const images = useGetImages();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  if (images.isLoading) return <Text>Loading...</Text>;
  if (images.isError) return <Text>{images.error.message}</Text>;
  if (!images.data?.length) return <Text> No data </Text>;

  /**
   * Fixes issue where after sorting final index image
   * we were still trying to access that index
   */
  const decreaseCurrentIndexIfFinalIndex = () => {
    if (images.data.length - 1 === currentImageIndex) {
      setCurrentImageIndex((curr) => curr - 1);
    }
  };

  return (
    <View style={styles.wrapper}>
      <MainImageHandler
        mainImage={images.data[currentImageIndex]}
        isLastImage={images.data.length === 1}
        updateCurrentIndex={decreaseCurrentIndexIfFinalIndex}
      />
      <View>
        <FlatList
          horizontal
          data={images.data}
          keyExtractor={({ id }) => `${id}`}
          renderItem={({ item: image, index }) => {
            const imageSrc = {
              height: 100,
              width: 100,
              uri: image.baseUrl,
            };
            const handleClick = () => {
              setCurrentImageIndex(index);
            };

            return (
              <Pressable onPress={handleClick} key={image.id}>
                <Image source={imageSrc} />
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
