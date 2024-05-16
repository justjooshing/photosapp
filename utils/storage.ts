import Cookies from "js-cookie";

const Storage = {
  set: Cookies.set,
  get: Cookies.get,
  remove: Cookies.remove,
};

export default Storage;
