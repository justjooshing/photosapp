import { useLocalSearchParams, router } from "expo-router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
} from "react";

import { SortOptions } from "@/server/types";

export const FilterOptions = { ...SortOptions, ALL: "all" } as const;
export type FilterOptionsType =
  (typeof FilterOptions)[keyof typeof FilterOptions];

export interface InitialState {
  albumId: string;
  filter: FilterOptionsType;
  setFilter: Dispatch<SetStateAction<InitialState["filter"]>>;
}

const defaultState: InitialState = {
  albumId: "",
  filter: SortOptions.DELETE,
  setFilter: () => {},
};

const SingleAlbumContext = createContext<InitialState>(defaultState);

export const SingleAlbumProvider = ({
  initialState: { filter, setFilter },
  children,
}: {
  initialState: Omit<InitialState, "albumId">;
  children: ReactNode;
}) => {
  const { albumId } = useLocalSearchParams<{ albumId: string }>();

  const values = useMemo(
    () => ({
      filter,
      albumId,
      setFilter,
    }),
    [filter, setFilter, albumId],
  );

  // AlbumId should be a number as a string
  if (isNaN(+albumId)) {
    router.back();
    return;
  }

  return (
    <SingleAlbumContext.Provider value={values}>
      {children}
    </SingleAlbumContext.Provider>
  );
};

export const useSingleAlbumContext = () => useContext(SingleAlbumContext);
