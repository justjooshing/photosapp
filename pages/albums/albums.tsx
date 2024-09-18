import React from "react";

import Data from "./states/data";
import Empty from "./states/empty";
import Loading from "./states/loading";

import { useGetInfiniteAlbums } from "@/api/albums/queries";
import { SortOptions } from "@/api/types";

const Albums = ({ sortOption }: { sortOption: SortOptions }) => {
  const { isLoading, data } = useGetInfiniteAlbums(sortOption);

  // Is loading
  if (isLoading) return <Loading />;

  return !data?.pages?.length ? (
    <Empty sortOption={sortOption} />
  ) : (
    <Data sortOption={sortOption} />
  );
};

export default Albums;
