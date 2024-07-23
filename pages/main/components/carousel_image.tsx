import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet } from "react-native";

import { ApiImage } from "@/api/types";
import ImageWithError from "@/components/image_with_error_handler";

interface CarouselImageProps {
  image: ApiImage;
  position: number;
  setCurrentImageIndex: Dispatch<SetStateAction<number>>;
}

const CarouselImage = ({
  image,
  position,
  setCurrentImageIndex,
}: CarouselImageProps) => {
  const handleClick = () => {
    setCurrentImageIndex(position);
  };

  return (
    <Pressable onPress={handleClick}>
      <ImageWithError source={image.baseUrl} style={styles.image} />
    </Pressable>
  );
};

export default CarouselImage;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
