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

import FSImage from "./FSImage";
import SwipeConfirmation from "./SwipeConfirmation";

import { useMutateImages } from "@/api/query";
import { ImagesType } from "@/api/types";
import { IImage, SortOptions } from "@/context/Images/types";

interface Props {
  mainImage: IImage;
  isLastImage: boolean;
  imagesType: ImagesType;
  updateCurrentIndex: () => void;
}

const MainImageHandler = ({
  mainImage,
  isLastImage,
  imagesType,
  updateCurrentIndex,
}: Props) => {
  const offset = useSharedValue(0);
  const { mutate: sortImage } = useMutateImages(imagesType);

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
        <Animated.View style={animatedStyles}>
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
    flexGrow: 1,
    flexDirection: "row",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
