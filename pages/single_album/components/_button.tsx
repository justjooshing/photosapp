import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import { useUpdateSingleAlbumImage } from "@/api/queries/images";
import { ApiImage, SortOptions } from "@/api/types";
import Icons from "@/components/_icons";

type Props = {
  image: ApiImage;
  choice: SortOptions;
};

const Button = ({ image, choice }: Props) => {
  const { albumId } = useLocalSearchParams();
  const { mutate: updateImage } = useUpdateSingleAlbumImage(albumId.toString());

  const handleClick = () => {
    updateImage({ image, body: { sorted_status: choice } });
  };
  const isSelected = image.sorted_status === choice;

  return (
    <Pressable disabled={isSelected} onPress={handleClick}>
      <Icons isSelected={isSelected} choice={choice} />
    </Pressable>
  );
};

export default Button;
