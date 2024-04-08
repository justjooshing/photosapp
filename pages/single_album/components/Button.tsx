import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import { useUpdateSingleImage } from "@/api/query";
import { ApiImage, SortOptions } from "@/api/types";
import Icons from "@/components/icons";

type Props = {
  image: ApiImage;
  choice: SortOptions;
};

const Button = ({ image, choice }: Props) => {
  const { albumId } = useLocalSearchParams();
  const { mutate: updateImage } = useUpdateSingleImage(`${albumId}`);

  const handleClick = () => {
    updateImage({ image, choice });
  };
  const isSelected = image.sorted_status === choice;

  return (
    <Pressable disabled={isSelected} onPress={handleClick}>
      <Icons isSelected={isSelected} choice={choice} />
    </Pressable>
  );
};

export default Button;
