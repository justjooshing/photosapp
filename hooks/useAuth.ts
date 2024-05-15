import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState<"loading" | boolean>("loading");

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    setToken(!!jwt);
  }, []);

  return token;
};

export default useAuth;
