import React, { useState } from "react";
import {
  ImageSourcePropType,
  ImageStyle,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";
import RNImageModal from "react-native-image-modal";

import ImageWithError from "./image_with_error_handler";

type Props = {
  baseUrl: string;
  full?: boolean;
  errorSize: number;
  style?: ImageStyle;
};

const ImageModal = ({ baseUrl, full = false, errorSize, style }: Props) => {
  const [containerDimensions, setContainerDimensions] = useState({
    height: 0,
    width: 0,
  });

  const imageSource: ImageSourcePropType = {
    // =d gets download quality which we want since we can pinch to zoom
    uri: `${baseUrl}=d`,
  };

  const handleSetDimensions = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout;
    setContainerDimensions({ height, width: width * 0.9 });
  };

  const parentStyle = full ? ({ height: "100%" } as const) : { aspectRatio: 1 };

  return (
    <View
      onLayout={handleSetDimensions}
      style={[styles.container, parentStyle]}
    >
      <View>
        <RNImageModal
          style={{
            ...(style && style),
            height: containerDimensions.height,
            width: containerDimensions.width,
          }}
          hideCloseButton
          source={imageSource}
          renderImageComponent={(props) => (
            <ImageWithError
              imageProps={props}
              errorProps={{
                size:
                  errorSize > 0
                    ? errorSize
                    : containerDimensions.width + errorSize,
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
