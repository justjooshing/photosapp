import { AxiosError } from "axios";

export const globalErrorMessages = {
  400: "The request could not be understood by the server.",
  401: "You are not authorized to access this resource.",
  404: "The requested resource was not found.",
  418: "Teapot detected",
  500: "An error occurred on the server. Please try again later.",
};

export const getImageMessages = {
  400: "We couldn't process your image request.",
  401: "You don't have access to these images.",
  404: "The requested images were not found.",
  500: "For some reason, we couldn't send you the images you're requesting.",
};

export const deleteUserMessages = {
  400: "We couldn't delete your account.",
  401: "You don't have access to delete this account.",
  404: "This account was not found.",
  500: "For some reason, we couldn't delete the account you're requesting.",
};

const genericErrorMessage = "Something's gone wrong";

export const errorMessageLookup = (error: AxiosError) => {
  const {
    response: { status },
    config: { url, method },
  } = error;
  // Probably cannot hit server
  if (!status || !url || !method) return genericErrorMessage;

  // Lookup related error with catch-alls
  const specificMessage = {
    [url]: { [method]: globalErrorMessages },
    "/api/images": {
      [method]: globalErrorMessages,
      get: getImageMessages,
    },
    "/api/user": {
      [method]: globalErrorMessages,
      delete: deleteUserMessages,
    },
  }[url][method][status];

  // Fallbacks if no matching status code errors
  return specificMessage || globalErrorMessages[status] || genericErrorMessage;
};
