import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageErrorEventData,
  ImageProps,
  ImageURISource,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

import { tokens } from "@/config/tamagui/tokens";

type Props = {
  highDef?: boolean;
  imageProps: Omit<ImageProps, "source"> & {
    source: ImageURISource;
  };
  errorProps?: {
    size: number;
  };
};

const ImageWithError = ({
  highDef = false,
  imageProps: { style, source, ...imageProps },
  errorProps = { size: 96 },
}: Props) => {
  const [error, setError] = useState();
  const [highDefLoaded, setHighDefLoaded] = useState(false);

  const handleHighDefLoaded = () => {
    setHighDefLoaded(true);
  };

  const handleLoadError = ({
    nativeEvent: { error },
  }: NativeSyntheticEvent<ImageErrorEventData>) => setError(error);

  // Revert to allow low def image to load first
  useEffect(() => {
    setHighDefLoaded(false);
  }, [source.uri]);

  if (error)
    return (
      <View style={[style, styles.error_container]}>
        <MaterialIcons
          name="image-not-supported"
          color={tokens.color.red2}
          size={errorProps.size}
          style={styles.icon}
        />
      </View>
    );

  return (
    <>
      <Image
        onError={handleLoadError}
        style={[style, highDefLoaded ? styles.hide : styles.show]}
        source={source}
        {...imageProps}
      />
      {highDef ? (
        <Image
          onError={handleLoadError}
          onLoadEnd={handleHighDefLoaded}
          style={[style, highDefLoaded ? styles.show : styles.hide]}
          source={{
            ...source,
            // =d gets download quality which we want since we can pinch to zoom
            uri: `${source.uri}=d`,
          }}
          {...imageProps}
        />
      ) : null}
    </>
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
  show: { opacity: 1 },
  hide: { opacity: 0, height: 0 },
});
