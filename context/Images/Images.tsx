import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { IImage } from "./types";

interface InitialState {
  sortedImages: Record<"keep" | "delete", IImage[]>;
  setSortedImages: Dispatch<SetStateAction<InitialState["sortedImages"]>>;
}

const initialState: InitialState = {
  setSortedImages: () => {},
  sortedImages: { keep: [], delete: [] },
};

const ImagesContext = createContext<InitialState>(initialState);

export const ImagesProvider = ({ children }) => {
  // Create BE req returning deleted_at/sorted_at count for /end page, then can delete this
  const [sortedImages, setSortedImages] = useState(initialState.sortedImages);
  return (
    <ImagesContext.Provider value={{ sortedImages, setSortedImages }}>
      {children}
    </ImagesContext.Provider>
  );
};

export const useImagesContext = () => useContext(ImagesContext);
