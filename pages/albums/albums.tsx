import React from "react";

import Data from "./states/data";
import Empty from "./states/empty";
import Loading from "./states/loading";

import ErrorHandler from "@/components/error_handler";
import { useGetInfiniteAlbums } from "@/server/albums/queries";
import { SortOptions } from "@/server/types";

const Albums = ({ sortOption }: { sortOption: SortOptions }) => {
  const albums = useGetInfiniteAlbums(sortOption);

  if (albums.isError) return <ErrorHandler error={albums.error} />;
  if (albums.isLoading) return <Loading />;

  return !albums.data?.pages?.length ? (
    <Empty sortOption={sortOption} />
  ) : (
    <Data sortOption={sortOption} />
  );
};

export default Albums;
