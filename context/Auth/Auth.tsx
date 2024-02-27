import { isAuth, login, logout } from "@/helpers/Auth";
import React, { createContext, useContext, useState } from "react";

interface InitialState {
  isLoggedIn: Promise<boolean>;
  setIsLoggedIn: (val: boolean) => void;
}
const initialState: InitialState = {
  // false to mock loggedOut state
  isLoggedIn: Promise.resolve(false),
  setIsLoggedIn: (val: boolean) => {},
};

const AuthContext = createContext<InitialState>(initialState);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);

  const handleLogin = (val) => {
    setIsLoggedIn(val);
    if (val) {
      login();
    } else {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
