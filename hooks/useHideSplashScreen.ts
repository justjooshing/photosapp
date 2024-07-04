import { SplashScreen } from "expo-router";
import { useEffect } from "react";

type Props = {
  loaded: boolean;
};

const useHideSplashScreen = ({ loaded }: Props) => {
  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 200);
    }
  }, [loaded]);
};

export default useHideSplashScreen;
