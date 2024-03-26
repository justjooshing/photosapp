// request.js
import axios from "axios";
import Cookies from "js-cookie";

import { baseURL } from "./endpoints";

const token = Cookies.get("jwt");
export const client = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});
