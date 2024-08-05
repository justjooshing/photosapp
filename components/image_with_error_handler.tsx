import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ImageProps, StyleSheet, View } from "react-native";

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
    <View style={[imageProps.style, styles.error_container]}>
      <MaterialIcons
        name="image-not-supported"
        color={tokens.color.red2}
        size={errorProps.size}
        style={styles.icon}
      />
    </View>
  );
};

export default ImageWithError;

const styles = StyleSheet.create({
  error_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
