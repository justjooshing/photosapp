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
}

const initialState: InitialState = {
  setPageTitle: () => {},
  pageTitle: undefined,
  imageType: "similar",
  setImageType: () => {},
};

const HeadingContext = createContext<InitialState>(initialState);

export const HeadingProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState(initialState.pageTitle);
  const [imageType, setImageType] = useState<ImagesType>("today");

  const values = useMemo(
    () => ({
      pageTitle,
      setPageTitle,
      imageType,
      setImageType,
    }),
    [pageTitle, imageType],
  );

  return (
    <HeadingContext.Provider value={values}>{children}</HeadingContext.Provider>
  );
};

export const useHeadingContext = () => useContext(HeadingContext);
