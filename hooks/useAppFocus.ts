import { useEffect } from "react";
import { Platform, AppState } from "react-native";

import { useCheckImageStatus } from "@/api/queries/images";
import { InitialState } from "@/context/image";

interface Props {
  targetImage: InitialState["targetImage"];
  setTargetImage: InitialState["setTargetImage"];
}
const useAppFocus = ({ targetImage, setTargetImage }: Props) => {
  const { mutate: updateImage } = useCheckImageStatus(
    targetImage?.sorted_album_id.toString(),
  );
  /**
   * Adds browser and native app event listeners
   * to force baseUrl refetch on app-refocus.
   * This avoids images the user recently deleted from still being shown
   */
  useEffect(() => {
    const focusListener = () => {
      updateImage(
        { imageId: targetImage.id },
        {
          onSettled: () => {
            setTargetImage(undefined);
          },
        },
      );
    };
    if (targetImage) {
      // WEB
      if (Platform.OS === "web") {
        window.addEventListener("focus", focusListener);
        return () => {
          window.removeEventListener("focus", focusListener);
        };
      } else {
        // NATIVE
        const subscription = AppState.addEventListener("focus", focusListener);
        return () => {
          subscription.remove();
        };
      }
    }
  }, [targetImage, setTargetImage, updateImage]);

  return [targetImage, setTargetImage];
};

export default useAppFocus;
