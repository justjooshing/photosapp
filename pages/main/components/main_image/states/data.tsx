import { router } from "expo-router";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
} from "react-native-reanimated";

import SwipeConfirmation from "../components/swipe_confirmation";

import { useGetImages, useSortImage } from "@/api/queries/images";
import { SortOptions } from "@/api/types";
import ImageWithError from "@/components/image_with_error_handler";
import { useImageContext } from "@/context/image";

const Data = () => {
  const { currentImageIndex, setCurrentImageIndex } = useImageContext();
  const { width, height } = useWindowDimensions();
  const offset = useSharedValue(0);
  const { data } = useGetImages();
  const { mutate: sortImage } = useSortImage();

  const threshold = 100;

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(Math.abs(offset.value), [0, threshold], [1, 0.8]);

    const opacity = interpolate(
      Math.abs(offset.value),
      [0, threshold],
      [1, 0.7],
    );

    // Not using Math.abs here because we want it to
    // rotate in a different direction based on which side its on
    const rotate = interpolate(
      offset.value,
      [-threshold, threshold],
      [-10, 10],
    );

    return {
      opacity,
      transform: [
        { translateX: offset.value },
        {
          rotate: `${rotate}deg`,
        },
        {
          scale,
        },
      ] as const,
    };
  });

  const updateImage = async (sorted_status: SortOptions) => {
    sortImage({ imageId: data?.[currentImageIndex].id, sorted_status });
    if (data?.length === 1) {
      router.push("/dashboard");
      /**
       * Fixes issue where after sorting final index image
       * we were still trying to access that index
       */
    } else if (data?.length - 1 === currentImageIndex) {
      setCurrentImageIndex((curr) => curr - 1);
    }
  };

  const handleSwipe = async ({
    translationX,
  }: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (translationX < -Number(threshold)) {
      updateImage(SortOptions.DELETE);
    } else if (translationX > threshold) {
      updateImage(SortOptions.KEEP);
    } else {
      offset.value = withSpring(0);
    }
  };

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onChange((e) => {
      offset.value = e.translationX;
    })
    .onFinalize(async (e) => {
      try {
        handleSwipe(e);
      } catch (e) {
        console.error(e.message);
      }
    })
    .onEnd(() => {
      offset.value = 0;
    });

  return (
    <>
      <SwipeConfirmation
        type={SortOptions.DELETE}
        offset={offset}
        threshold={threshold}
      />
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyles, styles.animated_container]}>
          <ImageWithError
            imageProps={{
              resizeMode: "contain",
              source: {
                uri: data?.[currentImageIndex]?.baseUrl,
                width: width - 10,
                height,
              },
              style: styles.image,
            }}
            errorProps={{ size: width - 56 }}
          />
        </Animated.View>
      </GestureDetector>
      <SwipeConfirmation
        type={SortOptions.KEEP}
        offset={offset}
        threshold={threshold}
      />
    </>
  );
};

export default Data;

const styles = StyleSheet.create({
  animated_container: {
    minWidth: "90%",
    height: "100%",
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
});
