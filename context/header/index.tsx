import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { ImagesType } from "./types";

interface InitialState {
  pageTitle: string | undefined;
  setPageTitle: Dispatch<SetStateAction<InitialState["pageTitle"]>>;
  imageType: ImagesType;
  setImageType: Dispatch<SetStateAction<InitialState["imageType"]>>;
  currentImageIndex: number;
  setCurrentImageIndex: Dispatch<
    SetStateAction<InitialState["currentImageIndex"]>
  >;
}

const initialState: InitialState = {
  pageTitle: undefined,
  setPageTitle: () => {},
  imageType: "similar",
  setImageType: () => {},
  currentImageIndex: 0,
  setCurrentImageIndex: () => {},
};

const HeadingContext = createContext<InitialState>(initialState);

export const HeadingProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState(initialState.pageTitle);
  const [imageType, setImageType] = useState<ImagesType>(
    initialState.imageType,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(
    initialState.currentImageIndex,
  );

  const values = useMemo(
    () => ({
      pageTitle,
      setPageTitle,
      imageType,
      setImageType,
      currentImageIndex,
      setCurrentImageIndex,
    }),
    [pageTitle, imageType, currentImageIndex],
  );

  return (
    <HeadingContext.Provider value={values}>{children}</HeadingContext.Provider>
  );
};

export const useHeadingContext = () => useContext(HeadingContext);
