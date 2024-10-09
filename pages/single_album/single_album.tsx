import React from "react";

import Data from "./states/data";
import Empty from "./states/empty";
import Loading from "./states/loading";

import { useGetSingleAlbum } from "@/server/albums/queries";
import ErrorHandler from "@/components/error_handler";

const SingleAlbum = () => {
  const singleAlbum = useGetSingleAlbum();

  if (singleAlbum.isError) return <ErrorHandler error={singleAlbum.error} />;
  if (singleAlbum.isLoading) return <Loading />;

  return !singleAlbum.data?.images.length ? <Empty /> : <Data />;
};

export default SingleAlbum;
