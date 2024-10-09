import { AxiosError } from "axios";

import { ENDPOINTS } from "./endpoints";

const globalErrorMessages = {
  400: "The request could not be understood by the server.",
  401: "You are not authorized to access this resource.",
  404: "The requested resource was not found.",
  418: "Teapot detected",
  500: "An error occurred on the server. Please try again later.",
};

const getImageMessages = {
  400: "We couldn't process your image request.",
  401: "You don't have access to these images.",
  404: "The requested images were not found.",
  500: "For some reason, we couldn't send you the images you're requesting.",
};

const deleteUserMessages = {
  400: "We couldn't delete your account.",
  401: "You don't have access to delete this account.",
  404: "This account was not found.",
  500: "For some reason, we couldn't delete the account you're requesting.",
};

const getCountMessages = {
  500: "For some reason, we couldn't return the statistics you requested.",
};

const getLoginLinkMessages = {
  503: "For some reason, we can't allow Login Via Google.",
};

const getSingleAlbumMessages = {
  400: "We can't show you this album.",
  401: "You are not authorised to view this album.",
  404: "We cannot find this album.",
  500: "For some reason, we couldn't return the album you requested.",
};

const putSingleImageMessages = {
  400: "We failed to sort this image.",
  404: "We couldn't find the image you wanted to sort.",
  500: "Something on our end went wrong when trying to sort this image.",
};

const genericErrorMessage = "Something's gone wrong";

const convertUrl = (url: string) => {
  let matchingUrl: string | undefined;

  for (const endpoint of ENDPOINTS.values()) {
    if (url.startsWith(endpoint)) {
      matchingUrl = endpoint;
      break;
    }
  }

  // For /images/:imageID and albums/:albumID
  return matchingUrl ? `${matchingUrl}/:id` : undefined;
};

export const errorMessageLookup = (error: AxiosError) => {
  // Probably cannot hit server
  if (!error?.response?.status || !error?.config?.url || !error?.config?.method)
    return genericErrorMessage;
  const {
    response: { status },
    config: { url, method },
  } = error;

  const usableUrl = Array.from(ENDPOINTS.values()).includes(url)
    ? url
    : convertUrl(url);

  // Lookup related error with catch-alls
  const specificMessage = {
    [usableUrl]: { [method]: globalErrorMessages },
    [ENDPOINTS.get("images")]: {
      [method]: globalErrorMessages,
      get: getImageMessages,
    },
    [ENDPOINTS.get("count")]: {
      [method]: globalErrorMessages,
      get: getCountMessages,
    },
    [ENDPOINTS.get("user")]: {
      [method]: globalErrorMessages,
      delete: deleteUserMessages,
    },
    [ENDPOINTS.get("login")]: {
      [method]: globalErrorMessages,
      get: getLoginLinkMessages,
    },
    [`${ENDPOINTS.get("albums")}/:id`]: {
      [method]: globalErrorMessages,
      get: getSingleAlbumMessages,
    },
    [`${ENDPOINTS.get("images")}/:id`]: {
      [method]: globalErrorMessages,
      put: putSingleImageMessages,
    },
  }[usableUrl][method][status];

  // Fallbacks if no matching status code errors
  return specificMessage || globalErrorMessages[status] || genericErrorMessage;
};
