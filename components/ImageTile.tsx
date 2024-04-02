import { Link as ExpoLink } from "expo-router";
import React from "react";
import { ImageSourcePropType, Pressable, Image, View } from "react-native";

import { IImage } from "@/context/Images/types";

type Props = {
  image: IImage;
};

function ImageTile({ image: { id, baseUrl } }: Props) {
  const imageSource: ImageSourcePropType = {
    uri: baseUrl,
    height: 200,
    width: 200,
  };

  return (
    <View>
      <ExpoLink key={id} href={baseUrl} asChild>
        <Pressable>
          <Image source={imageSource} />
        </Pressable>
      </ExpoLink>
    </View>
  );
}

export default ImageTile;
