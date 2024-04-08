import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface InitialState {
  pageTitle: string | undefined;
  setPageTitle: Dispatch<SetStateAction<InitialState["pageTitle"]>>;
}

const initialState: InitialState = {
  setPageTitle: () => {},
  pageTitle: undefined,
};

const HeadingContext = createContext<InitialState>(initialState);

export const HeadingProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState(initialState.pageTitle);
  return (
    <HeadingContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </HeadingContext.Provider>
  );
};

export const useHeadingContext = () => useContext(HeadingContext);
