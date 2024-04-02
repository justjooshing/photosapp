import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import MainImage from "./MainImage";
import SwipeConfirmation from "./SwipeConfirmation";

import { IImage } from "@/context/Images/types";

interface Props {
  mainImage: IImage;
  swipe: { up: () => void; down: () => void };
}

const MainImageHandler = ({
  mainImage,
  swipe: { up: swipeUp, down: swipeDown },
}: Props) => {
  const offset = useSharedValue(0);
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

  const handleSwipe = async ({
    translationX,
  }: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (translationX < -Number(threshold)) {
      swipeUp();
    } else if (translationX > threshold) {
      swipeDown();
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
        <MainImage image={mainImage} animatedStyles={animatedStyles} />
      </GestureDetector>
      <SwipeConfirmation type="keep" style={keepBarStyles} />
    </View>
  );
};

export default MainImageHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
