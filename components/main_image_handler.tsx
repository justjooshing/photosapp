import { router } from "expo-router";
import {
  ImageSourcePropType,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
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

import ImageWithError from "./image_with_error_handler";
import Skeleton from "./skeleton";
import SwipeConfirmation from "./swipe_confirmation";

import { useGetImages, useSortImage } from "@/api/queries/images";
import { ApiImage, SortOptions } from "@/api/types";
import { useHeadingContext } from "@/context/header";

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
  const { isLoading } = useGetImages(imageType);
  const { width, height } = useWindowDimensions();

  const offset = useSharedValue(0);
  const { mutate: sortImage } = useSortImage(imageType);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      {
        rotate:
          offset.value === 0 ? "0deg" : `${0 + (offset.value / width) * 80}deg`,
      },
    ] as const,
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

  const updateImage = async (sorted_status: SortOptions) => {
    sortImage({ image: mainImage, body: { sorted_status } });
    if (isLastImage) {
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

  const sourceImage: ImageSourcePropType = {
    uri: mainImage?.baseUrl,
    width: width - 10,
    height,
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.skeleton_container}>
          <Skeleton />
        </View>
      ) : (
        <>
          <SwipeConfirmation type="delete" style={delBarStyles} />
          <GestureDetector gesture={pan}>
            <Animated.View style={[animatedStyles, styles.animated_container]}>
              <ImageWithError
                imageProps={{
                  resizeMode: "contain",
                  source: sourceImage,
                  style: styles.image,
                }}
                errorProps={{ size: width - 56 }}
              />
            </Animated.View>
          </GestureDetector>
          <SwipeConfirmation type="keep" style={keepBarStyles} />
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
