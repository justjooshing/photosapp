import { MaterialIcons } from "@expo/vector-icons";
import { Image, ImageContentFit, ImageStyle } from "expo-image";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { tokens } from "@/config/tamagui/tokens";

type Props = {
  source: string;
  style?: ImageStyle;
  contentFit?: ImageContentFit;
  errorProps?: {
    size: number;
  };
};

const ImageWithError = ({
  source,
  style,
  contentFit,
  errorProps = { size: 96 },
}: Props) => {
  const [isErrored, setIsErrored] = useState(false);
  return !isErrored ? (
    <Image
      source={source}
      transition={300}
      {...(contentFit && { contentFit })}
      {...(style && { style })}
      onError={() => {
        setIsErrored(true);
      }}
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
