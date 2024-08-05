import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";

export interface InitialState {
  windowWidth: number;
  setWindowWidth: Dispatch<SetStateAction<InitialState["windowWidth"]>>;
}

const initialState: InitialState = {
  windowWidth: undefined,
  setWindowWidth: () => {},
};

const AppContext = createContext<InitialState>(initialState);

export const AppProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(initialState.windowWidth);

  const values = useMemo(
    () => ({
      windowWidth,
      setWindowWidth,
    }),
    [windowWidth],
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
