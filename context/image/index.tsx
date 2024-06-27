import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
} from "react";
import { AppState, Platform } from "react-native";

import { Keys } from "@/api/keys";
import { useUpdateSingleAlbumImage } from "@/api/queries/images";
import { ApiImage } from "@/api/types";
import { renderToast } from "@/utils/toast";

interface InitialState {
  targetImage: ApiImage;
  setTargetImage: Dispatch<SetStateAction<InitialState["targetImage"]>>;
}

const initialState: InitialState = {
  targetImage: undefined,
  setTargetImage: () => {},
};

const ImageContext = createContext<InitialState>(initialState);

export const ImageProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [targetImage, setTargetImage] = useState(initialState.targetImage);

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
  }, [targetImage]);

  const values = useMemo(
    () => ({
      targetImage,
      setTargetImage,
    }),
    [targetImage],
  );

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
