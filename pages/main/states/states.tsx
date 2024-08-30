import React from "react";

import Data from "./data";
import Empty from "./empty";

import { useGetImages } from "@/api/queries/images";
import ErrorHandler from "@/components/error_handler";

const States = () => {
  const images = useGetImages();

  if (images.isError) {
    return <ErrorHandler error={images.error} />;
  }
  if (!images.data?.length && images.isFetched) {
    return <Empty />;
  }

  return <Data />;
};

export default States;
