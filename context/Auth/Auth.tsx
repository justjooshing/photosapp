import { router } from "expo-router";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

interface InitialState {
  authToken: string | undefined;
  setAuthToken: Dispatch<SetStateAction<InitialState["authToken"]>>;
}

const initialState: InitialState = {
  authToken: undefined,
  setAuthToken: (val: string) => {},
};

const AuthContext = createContext<InitialState>(initialState);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (!!jwt) {
      setAuthToken(jwt);
    } else router.push("/login");
  });

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
