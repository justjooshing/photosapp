import { SplashScreen } from "expo-router";
import { useEffect } from "react";

type Props = {
  loaded: boolean;
};

const useHideSplashScreen = ({ loaded }: Props) => {
  useEffect(() => {
    if (loaded) {
      const hideSplash = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 200);
      return () => {
        clearTimeout(hideSplash);
      };
    }
  }, [loaded]);
};

export default useHideSplashScreen;
