import { UseQueryResult } from "@tanstack/react-query";
import React from "react";

import Data from "./data";
import Empty from "./empty";
import Error from "./error";

import { ApiImageUrls } from "@/api/types";

type Props = { query: UseQueryResult<ApiImageUrls> };

const States = ({ query }: Props) => {
  if (query.isError) {
    return <Error />;
  }

  if (!query.data?.length && !(query.isLoading || query.isFetching)) {
    return <Empty />;
  }

  return <Data />;
};

export default States;
