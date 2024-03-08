import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import MainImage from "./MainImage";
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
    transform: [{ translateY: offset.value }],
  }));

  const handleSwipe = async ({
    translationY,
  }: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    const threshold = 300;
    if (translationY < -Number(threshold)) {
      swipeUp();
    } else if (translationY > threshold) {
      swipeDown();
    } else {
      offset.value = withSpring(0);
    }
  };

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onChange((e) => {
      offset.value = e.translationY;
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
    <GestureDetector gesture={pan}>
      <MainImage image={mainImage} style={animatedStyles} />
    </GestureDetector>
  );
};

export default MainImageHandler;
