import React from "react";

import Data from "./data";
import Empty from "./empty";

import { useGetImages } from "@/api/images/queries";
import ErrorHandler from "@/components/error_handler";

const States = () => {
  const images = useGetImages();

  if (images.isError) {
    return <ErrorHandler error={images.error} />;
  }
  if (!images.data?.length && !(images.isLoading || images.isFetching)) {
    return <Empty />;
  }

  return <Data />;
};

export default States;
