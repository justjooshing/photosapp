import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import FSImage from "./fs_image";
import SwipeConfirmation from "./swipe_confirmation";

import { useSortImage } from "@/api/query";
import { ApiImage, SortOptions } from "@/api/types";
import { useHeadingContext } from "@/context/Header";

interface Props {
  mainImage: ApiImage;
  isLastImage: boolean;
  updateCurrentIndex: () => void;
}

const MainImageHandler = ({
  mainImage,
  isLastImage,
  updateCurrentIndex,
}: Props) => {
  const { imageType } = useHeadingContext();
  const offset = useSharedValue(0);
  const { mutate: sortImage } = useSortImage(imageType);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const threshold = 100;

  // Condense down into customHook
  const delBarStyles = useAnimatedStyle(() => {
    return {
      opacity: offset.value < -threshold ? 1 : 0,
    };
  });
  const keepBarStyles = useAnimatedStyle(() => {
    return {
      opacity: offset.value > threshold ? 1 : 0,
    };
  });

  const updateImage = async (choice: SortOptions) => {
    sortImage({ image: mainImage, choice });
    updateCurrentIndex();
    if (isLastImage) {
      router.push("/end");
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
    <View style={styles.container}>
      <SwipeConfirmation type="delete" style={delBarStyles} />
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyles, styles.animated_container]}>
          <FSImage image={mainImage} />
        </Animated.View>
      </GestureDetector>
      <SwipeConfirmation type="keep" style={keepBarStyles} />
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
  },
  animated_container: {
    minWidth: "90%",
    height: "100%",
  },
});
