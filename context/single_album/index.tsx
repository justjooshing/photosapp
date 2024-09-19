import { useLocalSearchParams, router } from "expo-router";
import { createContext, ReactNode, useContext, useMemo } from "react";

import { SortOptions } from "@/api/types";

export const FilterOptions = { ...SortOptions, ALL: "all" } as const;
export type FilterOptionsType =
  (typeof FilterOptions)[keyof typeof FilterOptions];

export interface InitialState {
  albumId: string;
  filter: FilterOptionsType;
}

const defaultState: InitialState = {
  albumId: "",
  filter: SortOptions.DELETE,
};

const SingleAlbumContext = createContext<InitialState>(defaultState);

export const SingleAlbumProvider = ({
  initialState: { filter },
  children,
}: {
  initialState: { filter: FilterOptionsType };
  children: ReactNode;
}) => {
  const { albumId } = useLocalSearchParams<{ albumId: string }>();

  const values = useMemo(
    () => ({
      filter,
      albumId,
    }),
    [filter, albumId],
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
