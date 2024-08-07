import React from "react";

import { useGetImages } from "@/api/queries/images";
import ErrorHandler from "@/components/error_handler.tsx";

const localErrorMessages = {
  400: "We couldn't process your image request.",
  401: "You don't have access to these images.",
  404: "The requested images were not found.",
  500: "For some reason, we couldn't send you the images you're requesting.",
};

const Error = () => {
  const { error } = useGetImages();

  return (
    <ErrorHandler
      status={error.request.status}
      localErrorMessages={localErrorMessages}
    />
  );
};

export default Error;
