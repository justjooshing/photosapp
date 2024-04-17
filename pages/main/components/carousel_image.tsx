import { Dispatch, SetStateAction } from "react";
import { Image, Pressable } from "react-native";

import { ApiImage } from "@/api/types";

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
    <Pressable onPress={handleClick} key={image.id}>
      <Image source={imageSrc} />
    </Pressable>
  );
};

export default CarouselImage;
