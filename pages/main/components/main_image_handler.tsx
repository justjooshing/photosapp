import { router } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import SwipeConfirmation from "./swipe_confirmation";

import { useGetImages, useSortImage } from "@/api/queries/images";
import { SortOptions } from "@/api/types";
import ImageWithError from "@/components/image_with_error_handler";
import Skeleton from "@/components/skeleton";

interface Props {
  currentIndex: number;
  updateCurrentIndex: () => void;
}

const MainImageHandler = ({ currentIndex, updateCurrentIndex }: Props) => {
  const { width, height } = useWindowDimensions();
  const offset = useSharedValue(0);
  const containerWidthRef = useRef(0);

  const { isLoading, data, isFetching } = useGetImages();
  const { mutate: sortImage } = useSortImage();

  const onLayout = ({ nativeEvent: { layout } }) => {
    containerWidthRef.current = layout.width;
  };

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
    sortImage({ image: data?.[currentIndex], body: { sorted_status } });
    if (data?.length === 1) {
      router.push("/dashboard");
    } else {
      updateCurrentIndex();
    }
  };

  const handleSwipe = async ({
    translationX,
  }: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (translationX < -Number(threshold)) {
      updateImage("delete");
    } else if (translationX > threshold) {
      updateImage("keep");
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
    <View style={styles.container} onLayout={onLayout}>
      {!data?.length && (isLoading || isFetching) ? (
        <View style={styles.skeleton_container}>
          <Skeleton />
        </View>
      ) : (
        <>
          <SwipeConfirmation
            type="delete"
            offset={offset}
            threshold={threshold}
            containerWidth={containerWidthRef.current}
          />
          <GestureDetector gesture={pan}>
            <Animated.View style={[animatedStyles, styles.animated_container]}>
              <ImageWithError
                imageProps={{
                  resizeMode: "contain",
                  source: {
                    uri: data[currentIndex]?.baseUrl,
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
            type="keep"
            offset={offset}
            threshold={threshold}
            containerWidth={containerWidthRef.current}
          />
        </>
      )}
    </View>
  );
};

export default MainImageHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  animated_container: {
    minWidth: "90%",
    height: "100%",
  },
  skeleton_container: {
    width: "100%",
    aspectRatio: 1,
    padding: 20,
  },
  image: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
});
