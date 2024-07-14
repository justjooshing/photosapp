import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";

import { ImagesType } from "./types";

import { ApiImage } from "@/api/types";
import useAppFocus from "@/hooks/useAppFocus";

export interface InitialState {
  targetImage: ApiImage;
  setTargetImage: Dispatch<SetStateAction<InitialState["targetImage"]>>;
  imageType: ImagesType;
  setImageType: Dispatch<SetStateAction<InitialState["imageType"]>>;
  currentImageIndex: number;
  setCurrentImageIndex: Dispatch<
    SetStateAction<InitialState["currentImageIndex"]>
  >;
}

const initialState: InitialState = {
  targetImage: undefined,
  setTargetImage: () => {},
  imageType: "similar",
  setImageType: () => {},
  currentImageIndex: 0,
  setCurrentImageIndex: () => {},
};

const ImageContext = createContext<InitialState>(initialState);

export const ImageProvider = ({ children }) => {
  const [targetImage, setTargetImage] = useState(initialState.targetImage);
  const [imageType, setImageType] = useState<ImagesType>(
    initialState.imageType,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(
    initialState.currentImageIndex,
  );
  useAppFocus({ targetImage, setTargetImage });
  const values = useMemo(
    () => ({
      targetImage,
      setTargetImage,
      imageType,
      setImageType,
      currentImageIndex,
      setCurrentImageIndex,
    }),
    [targetImage, imageType, currentImageIndex],
  );

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
