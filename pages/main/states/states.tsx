import React from "react";

import Data from "./data";
import Empty from "./empty";
import Error from "./error";

import { useGetImages } from "@/api/queries/images";

const States = () => {
  const images = useGetImages();

  if (images.isError) {
    return <Error />;
  }

  if (!images.data?.length && !(images.isLoading || images.isFetching)) {
    return <Empty />;
  }

  return <Data />;
};

export default States;
