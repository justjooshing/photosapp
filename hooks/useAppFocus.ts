import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Platform, AppState } from "react-native";

import { Keys } from "@/api/keys";
import { useUpdateSingleAlbumImage } from "@/api/queries/images";
import { InitialState } from "@/context/image";
import { renderToast } from "@/utils/toast";

interface Props {
  targetImage: InitialState["targetImage"];
  setTargetImage: InitialState["setTargetImage"];
}
const useAppFocus = ({ targetImage, setTargetImage }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: updateImage } = useUpdateSingleAlbumImage(
    targetImage?.sorted_album_id.toString(),
  );
  /**
   * Adds browser and native app event listeners
   * to force baseUrl refetch on app-refocus.
   * This avoids images the user recently deleted from still being shown
   */
  useEffect(() => {
    const focusListener = () => {
      renderToast({
        type: "info",
        message: "Checking image status against Google",
      });
      updateImage(
        { image: targetImage, body: { baseUrl: null } },
        {
          onSettled: () => {
            queryClient.invalidateQueries({
              queryKey: [
                ...Keys.albumImages(targetImage.sorted_album_id.toString()),
                ...Keys.count,
              ],
            });
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
  }, [targetImage, setTargetImage, updateImage, queryClient]);

  return [targetImage, setTargetImage];
};

export default useAppFocus;
