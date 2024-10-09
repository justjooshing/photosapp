import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";

import { SortOptions } from "@/server/types";

export interface InitialState {
  sortBy: SortOptions;
  setSortBy: Dispatch<SetStateAction<InitialState["sortBy"]>>;
}

const initialState: InitialState = {
  sortBy: SortOptions.DELETE,
  setSortBy: () => {},
};

const AlbumsContext = createContext<InitialState>(initialState);

export const AlbumsProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState(initialState.sortBy);

  const values = useMemo(
    () => ({
      sortBy,
      setSortBy,
    }),
    [sortBy],
  );

  return (
    <AlbumsContext.Provider value={values}>{children}</AlbumsContext.Provider>
  );
};

export const useAlbumsContext = () => useContext(AlbumsContext);
