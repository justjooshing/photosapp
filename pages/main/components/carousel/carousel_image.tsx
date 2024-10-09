import { Pressable, StyleSheet } from "react-native";

import ImageWithError from "@/components/image_with_error_handler";
import { tokens } from "@/config/tamagui/tokens";
import { useImageContext } from "@/context/image";
import { ApiImage } from "@/server/types";

interface CarouselImageProps {
  image: ApiImage;
  position: number;
}

const CarouselImage = ({ image, position }: CarouselImageProps) => {
  const { currentImageIndex, setCurrentImageIndex } = useImageContext();
  const isSelected = position === currentImageIndex;
  const imageSrc = {
    height: 100,
    width: 100,
    uri: image.baseUrl,
  };

  const handleClick = () => {
    setCurrentImageIndex(position);
  };

  return (
    <Pressable onPress={handleClick}>
      <ImageWithError
        imageProps={{
          source: imageSrc,
          style: [styles.image, isSelected && styles.selectedImage],
        }}
      />
    </Pressable>
  );
};

export default CarouselImage;

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  image: {
    height: 100,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedImage: {
    borderColor: tokens.color.blue3,
  },
});
