import { StyleProp, ViewStyle } from "react-native";
import Toast from "react-native-root-toast";

import { color } from "@/config/tamagui/tokens";

type ToastTypes = "error" | "success" | "info";

const toastStyles: { [key in ToastTypes]: StyleProp<ViewStyle> } = {
  error: {
    backgroundColor: color.red,
  },
  success: {
    backgroundColor: color.green,
  },
  info: {
    backgroundColor: color.yellow,
  },
};

interface RenderToastProps {
  type: ToastTypes;
  message: string;
}

/**
 * Queue to ensure toasts stack
 */
const toastMessageQueue = [];

export const renderToast = ({ type, message }: RenderToastProps) => {
  // Probably should be UUID instead of random
  const id = Math.random();
  toastMessageQueue.push({ type, message, id });

  const positionInQueue = toastMessageQueue.findIndex((el) => el.id === id);
  if (toastMessageQueue.length > 0) {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM - positionInQueue * 45,
      shadow: false,
      hideOnPress: true,
      opacity: 1,
      containerStyle: toastStyles[type],
      onHide: () => {
        toastMessageQueue.splice(positionInQueue, 1);
      },
    });
  }
};
