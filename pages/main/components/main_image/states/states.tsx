import React from "react";

import Data from "./data";
import Loading from "./loading";

import { useGetImages } from "@/api/queries/images";

const States = () => {
  const images = useGetImages();
  return !images.data?.length && (images.isLoading || images.isFetching) ? (
    <Loading />
  ) : (
    <Data />
  );
};

export default States;
