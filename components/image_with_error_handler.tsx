import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ImageProps, StyleSheet } from "react-native";

import { tokens } from "@/config/tamagui/tokens";

type Props = {
  imageProps: ImageProps;
  errorProps?: {
    size: number;
  };
};

const ImageWithError = ({ imageProps, errorProps = { size: 96 } }: Props) => {
  const [error, setError] = useState();
  return !error ? (
    <Image
      onError={({ nativeEvent: { error } }) => setError(error)}
      {...imageProps}
    />
  ) : (
    <MaterialIcons
      name="image-not-supported"
      color={tokens.color.red2}
      size={errorProps.size}
      style={styles.icon}
    />
  );
};

export default ImageWithError;

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
