import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ENDPOINTS } from "./endpoints";

const getData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const getLoginLink = async () => getData(ENDPOINTS.get("login"));

export const useGetLoginLink = () =>
  useQuery({
    queryKey: ["login-link"],
    queryFn: getLoginLink,
    select: ({ loginLink }) => loginLink,
  });

const getImages = async () => getData(ENDPOINTS.get("images"));

export const useGetImages = () =>
  useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });
