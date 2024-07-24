import { Dispatch, SetStateAction } from "react";
import { Pressable } from "react-native";

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
        }}
      />
    </Pressable>
  );
};

export default CarouselImage;
