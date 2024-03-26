import { IImage } from "@/context/Images/types";
import React from "react";
import { ImageSourcePropType, Pressable, Image } from "react-native";
import { Link as ExpoLink } from "expo-router";

type Props = {
  image: IImage;
};

function ImageTile({ image }: Props) {
  const imageSource: ImageSourcePropType = {
    uri: image.baseUrl,
    height: 100,
    width: 100,
  };
  return (
    <ExpoLink key={image.id} href={image.productUrl} asChild>
      <Pressable>
        <Image source={imageSource} />
      </Pressable>
    </ExpoLink>
  );
}

export default ImageTile;
